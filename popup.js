import {calculateUsage} from './calculateUsage.js';
import {progressBar, vasBar} from './widget.js';

let sid;
let accTkn;

document.getElementById("btnLogout").addEventListener("click", logOut);
document.getElementById("btnLogin").addEventListener("click", login);

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

        vasBar('widgetBG', dataType, summary)

    })
}

async function logOut(){
    console.log("logOut function called");
    localStorage.clear();
    document.getElementById("meter").classList.add("d-none");
    document.getElementById("loginFrom").classList.remove("d-none");
}

//todo popups on data usage

