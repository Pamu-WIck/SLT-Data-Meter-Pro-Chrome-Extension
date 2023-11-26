import {Tooltip} from "flowbite-react";

const MeterWidget = (json: { json: {name: string; limit: number; used: number; remaining: number; percentage: number; dailyQuota: number; currentDailyQuota: number; remainDailyQuota: number; }; }) => {

    const {name, limit, used, remaining, percentage, dailyQuota, currentDailyQuota, remainDailyQuota} = json.json;

    return (
        <div
            className="flex-col rounded-md px-8 py-3 text-white bg-secondary felx hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="flex flex-row place-content-between">

                <Tooltip content={`${used} GB of ${limit} GB Used`}>
                    <p className="font-medium">{Number(used).toFixed(1)} GB</p>
                </Tooltip>
                <p className="font-semibold opacity-80 font-roboto">{name}</p>
                <Tooltip content={`${remaining} GB of ${limit} GB Remaining`}>
                    <p className="font-medium">{Number(remaining).toFixed(1)} GB</p>
                </Tooltip>
            </div>
            <div className="mx-auto rounded py-1 text-center w-100 bg-secondary">
                <div className="h-6 w-full rounded-full bg-opacity-30 bg-primary_purple">
                    <div
                        className="flex h-6 items-center justify-center rounded-full bg-gradient-to-r text-xs font-medium leading-none text-blue-100 from-primary_purple to-primary_blue p-0.5 drop-shadow-[5px_2px_8px_rgba(5,2,30,0.5)] dropshadow-green-400"
                        style={{width: `${100-percentage}%`}}> {100-percentage}%
                    </div>
                </div>
            </div>
            <div className="flex flex-row place-content-between">
                <Tooltip content={"Average daily usage of past days"} style={"dark"} animation="duration-300">
                    <div className="bg-opacity-50 average-usage bg-primary_purple">{currentDailyQuota} GB</div>
                </Tooltip>
                <Tooltip content={"Average daily usage of the month"} style={"dark"} animation="duration-300">
                    <div className="bg-opacity-50 average-usage bg-primary_green">{dailyQuota} GB</div>
                </Tooltip>
                <Tooltip content={"Average daily usage for remaining days"} style={"dark"} animation="duration-300">
                    <div className="bg-opacity-50 average-usage bg-primary_purple">{remainDailyQuota} GB</div>
                </Tooltip>

            </div>
        </div>
    )
}

export default MeterWidget;