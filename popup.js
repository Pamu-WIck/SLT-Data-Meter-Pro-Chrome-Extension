import {daysCount} from './utils/daysCount.js';

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
            .then(data => {
                localStorage.setItem('serviceID', data.dataBundle.listofBBService[0].serviceID);
            })
        )
    ;
}

async function getUsageSummery(serviceID,accessToken) {

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
    )}

function calculateUsage(usageSummery) {

    console.log("calculateUsage function called")
    let usageSummeryJson = JSON.parse(usageSummery);

    const peak = usageSummeryJson.dataBundle.my_package_info.usageDetails[0];
    const standard = usageSummeryJson.dataBundle.my_package_info.usageDetails[1];

    const peakRemain = peak.remaining;
    const peakUsed = peak.used;
    const peakLimit = peak.limit;
    const peakPercentage = peak.percentage;

    const fullRemain = standard.remaining;
    const fullUsed = standard.used;
    const fullLimit = standard.limit;
    const fullPercentage = standard.percentage;

    const offPeakTotal = fullLimit - peakLimit;
    const offPeakUsed = (fullUsed - peakUsed).toFixed(1);
    const offPeakRemain = (offPeakTotal - offPeakUsed).toFixed(1);
    const offPeakPercentage = Math.round((offPeakUsed / offPeakTotal) * 100);

    const validTill = peak.expiry_date;

    // const calculateRemainPercent = (remain, total) => Math.round((remain / total) * 100);
    const calculateDailyQuota = (total) => (total / 30).toFixed(1);

    const dc = daysCount(validTill);
    const remainingDays = dc.remainingDays;
    const passedDays = dc.passedDays;

    const dailyQuota = (data, days) => {
        return (data / days).toFixed(1);
    }

    return {
        peak: {
            used: peakUsed,
            total: peakLimit,
            remain: peakRemain,
            percentage: 100 - peakPercentage,
            dailyQuota: calculateDailyQuota(peakLimit),
            currentDailyQuota: dailyQuota(peakUsed, passedDays),
            remainDailyQuota: dailyQuota(peakRemain, remainingDays)
        },
        offPeak: {
            used: offPeakUsed,
            total: offPeakTotal,
            remain: offPeakRemain,
            percentage: offPeakPercentage,
            dailyQuota: calculateDailyQuota(offPeakTotal),
            currentDailyQuota: dailyQuota(offPeakUsed, passedDays),
            remainDailyQuota: dailyQuota(offPeakRemain, remainingDays)
        },
        total: {
            used: fullUsed,
            total: fullLimit,
            remain: fullRemain,
            percentage: 100 - fullPercentage,
            dailyQuota: calculateDailyQuota(fullLimit),
            currentDailyQuota: dailyQuota(fullUsed, passedDays),
            remainDailyQuota: dailyQuota(fullLimit - fullUsed, remainingDays)
        },
        validTill: validTill,
        passedDays: passedDays,
        remainDays: remainingDays,

    };

}