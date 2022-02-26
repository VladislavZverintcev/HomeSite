let times = 0;
const timedelay = 30000;

function startTime() {
    if (times == 0) {
        times = timedelay;
        get_Time();
        setTimeout(startTime, times);
    }
    else {
        get_Time();
        setTimeout(startTime, times);
    }
}
function get_Time() {
    document.getElementById('current_time_block').innerHTML = hoursminutes_time(GetCurDate(), 0);
}
