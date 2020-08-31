export const state = () => ({
    course: 'Nuxt js is everyone',
    // weather: {}
});

export const actions= {
    nuxtServerInit ({ commit }, { req, app:{$cookies} }) {
    //   if (req.session.user) {
    //     commit('user', req.session.user)
    //   }
        if(req.headers.cookie){
            if($cookies.get('token')){
                commit('auth/setLoggedIn', true)
            }
        }
    }
  }