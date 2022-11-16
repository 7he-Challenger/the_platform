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

  memberPresentation: {
    path: `${dashboard}/member-presentation`,
    name: 'Présentation des membres'
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
  },

  event_registration: {
    path: `${dashboard}/emploi-du-temps/registration`,
    name: 'Gestion d\'inscription des évènements'
  }
}

export default ROUTES