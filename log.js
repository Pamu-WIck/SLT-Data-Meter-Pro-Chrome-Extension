export function addToLocalStorageArray(key, value) {
    console.log("addToLocalStorageArray function called");
    let existingArray = localStorage.getItem(key);

    if (!existingArray) {
        existingArray = [];
        console.log("existingArray is empty, creating new array");
        existingArray.push(value);
        localStorage.setItem(key, JSON.stringify(existingArray));
    } else {
        console.log("existingArray is not empty, parsing existing array")
        existingArray = JSON.parse(existingArray);

        //get latest value
        const latestValue = existingArray[existingArray.length - 1];
        const latestValueDate = latestValue.split(" ")[0];
        console.log("latestValueDate: " + latestValueDate);

        //clear local storage if the latest value is from a different day
        const currentDate = value.split(" ")[0];
        if (latestValueDate !== currentDate) {
            console.log("latest value is from a different day, empty array in local stoarage");
            localStorage.removeItem(key);
            existingArray = [];
        }

        //stop adding repeated values
        if (latestValue === value) {
            console.log("latest value is the same as the new value, not adding to array");
            return;
        }
        existingArray.push(value);
        localStorage.setItem(key, JSON.stringify(existingArray));
    }


}

export function createLineChart(TotalLog, StandardLog, NightLog) {
    const ctx = document.getElementById('lineChart').getContext('2d');

    // Extract and format timestamps to show only hour and minute (assuming the timestamps are the same for all data sets)
    const labels = TotalLog.map(item => {
        const timestamp = item.split(" ")[1]; // Extract time part
        const [hour, minute] = timestamp.split(":"); // Split into hour and minute
        return `${hour}:${minute}`;
    });

    const totalValues = TotalLog.map(item => parseFloat(item.split(":")[2])); // Extract values for TotalLog
    const standardValues = StandardLog.map(item => parseFloat(item.split(":")[2])); // Extract values for StandardLog
    const nightValues = NightLog.map(item => parseFloat(item.split(":")[2])); // Extract values for NightLog

    // Create gradients for the border colors
    const totalGradient = ctx.createLinearGradient(0, 0, 300, 0);
    totalGradient.addColorStop(0, '#4936D2');
    totalGradient.addColorStop(1, '#8F63EF');

    const standardGradient = ctx.createLinearGradient(0, 0, 300, 0);
    standardGradient.addColorStop(0, '#3eb2bc');
    standardGradient.addColorStop(1, '#1b96f1');

    const nightGradient = ctx.createLinearGradient(0, 0, 300, 0);
    nightGradient.addColorStop(0, '#8e2ef7');
    nightGradient.addColorStop(1, '#fb8332');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Usage',
                data: totalValues,
                backgroundColor: 'rgb(215,211,217)',
                borderColor: totalGradient,
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(255,255,255)',
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgb(232,239,239)',
                pointHitRadius: 10,
                pointStyle: 'circle',
                cubicInterpolationMode: 'monotone',
                hidden: true
            }, {
                label: 'Standard Usage',
                data: standardValues,
                backgroundColor: 'rgb(215,211,217)',
                borderColor: standardGradient,
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(255,255,255)',
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgb(253,253,253)',
                pointHitRadius: 10,
                pointStyle: 'circle',
                cubicInterpolationMode: 'monotone'
            }, {
                label: 'Night Usage',
                data: nightValues,
                backgroundColor: 'rgb(215,211,217)',
                borderColor: nightGradient,
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(255,255,255)',
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgb(255,255,255)',
                pointHitRadius: 10,
                pointStyle: 'circle',
                cubicInterpolationMode: 'monotone',
                hidden: true
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    grid: {
                        color: 'rgba(217,211,211,0.06)',
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Usage (GB)'
                    },
                    grid: {
                        color: 'rgba(217,211,211,0.06)',
                    },
                    // Specify the axis format to display decimal values
                    ticks: {
                        callback: function (value, index, values) {
                            return value.toFixed(1); // Display one decimal place
                        }
                    }
                }
            }
        }
    });
}

