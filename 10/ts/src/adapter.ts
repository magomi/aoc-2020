import * as fs from "fs";

export function load(filename:string):number[] {
    const file = fs.readFileSync(filename, 'utf8')
    var adapters:number[] = []
    file.split("\r\n").forEach(raw => {
        adapters.push(parseInt(raw))
    });
    return adapters;
}      

export function calcDifferences(adapters:number[]) {
    var sortetAdapters = adapters.sort((a, b) => a - b);
    var d1 = 0;
    var d2 = 0;
    var d3 = 0;
    var prev = 0;
    for (var i:number = 0; i < sortetAdapters.length; i ++) {
        var diff = sortetAdapters[i] - prev;
        prev = sortetAdapters[i];
        if (diff == 1) {
            d1 ++;
        } else if (diff == 2) {
            d2 ++;
        } else if (diff == 3) {
            d3 ++;
        }
    }
    d3 ++;
    return (d1 * d3);
}

export function calcVariants(adapters:number[]) {
    var sortetAdapters = adapters.sort((a, b) => a - b);
    let consSmallDistance = new Map();
    let cnt = 0;
    let prev = 0;
    for (var i = 0; i < adapters.length; i ++) {
        var diff = sortetAdapters[i] - prev;
        prev = sortetAdapters[i];
        if (diff == 1) {
            cnt ++
        } else {
            if (cnt > 1) {
                if (consSmallDistance.has(cnt)) {
                    var cur = consSmallDistance.get(cnt);
                    cur ++;
                    consSmallDistance.set(cnt, cur);
                } else {
                    consSmallDistance.set(cnt, 1);
                }
            }
            cnt = 0;
        }
    }
    if (cnt > 1) {
        if (consSmallDistance.has(cnt)) {
            var cur = consSmallDistance.get(cnt);
            cur ++;
            consSmallDistance.set(cnt, cur);
        } else {
            consSmallDistance.set(cnt, 1);
        }
    }

    let result = 1;
    consSmallDistance.forEach((count:number, distance:number) => {
        if (distance == 2) {
            result = result * Math.pow(2, count);
        } else if (distance == 3) {
            result = result * Math.pow(4, count);
        } else if (distance == 4) {
            result = result * Math.pow(7, count);
        } 
    });
    return result;
}

var adapters = load("adapter_00.data");
console.log(calcDifferences(adapters));
console.log(calcVariants(adapters));

var adapters = load("adapter_01.data");
console.log(calcDifferences(adapters));
console.log(calcVariants(adapters));

var adapters = load("adapter_02.data");
console.log(calcDifferences(adapters));
console.log(calcVariants(adapters));

