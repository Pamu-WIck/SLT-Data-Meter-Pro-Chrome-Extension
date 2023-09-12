
function addToLocalStorageArray(key, value) {
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

    const labels = data.map(item => Object.keys(item)[0]);
    const values = data.map(item => parseFloat(Object.values(item)[0]));

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
                    }
                }
            }
        }
    });
}

// Example usage
const data = [
    {'1:30': 20},
    {'1:40': 21.3},
    {'2:30': 20.7},
    {'2:40': 22.1},
    {'3:30': 21.5},
];

createLineChart(data);
