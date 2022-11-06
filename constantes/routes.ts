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

  member: {
    path: `${dashboard}/member`,
    name: 'Membre'
  },

  profile: {
    path: `${dashboard}/profile`,
    name: 'Profile'
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