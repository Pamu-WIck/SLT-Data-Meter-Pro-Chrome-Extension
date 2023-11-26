import MeterWidget from "./MeterWidget.tsx";
import Header from "./Header.tsx";
import { useEffect, useState } from "react";
import { fetchUsageSummary } from "../data/fetch.ts";

const ProgressBar = () => {
    const [usageData, setUsageData] = useState([] as any[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsageSummary();
                setUsageData(data.usageDetails);
            } catch (error) {
                console.error("Error fetching usage summary:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center gap-y-4">
                <Header />
                {usageData.map((usageItem, index) => (
                    <MeterWidget key={index} json={usageItem} />
                ))}
            </div>
        </>
    );
};

export default ProgressBar;
