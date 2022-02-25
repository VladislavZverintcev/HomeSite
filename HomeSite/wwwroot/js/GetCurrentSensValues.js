const uriLast = 'api/GetDht11Values/last';
let timesi = 0;
const getValuesdelay = 6000;

function start() {
    if (timesi == 0) {
        timesi = getValuesdelay;
        getCurLast();
        setTimeout(start, timesi);
    }
    else {
        getCurLast();
        setTimeout(start, timesi);
    }
}
function getCurLast() {
    fetch(uriLast)
        .then(response => response.json())
        .then(data => getLast(data))
        .catch(error => console.error('Unable to get items.', error));
}
function getLast(data) {
    var valueObject = ParseObject(data);
    document.getElementById('curhumi').innerHTML = valueObject.humidity;
    document.getElementById('curtemp').innerHTML = valueObject.temperature;
}
