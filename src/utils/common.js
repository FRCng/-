import store from "@/store";

//格式化日期
export function formatDare(params){
    let coom = params.coon ? params.coon : "-"
    
    let date = new Date(params.value)

    let year = date.getFullYear()//年
    let month = date.getMonth()+1//月
    let day = date.getDate() //日
    let hours = date.getHours() //小时
    let time = date.getMinutes() //分
    let sec = date.getSeconds() // 秒
   
    let dateValue = `${year}${coom}${month}${coom}${day}`
    let dateTime = `${hours}:${time}:${sec}`
   
    if(params.type === "date"){ return dateValue }
    if(params.type === "all"){ return dateValue + '-' + dateTime}
}

/** 省市区街道 */
export function address(value){
    let address = value;
    let addressInfo = "";
    if(address) {
        let split = address.split(",");
        addressInfo += split[0];
        // 街道
        if(split[1]) {
            addressInfo += `<br/>${split[1]}`
        }
    }
    return addressInfo;
}

/** 停车场类型 */
export function parkingType(value){
    const data = store.state.config.parking_type_json[value];
    if(data) { return data.label; }
}

/** 年检 */
export function yearCheckType(value){
    const data = store.state.config.year_check;
    const filterData = data.filter(item => item.value === value);
    if(filterData.length > 0) {
        return filterData[0].label
    }
    return "";
}

/** 能源类型 */
export function energyType(value){
    const data = store.state.config.energyType;
    const filterData = data.filter(item => item.value === parseInt(value)); //=== 结果值是否一致以及值类型，== 结果值是否一致
    if(filterData.length > 0) {
        return filterData[0].label
    }
    return "";
}