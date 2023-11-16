const buttons = document.querySelectorAll(".butt");
const resultP = document.getElementById("resultP");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        const inpOne = document.getElementById("inpOne").value.trim();
        const inpTwo = document.getElementById("inpTwo").value.trim();
        console.log(inpTwo.length);
        if (inpOne.length == 0 || inpTwo.length == 0) {
            resultP.innerHTML = "Ошибка: одна из строк пуста";
        } else {
            if ((inpOne[0] == "I" || inpTwo[0] == "I") || (inpOne[0] == "V" || inpTwo[0] == "V") ||
                (inpOne[0] == "X" || inpTwo[0] == "X") || (inpOne[0] == "L" || inpTwo[0] == "L") ||
                (inpOne[0] == "C" || inpTwo[0] == "C") || (inpOne[0] == "D" || inpTwo[0] == "D") ||
                (inpOne[0] == "M" || inpTwo[0] == "M")) {
                const resNumbersRom = protectRomanNumbers(inpOne, inpTwo);
                const resNumbersRomArr = resNumbersRom.split(" ");
                const resRom = protectArabicNumbers(buttons[i].textContent, Number(resNumbersRomArr[0]), Number(resNumbersRomArr[1]));
                if (Number.isInteger(resRom) == false) {
                    if (Number.isInteger(resRom) <= 0) {
                        resultP.innerHTML = "Ошибка: в римском исчислении нет отрицательных чисел и 0";
                    } else {
                        const finishRom = convertor(Math.trunc(resRom));
                        resultP.innerHTML = finishRom;
                    }
                }
                else {
                    if (resRom <= 0) {
                        resultP.innerHTML = "Ошибка: в римском исчислении нет отрицательных чисел и 0";
                    } else {
                        const finishRom = convertor(Math.trunc(resRom));
                        resultP.innerHTML = finishRom;
                    }
                }
            } else {
                let numOne = Number(inpOne);
                let numTwo = Number(inpTwo);
                if (isNaN(numOne) || isNaN(numTwo)) {
                    resultP.innerHTML = "Ошибка: одно из чисел римское, другое арабское";
                } else {
                    let resultAr = protectArabicNumbers(buttons[i].textContent, numOne, numTwo);
                    resultP.innerHTML = resultAr;
                }
            }
        }
    }
}

function protectRomanNumbers(inpOne, inpTwo) {
    const romsData = { "M": 1000, "CM": 900, "D": 500, "CD": 400, "C": 100, "XC": 90, "L": 50, "XL": 40, "X": 10, "IX": 9, "V": 5, "IV": 4, "I": 1 };
    let romResultOne = 0;
    for (let i = 0; i < inpOne.length; i++) {
        const currentSymbolValueOne = romsData[inpOne[i]];
        const nextSymbolValueOne = romsData[inpOne[i + 1]];
        if (nextSymbolValueOne > currentSymbolValueOne) {
            romResultOne += nextSymbolValueOne - currentSymbolValueOne;
            i++;
        } else {
            romResultOne += currentSymbolValueOne;
        }
    }
    let romResultTwo = 0;
    for (let i = 0; i < inpTwo.length; i++) {
        const currentSymbolValueTwo = romsData[inpTwo[i]];
        const nextSymbolValueTwo = romsData[inpTwo[i + 1]];
        if (nextSymbolValueTwo > currentSymbolValueTwo) {
            romResultTwo += nextSymbolValueTwo - currentSymbolValueTwo;
            i++;
        } else {
            romResultTwo += currentSymbolValueTwo;
        }
    }
    return romResultOne + " " + romResultTwo;
}

function convertor(resRom) {
    const romsData = { "M": 1000, "CM": 900, "D": 500, "CD": 400, "C": 100, "XC": 90, "L": 50, "XL": 40, "X": 10, "IX": 9, "V": 5, "IV": 4, "I": 1 };
    let resultRom = "";
    for (let keys in romsData) {
        while (romsData[keys] <= resRom) {
            resultRom += keys;
            resRom -= romsData[keys];
        }
    }
    return resultRom;
}

function protectArabicNumbers(sign, numOne, numTwo) {
    console.log(numOne + " " + numTwo);
    let resultArabic = 0;
    switch (sign) {
        case "+":
            resultArabic = numOne + numTwo;
            break;
        case "-":
            resultArabic = numOne - numTwo;
            break;
        case "x":
            resultArabic = numOne * numTwo;
            break;
        case "/":
            resultArabic = numOne / numTwo;
            break;
    }
    return resultArabic;
}