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
    const offPeakRemain = fullTotal - fullUsed;

    const calculateRemainPercent = (remain, total) => Math.round((remain / total) * 100);
    const calculateDailyQuota = (total) => total / 30;

    return {
        peak: {
            used: peakUsed,
            total: peakTotal,
            remain: peakRemain,
            remainPercent: calculateRemainPercent(peakRemain, peakTotal),
            dailyQuota: calculateDailyQuota(peakTotal),
            // currentDailyQuota: (peakUsed / date.passedDays).toFixed(1),
            // remainDailyQuota: (peakRemain / date.remainingDays).toFixed(1)
        },
        offPeak: {
            used: fullUsed,
            total: fullTotal,
            remain: offPeakRemain,
            remainPercent: calculateRemainPercent(offPeakRemain, fullTotal),
            dailyQuota: calculateDailyQuota(fullTotal),
            // currentDailyQuota: (fullUsed / date.passedDays).toFixed(1),
            // remainDailyQuota: (offPeakRemain / date.remainingDays).toFixed(1)
        },
        validTill: validTill
    };
}