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
        console.error('Login failed:', error);
        throw error;
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

