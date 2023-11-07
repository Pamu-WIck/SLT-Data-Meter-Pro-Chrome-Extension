const MeterWidget = ({percentage}: { percentage: string }) => {
    // const percentage = "80%";
    return (
        <div className="flex-col rounded-md px-8 py-3 text-white bg-secondary felx hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
            <div className="flex flex-row place-content-between">
                <p className="font-medium">2.7 GB</p>
                <p className="font-semibold opacity-80 font-roboto">Standard Data</p>
                <p className="font-medium">37.3 GB</p>
            </div>
            <div className="mx-auto rounded py-1 text-center w-100 bg-secondary">
                <div className="h-6 w-full rounded-full bg-opacity-30 bg-primary_purple">
                    <div
                        className="flex h-6 items-center justify-center rounded-full bg-gradient-to-r text-xs font-medium leading-none text-blue-100 from-primary_purple to-primary_blue p-0.5 drop-shadow-[5px_2px_8px_rgba(5,2,30,0.5)] dropshadow-green-400"
                        style={{width: percentage}}> {percentage}</div>
                </div>
            </div>
            <div className="flex flex-row place-content-between">
                <div className="bg-opacity-50 average-usage bg-primary_purple">2.8 GB</div>
                <div className="bg-opacity-50 average-usage bg-primary_green">2.8 GB</div>
                <div className="bg-opacity-50 average-usage bg-primary_purple">2.8 GB</div>
            </div>
        </div>
    )
}

export default MeterWidget;