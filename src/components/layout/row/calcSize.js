function checkDevice(s) {
    return navigator.userAgent.indexOf(s) > -1
}

export default function calcSize() {
    if (checkDevice('Windows')) {
        return {
            '--minWidthCol': 200 + 'px',
            '--maxWidthCol1': 450 + 'px',
            '--maxWidthCol2': 200 + 'px',
        }
    } else if (checkDevice('Android')) {
        return {
            '--minWidthCol': 100 + 'px',
            '--maxWidthCol1': 300 + 'px',
            '--maxWidthCol2': 100 + 'px',
        }
    } else {
        return {
            '--minWidthCol': 200 + 'px',
            '--maxWidthCol1': 400 + 'px',
            '--maxWidthCol2': 400 + 'px',
        }
    }
}


