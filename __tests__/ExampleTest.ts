import "@testing-library/jest-dom/extend-expect";
import { addition } from '~logics/utils'

test("Check for example test addition", () => {
  const result = addition(2, 2)

  expect(result).toEqual(expect.any(Number))
  expect(result).toBe(4)
});