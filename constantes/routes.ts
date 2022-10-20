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
  },

  calendrier_activity: {
    path: `${dashboard}/emploi-du-temps/calendrier`,
    name: 'Calendrier d\'activité'
  }
}

export default ROUTES