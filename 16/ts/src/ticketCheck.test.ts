import { checkField, checkFields, checkUniquePositions, filterValidTickets, findMatchingRules, initRules, mapTicketFields, sumInvalidFields } from "./ticketCheck";

var rulesRaw = ["class: 1-3 or 5-7", "row: 6-11 or 33-44", "seat: 13-40 or 45-50"];
var fields = [[7,3,47], [40,4,50], [55,2,20], [38,6,12]];

test("initChecks", () => {
  var rules = initRules(rulesRaw);
  expect(rules.length).toBe(3);
  expect(rules[1]).toStrictEqual({name: "row", ranges: [{lower: 6, upper: 11}, {lower: 33, upper: 44}]});
})

test("checkField", () => {
  var rules = initRules(rulesRaw);
  expect(checkField(rules, 4)).toBe(false);
  expect(checkField(rules, 40)).toBe(true);
})

test("checkFields", () => {
  var rules = initRules(rulesRaw);
  expect(checkFields(rules, [7, 3, 47])).toBe(true);
  expect(checkFields(rules, [40, 4, 50])).toBe(false);
  expect(checkFields(rules, [55, 2, 20])).toBe(false);
  expect(checkFields(rules, [38, 6, 12])).toBe(false);
})

test("filterValdiTickets", () => {
  var rules = initRules(rulesRaw);
  expect(filterValidTickets(rules, fields).length).toBe(1)
})

test("sumInvalidFields", () => {
  var rules = initRules(rulesRaw);
  expect(sumInvalidFields(rules, fields)).toBe(71);
})

test("findMatchingRules", () => {
  var rules = initRules(rulesRaw);
  expect(findMatchingRules(rules, 7).length).toBe(2);
  expect(findMatchingRules(rules, 7).includes("class")).toBe(true);
  expect(findMatchingRules(rules, 7).includes("row")).toBe(true);

  expect(findMatchingRules(rules, 3).length).toBe(1);
  expect(findMatchingRules(rules, 3).includes("class")).toBe(true);

  expect(findMatchingRules(rules, 47).length).toBe(1);
  expect(findMatchingRules(rules, 47).includes("seat")).toBe(true);
})

test("checkUniquePositions", () => {
  expect(checkUniquePositions(new Map([[1, ["seat"]], [2, ["seat"]]]))).toBe(false);
  expect(checkUniquePositions(new Map([[1, ["seat"]], [2, ["seat", "row"]]]))).toBe(false);
  expect(checkUniquePositions(new Map([[1, ["seat", "class"]], [2, ["row", "price"]]]))).toBe(false);
  expect(checkUniquePositions(new Map([[1, []], [2, ["row"]]]))).toBe(false);
  expect(checkUniquePositions(new Map([[1, ['seat']], [2, ["row"]]]))).toBe(true);
  expect(checkUniquePositions(new Map([[1, ["seat"]], [2, ["price"]]]))).toBe(true);
})

test("mapTicketFields", () => {
  var rules = initRules(["class: 1-3 or 5-7", "row: 6-11 or 33-44", "seat: 13-40 or 45-50"]);
  var tickets = [[7,3,47], [40,5,50], [55,2,20], [38,6,12]];
  var validTickets = filterValidTickets(rules, tickets)
  console.log(validTickets);
  var ticketFields = mapTicketFields(rules, validTickets);
  console.log(ticketFields);
})