function NumberToText(n) {
    var ang = new Array(" ", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas")
    if (n == 0) { tbr = 'nol'; } else if (n < 12) { tbr = ang[n]; } else if (n < 20) { tbr = (ang[n - 10]) + " belas"; } else if (n < 100) { tbr = (ang[Math.floor(n / 10)]) + " puluh " + (ang[n % 10]); } else if (n < 200) {
        if ((n % 100) <= 11) { tbr = "seratus " + (ang[n % 100]); } else if ((n % 100) > 11 && (n % 100) <= 19) { tbr = "seratus " + (ang[(n % 10)]) + " belas"; } else if ((n % 100) > 19) { tbr = "seratus " + (ang[Math.floor((n / 10) % 10)]) + " puluh " + (ang[n % 10]); }
    } else if (n < 1000) {
        if ((n % 100) <= 11) { tbr = (ang[(Math.floor(n / 100))]) + " ratus " + (ang[n % 100]); } else if ((n % 100) > 11 && (n % 100) <= 19) { tbr = (ang[(Math.floor(n / 100))]) + " ratus " + (ang[(n % 10)]) + " belas"; } else if ((n % 100) > 19) { tbr = (ang[(Math.floor(n / 100))]) + " ratus " + (ang[Math.floor((n / 10) % 10)]) + " puluh " + (ang[n % 10]); }
    }
    return tbr;
}

function TextToNumber(arrkata) {
    var toNumber = arrkata.map((angka, index, { length }) =>
            angka === "puluh" && index + 1 === length ? '0' : //20,30,40
            angka === "puluh" && index + 1 === length - 1 ? '' : //23
            angka === "seratus" && arrkata[index + 1] === "sebelas" ? "1" + blablabla(angka) : //111
            angka === "seratus" && arrkata[index + 1] === "sepuluh" ? "1" + blablabla(angka) : //110
            arrkata[index + 1] === "sebelas" ? blablabla(angka) : //111
            arrkata[index + 1] === "sepuluh" ? blablabla(angka) : //110
            angka === "ratus" && index + 1 === length ? '00' : //200,300
            angka === "ratus" && index + 1 === length - 1 ? '0' : //201-209
            angka === "ratus" && index + 2 === length - 2 ? '' : //221
            arrkata[index + 1] === "belas" ? "1" + blablabla(angka) : //12
            angka === "seratus" && index + 1 === length - 1 ? "1" + '0' : //101-109
            angka === "seratus" && index + 2 === length - 2 ? "1" + '' : //121
            angka === "seratus" && index + 2 === length - 1 ? "1" + '' : //112-119
            angka === "seratus" ? '100' :
            angka === "nol" ? '0' : execute(angka))
        .join('')
    return toNumber
}

function execute(index) {
    var numbers = new Array("puluh", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas")
    return numbers.indexOf(index) !== -1 ? numbers.indexOf(index) : ""
}

function isTypo(arrKata) {
    var dictionaries = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "belas", "puluh", "seratus", "ratus"]
    if (arrKata.filter(d => !dictionaries.includes(d)).length == 0) {
        return false
    }

    return true
}

module.exports = {
    TextToNumber,
    NumberToText,
    isTypo
}