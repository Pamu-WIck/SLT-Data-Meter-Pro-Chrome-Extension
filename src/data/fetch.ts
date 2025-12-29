import axios from "axios";
import {usageSum} from "./usageSummary.ts";
import {historyLog, usage} from "./history.ts";

const baseURL = 'https://omniscapp.slt.lk/slt/ext/api/'

const fetchData = async (url:string) => {
    const token = localStorage.getItem('accesstkn');

    const headers = {
        'Accept': '*/*',
        'Authorization': `bearer ${token}`,
        'X-Ibm-Client-Id': 'b7402e9d66808f762ccedbe42c20668e',
    };

    axios.defaults.baseURL = baseURL;
    const response = await axios.get(url, {headers});
    return response.data;
}

export class LoginError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LoginError';
    }
}

export const importSessionFromWebsite = async (): Promise<void> => {
    // Find MySLT tab
    const tabs = await chrome.tabs.query({ url: 'https://myslt.slt.lk/*' });

    if (tabs.length === 0) {
        // Open MySLT website if not already open
        await chrome.tabs.create({ url: 'https://myslt.slt.lk/', active: true });
        throw new LoginError('Please login to MySLT website and try again');
    }

    const tabId = tabs[0].id;
    if (!tabId) {
        throw new LoginError('Could not access MySLT tab');
    }

    // Inject script to read localStorage from MySLT website
    const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
            return {
                accessToken: localStorage.getItem('slt_accessToken'),
                selectedAcc: localStorage.getItem('selectedAcc')
            };
        }
    });

    if (!results || results.length === 0 || !results[0].result) {
        throw new LoginError('Could not read session from MySLT website');
    }

    const { accessToken, selectedAcc } = results[0].result;

    if (!accessToken) {
        throw new LoginError('Please login to MySLT website first');
    }

    if (!selectedAcc) {
        throw new LoginError('No account selected on MySLT website');
    }

    // Store the access token
    localStorage.setItem('accesstkn', accessToken);

    // Fetch service details using the selected account (telephone number)
    await fetchGetServiceDetails(selectedAcc);
};

export const fetchLogin = async (username: string, password: string) => {
    const url = 'Account/Login';

    const data = {
        username: username,
        password: password,
        channelID: 'WEB',
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'X-Ibm-Client-Id': 'b7402e9d66808f762ccedbe42c20668e',
    };

    axios.defaults.baseURL = baseURL;

    try {
        const response = await axios.post(url, new URLSearchParams(data).toString(), { headers });
        if (response.status === 200){
            localStorage.setItem('accesstkn', response.data.accessToken);
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            await fetchGetAccountDetails(username);
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    throw new LoginError('Invalid username or password');
                } else if (status === 403) {
                    throw new LoginError('Account access denied. Please contact SLT');
                } else if (status >= 500) {
                    throw new LoginError('Service temporarily unavailable. Please try again later');
                } else {
                    throw new LoginError('Login failed. Please try again');
                }
            } else if (error.code === 'ECONNABORTED') {
                throw new LoginError('Request timed out. Please try again');
            } else if (error.code === 'ERR_NETWORK') {
                throw new LoginError('Unable to connect. Check your internet connection');
            }
        }
        throw new LoginError('Something went wrong. Please try again');
    }
};

export const fetchGetAccountDetails = async (username: string) => {
    const url = `AccountOMNI/GetAccountDetailRequest?username=${username}`;
    const data = await fetchData(url);
    await fetchGetServiceDetails(data.dataBundle[0].telephoneno);
}

export const fetchGetServiceDetails = async (telephoneNo: string) => {
    const url = `AccountOMNI/GetServiceDetailRequest?telephoneNo=${telephoneNo}`;
    const data = await fetchData(url);
    localStorage.setItem('serviceid', data.dataBundle.listofBBService[0].serviceID);
    window.location.reload();
}

export const fetchUsageSummary = async () => {
    const serviceid = localStorage.getItem('serviceid');
    const url = `BBVAS/UsageSummary?subscriberID=${serviceid}`;
    const data = await fetchData(url);

    const UsageSummary = usageSum(data);
    historyLog(data, usage(UsageSummary));

    return UsageSummary;
}

export const fetchVas = async () => {
    const serviceid = localStorage.getItem('serviceid');
    const url = `BBVAS/GetDashboardVASBundles?subscriberID=${serviceid}`;
    const data = await fetchData(url);
    return data;
}

