let checkInterval = setInterval(function () {
    const peakElement = document.querySelector('li.slide.selected .used-of');
    const fullElement = document.querySelector('li.slide:not(.selected) .used-of');
    const validTillElement = document.querySelector('li.slide.selected .text-center.blue');

    //validTillElement <p className="text-center blue">(Valid Till : 31-Jul)</p>

    if (!peakElement || !fullElement || !validTillElement) {
        console.log('One or more elements could not be found, retrying...');
    } else {
        clearInterval(checkInterval);  // Stop checking when the elements are found

        let peakText = peakElement.textContent;
        let [peakUsed, peakTotal] = peakText.split(" USED OF ").map(parseFloat);

        let fullText = fullElement.textContent;
        let [fullUsed, fullTotal] = fullText.split(" USED OF ").map(parseFloat);

        let validTillText = validTillElement.textContent;
        let validTill = validTillText.split(" : ")[1].split(")")[0];


        console.log(peakUsed, peakTotal, fullUsed, fullTotal, validTill);

        let usage = usageCal(peakUsed, peakTotal, fullUsed, fullTotal, validTill);
        console.log(
            usage
        );
    }
}, 1000);  // Check every 1000 milliseconds = 1 second

function usageCal(peakUsed, peakTotal, fullUsed, fullTotal, validTill) {
    const peakRemain = peakTotal - peakUsed;

    const offPeakTotal = fullTotal - peakTotal;
    const offPeakUsed = (fullUsed - peakUsed).toFixed(1);
    const offPeakRemain = offPeakTotal - offPeakUsed;

    const calculateRemainPercent = (remain, total) => Math.round((remain / total) * 100);
    const calculateDailyQuota = (total) => total / 30;

    const DaysCount = (validTill) => {
        let [day, month] = validTill.split('-');
        let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'];
        let monthNumber = monthNames.indexOf(month) + 1;
        let currentYear = new Date().getFullYear();
        let validTillDate = new Date(`${currentYear}-${monthNumber}-${day}`);
        validTillDate.setHours(0, 0, 0, 0);  // set time to the start of the day

        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);  // set time to the start of the day

        let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // set date to the start of the current month

        let differenceInTime = validTillDate.getTime() - currentDate.getTime();
        let differenceInDays = differenceInTime / (1000 * 3600 * 24); // remaining days

        let pastTime = currentDate.getTime() - startDate.getTime();
        let pastDays = pastTime / (1000 * 3600 * 24)+1; // passed days

        return {
            remainingDays: Math.ceil(differenceInDays),
            passedDays: Math.ceil(pastDays)
        };
    }

    let remainingDays = DaysCount(validTill).remainingDays;
    let passedDays = DaysCount(validTill).passedDays;

    let DailyQuota = (data, days) => {
        return (data / days).toFixed(1);
    }


    return {
        peak: {
            used: peakUsed,
            total: peakTotal,
            remain: peakRemain,
            remainPercent: calculateRemainPercent(peakRemain, peakTotal),
            dailyQuota: calculateDailyQuota(peakTotal),
            currentDailyQuota: DailyQuota(peakUsed, passedDays),
            remainDailyQuota: DailyQuota(peakRemain, remainingDays)
        },
        offPeak: {

            used: offPeakUsed,
            total: offPeakTotal,
            remain: offPeakRemain,
            remainPercent: calculateRemainPercent(offPeakRemain, offPeakTotal),
            dailyQuota: calculateDailyQuota(offPeakTotal),
            currentDailyQuota: DailyQuota(offPeakUsed, passedDays),
            remainDailyQuota:  DailyQuota(offPeakRemain, remainingDays)
        },
        total: {
            used: fullUsed,
            total: fullTotal,
            remain: fullTotal - fullUsed,
            remainPercent: calculateRemainPercent(fullTotal - fullUsed, fullTotal),
            dailyQuota: calculateDailyQuota(fullTotal),
            currentDailyQuota: DailyQuota(fullUsed, passedDays),
            remainDailyQuota: DailyQuota(fullTotal - fullUsed, remainingDays)
        },

        validTill: validTill,
        remainDays: DaysCount(validTill)
    };
}