const uriList = 'api/GetDht11Values';
let canvas = document.querySelector(`#canvas`);
let ctx = canvas.getContext(`2d`);
let curdate = new Date();
let workOffsetxstart = 40;
let workOffsetxend = 10;
let workOffsetystart = 10;
let workOffsetyend = 50;
let textOffset = 2;

function GetGraph(timetype) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '8px Calibri';
    
    //Фон
    ctx.fillStyle = '#191919';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Фон
    //Рисуем рамку
    //ctx.strokeStyle = "gray";
    //ctx.lineWidth = 2.0; // Ширина линии
    //ctx.beginPath(); // Запускает путь
    //ctx.moveTo(0, 0); // Указываем начальный путь
    //ctx.lineTo(canvas.width, 0); // Перемешаем указатель
    //ctx.lineTo(canvas.width, canvas.height); // Ещё раз перемешаем указатель
    //ctx.lineTo(0, canvas.height); // Ещё раз перемешаем указатель
    //ctx.lineTo(0, 0); // Ещё раз перемешаем указатель
    //ctx.stroke(); // Делаем контур
    //Конец рамки

    //Рабочее поле
    ctx.fillStyle = '#000000';
    ctx.fillRect(workOffsetxstart, workOffsetystart, canvas.width - workOffsetxstart - workOffsetxend, canvas.height - workOffsetystart - workOffsetyend);
    //Рабочее поле
    ctx.strokeStyle = "red";
    ctx.fillStyle = "white";
    //Рисуем шкалу y
    for (let i = 0; i < 21; i++) {
        ctx.fillText((50 - i * 5) + "°", 5, (workOffsetystart + i * ((canvas.height - workOffsetystart - workOffsetyend) / 20)) + textOffset );
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(workOffsetxstart - 5, workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.lineTo(workOffsetxstart, workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.stroke();
        //вспомогательная
        ctx.strokeStyle = '#2a0000';
        ctx.moveTo(workOffsetxstart, workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.lineTo(workOffsetxstart + GetWorkCanvasWidht(), workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.stroke();
    }
    //Рисуем шкалу x
    ctx.strokeStyle = "red";
    if (timetype == "24h") {
        ctx.save();
        ctx.translate(0, 0);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "left";

        for (let i = 0; i < 24; i++) {
            /*ctx.fillText(hoursminutes_time(-3600000 * i), canvas.width - canvas.width/24*i, canvas.height - 100);*/
            ctx.fillText(hoursminutes_time(curdate, - 3600000 * i), -1 * (canvas.height - workOffsetystart), canvas.width - (canvas.width - workOffsetxstart + workOffsetxend) / 24 * i - workOffsetxend + textOffset);
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.moveTo(-1 * (canvas.height - workOffsetyend + 5), canvas.width - (canvas.width - workOffsetxstart + workOffsetxend) / 25 * i - workOffsetxend);
            ctx.lineTo(-1 * (canvas.height - workOffsetyend), canvas.width - (canvas.width - workOffsetxstart + workOffsetxend) / 25 * i - workOffsetxend);
            ctx.stroke();
            //вспомогательная
            ctx.strokeStyle = '#2a0000';
            ctx.moveTo(-1 * (canvas.height - workOffsetyend), canvas.width - (canvas.width - workOffsetxstart + workOffsetxend) / 25 * i - workOffsetxend);
            ctx.lineTo(-1 * (workOffsetystart), canvas.width - (canvas.width - workOffsetxstart + workOffsetxend) / 25 * i - workOffsetxend);
            ctx.stroke();
        }
        ctx.save();
        ctx.rotate(Math.PI / 2);

        //Нулевая линия
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(workOffsetxstart, GetYFormTemp(0));
        ctx.lineTo(workOffsetxstart + GetWorkCanvasWidht(), GetYFormTemp(0));
        ctx.stroke();

        GetListValues();
        //-> далее график
    }

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
    function ConvWorkXToCanv(valueX) {
        return valueX + workOffsetxstart;
    }
    function ConvWorkYToCanv(valueY) {
        return valueY + workOffsetystart;
    }
    function GetWorkCanvasWidht() {
        return canvas.width - workOffsetxstart - workOffsetxend;
    }
    function GetWorkCanvasHeight() {
        return canvas.height - workOffsetystart - workOffsetyend;
    }
    function GetXfromTime(valueTicks) {
        var ticksPerMillisecond = 10000;
        var ticksPer24h = 864000000000;
        var offset = curdate.getTimezoneOffset();
        var timepos = valueTicks - Get24hLeterTick() - (offset * 60000 * ticksPerMillisecond);
        return ConvWorkXToCanv((timepos / ticksPer24h) * GetWorkCanvasWidht());
    }
    function GetYFormTemp(valueTemp) {
        var absval = valueTemp + 50;
        return ConvWorkYToCanv(GetWorkCanvasHeight() - ((absval / 100) * GetWorkCanvasHeight()));
    }
    function GetNowTicks() {
        // the number of .net ticks at the unix epoch
        var epochTicks = 621355968000000000;
        // there are 10000 .net ticks per millisecond
        var ticksPerMillisecond = 10000;
        var offset = curdate.getTimezoneOffset();
        return epochTicks + ((curdate.getTime() - (offset * 60000)) * ticksPerMillisecond);
    }
    function Get24hLeterTick() {
        // the number of .net ticks at the unix epoch
        var ticksPer24h = 864000000000;
        return GetNowTicks() - ticksPer24h;
    }
    function GetListValues() {
        var offset = curdate.getTimezoneOffset();
        var ticksPerMillisecond = 10000;
        fetch(uriList + '/' + (Get24hLeterTick() + offset * 60000 * ticksPerMillisecond) + '/' + GetNowTicks())
            .then(response => response.json())
            .then(data => ParseListValues(data))
            .catch(error => console.error('Unable to get items.', error));
    }
    function ParseListValues(data) {

        var listSensValues = [];
        listSensValues = data.map(JSON.stringify);
        //График
        ctx.lineWidth = 2.0; // Ширина линии
        ctx.strokeStyle = "red";
        if (listSensValues.length > 1) {
            for (let i = 0; i < listSensValues.length - 1; i++) {
                ctx.beginPath();
                ctx.moveTo(GetXfromTime(JSON.parse(listSensValues[i]).registredDateTime), GetYFormTemp(JSON.parse(listSensValues[i]).temperature));
                ctx.lineTo(GetXfromTime(JSON.parse(listSensValues[i + 1]).registredDateTime), GetYFormTemp(JSON.parse(listSensValues[i + 1]).temperature));
                ctx.stroke();
            }
        }

    //График
        
    }
}