/**
 * Функция пропорционально переносит значение (value)
 * из текущего диапазона значений (fromMin .. fromMax)
 * в новый диапазон (toMin .. toMax), заданный параметрами.
 * */
function map(value, fromMin, fromMax, toMin, toMax) {
    return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
}

/**
 * Функция переводит градусы (val) в радианы
 * */
function toRad(val) {
    return (Math.PI * val) / (180)
}

/**
 * Функция проверяет значение (cur) на вхождение в диапазон (min-max).
 * Если значение (cur) меньше (min), функция возвращает (min).
 * Если значение (cur) больше (max), функция возвращает (max).
 * Иначе функция возвращает (cur).
 * */
function checkRange(min, cur, max) {
    if(cur <= min){
        return min
    } else if(min < cur && cur < max){
        return cur
    } else {
        return max
    }
}

export {
    checkRange,
    map,
    toRad
}