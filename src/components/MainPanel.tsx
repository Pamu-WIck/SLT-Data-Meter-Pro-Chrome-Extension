import MeterWidget from "./MeterWidget.tsx";
import Header from "./Header.tsx";
import React, { useEffect, useState, Suspense } from "react";
import {fetchUsageSummary, fetchVas} from "../data/fetch.ts";
import {Spinner} from "flowbite-react";
import {FaChartLine} from "react-icons/fa6";
import {CgNotes} from "react-icons/cg";

const UsageChart = React.lazy(() => import("./UsageChart.tsx"));

const MainPanel = () => {
    const [usageData, setUsageData] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);
    const [showMeterWidget, setShowMeterWidget] = useState(true);
    const [showUsageChart, setShowUsageChart] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(<CgNotes className="h-6 w-6  text-white" aria-hidden="true"/>);

    const toggleMeterWidget = () => {
        setCurrentIcon(currentIcon.type === CgNotes
            ? <FaChartLine className="h-6 w-6  text-white" aria-hidden="true"/>
            : <CgNotes className="h-6 w-6  text-white" aria-hidden="true"/>);
        setShowMeterWidget((prev) => !prev);
        setShowUsageChart((prev) => !prev);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsageSummary();
                setUsageData(data.usageDetails);
            } catch (error) {
                console.error("Error fetching usage summary:", error);
            }

            try {
                const vasData = await fetchVas();
                setUsageData(prevState => [...prevState, ...vasData.dataBundle.usageDetails]);
            } catch (error) {
                console.error("Error fetching vas data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center gap-y-4">
                <Header onToggleButtonClick={toggleMeterWidget} currentIcon={currentIcon}/>

                {isLoading && (
                    <div className="text-center">
                        <Spinner color="success" aria-label="Purple Center-alined Extra large spinner example" size="xl"/>
                    </div>
                )}

                {showMeterWidget && usageData.map((usageItem, index) => (
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
