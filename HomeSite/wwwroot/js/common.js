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