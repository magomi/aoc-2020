import { fillMemoryV1, fillMemoryV2, sumMemory } from "./mem"

console.log(`task 1: ${sumMemory(fillMemoryV1("mem_01.data"))}`)
console.log(`task 2: ${sumMemory(fillMemoryV2("mem_01.data"))}`)