let times = 0;
const timedelay = 30000;
/* функция добавления ведущих нулей */
/* (если число меньше десяти, перед числом добавляем ноль) */
function zero_first_format(value) {
    if (value < 10) {
        value = '0' + value;
    }
    return value;
}

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

/* функция получения текущей даты и времени */
function date_time() {
    var current_datetime = new Date();
    //var day = zero_first_format(current_datetime.getDate());
    //var month = zero_first_format(current_datetime.getMonth() + 1);
    //var year = current_datetime.getFullYear();
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
    /*var seconds = zero_first_format(current_datetime.getSeconds());*/

    return hours + ":" + minutes;
}
function get_Time() {
    /* выводим текущую дату и время на сайт в блок с id "current_date_time_block" */
    document.getElementById('current_time_block').innerHTML = date_time();
}
