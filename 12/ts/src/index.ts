import * as V1 from "./nav-v1";
import * as V2 from "./nav-v2";

console.log(`aoc2020: day 13`);

var navigatorV1 = new V1.Navigator("./nav_01.data");
console.log(`\t#steps = ${navigatorV1.navSteps.length}`);
console.log(`\tfrist step = ${navigatorV1.navSteps[0]}`);
console.log(`\tlast step = ${navigatorV1.navSteps[navigatorV1.navSteps.length - 1]}`);
navigatorV1.cruise();
console.log(`traveled distance = ${navigatorV1.traveledDistance()}`);

var navigatorV2 = new V2.Navigator("./nav_01.data");
console.log(`\t#steps = ${navigatorV2.navSteps.length}`);
console.log(`\tfrist step = ${navigatorV2.navSteps[0]}`);
console.log(`\tlast step = ${navigatorV2.navSteps[navigatorV2.navSteps.length - 1]}`);
navigatorV2.cruise();
console.log(`traveled distance = ${navigatorV2.traveledDistance()}`);