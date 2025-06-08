import axios from "axios";
import {usageSum} from "./usageSummary.ts";
import {historyLog, usage} from "./history.ts";

const baseURL = 'https://omniscapp.slt.lk/mobitelint/slt/api/'




const fetchData = async (url: string) => {
    const token = localStorage.getItem('token');
    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7',
        'authorization': `bearer ${token}`,
        'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'x-ibm-client-id': 'b7402e9d66808f762ccedbe42c20668e',
    };
    axios.defaults.baseURL = 'https://omniscapp.slt.lk/slt/ext/api/';
    const response = await axios.get(url, { headers, withCredentials: true });
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
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'x-ibm-client-id': 'b7402e9d66808f762ccedbe42c20668e',
        // Optionally add other headers from temp.js if needed
    };

    axios.defaults.baseURL = 'https://omniscapp.slt.lk/slt/ext/api/';

    try {
        const response = await axios.post(url, new URLSearchParams(data).toString(), { headers, withCredentials: true });
        console.timeLog();
        if (response.status === 200){
            const token = response.data.accessToken;
            localStorage.setItem('token', token);

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

export const fetchGetServiceDetails = async (telephoneNo: number) => {
    const url = `AccountOMNI/GetServiceDetailRequest?telephoneNo=${telephoneNo}`;
    const data = await fetchData(url);
    localStorage.setItem('serviceID', data.dataBundle.listofBBService[0].serviceID);
    window.location.reload();
}

export const fetchUsageSummary = async () => {
    const serviceID = localStorage.getItem('serviceID');
    const url = `BBVAS/UsageSummary?subscriberID=${serviceID}`;
    const data = await fetchData(url);
    const UsageSummary = usageSum(data);
    historyLog(data, usage(UsageSummary));
    return UsageSummary;
}

export const fetchVas = async () => {
    const serviceID = localStorage.getItem('serviceID');
    const url = `BBVAS/GetDashboardVASBundles?subscriberID=${serviceID}`;
    return await fetchData(url);
}

export const fetchExtraGB = async () => {
    const serviceID = localStorage.getItem('serviceID');
    const url = `BBVAS/ExtraGB?subscriberID=${serviceID}`;
    return await fetchData(url);
}
