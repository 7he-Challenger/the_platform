const dashboard = '/dashboard'

const ROUTES = {
  login: {
    path: '/login',
    name: 'Login'
  },

  dashboard: {
    path: dashboard,
    name: 'Dashboard'
  },
  emploi_du_temps: {
    path: `${dashboard}/emploi-du-temps`,
    name: 'Emploi du temps'
  }
}

export default ROUTES