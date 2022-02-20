const uriTemp = 'api/GetDht11Values/temp';
const uriHumi = 'api/GetDht11Values/humi';
let timesi = 0;
const getValuesdelay = 6000;

function start() {
    if (timesi == 0) {
        timesi = getValuesdelay;
        getCurTemp();
        getCurHumi();
        setTimeout(start, timesi);
    }
    else {
        getCurTemp();
        getCurHumi();
        setTimeout(start, timesi);
    }
}
function getCurTemp() {
    fetch(uriTemp)
        .then(response => response.json())
        .then(data => getTemp(data))
        .catch(error => console.error('Unable to get items.', error));
}
function getCurHumi() {
    fetch(uriHumi)
        .then(response => response.json())
        .then(data => getHumi(data))
        .catch(error => console.error('Unable to get items.', error));
}
function getTemp(data) {
    document.getElementById('curtemp').innerHTML = data;
}
function getHumi(data) {
    document.getElementById('curhumi').innerHTML = data;
}
