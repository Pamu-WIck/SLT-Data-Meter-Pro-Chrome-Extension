
export const usage = ({usageDetails} :any) => {
    return usageDetails.map((detail: { name: any; used: any; }) => ({
        name : detail.name,
        used : detail.used,
    }))
}

export const historyLog = ({dataBundle:{reported_time : time}} :any , usage: any) => {
    const data = localStorage.getItem('history');

    interface IHistory {
        [key: string]: any;
    }

    if (data === null) {
        console.log('no history found')
        const history: IHistory = {};
        history[time] = usage;
        localStorage.setItem('history', JSON.stringify(history));
    } else {
        console.log('history found')

        let existHistory = JSON.parse(data);

        // get first value
        const latest : any = Object.keys(existHistory)[0];
        // console.log(latest)

        //clear history if latest value date is not == time
        const latestDate = latest.split(' ')[0];
        const date = time.split(' ')[0];

        // console.log(latestDate)
        // console.log(date)

        console.log(`history : ${history}`)

        if (latestDate !== date) {

            console.log('history cleared')
            const history: IHistory = {};
            history[time] = usage;

            console.table(history)
            localStorage.setItem('history', JSON.stringify(history));

        } else {

            console.log('history not cleared')
            console.table(existHistory)
            existHistory[time] = usage;
            localStorage.setItem('history', JSON.stringify(existHistory));
        }

    }
}


