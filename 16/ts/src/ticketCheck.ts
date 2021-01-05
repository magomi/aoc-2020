export type Range = {
  upper: number,
  lower: number
}

export function rangeToString(range: Range): string {
  return `(lower = ${range.lower}, upper = ${range.upper})`;
} 

export type Rule = {
  name: string,
  ranges: Range[]
}

export function initRules(rulesRaw: string[]): Rule[] {
  var rules: Rule[] = [];
  var regEx = /^([a-z\s]+):\s([0-9]+)-([0-9]+)\sor\s([0-9]+)-([0-9]+)$/
  rulesRaw.forEach(ruleRaw => {
    var matches = ruleRaw.match(regEx)
    if (matches) {
      rules.push({
        name: matches[1], 
        ranges: [
          {lower: parseInt(matches[2]), upper: parseInt(matches[3])}, 
          {lower: parseInt(matches[4]), upper: parseInt(matches[5])}
        ]});
    }  
  });
  return rules;
}

export function checkField(rules: Rule[], field: number): boolean {
  for (var i = 0; i < rules.length; i ++) {
    for (var j = 0; j < rules[i].ranges.length; j ++) {
      if (field >= rules[i].ranges[j].lower && field <= rules[i].ranges[j].upper) {
        return true;
      }
    };
  };
  return false;
}

export function checkFields(rules: Rule[], fields: number[]): boolean {
  for (var field of fields) {
    if (!checkField(rules, field)) {
      return false;
    }
  }
  return true;
}

export function filterValidTickets(rules: Rule[], tickets: number[][]): number[][] {
  var filteredTickets: number[][] = [];
  tickets.forEach(ticket => {
    if (checkFields(rules, ticket)) {
      filteredTickets.push(ticket);
    }
  });
  return filteredTickets;
}

export function findMatchingRules(rules: Rule[], field: number): string[] {
  var matchingRules: string[] = [];
  for (var rule of rules) {
    for (var range of rule.ranges) {
      if (field >= range.lower && field <= range.upper) {
        matchingRules.push(rule.name);
        break;
      }
    }
  }
  return matchingRules;
}

export function sumInvalidFields(rules: Rule[], fields: number[][]): number {
  var sum = 0;
  fields.forEach(innerFields => {
    innerFields.forEach(field => {
      if (!checkField(rules, field)) {
        sum = sum + field;
      }
    });
  });
  return sum;
}

export function mapTicketFields(rules: Rule[], tickets: number[][]): Map<number, string[]> {
  var fieldPositions = new Map<number, string[]>();
  for (var i = 0; i < rules.length; i++) {
    fieldPositions.set(i, []);
  }
  for (var ticket of tickets) {
    for (var i = 0; i < ticket.length; i ++) {
      var field = ticket[i];
      var fieldNames = findMatchingRules(rules, field);
      var currentFieldNames = fieldPositions.get(i);
      var newFieldNames: string[] = []
      if (currentFieldNames == undefined || currentFieldNames.length == 0) {
        newFieldNames = fieldNames;
      } else {
        for (var currentField of currentFieldNames) {
          // console.log(`currentField = ${currentField}`);
          if (fieldNames.includes(currentField)) {
            newFieldNames.push(currentField);
          }
        }
        // console.debug(`fieldNames = ${fieldNames}, currentFieldNames = ${currentFieldNames}, newFieldNames = ${newFieldNames  }`);
      }
      fieldPositions.set(i, newFieldNames);
    }
    // console.log(fieldPositions);
  }
  return fieldPositions;
}

export function checkUniquePositions(fieldPositions: Map<number, string[]>): boolean {
  var foundRuleNames: string[] = []
  for (var [position, ruleNames] of Array.from(fieldPositions)) {
    if (ruleNames.length != 1) {
      return false;
    } 
    if (foundRuleNames.includes(ruleNames[0])) {
      return false;
    }
    foundRuleNames.push(ruleNames[0]);
  };
  return true;
}

export function cleanupTicketFields(ticketFields: Map<number, string[]>): Map<number, string> {
  var cleanedTicketFields = new Map<number, string>();
  var tmpTicketFields = ticketFields;
  for (var i = 0; i < ticketFields.size; i ++) {
    ticketFields.forEach((fieldNames, position) => {
      if (fieldNames.length == 1) {
        cleanedTicketFields.set(position, fieldNames[0]);
        tmpTicketFields.for await (const iterator of object) {
          
        }
      }
    });


    for (var j = 0; j < ticketFields.size; i ++) {
      if (ticketFields.get(i).length == 1) {
        cleanedTicketFields.set(i, ticketFields.get(i).[0])
      }
    }
  }
  return cleanedTicketFields;
}