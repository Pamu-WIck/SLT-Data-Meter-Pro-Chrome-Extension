import MeterWidget from "./MeterWidget.tsx";
import Header from "./Header.tsx";
import { useEffect, useState } from "react";
import {fetchUsageSummary, fetchVas} from "../data/fetch.ts";
import {Spinner} from "flowbite-react";
import UsageChart from "./UsageChart.tsx";

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

                {isLoading && (
                    <div className="text-center">
                        <Spinner color="success" aria-label="Purple Center-alined Extra large spinner example" size="xl"/>
                    </div>
                )}

                {showMeterWidget && usageData.map((usageItem, index) => (
                    <MeterWidget key={index} json={usageItem} />
                ))}

                {showUsageChart && <UsageChart/>}

            </div>
        </>
    );
};

export default MainPanel;
