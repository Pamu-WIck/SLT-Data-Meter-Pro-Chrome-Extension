import axios from "axios";
import {usageSum} from "./usageSummary.ts";

const baseURL = 'https://omniscapp.slt.lk/mobitelint/slt/api/'
// const username = 'pamudithawm@gmail.com';
// const telephoneNo = '0372069638';
const subscriberID = '94372241550';
const token = 'ixcaA7v3PHtOY1EPQh20tlDKZeOsWZ6TLO_1wAOZRonxEJtywy3NOjZ9Q8z7YS8gFSAtkmv7VyfuzlRzb1zJ6cLvg0ujbYhcFNf_-AUzxBjm2ogWILVvwvjHHbbNI7qsrrFNy11rtDJnC57E_Ax_L6PETo_7nXD0isAq7m6kQLFneZyaAVRfPdkd-vgYKDcCMi2OMz48NvXGLE448kFlbZ9uWuKXSbD64H5CuQIiNeBe1lOycsxiOP_5QYZcc91OaTmtS83dh780gzridJGzv8GMeGIJtwjR6bSo-YqP0EYGDis-';

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

export const fetchUsageSummary = async () => {
    const url = `BBVAS/UsageSummary?subscriberID=${subscriberID}`;
    const data = await fetchData(url);
    // return usagesum(data);
    console.timeLog();
    return usageSum(data);
}

export const fetchVas = async () => {
    const url = `BBVAS/GetDashboardVASBundles?subscriberID=${subscriberID}`;
    const data = await fetchData(url);
    console.timeLog();
    console.log(data);
    return data;
}

