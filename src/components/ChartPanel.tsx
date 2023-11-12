import UsageChart from "./UsageChart.tsx";

const ChartPanel = () => {
    return (
        <>

            <div className="rounded-md pt-3 bg-secondary">
                <p className="text-center text-white">
                    <span className="font-medium font-roboto">Usage</span>
                    <span className="font-semibold font-roboto"> (last 7 days)</span>
                </p>
                <div className="relative top-0 right-5 flex justify-end">
                    <button
                        className="btn-chart">Day
                    </button>
                    <button className="btn-chart-active">Month
                    </button>
                </div>
                <UsageChart/>
            </div>
        </>
    );
};

export default ChartPanel;
