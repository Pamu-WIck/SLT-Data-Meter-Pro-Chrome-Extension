import axios from "axios";
import {usageSum} from "./usageSummary.ts";

const baseURL = 'https://omniscapp.slt.lk/mobitelint/slt/api/'

//check if token is available in local storage
const token = localStorage.getItem('token');



console.time();


const fetchData = async (url:string) => {

    const headers = {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7',
        authorization: `bearer ${token}`,
        'x-ibm-client-id': '41aed706-8fdf-4b1e-883e-91e44d7f379b'
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
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-ibm-client-id': '41aed706-8fdf-4b1e-883e-91e44d7f379b',
    };

    axios.defaults.baseURL = baseURL; // Make sure baseURL is defined before using it

    try {
        const response = await axios.post(url, new URLSearchParams(data).toString(), { headers });
        console.timeLog();
        if (response.status === 200){
            console.log(response.data.accessToken);
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
}

export const fetchUsageSummary = async () => {
    const serviceID = localStorage.getItem('serviceID')
    const url = `BBVAS/UsageSummary?subscriberID=${serviceID}`;
    const data = await fetchData(url);
    // return usagesum(data);
    console.timeLog();
    return usageSum(data);
}

export const fetchVas = async () => {
    const serviceID = localStorage.getItem('serviceID')
    const url = `BBVAS/GetDashboardVASBundles?subscriberID=${serviceID}`;
    const data = await fetchData(url);
    console.timeLog();
    console.log(data);
    return data;
}

