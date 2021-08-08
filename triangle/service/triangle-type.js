function specifyTriangleType(sideArray) {
    sideArray.sort(function(a, b) {
        return b - a;
    });
    var sideA = sideArray[0]
    var sideB = sideArray[1]
    var sideC = sideArray[2]

    if (sideA ** 2 == sideB ** 2 + sideC ** 2) {
        if (sideB == sideC) {
            return "Segitiga Siku-Siku Sama Kaki"
        } else {
            return "Segitiga Siku-Siku"
        }
    } else if (sideA == sideB && sideB == sideC) {
        return "Segitiga Sama Sisi"
    } else if (sideA == sideB || sideB == sideC || sideC == sideA) {
        return "Segitiga Sama Kaki"
    } else {
        return "Segitiga Sembarang"
    }
}

module.exports = {
    specifyTriangleType
}