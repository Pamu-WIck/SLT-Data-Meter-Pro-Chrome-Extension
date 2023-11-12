import ApexCharts from "react-apexcharts";
import {ApexOptions} from "apexcharts";

const UsageChart = () => {
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
                name: "New users",
                data: [6500, 6418, 6456, 6526, 6356, 6456],
                color: "#4936D2",
            },
            {
                name: "Returning users",
                data: [4500, 4518, 7500, 4526, 4556, 4456],
                color: "#4FB94A",
            },
            {
                name: "Total users",
                data: [3000, 4658,5327, 7495, 4526, 4556],
                color: "#1DB5E9",
            }
        ],
        xaxis: {
            categories: [
                "1:30",
                "2:30",
                "3:30",
                "4:30",
                "5:30",
                "6:30",
            ],
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
