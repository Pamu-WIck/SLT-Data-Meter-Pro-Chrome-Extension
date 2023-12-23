
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

        //add new data to existing data
        const history = JSON.parse(data);
        history[time] = usage;

        // get first value
        const latest : any = Object.keys(history)[0];
        console.log(latest)

        //clear history if latest value date is not == time
        const latestDate = latest.split(' ')[0];
        const date = time.split(' ')[0];

        console.log(latestDate)
        console.log(date)


        if (latestDate !== date) {
            localStorage.removeItem('history');
            console.log('history cleared')
        } else {
            console.log('history not cleared')
        }

        // console.log(history)
        localStorage.setItem('history', JSON.stringify(history));
    }
}


