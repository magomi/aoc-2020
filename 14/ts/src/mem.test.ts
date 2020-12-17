import { binaryToValue, convertValue, decodeMask, decodeMemoryAction, fillMemoryV1, load, sumMemory, valueToBinary } from "./mem"

test("load from mem_00.data", () => {
    var lines = load("mem_00.data")
    expect(lines.length).toBe(4)
})

test("decodeMemoryAction", () => {
    var memoryAction = decodeMemoryAction("mem[10] = 199");
    expect(memoryAction?.address).toBe(10)
    expect(memoryAction?.value).toBe(199)
})

test("decodeMask", () => {
    var mask = decodeMask("mask = XXXXXXXXXXXXXXXXXXXXXXX1XXXXX1XXXX0X")
    expect(mask).toBe("XXXXXXXXXXXXXXXXXXXXXXX1XXXXX1XXXX0X")
})

test("valueToBinary", () => {
    expect(valueToBinary(3)).toBe("000000000000000000000000000000000011")
    expect(valueToBinary(0)).toBe("000000000000000000000000000000000000")
    expect(valueToBinary(16)).toBe("000000000000000000000000000000010000")
})

test("binaryToValue", () => {
    expect(binaryToValue("000000000000000000000000000000010000")).toBe(16)
    expect(binaryToValue("000000000000000000000000000000001001")).toBe(9)
})

test("convertValue", () => {
    // 000000000000000000000000000000000011 3
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X0X
    // 000000000000000000000000000000001001 9
    expect(convertValue("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X0X", 3)).toBe(9) 
})

test("fillMemoryV1", () => {
    var memory = fillMemoryV1("mem_00.data")
    expect(memory.size).toBe(2)
})

test("sumMemory", () => {
    var memory = fillMemoryV1("mem_00.data")
    expect(sumMemory(memory)).toBe(165)
})