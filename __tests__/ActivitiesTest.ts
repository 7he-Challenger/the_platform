import "@testing-library/jest-dom/extend-expect";
import { formatActivityDataForm } from "~lib/format";
test("Check brundcrumb generator dashboard", () => {
  const data = {
    id: null,
    title: "Test",
    description: "",
    locale: "",
    intervenant: "",
    sponsors: [''],
    type: "3"
  }

  const expected = {
    title: "Test",
    description: "",
    locale: "",
    intervenant: "",
    sponsors: [],
    type: 3
  }

  const result = formatActivityDataForm(data)

  expect(result).toEqual(expected)
});