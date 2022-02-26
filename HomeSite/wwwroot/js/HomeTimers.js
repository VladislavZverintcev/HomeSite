let timescth = 0; //Настоящяя задержка текущих показаний температуры и влажности 
const getValuesdelaycth = 6000; //Заданная задержка текущих показаний температуры и влажности
let times24hh = 0; //Настоящяя задержка обновления графика за 24 часа 
const getValuesdelay24hh = 300000; //Заданная задержка обновления графика за 24 часа

//#region Main start all timers

function starth() {
    startcth();
    start24hh();
}

//#endregion Main start all timers

//#region current Home Sensor values timer

function startcth() {
    if (timescth == 0) {
        timescth = getValuesdelaycth;
        getCurLastHome();
        setTimeout(startcth, timescth);
    }
    else {
        getCurLastHome();
        setTimeout(startcth, timescth);
    }
}

//#endregion current Home Sensor values timer

//#region Home 24 hours graphic timer

function start24hh() {
    if (times24hh == 0) {
        times24hh = getValuesdelay24hh;
        if (document.getElementById("24hourgraph") != null) {
            GetGraph("24h", "24hourgraph");
            setTimeout(start24hh, times24hh);
        }
        else {
            setTimeout(start24hh, 1000);
        }
    }
    else {
        if (document.getElementById("24hourgraph") != null) {
            GetGraph("24h", "24hourgraph");
            setTimeout(start24hh, times24hh);
        }
        else {
            setTimeout(start24hh, 1000);
        }
    }
}

//#endregion Home 24 hours graphic timer