import * as fs from "fs";

export class MemoryAction {
    address: number
    value: number

    constructor(address: number, value: number) {
        this.address = address
        this.value = value
    }
}

export function load(fileName:string):string[] {
    const file = fs.readFileSync(fileName, 'utf8')
    var lines:string[] = []
    file.split("\n").forEach(line => {
        lines.push(line.trim())
    })
    return lines
} 

export function decodeMemoryAction(raw:string):MemoryAction {
    var regEx = /^mem\[(\d+)\]\s=\s(\d+)$/
    var matches = raw.match(regEx);
    if (matches) {
        return new MemoryAction(parseInt(matches[1]), parseInt(matches[2]))
    }
    return new MemoryAction(0, 0)
}

export function decodeMask(raw:string):string | undefined {
    var regEx = /^mask\s=\s([X01]{36})$/
    var matches = raw.match(regEx)
    if (matches) {
        return matches[1]
    }
}

export function valueToBinary(value:number):string {
    var binValue = (value >>> 0).toString(2)
    var loopCnt = 36 - binValue.length
    for (var i = 0; i < loopCnt; i ++) {
        binValue = "0" + binValue
    }
    return binValue
}

export function binaryToValue(bin:string):number {
    return parseInt(bin, 2)
}

export function convertValue(mask:string, value:number):number {
    var binary = valueToBinary(value)
    var convBinary = ""
    for (var i = 0; i < 36; i ++) {
        if (mask[i] == "1") {
            convBinary = convBinary + "1"
        } else if (mask[i] == "0") {
            convBinary = convBinary + "0"
        } else {
            convBinary = convBinary + binary[i]
        }
    }
    return binaryToValue(convBinary)
}

export function sumMemory(memory:Map<number, number>):number {
    var sum = 0
    memory.forEach(cell => {
        sum = sum + cell
    })
    return sum
} 

export function fillMemoryV1(fileName:string):Map<number, number> {
    var memory = new Map<number, number>()
    var instructions = load(fileName);
    var checkMaskRegex = /^mask/
    var checkMemRegex = /^mem/
    var currentMask:string | any
    instructions.forEach(instruction => {
        if (checkMaskRegex.test(instruction)) {
            currentMask = decodeMask(instruction)
        }
        if (checkMemRegex.test(instruction)) {
            var memoryAction = decodeMemoryAction(instruction)
            var convertedValue = convertValue(currentMask, memoryAction.value)
            memory.set(memoryAction.address, convertedValue)
        }
    });
    return memory
}
