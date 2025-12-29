const SkeletonMeterWidget = () => {
    return (
        <div className="flex-col rounded-md px-8 py-3 bg-secondary animate-pulse">
            <div className="flex flex-row place-content-between">
                <div className="h-5 w-16 bg-gray-700 rounded"></div>
                <div className="h-5 w-20 bg-gray-700 rounded"></div>
                <div className="h-5 w-16 bg-gray-700 rounded"></div>
            </div>
            <div className="mx-auto rounded py-1 text-center w-100">
                <div className="h-6 w-full rounded-full bg-gray-700"></div>
            </div>
            <div className="flex flex-row place-content-between mt-1">
                <div className="h-5 w-14 bg-gray-700 rounded"></div>
                <div className="h-5 w-14 bg-gray-700 rounded"></div>
                <div className="h-5 w-14 bg-gray-700 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonMeterWidget;
