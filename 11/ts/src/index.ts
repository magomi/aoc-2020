import * as fs from "fs";

import { Plan } from './plan';

const file = fs.readFileSync("seats_03.data", 'utf8')
var lines:string[] = []
file.split("\n").forEach(line => {
    lines.push(line.trim())
});

var plan = new Plan(lines);
var nextGenerationPlan = plan.calcNextGeneration();
while(!plan.isSame(nextGenerationPlan)) {
    plan = nextGenerationPlan;
    nextGenerationPlan = plan.calcNextGeneration();
}
console.log(`${nextGenerationPlan.countOccupiedSeats()} seats are occupied`);

// var plan = new Plan(lines);
// var nextGenerationPlan = plan.calcNextGenerationNew();
// while(!plan.isSame(nextGenerationPlan)) {
//     plan = nextGenerationPlan;
//     nextGenerationPlan = plan.calcNextGenerationNew();
// }
// console.log(`${nextGenerationPlan.countOccupiedSeats()} seats are occupied`);