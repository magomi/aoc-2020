import { World as World3D } from "./cc3d";
import { World as World4D } from "./cc4d";
import * as fs from "fs";

var world3DDesc = fs.readFileSync("init.data", "utf-8");
var world3D = new World3D(undefined, world3DDesc);
world3D.createNextGeneration();
world3D.createNextGeneration();
world3D.createNextGeneration();
world3D.createNextGeneration();
world3D.createNextGeneration();
world3D.createNextGeneration();
console.log(`part 1 solution: ${world3D.livingCells.length} living cells`);

var worldDesc4D = fs.readFileSync("init.data", "utf-8");
var world4D = new World4D(undefined, worldDesc4D);
world4D.createNextGeneration();
world4D.createNextGeneration();
world4D.createNextGeneration();
world4D.createNextGeneration();
world4D.createNextGeneration();
world4D.createNextGeneration();
console.log(`part 2 solution: ${world4D.livingCells.length} living cells`);
