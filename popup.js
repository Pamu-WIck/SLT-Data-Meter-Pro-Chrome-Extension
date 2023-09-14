import {calculateUsage} from './calculateUsage.js';
import {progressBar, vasBar} from './widget.js';
import {addToLocalStorageArray} from './log.js';

let sid;
let accTkn;

document.getElementById("btnLogout").addEventListener("click", logOut);
document.getElementById("btnLogin").addEventListener("click", login);
document.getElementById("btnLog").addEventListener("click", viewLog);

if (localStorage.getItem('serviceID') === null ||
    localStorage.getItem('accessToken') === null) {
    document.getElementById("meter").classList.add("d-none");

} else {
    document.getElementById("loginFrom").classList.add("d-none");
    sid = localStorage.getItem('serviceID');
    accTkn = localStorage.getItem('accessToken');
    getUsageSummary(accTkn, sid);
    getVasSummary(accTkn, sid);
}

async function login() {
    console.log("login function called")

    const uid = document.getElementById("uid").value;
    const pwd = document.getElementById("pwd").value;
    const channelID = 'WEB';

    console.log(uid, pwd, channelID)

    const form = new URLSearchParams();
    form.append('username', uid);
    form.append('password', pwd);
    form.append('channelID', channelID);

    try {
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

            if (!res.ok) {
                document.getElementById("loginError").classList.remove("d-none");
                throw new Error('Invalid credentials');
            }
            return res.json()
        }).then(data => {
            localStorage.setItem('accessToken', data.accessToken);
            document.getElementById("loginFrom").classList.add("d-none");
            document.getElementById("meter").classList.remove("d-none");
            return data.accessToken
        }).then(accessToken => {
            getAccountDetails(accessToken, uid)
        })
    } catch (error) {
        console.log("Error Message: ", error);

    }
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
    }).then(telephoneNo => {
        getServiceDetails()
    })

}

async function getServiceDetails() {
    console.log("getServiceDetails function called")

    let accessToken = localStorage.getItem('accessToken');
    let telephoneNo = localStorage.getItem('telephoneNo');

    try {
        const response = await fetch(`https://omniscapp.slt.lk/mobitelint/slt/api/AccountOMNI/GetServiceDetailRequest?telephoneNo=${telephoneNo}`, {
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
        });
        if (!response.ok) {
            throw new Error('token expired');
        }

        const data = await response.json();
        const serviceID = data.dataBundle.listofBBService[0].serviceID;
        localStorage.setItem('serviceID', serviceID);
        getUsageSummary(accessToken, serviceID);
        getVasSummary(accessToken, serviceID);
    } catch (error) {
        console.log(error);

    }
}

async function getUsageSummary(accessToken, serviceID) {

    console.log("getUsageSummary function called")

    try {
        const response = await fetch(`https://omniscapp.slt.lk/mobitelint/slt/api/BBVAS/UsageSummary?subscriberID=${serviceID}`, {
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
        });

        if (!response.ok) {
            logOut();
            throw new Error('token expired');
        }

        const data = await response.json();
        const usageSummary = JSON.stringify(data);
        const usage = calculateUsage(usageSummary);
        console.log(usage);

        document.getElementById("packageName").innerHTML = usage.packageName;
        document.getElementById("packageName").classList.remove("blink");
        progressBar("Total", "Total", usage.total);
        progressBar("Standard", "Standard", usage.peak);
        progressBar("Night", "Off-Peak", usage.offPeak);

        let reportedTime = new Date(data.dataBundle.reported_time);
        reportedTime = `${reportedTime.getFullYear()}-${reportedTime.getMonth() + 1}-${reportedTime.getDate()} ${reportedTime.getHours()}:${reportedTime.getMinutes()}`;
        console.log(reportedTime);
        addToLocalStorageArray('UsageLog', `${reportedTime}:${usage.total.used}`);

    } catch (error) {
        console.log(error);
    }
}

async function getVasSummary(accessToken, serviceID) {
    console.log("getVasSummary function called")

    try {
        fetch(`https://omniscapp.slt.lk/mobitelint/slt/api/BBVAS/GetDashboardVASBundles?subscriberID=${serviceID}`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "authorization": `bearer ${accessToken}`,
                "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-ibm-client-id": "41aed706-8fdf-4b1e-883e-91e44d7f379b"
            },
            "referrer": "https://myslt.slt.lk/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                calculateVas(data);
            })
    } catch (error) {
        console.log(error);
    }
}

function calculateVas(vasSummaryJson) {

    let usageDetails = vasSummaryJson.dataBundle.usageDetails

    usageDetails.forEach(element => {
        let dataType = element.name;
        let summary = {
            used: element.used,
            remain: element.remaining,
            percentage: 100 - element.percentage,
        }

        vasBar('bars', dataType, summary)

    })
}

async function viewLog() {
    console.log("viewLog function called");

    const svg = document.getElementById('btnLog').querySelector('svg');
    const bar = document.getElementById("bars");
    const log = document.getElementById("logContainer");

    if (!bar.classList.contains("d-none")) {
        bar.classList.add("d-none");
        log.classList.remove("d-none");
        const homeSVG = "M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Z";
        svg.querySelector('path').setAttribute('d', homeSVG);

    } else {
        bar.classList.remove("d-none");
        log.classList.add("d-none");
        const logSVG = "M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z";
        svg.querySelector('path').setAttribute('d', logSVG);
    }
}

async function logOut() {
    console.log("logOut function called");
    localStorage.clear();
    document.getElementById("meter").classList.add("d-none");
    document.getElementById("loginFrom").classList.remove("d-none");
}

//todo popups on data usage
//todo change gradient when data is low

