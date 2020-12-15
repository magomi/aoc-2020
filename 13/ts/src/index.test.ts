import { task1, task2 } from './index';

test("task 1", () => {
    expect(task1("7,13,x,x,59,x,31,19".split(","), 939)).toBe(295)
})

test("task 2", () => {
    expect(task2("3, 2, x, 5".split(","), 0)).toBe(27)
    expect(task2("7,13,x,x,59,x,31,19".split(","), 0)).toBe(1068781)
    expect(task2("1789,37,47,1889".split(","), 0)).toBe(1202161486)
    expect(task2("67,7,59,61".split(","), 0)).toBe(754018)
    expect(task2("67,x,7,59,61".split(","), 0)).toBe(779210)
    expect(task2("67,7,x,59,61".split(","), 0)).toBe(1261476)
    expect(task2("17,x,13,19".split(","), 3399)).toBe(3417)
})