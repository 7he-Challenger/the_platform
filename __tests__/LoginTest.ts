import "@testing-library/jest-dom/extend-expect";
import INPUT_VALIDATION from "~constantes/input-validation";
import { emailRule } from "~hooks/useLogin";

test("Check rule login user", () => {
  const goodValue = emailRule('user')
  const wrongValue = emailRule('')

  expect(goodValue).toBe(false)
  expect(wrongValue).toBe(INPUT_VALIDATION.FIELD_REQUIRED)
});

test("Check rule login password", () => {
  const goodValue = emailRule('user')
  const wrongValue = emailRule('')

  expect(goodValue).toBe(false)
  expect(wrongValue).toBe(INPUT_VALIDATION.FIELD_REQUIRED)
});