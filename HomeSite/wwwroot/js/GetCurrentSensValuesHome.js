const uriLastHome = 'api/GetDht11Values/lasthome';

function getCurLastHome() {
    fetch(uriLastHome)
        .then(response => response.json())
        .then(data => getLastHome(data))
        .catch(error => console.error('Unable to get items.', error));
}
function getLastHome(data) {
    var valueObject = ParseObject(data);
    document.getElementById('curhumi').innerHTML = valueObject.humidity;
    document.getElementById('curtemp').innerHTML = valueObject.temperature;
}
