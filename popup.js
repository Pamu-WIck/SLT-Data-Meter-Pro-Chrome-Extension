import {calculateUsage} from './calculateUsage.js';


const uid = localStorage.getItem('uid')
const pwd = localStorage.getItem('pwd')
const channelID = 'WEB';

const form = new URLSearchParams();
form.append('username', uid);
form.append('password', pwd);
form.append('channelID', channelID);

let sid;
let accTkn;

if (localStorage.getItem('serviceID') === null ||
    localStorage.getItem('accessToken') === null) {
    login();
} else {
    sid = localStorage.getItem('serviceID');
    accTkn = localStorage.getItem('accessToken');
    getUsageSummery(sid, accTkn);
}

async function login() {
    console.log("login function called")

    fetch("https://omniscapp.slt.lk/mobitelint/slt/api/Account/Login", {
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-ibm-client-id": "41aed706-8fdf-4b1e-883e-91e44d7f379b",
            "Referer": "https://myslt.slt.lk/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: form,
        method: "POST"
    }).then(res => {
        return res.json()
    }).then(data => {
        localStorage.setItem('accessToken', data.accessToken);
        // localStorage.setItem('uid', uid);
        return data.accessToken
    }).then(accessToken => {
        getAccountDetails(accessToken, uid)
    })
}

async function getAccountDetails(accessToken, uid) {
    console.log("getAccountDetails function called")

    fetch(`https://omniscapp.slt.lk/mobitelint/slt/api/AccountOMNI/GetAccountDetailRequest?username=${uid}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `bearer ${accessToken}`,
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-ibm-client-id": "41aed706-8fdf-4b1e-883e-91e44d7f379b",
            "Referer": "https://myslt.slt.lk/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }).then(res => res.json()
    ).then(data => {
        localStorage.setItem('telephoneNo', data.dataBundle[0].telephoneno);
        return data.dataBundle[0].telephoneno;
    }).then(telephoneNo => {
        getServiceDetails(accessToken, telephoneNo)
    })

}

async function getServiceDetails(accessToken, telephoneNo) {
    console.log("getServiceDetails function called")

    fetch(`https://omniscapp.slt.lk/mobitelint/slt/api/AccountOMNI/GetServiceDetailRequest?telephoneNo=${telephoneNo}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `bearer ${accessToken}`,
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-ibm-client-id": "41aed706-8fdf-4b1e-883e-91e44d7f379b",
            "Referer": "https://myslt.slt.lk/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    })
        .then(res => res.json()
        ).then(data => {
        localStorage.setItem('serviceID', data.dataBundle.listofBBService[0].serviceID);
    }).then(() => {
            sid = localStorage.getItem('serviceID');
            accTkn = localStorage.getItem('accessToken');
            getUsageSummery(sid, accTkn);
        }
    )
    ;
}

async function getUsageSummery(serviceID, accessToken) {

    console.log("getUsageSummery function called")
    fetch(`https://omniscapp.slt.lk/mobitelint/slt/api/BBVAS/UsageSummary?subscriberID=${serviceID}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `bearer ${accessToken}`,
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-ibm-client-id": "41aed706-8fdf-4b1e-883e-91e44d7f379b",
            "Referer": "https://myslt.slt.lk/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }).then(
        res => res.json()
    ).then(data => {
            data = JSON.stringify(data);
            console.log(calculateUsage(data));
        }
    )
}

