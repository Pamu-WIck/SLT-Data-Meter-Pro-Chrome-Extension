import MeterWidget from "./MeterWidget.tsx";
import Header from "./Header.tsx";
import { useEffect, useState } from "react";
import {fetchUsageSummary, fetchVas} from "../data/fetch.ts";
import {Spinner} from "flowbite-react";

const ProgressBar = () => {
    const [usageData, setUsageData] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

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
                <Header />

                {isLoading && (
                    <div className="text-center">
                        <Spinner color="success" aria-label="Purple Center-alined Extra large spinner example" size="xl"/>
                    </div>
                )}

                {usageData.map((usageItem, index) => (
                    <MeterWidget key={index} json={usageItem} />
                ))}

            </div>
        </>
    );
};

export default ProgressBar;
