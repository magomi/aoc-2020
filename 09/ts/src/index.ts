import * as fs from "fs";

function findWeaknumber(encodings:number[], offset:number):number {
    for (var i = offset; i < encodings.length; i++) {
        var pre = encodings.slice(i - offset, i);
        var num = encodings[i];
        if (!checkNumber(num, pre)) {
            return num;
        }
    }
    return -1;
}

function checkNumber(num:number, check:number[]):boolean {
    for (var i = 0; i < check.length; i ++) {
        var f = check[i];
        for (var j = i + 1; j < check.length; j ++) {
            if (num == f + check[j]) {
                return true
            }
        }
    }
    return false;
}

function findWeakness(num:number, check:number[]):number[] {
    var weaknessRange:number[] = [];
    for (var i = 0; i < check.length; i ++) {
        var sum = 0;
        weaknessRange = [];
        for (var j = i; j < check.length; j ++) {
            sum = sum + check[j];
            weaknessRange.push(check[j]);
            if (sum == num) {
                return weaknessRange;
            }
            if (sum > num) {
                break;
            }
        }
    }
    return weaknessRange;
}

function calculateWeakness(range:number[]):number {
    var min = Math.min(...range);
    var max = Math.max(...range);
    return min + max;

}

function load(filename:string):number[] {
    const file = fs.readFileSync(filename, 'utf8')
    var encodings:number[] = []
    file.split("\r\n").forEach(raw => {
        encodings.push(parseInt(raw))
    });
    return encodings;
}

var encodings = load('encoding_01.data');
var weaknessNumber = findWeaknumber(encodings, 5);
console.log("weaknessNumber = " + weaknessNumber);
var weaknessRange = findWeakness(weaknessNumber, encodings);
console.log("weaknessRange = " + weaknessRange);
console.log("weakness = " + calculateWeakness(weaknessRange));
console.log("------------------------------");
var encodings = load('encoding_02.data');
var weaknessNumber = findWeaknumber(encodings, 25);
console.log("weaknessNumber = " + weaknessNumber);
var weaknessRange = findWeakness(weaknessNumber, encodings);
console.log("weaknessRange = " + weaknessRange);
console.log("weakness = " + calculateWeakness(weaknessRange));


