
class ConvertDate {
    // convert 2020-05-30 12:00:00 to 30 May 2020
    static convertDate(date) {
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.toLocaleString('default', { month: 'long' });
        let year = newDate.getFullYear();
        return month + ' ' + day + ' ' + year;
    }
}
export default ConvertDate;