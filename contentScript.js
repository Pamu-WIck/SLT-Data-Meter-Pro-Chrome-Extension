let checkInterval = setInterval(function () {
    const peakElement = document.querySelector('li.slide.selected .used-of');
    const fullElement = document.querySelector('li.slide:not(.selected) .used-of');
    const validTillElement = document.querySelector('li.slide.selected .text-center.blue');

    if (!peakElement || !fullElement || !validTillElement) {
        console.log('One or more elements could not be found, retrying...');
    } else {
        clearInterval(checkInterval);  // Stop checking when the elements are found

        const [peakUsed, peakTotal] = peakElement.textContent.split(" USED OF ").map(parseFloat);
        const [fullUsed, fullTotal] = fullElement.textContent.split(" USED OF ").map(parseFloat);
        const validTill = validTillElement.textContent.split(" : ")[1].split(")")[0];

        const usage = calculateUsage(peakUsed, peakTotal, fullUsed, fullTotal, validTill);

        // peakWidget
        peakQuota(usage.peak.dailyQuota, usage.peak.currentDailyQuota, usage.peak.remainDailyQuota);

        // offPeakWidget
        offPeakWidget(
            usage.offPeak.used,
            usage.offPeak.total,
            usage.offPeak.remain,
            usage.offPeak.dailyQuota,
            usage.offPeak.currentDailyQuota,
            usage.offPeak.remainDailyQuota,
            usage.validTill
        );
    }
}, 1000);  // Check every 1000 milliseconds = 1 second

// Stop checking after 20 seconds in case of Element not found
setTimeout(function() {
    clearInterval(checkInterval);
    console.log('Timeout: Interval stopped after 20 seconds');
}, 20000);

// Calculation for peak and off-peak
function calculateUsage(peakUsed, peakTotal, fullUsed, fullTotal, validTill) {
    const peakRemain = peakTotal - peakUsed;
    const offPeakTotal = fullTotal - peakTotal;
    const offPeakUsed = (fullUsed - peakUsed).toFixed(1);
    const offPeakRemain = offPeakTotal - offPeakUsed;

    const calculateRemainPercent = (remain, total) => Math.round((remain / total) * 100);
    const calculateDailyQuota = (total) => (total / 30).toFixed(1);

    const daysCount = (validTill) => {
        const [day, month] = validTill.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'];
        const monthNumber = monthNames.indexOf(month) + 1;
        const currentYear = new Date().getFullYear();
        const validTillDate = new Date(`${currentYear}-${monthNumber}-${day}`);
        validTillDate.setHours(0, 0, 0, 0);  // set time to the start of the day

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);  // set time to the start of the day

        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // set date to the start of the current month

        const differenceInTime = validTillDate.getTime() - currentDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // remaining days

        const pastTime = currentDate.getTime() - startDate.getTime();
        const pastDays = pastTime / (1000 * 3600 * 24) + 1; // passed days

        return {
            remainingDays: Math.ceil(differenceInDays),
            passedDays: Math.ceil(pastDays)
        };
    }

    const remainingDays = daysCount(validTill).remainingDays;
    const passedDays = daysCount(validTill).passedDays;

    const dailyQuota = (data, days) => {
        return (data / days).toFixed(1);
    }

    return {
        peak: {
            used: peakUsed,
            total: peakTotal,
            remain: peakRemain,
            remainPercent: calculateRemainPercent(peakRemain, peakTotal),
            dailyQuota: calculateDailyQuota(peakTotal),
            currentDailyQuota: dailyQuota(peakUsed, passedDays),
            remainDailyQuota: dailyQuota(peakRemain, remainingDays)
        },
        offPeak: {
            used: offPeakUsed,
            total: offPeakTotal,
            remain: offPeakRemain,
            remainPercent: calculateRemainPercent(offPeakRemain, offPeakTotal),
            dailyQuota: calculateDailyQuota(offPeakTotal),
            currentDailyQuota: dailyQuota(offPeakUsed, passedDays),
            remainDailyQuota: dailyQuota(offPeakRemain, remainingDays)
        },
        total: {
            used: fullUsed,
            total: fullTotal,
            remain: fullTotal - fullUsed,
            remainPercent: calculateRemainPercent(fullTotal - fullUsed, fullTotal),
            dailyQuota: calculateDailyQuota(fullTotal),
            currentDailyQuota: dailyQuota(fullUsed, passedDays),
            remainDailyQuota: dailyQuota(fullTotal - fullUsed, remainingDays)
        },
        validTill: validTill,
        remainDays: daysCount(validTill)
    };
}

// Widget for offPeak
function offPeakWidget(offPeakUsed, offPeakTotal, offPeakRemain, dailyQuota, currentDailyQuota, remainDailyQuota, validTill) {
    const graphBody = document.querySelector('.graphBody');

    // Calculate the ratio of remaining data to total data
    const ratio = offPeakUsed / offPeakTotal;
    const strokeDashOffset =  ratio * 628.3185307179587;

    const htmlString = `
        <li class="nightBar">
            <div class="m-auto" style="width: 100%;">
                <div class="text-center">
                    <div class="name">Night</div>
                    <div class="progress-bar-container">
                        <div class="RCP" style="position: relative; width: 240px;">
                            <svg width="240" height="240" viewBox="0 0 240 240" style="transform: rotate(-90deg);">
                                <circle cx="120" cy="120" r="100" fill="none" stroke="#3077b4" stroke-width="16"
                                    stroke-dasharray="628.3185307179587, 628.3185307179587" stroke-linecap="round"
                                    class="RCP__track" style="transition: all 0.3s ease 0s;"></circle>
                                <circle cx="120" cy="120" r="100" fill="none" stroke="#3ccd6a" stroke-width="19" stroke-dasharray="628.3185307179587, 628.3185307179587"
                                    stroke-dashoffset="${strokeDashOffset}" stroke-linecap="round" class="RCP__progress"
                                    style="transition: all 0.3s ease 0s;"></circle>
                            </svg>
                            <div class="indicator">
                                <p class="progress-count">${offPeakRemain} GB</p>
                                <p class="label">REMAINING</p>
                            </div>
                        </div>
                    </div>
                    <div class="used-of">${offPeakUsed} GB USED OF ${offPeakTotal} GB</div>
                    <p class="text-center blue">(Valid Till: ${validTill})</p>
                </div>
            </div>

            <div class="offPeakQ" id="offPeakQ">
                <h6>Night</h6>
                <p>
                    Average daily quota: <strong>${dailyQuota} GB</strong><br>
                    Current average usage: <strong>${currentDailyQuota} GB</strong><br>
                    Usage for remaining days: <strong>${remainDailyQuota} GB</strong>
                </p>
            </div>
        </li>`;

    graphBody.insertAdjacentHTML('beforeend', htmlString);
}

function peakQuota(dailyQuota, currentDailyQuota, remainDailyQuota) {
    const slide = document.querySelector('li.slide.selected');

    const htmlString = `
        <div class="offPeakQ" id="offPeakQ">
            <h6>Standard</h6>
            <p>
                Average daily quota: <strong>${dailyQuota} GB</strong><br>
                Current average usage: <strong>${currentDailyQuota} GB</strong><br>
                Usage for remaining days: <strong>${remainDailyQuota} GB</strong>
            </p>
        </div>`;

    slide.insertAdjacentHTML('beforeend', htmlString);
}
