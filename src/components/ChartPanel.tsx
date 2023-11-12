import UsageChart from "./UsageChart.tsx";

const ChartPanel = () => {
    return (
        <>

            <div className="bg-secondary rounded-md pt-3">
                <p className="text-white text-center">
                    <span className="font-medium font-roboto">Usage</span>
                    <span className="font-semibold opacity-80 font-roboto"> (last 7 days)</span>
                </p>
                <UsageChart/>
            </div>
        </>
    );
};

export default ChartPanel;
