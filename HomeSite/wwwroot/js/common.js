//#region Json Parse
function ParseStrObject(data) {
    var resultObject = new Object();
    resultObject["id"] = JSON.parse(data).id;
    resultObject["temperature"] = JSON.parse(data).temperature;
    resultObject["humidity"] = JSON.parse(data).humidity;
    resultObject["registredDateTime"] = JSON.parse(data).registredDateTime;
    return resultObject;
}
function ParseListObject(data) {
    var listSensValues = [];
    var listSensTemp = [];
    listSensTemp = data.map(JSON.stringify);
    for (let i = 0; i < listSensTemp.length; i++) {
        listSensValues[i] = ParseStrObject(listSensTemp[i]);
    }
    return listSensValues;
}
function ParseObject(data) {
    return ParseStrObject(JSON.stringify(data));
}
//#endregion Json Parse

//#region time function
function hoursminutes_time(date, delta) {
    var returntDate = new Date(date.getTime() + delta);
    var hours = first_format(returntDate.getHours());
    var minutes = first_format(returntDate.getMinutes());
    return hours + ":" + minutes;
}
function first_format(value) {
    if (value < 10) {
        value = '0' + value;
    }
    return value;
}
function GetNowTicks() {
    var curdate = new Date();
    // the number of .net ticks at the unix epoch
    var epochTicks = 621355968000000000;
    var offset = curdate.getTimezoneOffset();
    return epochTicks + (curdate.getTime() * 10000) - GetOffsetInTicks();
}
function Get24hLeterTick() {
    // the number of .net ticks at the unix epoch
    var ticksPer24h = 864000000000;
    return GetNowTicks() - ticksPer24h;
}
function GetOffsetInTicks() {
    var curdate = new Date();
    var offset = curdate.getTimezoneOffset();
    return offset * 60000 * 10000;
}
function GetCurDate() {
    return new Date();
}
    //#endregion time function

