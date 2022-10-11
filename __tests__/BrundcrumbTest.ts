import "@testing-library/jest-dom/extend-expect";
import { formatRouteName, generateBrundCrumb } from "~lib/format";

test("Check brundcrumb generator dashboard", () => {
  const dashboard = 'dashboard';
  const dashboardBrundcrumb = generateBrundCrumb(dashboard)
  const dashboardBrundcrumbName = formatRouteName(dashboard)

  expect(dashboardBrundcrumbName).toBe('Dashboard')

  expect(dashboardBrundcrumb).toEqual([
    { name: 'Dashboard', url: '/dashboard' }
  ])
});

test("Check brundcrumb generator emploi du temps", () => {
  const emploiDuTemps = 'dashboard/emploi-du-temps';
  const emploiDuTempsBrundcrumb  = generateBrundCrumb(emploiDuTemps)
  const emploiDuTempsBrundcrumbName = formatRouteName('emploi-du-temps')

  expect(emploiDuTempsBrundcrumbName).toBe('Emploi du temps')

  expect(emploiDuTempsBrundcrumb).toEqual([
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Emploi du temps', url: '/dashboard/emploi-du-temps' }
  ])
});