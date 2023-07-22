export const daysCount = (validTill) => {
    const [day, month] = validTill.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'];
    const monthNumber = monthNames.indexOf(month) + 1;
    const currentYear = new Date().getFullYear();
    const validTillDate = new Date(`${currentYear}-${monthNumber}-${day}`);
    validTillDate.setHours(0, 0, 0, 0);  // set time to the start of the day

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);  // set time to the start of the day

    const startDate = new Date(validTillDate); // set date to the start of the current month
    startDate.setMonth(startDate.getMonth() - 1);

    const differenceInTime = validTillDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // remaining days

    const pastTime = currentDate.getTime() - startDate.getTime();
    const pastDays = pastTime / (1000 * 3600 * 24) + 1;

    return {
        passedDays: Math.ceil(pastDays),
        remainingDays: Math.ceil(differenceInDays)
    };
}