import { binaryToNumber, convertAddress, convertValue, decodeMask, decodeMemoryAction, fillMemoryV1, fillMemoryV2, findAddresses, findStringAddresses, load, sumMemory, valueToBinary } from "./mem"

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
    expect(binaryToNumber("000000000000000000000000000000010000")).toBe(16)
    expect(binaryToNumber("000000000000000000000000000000001001")).toBe(9)
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

test("sumMemory (V1)", () => {
    var memory = fillMemoryV1("mem_00.data")
    expect(sumMemory(memory)).toBe(165)
})

test("convertAddress", () => {
    expect(convertAddress("000000000000000000000000000000X1001X", 42)).toBe("000000000000000000000000000000X1101X")
    expect(convertAddress("00000000000000000000000000000000X0XX", 26)).toBe("00000000000000000000000000000001X0XX")
})

test("findStringAddresses", () => {
    var addresses = findStringAddresses("0X1")
    expect(addresses.length).toBe(2)
    expect(addresses.includes("001")).toBe(true)
    expect(addresses.includes("011")).toBe(true)

    var addresses = findStringAddresses("X01")
    expect(addresses.length).toBe(2)
    expect(addresses.includes("001")).toBe(true)
    expect(addresses.includes("101")).toBe(true)
    
    var addresses = findStringAddresses("10X")
    expect(addresses.length).toBe(2)
    expect(addresses.includes("100")).toBe(true)
    expect(addresses.includes("101")).toBe(true)

    var addresses = findStringAddresses("X0X1")
    expect(addresses.length).toBe(4)
    expect(addresses.includes("1001")).toBe(true)
    expect(addresses.includes("0001")).toBe(true)
    expect(addresses.includes("1011")).toBe(true)
    expect(addresses.includes("0011")).toBe(true)
})

test("findStringAddresses", () => {
    var addresses = findAddresses("0X1")
    expect(addresses.length).toBe(2)
    expect(addresses.includes(1)).toBe(true)
    expect(addresses.includes(3)).toBe(true)
})

test("fillMemoryV2", () => {
    var memory = fillMemoryV2("mem_02.data")
    expect(memory.size).toBe(10)
})

test("sumMemory (V2)", () => {
    var memory = fillMemoryV2("mem_02.data")
    expect(sumMemory(memory)).toBe(208)
})