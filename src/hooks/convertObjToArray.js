function convertObjToArray(obj){
    const array = [];

    for (let item in obj) {
        if (obj.hasOwnProperty(item)) {
            array.push(obj[item])
        }
    }
    return array
}
export default convertObjToArray