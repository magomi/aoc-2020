export class SimpleCalculator {
  innerTermRegex = /\([\d\s+\*]+\)/;

  evaluate(expression: string): number {
    var match = expression.match(this.innerTermRegex);
    if (match) {
      expression = expression.replace(match[0], this.evaluate(match[0].substr(1, match[0].length - 2)).toString());
      return this.evaluate(expression);
    } else {
      return this.evaluateBaseExpression(expression);
    }
  }

  evaluateBaseExpression(expression: string): number {
    expression = expression.replace("(", "").replace(")", "").trim();

    var valRegex = /[\d]+/;
    var opRegex = /[\+\*]{1}/;
 
    var result = 0;

    var operator = "";
    var isFirst = true;
    for (var term of expression.split(/\s/)) {
      if (isFirst && term.match(valRegex)) {
        result = Number(term);
        isFirst = false;
      } else {
        if (term.match(opRegex)) {
          operator = term;
        } else if (term.match(valRegex)) {
          result = (operator == "+") ? (result + Number(term)) : (result * Number(term));  
        }
      }
    }

    return result;
  }
}

export class AdvancedCalculator {
  
  evaluate(expression: string): number {

    // process all "(x +|* y)" terms
    var innerTermRegex = /\([\d\s+\*]+\)/;
    var match = expression.match(innerTermRegex);
    if (match) {
      expression = expression.replace(match[0], this.evaluate(match[0].substr(1, match[0].length - 2)).toString());
      return this.evaluate(expression);
    } else {
      return this.evaluatePlusExpression(expression);
    }
  }

  evaluatePlusExpression(expression: string): number {

    // process all "x + y" terms
    let plusTermRegex = /\d+\s+\+{1}\s+\d+/;

    var match = expression.match(plusTermRegex);
    if (match) {
      expression = expression.replace(match[0], this.evaluateBaseExpression(match[0]).toString());
      return this.evaluatePlusExpression(expression);
    } else {
      return this.evaluateBaseExpression(expression);
    }
  }

  evaluateBaseExpression(expression: string): number {
    expression = expression.replace("(", "").replace(")", "").trim();

    var valRegex = /[\d]+/;
    var opRegex = /[\*\+]{1}/;
  
    var result = 0;

    var operator = "";
    var isFirst = true;
    for (var term of expression.split(/\s/)) {
      if (isFirst && term.match(valRegex)) {
        result = Number(term);
        isFirst = false;
      } else {
        if (term.match(opRegex)) {
          operator = term;
        } else if (term.match(valRegex)) {
          result = (operator == "+") ? (result + Number(term)) : (result * Number(term));  
        }
      }
    }

    return result;
  }
}