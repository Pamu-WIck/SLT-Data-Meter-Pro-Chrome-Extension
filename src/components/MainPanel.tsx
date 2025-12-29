import MeterWidget from "./MeterWidget.tsx";
import SkeletonMeterWidget from "./SkeletonMeterWidget.tsx";
import Header from "./Header.tsx";
import React, { useEffect, useState, Suspense } from "react";
import {fetchUsageSummary, fetchVas} from "../data/fetch.ts";

const UsageChart = React.lazy(() => import("./UsageChart.tsx"));

const MainPanel = () => {
    const [usageData, setUsageData] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);
    const [showMeterWidget, setShowMeterWidget] = useState(true);
    const [showUsageChart, setShowUsageChart] = useState(false);

    const toggleMeterWidget = () => {
        setShowMeterWidget((prev) => !prev);
        setShowUsageChart((prev) => !prev);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsageSummary();
                setUsageData(data.usageDetails);
                const vasData = await fetchVas();
                setUsageData(prevState => [...prevState, ...vasData.dataBundle.usageDetails]);
            } catch (error) {
                console.error("Error fetching usage summary:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center gap-y-4">
                <Header onToggleButtonClick={toggleMeterWidget}/>

                {isLoading && showMeterWidget && (
                    <>
                        <SkeletonMeterWidget />
                        <SkeletonMeterWidget />
                        <SkeletonMeterWidget />
                    </>
                )}

                {!isLoading && showMeterWidget && usageData.map((usageItem, index) => (
                    <MeterWidget key={index} json={usageItem} />
                ))}

                <Suspense fallback={<div>Loading...</div>}>
                    {showUsageChart && <UsageChart/>}
                </Suspense>

            </div>
        </>
    );
};

export default MainPanel;
