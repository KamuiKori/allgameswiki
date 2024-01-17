function createDateHook(){
    let date = new Date()
    let months = ["01", "02", "03", "04", "05", "06", "07",
        "08", "09", "10", "11", "12"];
    let minutes = date.getMinutes().toString().length < 2?"0" + date.getMinutes().toString(): date.getMinutes().toString();
    date = date.getHours().toString() + ":" +minutes+ " - " + date.getDate() + "." + months[date.getMonth()] + "." + date.getFullYear();
    return date
}
export default createDateHook