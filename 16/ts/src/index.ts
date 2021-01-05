import * as fs from "fs";
import { filterValidTickets, initRules, mapTicketFields, sumInvalidFields } from "./ticketCheck";

const rulesFile = fs.readFileSync("rules_01.data", 'utf8');
var rules = initRules(rulesFile.split("\r\n"));

var fields: number[][] = [];
const fieldsFile = fs.readFileSync("nearbyTickets_01.data", "utf-8");
fieldsFile.split("\n").forEach(ticketFieldsStr => {
  var ticketFields: number[] = [];
  ticketFieldsStr.split(",").forEach(field => {
    ticketFields.push(parseInt(field));    
  });
  fields.push(ticketFields);
});
console.log(`solution part 1: ${sumInvalidFields(rules, fields)}`);

// var rulesRaw = ["class: 1-3 or 5-7", "row: 6-11 or 33-44", "seat: 13-40 or 45-50"];
// var rules = initRules(rulesRaw);
// console.log(rulesRaw);
// var tickets = [[7,3,47], [40,5,50], [55,2,20], [38,6,12]];
// var validTickets = filterValidTickets(rules, tickets)
// console.log(validTickets);
// var ticketFields = mapTicketFields(rules, validTickets);
// console.log(ticketFields);

var validTickets = filterValidTickets(rules, fields)
var ticketFields = mapTicketFields(rules, validTickets);
console.log(ticketFields);

