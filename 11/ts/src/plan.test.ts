import * as fs from "fs";

import { Plan } from './plan';
import { Seat } from './plan';
import { Position } from './plan';


function load(filename:string):string[] {
    const file = fs.readFileSync(filename, 'utf8')
    var lines:string[] = []
    file.split("\n").forEach(line => {
        lines.push(line.trim())
    });
    return lines;
}      

test("get width/height", () => {
    expect(new Plan(['...', '...']).getHeight()).toBe(2);
    expect(new Plan(['...', '...']).getWidth()).toBe(3);
})

test("get element at", () => {
    expect(new Plan(['#..', '...']).getSeatAt(0, 0)).toStrictEqual(new Seat(true, true));
    expect(new Plan(['...', '.#.']).getSeatAt(1, 1)).toStrictEqual(new Seat(true, true));
    expect(new Plan(['...', '..#']).getSeatAt(2, 1)).toStrictEqual(new Seat(true, true));
    expect(new Plan(['...', '..L']).getSeatAt(2, 1)).toStrictEqual(new Seat(true, false));
    expect(new Plan(['...', '..L']).getSeatAt(2, 0)).toStrictEqual(new Seat(false, false));
})

test("equal positions", () => {
    let position = new Position(1, 4);
    expect(position.equals(new Position(1, 4))).toBe(true);
    expect(position.equals(new Position(1, 2))).toBe(false);
})


test("equal seats", () => {
    let position = new Seat(true, false);
    expect(position.equals(new Seat(true, false))).toBe(true);
    expect(position.equals(new Seat(false, false))).toBe(false);
    expect(position.equals(new Seat(false, true))).toBe(false);
    expect(position.equals(new Seat(true, true))).toBe(false);
})

test("load positions from seats_01.data", () => {
    var data:string[] = load("seats_01.data");
    var plan = new Plan(data);
    expect(plan.getHeight()).toBe(10);
    expect(plan.getWidth()).toBe(10);
    expect(plan.getSeatAt(0, 0)?.isSeat).toBe(true);
    expect(plan.getSeatAt(0, 0)?.isOccupied).toBe(false);
    expect(plan.getSeatAt(1, 0)?.isSeat).toBe(false);
    expect(plan.getSeatAt(1, 0)?.isOccupied).toBe(false);
});

test("load positions from seats_02.data", () => {
    var data:string[] = load("seats_02.data");
    var plan = new Plan(data);
    expect(plan.getSeatAt(0, 0)?.isSeat).toBe(true);
    expect(plan.getSeatAt(0, 0)?.isOccupied).toBe(true);
    expect(plan.getSeatAt(1, 0)?.isSeat).toBe(false);
    expect(plan.getSeatAt(1, 0)?.isOccupied).toBe(false);
    expect(plan.getSeatAt(2, 0)?.isSeat).toBe(true);
    expect(plan.getSeatAt(2, 0)?.isOccupied).toBe(false);
    expect(plan.getSeatAt(0, 1)?.isSeat).toBe(true);
    expect(plan.getSeatAt(0, 1)?.isOccupied).toBe(true);
});

test("calc occupied neighbours from seats_02.data", () => {
    var data:string[] = load("seats_02.data");
    var plan = new Plan(data);
    expect(plan.calcOccupiedNeighbourPositions(0, 0)).toBe(2);
    expect(plan.calcOccupiedNeighbourPositions(2, 0)).toBe(4);
    expect(plan.calcOccupiedNeighbourPositions(4, 2)).toBe(5);
});

// test("toString", () => {
//     var data = ["#.#", "LLL", ".L#"];
//     var plan = new Plan(data);
//     expect(plan.toString()).toBe("#.#\nLLL\n.L#\n");
// })

test("is same", () => {
    var plan01 = new Plan(["#.#", "LLL", ".L#"]);
    var plan02 = new Plan(["#.#", "LLL", ".L#"]);
    expect(plan01.isSame(plan02)).toBe(true);

    var plan03 = new Plan(["#.#", "L.L", ".L#"]);
    expect(plan01.isSame(plan03)).toBe(false);
})


