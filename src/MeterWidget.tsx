const ProgressBar = () => {
    const percentage = "80%";
    return (
        <>
            <div className="flex flex-col justify-center">
                <div className="text-center font-bold text-white font-roboto">
                    SLT Usage Meter Pro
                </div>
                <div className="mx-auto w-80 rounded text-center bg-secondary">
                    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            className="rounded-full bg-gradient-to-r from-indigo-500 text-center text-xs font-medium leading-none text-blue-100 p-0.5"
                            style={{width: percentage}}> {percentage}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProgressBar;
