import * as fs from "fs";

export class MemoryAction {
    address: number
    value: number

    constructor(address: number, value: number) {
        this.address = address
        this.value = value
    }

    public toString():string {
        return `(address = ${this.address}, value = ${this.value})`;
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

export function binaryToNumber(bin:string):number {
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
    return binaryToNumber(convBinary)
}

export function convertAddress(mask:string, address:number):string {
    var binaryAddress = valueToBinary(address)
    var convAddress = ""
    for (var i = 0; i < 36; i ++) {
        if (mask[i] == "1") {
            convAddress = convAddress + "1"
        } else if (mask[i] == "0") {
            convAddress = convAddress + binaryAddress[i]
        } else {
            convAddress = convAddress + "X"
        }    
    }
    return convAddress
}

export function findStringAddresses(floatingAddress:string):string[] {
    var addresses:string[] = []
    var xIdx = floatingAddress.indexOf("X")
    if (xIdx > -1) {
        findStringAddresses(floatingAddress.substring(xIdx + 1)).forEach(address => {
            addresses.push(floatingAddress.substring(0, xIdx) + "0" + address)
            addresses.push(floatingAddress.substring(0, xIdx) + "1" + address)
        });
    } else {
        addresses.push(floatingAddress)
    }
    return addresses
}

export function findAddresses(floatingAddress:string):number[] {
    return findStringAddresses(floatingAddress).map(binaryToNumber)    
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

export function fillMemoryV2(fileName:string):Map<number, number> {
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
            var floatingAddress = convertAddress(currentMask, memoryAction.address)
            var addresses = findAddresses(floatingAddress)
            addresses.forEach(address => {
                memory.set(address, memoryAction.value)
            })
        }
    });
    return memory
}