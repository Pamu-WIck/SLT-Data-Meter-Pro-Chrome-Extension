import ApexCharts from "react-apexcharts";
import {ApexOptions} from "apexcharts";

const UsageChart = () => {

    interface ChartData {
        name: string;
        used: string; // You may need to adjust the type based on the actual data type
    }

    interface HistoryData {
        [time: string]: ChartData[];
    }

    const data: string = localStorage.getItem("history") as string;
    const parsedData: HistoryData = JSON.parse(data);

    const standardArray: number[] = [];
    const freeArray: number[] = [];
    const totalArray: number[] = [];
    const timeArray: string[] = [];

    Object.entries(parsedData).forEach(([time, values]) => {
        const standardItem = values.find((item) => item.name === "Standard");
        const freeItem = values.find((item) => item.name === "Free");
        const totalItem = values.find((item) => item.name === "Total");

        if (standardItem && standardItem.used !== undefined) {
            const standardValue = parseFloat(standardItem.used);
            standardArray.push(standardValue);
        }

        if (freeItem && freeItem.used !== undefined) {
            const freeValue = parseFloat(freeItem.used);
            freeArray.push(freeValue);
        }

        if (totalItem && totalItem.used !== undefined) {
            const totalValue = parseFloat(totalItem.used);
            totalArray.push(totalValue);
        }

        timeArray.push(time.slice(12, 17));
    });



    const options: ApexOptions = {
        chart: {
            height: "100%",
            type: "area", // Change the chart type to 'bar'
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            x: {
                show: false,
            },
            cssClass: "bg-secondary",
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "vertical",
                shadeIntensity: 0.2,
                opacityFrom: 0.7,
                opacityTo: 0.0,
                stops: [0, 100],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 4,
            curve: "smooth",
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 10,
                right: 2,
                top: 0,
            },
        },
        series: [
            {
                name: "Total",
                data: totalArray,
                color: "#4936D2",
            },
            {
                name: "Standard",
                data: standardArray,
                color: "#4FB94A",
            },
            {
                name: "Free",
                data: freeArray,
                color: "#1DB5E9",
            }
        ],
        xaxis: {
            categories: timeArray,
            labels: {
                show: true,
                style: {
                    colors: "rgba(255,255,255,0.5)",
                    fontSize: "0.75rem",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    cssClass: "apexcharts-xaxis-label",
                }

            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },

        },
        yaxis: {
            show: true,
        },
    };

    return <ApexCharts options={options} series={options.series} type="area"/>;
};

export default UsageChart;
