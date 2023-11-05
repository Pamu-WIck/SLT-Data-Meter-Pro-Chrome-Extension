const MeterWidget = () => {
    const percentage = "80%";
    return (
        <div className="flex-col bg-secondary px-8 py-3 text-white felx rounded-md ">
            <div className="flex flex-row place-content-between">
                <p>2.7 GB</p>
                <p className="font-roboto">Standard Data</p>
                <p>37.3 GB</p>
            </div>
            <div className="mx-auto rounded text-center w-100 bg-secondary py-1">
                <div className="w-full rounded-full bg-primary2 bg-opacity-30 h-6">
                    <div
                        className="rounded-full h-6 bg-gradient-to-r items-center flex justify-center text-xs font-medium leading-none text-blue-100 from-primary1 to-primary2 p-0.5"
                        style={{width: percentage}}> {percentage}</div>
                </div>
            </div>
            <div className="flex flex-row place-content-between">
                <div className="average-usage bg-primary1">2.8 GB</div>
                <div className="average-usage bg-primary_green">2.8 GB</div>
                <div className="average-usage bg-primary1">2.8 GB</div>
            </div>
        </div>
    )
}

export default MeterWidget;