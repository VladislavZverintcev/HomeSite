const uriList = 'api/GetDht11Values';
let canvas;
let ctx;
let workOffsetxstart = 30;
let workOffsetxend = 30;
let workOffsetystart = 10;
let workOffsetyend = 40;
let textOffset = 2;


function GetGraph(timetype, elementid) {

    //#region elements initialization
    canvas = document.getElementById(elementid);
    ctx = canvas.getContext(`2d`);
    //#endregion elements initialization

    //#region FirstFormat

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
    //Рисуем шкалу y температуры
    for (let i = 0; i < 21; i++) {
        ctx.fillText((50 - i * 5) + "°", 5, (workOffsetystart + i * ((canvas.height - workOffsetystart - workOffsetyend) / 20)) + textOffset );
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(workOffsetxstart - 5, workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.lineTo(workOffsetxstart, workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.stroke();
        //вспомогательная
        ctx.strokeStyle = '#2a0000';
        ctx.beginPath();
        ctx.moveTo(workOffsetxstart, workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.lineTo(workOffsetxstart + GetWorkCanvasWidht(), workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.stroke();
    }
    //Рисуем шкалу y влажности
    for (let i = 0; i < 21; i++) {
        ctx.textAlign = "right";
        ctx.fillText((100 - i * 5) + "%", GetWorkCanvasWidht() + workOffsetxstart + workOffsetxend -5, (workOffsetystart + i * ((canvas.height - workOffsetystart - workOffsetyend) / 20)) + textOffset);
        ctx.beginPath();
        ctx.strokeStyle = '#01faf2';
        ctx.moveTo(workOffsetxstart + GetWorkCanvasWidht(), workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.lineTo(workOffsetxstart + GetWorkCanvasWidht() + 5, workOffsetystart + i * (canvas.height - workOffsetystart - workOffsetyend) / 20);
        ctx.stroke();
    }

    //#endregion FirstFormat

    //Рисуем шкалу x

    //#region For any type of Graph

    if (timetype == "24h") {
        ctx.strokeStyle = "white";
        ctx.translate(0, 0);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "left";

        for (let i = 0; i < 24; i++) {
            ctx.fillText(hoursminutes_time(GetCurDate(), - 3600000 * i), -1 * (canvas.height - workOffsetystart), canvas.width - (GetWorkCanvasWidht() / 23 * i) - workOffsetxend + textOffset);
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.moveTo(-1 * (canvas.height - workOffsetyend + 5), canvas.width - (GetWorkCanvasWidht() / 23 * i) - workOffsetxend);
            ctx.lineTo(-1 * (canvas.height - workOffsetyend), canvas.width - (GetWorkCanvasWidht() / 23 * i) - workOffsetxend);
            ctx.stroke();
            //вспомогательная
            ctx.beginPath();
            ctx.strokeStyle = '#2a0000';
            ctx.moveTo(-1 * (canvas.height - workOffsetyend), canvas.width - (GetWorkCanvasWidht() / 23 * i) - workOffsetxend);
            ctx.lineTo(-1 * (workOffsetystart), canvas.width - (GetWorkCanvasWidht() / 23 * i) - workOffsetxend);
            ctx.stroke();
        }
        ctx.save();
        ctx.rotate(Math.PI / 2);

        //Нулевая линия температуры
        ctx.strokeStyle = '#ba8484';
        ctx.lineWidth = 0.5;
        /*ctx.setLineDash([20, 2]);*/
        ctx.beginPath();
        ctx.moveTo(workOffsetxstart, GetYFromTemp(0));
        ctx.lineTo(workOffsetxstart + GetWorkCanvasWidht(), GetYFromTemp(0));
        ctx.stroke();

        //Нулевая линия влажности
        ctx.strokeStyle = '#8390ba';
        ctx.lineWidth = 0.5;
        /*ctx.setLineDash([20, 2]);*/
        ctx.beginPath();
        ctx.moveTo(workOffsetxstart, GetYFromHumi(0) - 1);
        ctx.lineTo(workOffsetxstart + GetWorkCanvasWidht(), GetYFromHumi(0) - 1);
        ctx.stroke();

        GetListValues24hoursHome();
        //-> далее график
    }

    //#endregion For any type of Graph

    //#region common graph function
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
        var ticksPer24h = 864000000000;
        var timepos = valueTicks - Get24hLeterTick() - GetOffsetInTicks();
        return ConvWorkXToCanv((timepos / ticksPer24h) * GetWorkCanvasWidht());
    }
    function GetYFromTemp(valueTemp) {
        var absval = valueTemp + 50;
        return ConvWorkYToCanv(GetWorkCanvasHeight() - ((absval / 100) * GetWorkCanvasHeight()));
    }
    function GetYFromHumi(valueHumi) {
        return ConvWorkYToCanv(GetWorkCanvasHeight() - ((valueHumi / 100) * GetWorkCanvasHeight()));
    }
    //#endregion common graph function

    //#region querry function
    function GetListValues24hoursHome() {
        fetch(uriList + "/home" + '/' + (Get24hLeterTick() + GetOffsetInTicks()) + '/' + GetNowTicks())
            .then(response => response.json())
            .then(data => Get24hoursGraph(data))
            .catch(error => console.error('Unable to get items.', error));
    }
    //#endregion querry function

    //#region for any type graph function

    function Get24hoursGraph(data) {
        var sensValues = [];
        sensValues = ParseListObject(data);
        //График
        ctx.lineWidth = 2.0; // Ширина линии
        ctx.setLineDash([]);
        //Тепература
        ctx.strokeStyle = "red";
        if (sensValues.length > 1) {
            for (let i = 0; i < sensValues.length - 1; i++) {
                ctx.beginPath();
                ctx.moveTo(GetXfromTime(sensValues[i].registredDateTime), GetYFromTemp(sensValues[i].temperature));
                ctx.lineTo(GetXfromTime(sensValues[i + 1].registredDateTime), GetYFromTemp(sensValues[i + 1].temperature));
                ctx.stroke();
            }
        }
        //Влажность
        ctx.strokeStyle = '#01faf2';
        if (sensValues.length > 1) {
            for (let i = 0; i < sensValues.length - 1; i++) {
                ctx.beginPath();
                ctx.moveTo(GetXfromTime(sensValues[i].registredDateTime), GetYFromHumi(sensValues[i].humidity));
                ctx.lineTo(GetXfromTime(sensValues[i + 1].registredDateTime), GetYFromHumi(sensValues[i + 1].humidity));
                ctx.stroke();
            }
        }
    //График
    }

    //#endregion for any type graph function
}