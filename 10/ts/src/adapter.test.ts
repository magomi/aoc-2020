import { load } from './adapter';
import { calcDifferences } from './adapter';
import { calcVariants } from './adapter';

test("load adapter_01.data", () => {
  var adapters = load("adapter_01.data")
  expect(adapters.length).toBe(31);
});

test("calc differences", () => {
  var adapters = load("adapter_01.data")
  expect(calcDifferences(adapters)).toBe(220);
})

test("calc variants", () => {
  var adapters = load("adapter_01.data")
  expect(calcVariants(adapters)).toBe(19208);
})

