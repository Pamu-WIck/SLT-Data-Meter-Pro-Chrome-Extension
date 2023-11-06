
const MeterWidget = ({percentage}: {percentage: string}) => {
    // const percentage = "80%";
    return (
        <div className="flex-col rounded-md px-8 py-3 text-white bg-secondary felx">
            <div className="flex flex-row place-content-between">
                <p>2.7 GB</p>
                <p className="font-roboto">Standard Data</p>
                <p>37.3 GB</p>
            </div>
            <div className="mx-auto rounded py-1 text-center w-100 bg-secondary">
                <div className="h-6 w-full rounded-full bg-opacity-30 bg-primary2">
                    <div
                        className="flex h-6 items-center justify-center rounded-full bg-gradient-to-r text-xs font-medium leading-none text-blue-100 from-primary1 to-primary2 p-0.5"
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