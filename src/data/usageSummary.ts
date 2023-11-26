
export function usageSum(json:any) {
    const {
        dataBundle: {
            my_package_info: {
                package_name,
                usageDetails: [
                    {
                        limit: peak_limit,
                        remaining: peak_remaining,
                        used: peak_used,
                        percentage: peak_percentage,
                        expiry_date,
                    },
                    {
                        limit: total_limit,
                        remaining: total_remaining,
                        used: total_used,
                        percentage: total_percentage,
                    },
                ],
            },
        },
    } = json;

    const offPeak_limit = total_limit - peak_limit;
    const offPeak_used : number = Number((total_used - peak_used).toFixed(1));
    const offPeak_remain : number = Number((offPeak_limit - offPeak_used).toFixed(1));
    const offPeak_percentage = Math.round((offPeak_remain / offPeak_limit) * 100);

    const { remainingDays, passedDays } = daysCount(expiry_date);

    // return as an object
    return {
        packageName: package_name,
        usageDetails: [
            {
                name: "Standard",
                limit: peak_limit,
                used: peak_used,
                remaining: peak_remaining,
                percentage: peak_percentage,
                dailyQuota: dailyQuota(peak_limit),
                currentDailyQuota: currentQuota(peak_used, passedDays),
                remainDailyQuota: currentQuota(peak_remaining, remainingDays),
            },

            {
                name: "Free",
                limit: offPeak_limit,
                used: offPeak_used,
                remaining: offPeak_remain,
                percentage: offPeak_percentage,
                dailyQuota: dailyQuota(offPeak_limit),
                currentDailyQuota: currentQuota(offPeak_used, passedDays),
                remainDailyQuota: currentQuota(offPeak_remain, remainingDays),
            },

            {
                name: "Total",
                limit: total_limit,
                used: total_used,
                remaining: total_remaining,
                percentage: total_percentage,
                dailyQuota: dailyQuota(total_limit),
                currentDailyQuota: currentQuota(total_used, passedDays),
                remainDailyQuota: currentQuota(total_remaining, remainingDays),
            },
        ],
    };
}

const dailyQuota = (total:number) => (total / 30).toFixed(1);

const currentQuota = (data:number, days:number) => {
    return (data / days).toFixed(1);
};

const daysCount = (validTill:string) => {
    // console.log("daysCount function called")

    const [day, month] = validTill.split("-");
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const monthNumber = monthNames.indexOf(month) + 1;
    const currentYear = new Date().getFullYear();
    const validTillDate = new Date(`${currentYear}-${monthNumber}-${day}`);
    validTillDate.setHours(0, 0, 0, 0); // set time to the start of the day

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // set time to the start of the day

    const startDate = new Date(validTillDate); // set date to the start of the current month
    startDate.setMonth(startDate.getMonth() - 1);

    const differenceInTime = validTillDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // remaining days

    const pastTime = currentDate.getTime() - startDate.getTime();
    const pastDays = pastTime / (1000 * 3600 * 24);

    return {
        passedDays: Math.ceil(pastDays),
        remainingDays: Math.ceil(differenceInDays),
    };
};