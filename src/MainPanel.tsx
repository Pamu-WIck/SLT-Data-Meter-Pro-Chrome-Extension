import MeterWidget from "./MeterWidget.tsx";
const ProgressBar = () => {

    return (
        <>
            <div className="flex flex-col justify-center gap-y-4">
                <div className="text-center font-bold text-lg text-white font-roboto ">
                    SLT Usage Meter Pro
                </div>
                <MeterWidget />
                <MeterWidget />
            </div>
        </>
    );
};

export default ProgressBar;
