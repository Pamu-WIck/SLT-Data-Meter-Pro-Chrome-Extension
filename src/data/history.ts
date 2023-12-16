
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

        // get latest value
        const latest : any = Object.keys(history).sort().reverse()[0];
        console.log(latest); //17-Dec-2023 12:45 AM

        //clear history if latest value date is not == time
        //get only date
        const latestDate = latest.split(' ')[0];
        console.log(`latestDate: ${latestDate}`);
        const date = time.split(' ')[0];
        console.log(`date: ${date}`);

        if (latestDate !== date) {
            localStorage.removeItem('history');
        }

        localStorage.setItem('history', JSON.stringify(history));
    }
}