test("calc next generation from seats_01.data", () => {
    var data:string[] = load("seats_01.data");
    var plan = new Plan(data);
    var nextGenerationPlan = plan.calcNextGeneration();
    expect(nextGenerationPlan.getSeatAt(0, 0)?.isOccupied).toBe(true);
    expect(nextGenerationPlan.getSeatAt(3, 3)?.isOccupied).toBe(true);

    var nextGenerationPlan = nextGenerationPlan.calcNextGeneration();
    expect(nextGenerationPlan.getSeatAt(0, 0)?.isOccupied).toBe(true);
    expect(nextGenerationPlan.getSeatAt(3, 3)?.isOccupied).toBe(false);

    var nextGenerationPlan = nextGenerationPlan.calcNextGeneration();
})

test("count occupied seats", () => {
    expect(new Plan(["#.#", "LLL", ".L#"]).countOccupiedSeats()).toBe(3);
    expect(new Plan(["#.#", "###", ".L#"]).countOccupiedSeats()).toBe(6);
    expect(new Plan(["...", "L.L", ".LL"]).countOccupiedSeats()).toBe(0);
})

test("calc stable generation from seats_01.data", () => {
    var data:string[] = load("seats_01.data");
    var plan = new Plan(data);
    var nextGenerationPlan = plan.calcNextGeneration();
    while(!plan.isSame(nextGenerationPlan)) {
        plan = nextGenerationPlan;
        nextGenerationPlan = plan.calcNextGeneration();
    }
    expect(plan.countOccupiedSeats()).toBe(37);
})

test("calc visibleOccupiedNeighbours", () => {
    expect(new Plan([".#.", ".#.", "..."]).calcOccupiedNeighbourSeats(1,1)).toBe(1);
    expect(new Plan(["..#", ".#.", "..."]).calcOccupiedNeighbourSeats(1,1)).toBe(1);
    expect(new Plan(["...", ".##", "..."]).calcOccupiedNeighbourSeats(1,1)).toBe(1);
    expect(new Plan(["...", ".#.", "..#"]).calcOccupiedNeighbourSeats(1,1)).toBe(1);
    expect(new Plan(["...", ".#.", ".#."]).calcOccupiedNeighbourSeats(1,1)).toBe(1);
    expect(new Plan(["...", ".#.", "#.."]).calcOccupiedNeighbourSeats(1,1)).toBe(1);
    expect(new Plan(["...", "##.", "..."]).calcOccupiedNeighbourSeats(1,1)).toBe(1);
    expect(new Plan(["#..", ".#.", "..."]).calcOccupiedNeighbourSeats(1,1)).toBe(1);
    
    var plan = new Plan([ ".......#.", 
                          "...#.....", 
                          ".#.......", 
                          ".........", 
                          "..#L....#", 
                          "....#....", 
                          ".........", 
                          "#........", 
                          "...#....."]);
    expect(plan.calcOccupiedNeighbourSeats(3, 4)).toBe(8);

    var plan = new Plan([".............", ".L.L.#.#.#.#.", "............."]);
    expect(plan.calcOccupiedNeighbourSeats(1, 1)).toBe(0);
})

test("calc next generation (new) from seats_01.data", () => {
    var data:string[] = load("seats_01.data");
    var plan = new Plan(data);
    console.log(plan.toString());
   
    var nextGenerationPlan = plan.calcNextGenerationNew();
    console.log(nextGenerationPlan.toString());
    expect(nextGenerationPlan.getSeatAt(0, 0)?.isOccupied).toBe(true);
    expect(nextGenerationPlan.getSeatAt(3, 3)?.isOccupied).toBe(true);
    
    nextGenerationPlan = nextGenerationPlan.calcNextGenerationNew();
    console.log(nextGenerationPlan.toString());
    expect(nextGenerationPlan.getSeatAt(0, 0)?.isOccupied).toBe(true);
    expect(nextGenerationPlan.getSeatAt(3, 3)?.isOccupied).toBe(false);
    
    nextGenerationPlan = nextGenerationPlan.calcNextGenerationNew();
    console.log(nextGenerationPlan.toString());
    expect(nextGenerationPlan.getSeatAt(0, 0)?.isOccupied).toBe(true);
    expect(nextGenerationPlan.getSeatAt(3, 3)?.isOccupied).toBe(true);
})

test("calc stable generation (new) from seats_01.data", () => {
    var data:string[] = load("seats_01.data");
    var plan = new Plan(data);
    var nextGenerationPlan = plan.calcNextGenerationNew();
    while(!plan.isSame(nextGenerationPlan)) {
        plan = nextGenerationPlan;
        nextGenerationPlan = plan.calcNextGenerationNew();
    }
    expect(plan.countOccupiedSeats()).toBe(26);
})
