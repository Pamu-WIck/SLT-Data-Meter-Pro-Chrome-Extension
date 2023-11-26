import axios from "axios";
import {usageSum} from "./usageSummary.ts";

const baseURL = 'https://omniscapp.slt.lk/mobitelint/slt/api/'
// const username = 'pamudithawm@gmail.com';
// const telephoneNo = '0372069638';
const subscriberID = '94372069638';
const token = 'tln9eBfhUeuGebY2wJ-rWZTCWcv8NEDdZpv0ICbUckMaTxuSS1L698t7QKemmzrGSTXfxX_Q2qhQlV-xeEH8lr_GJxI74M3dN1qeYQyI7a65QHnCnK-P1yEwHl5xNuVYo6J2OPP6cn9GV0LZIbd5YKJ6JwlmX_Co3P3jsdpgfcwc1hOaoflAVWFYdGi8VER9UFdMZxUs33sW8zAhbCLjMMNMo4BlKCl5R8wiyglBYNSixTO0MGGh_cDmDJfPKFMTNGXKqej0dTqK2QlgjjAEKiIg7Kqrzl7GxFLpop6BywT7c8QWIODrb8u4wDPk6Ygz1sGnMQ';

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

