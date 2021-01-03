import * as fs from "fs";
import { SimpleCalculator, AdvancedCalculator } from "./calc";

const file = fs.readFileSync("expressions.data", 'utf8')

{
  let result = 0;
  let calculator = new SimpleCalculator();
  for (let expression of file.split("\n")) {
    result = result + calculator.evaluate(expression);
  }
  console.log(`result part 1: ${result}`);
}

{
  var result = 0;
  var calculator = new AdvancedCalculator();
  for (var expression of file.split("\n")) {
    result = result + calculator.evaluate(expression);
  }
  console.log(`result part 2: ${result}`);
}