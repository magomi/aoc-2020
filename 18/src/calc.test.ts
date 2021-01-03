import { AdvancedCalculator, SimpleCalculator } from "./calc";

describe("SimpleCalculator", () => {
  test("evaluateSimpleExpression", () => {
    var calculator = new SimpleCalculator();
    expect(calculator.evaluateBaseExpression("1 + 2")).toBe(3);
    expect(calculator.evaluateBaseExpression("  1 + 10  ")).toBe(11);
    expect(calculator.evaluateBaseExpression(" ( 1 + 2)")).toBe(3);
    expect(calculator.evaluateBaseExpression("1 * 2")).toBe(2);
    expect(calculator.evaluateBaseExpression("2 + 1 * 2")).toBe(6);
  });

  test("evaluate", () => {
    var calculator = new SimpleCalculator();
    expect(calculator.evaluate("1 + 2")).toStrictEqual(3);
    expect(calculator.evaluate("1 + ( 2 * 3)")).toStrictEqual(7);
    expect(calculator.evaluate("1 + (2 * 3) + (4 * (5 + 6))")).toStrictEqual(51);
    expect(calculator.evaluate("2 * 3 + (4 * 5)")).toStrictEqual(26);
    expect(calculator.evaluate("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toStrictEqual(437);
    expect(calculator.evaluate("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")).toStrictEqual(12240);
    expect(calculator.evaluate("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")).toStrictEqual(13632);
  });
});

describe("AdvancedCalculator", () => {
  test("evaluateSimpleExpression", () => {
    var calculator = new AdvancedCalculator();
    expect(calculator.evaluatePlusExpression("1 + 2")).toBe(3);
    expect(calculator.evaluatePlusExpression("  1 + 10  ")).toBe(11);
    expect(calculator.evaluatePlusExpression(" ( 1 + 2)")).toBe(3);
    expect(calculator.evaluatePlusExpression("1 * 2")).toBe(2);
    expect(calculator.evaluatePlusExpression("2 + 1 * 2")).toBe(6);
    expect(calculator.evaluatePlusExpression("2 * 1 + 2")).toBe(6);
  });

  test("evaluate", () => {
    var calculator = new AdvancedCalculator();
    expect(calculator.evaluate("1 + 2")).toStrictEqual(3);
    expect(calculator.evaluate("1 + ( 2 * 3)")).toStrictEqual(7);
    expect(calculator.evaluate("1 + (2 * 3) + (4 * (5 + 6))")).toStrictEqual(51);
    expect(calculator.evaluate("2 * 3 + (4 * 5)")).toStrictEqual(46);
    expect(calculator.evaluate("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toStrictEqual(1445);
    expect(calculator.evaluate("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")).toStrictEqual(669060);
    expect(calculator.evaluate("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")).toStrictEqual(23340);
  });
});