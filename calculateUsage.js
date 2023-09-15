export function calculateUsage(usageSummery) {

    // console.log("calculateUsage function called")
    let usageSummeryJson = JSON.parse(usageSummery);

    const packageName = usageSummeryJson.dataBundle.my_package_info.package_name;

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

    const daysCount = (validTill) => {

        // console.log("daysCount function called")

        const [day, month] = validTill.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'];
        const monthNumber = monthNames.indexOf(month) + 1;
        const currentYear = new Date().getFullYear();
        const validTillDate = new Date(`${currentYear}-${monthNumber}-${day}`);
        validTillDate.setHours(0, 0, 0, 0);  // set time to the start of the day

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);  // set time to the start of the day

        const startDate = new Date(validTillDate); // set date to the start of the current month
        startDate.setMonth(startDate.getMonth() - 1);

        const differenceInTime = validTillDate.getTime() - currentDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // remaining days

        const pastTime = currentDate.getTime() - startDate.getTime();
        const pastDays = pastTime / (1000 * 3600 * 24);

        return {
            passedDays: Math.ceil(pastDays),
            remainingDays: Math.ceil(differenceInDays)
        };
    }

    const dc = daysCount(validTill);
    const remainingDays = dc.remainingDays;
    const passedDays = dc.passedDays;

    const dailyQuota = (data, days) => {
        return (data / days).toFixed(1);
    }

    return {
        packageName: packageName,
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

