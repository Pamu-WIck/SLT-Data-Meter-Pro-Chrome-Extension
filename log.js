export function addToLocalStorageArray(key, value) {
    console.log("addToLocalStorageArray function called");
    let existingArray = localStorage.getItem(key);

    if (!existingArray) {
        existingArray = [];
    } else {
        existingArray = JSON.parse(existingArray);
    }

    existingArray.push(value);
    localStorage.setItem(key, JSON.stringify(existingArray));
}

function createLineChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');

    // Extract and format timestamps to show only hour and minute
    const labels = data.map(item => {
        const timestamp = item.split(" ")[1]; // Extract time part
        const [hour, minute] = timestamp.split(":"); // Split into hour and minute
        return `${hour}:${minute}`;
    });

    const values = data.map(item => parseFloat(item.split(":")[2])); // Assuming the value is extracted from the same part as the timestamp
    console.log(values);

    // Create a gradient for the border color
    const gradient = ctx.createLinearGradient(0, 0, 300, 0); // Adjust the gradient dimensions as needed
    gradient.addColorStop(0, '#4936D2'); // Start color
    gradient.addColorStop(1, '#8F63EF'); // End color

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'GB Usage',
                data: values,
                backgroundColor: 'rgb(215,211,217)',
                borderColor: gradient,
                borderWidth: 2,
                pointRadius: 5, // Adjust the point radius as needed
                pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Adjust the point color as needed
                pointBorderWidth: 2, // Adjust the point border width as needed
                pointHoverRadius: 8, // Adjust the point hover radius as needed
                pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)', // Adjust the point hover color as needed
                pointHitRadius: 10, // Adjust the point hit radius as needed
                pointStyle: 'circle', // Use 'circle' for round points
                cubicInterpolationMode: 'monotone'
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (HH:mm)'
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
                    }
                }
            }
        }
    });
}

//get data from local storage
const data = JSON.parse(localStorage.getItem("UsageLog"));
createLineChart(data);
