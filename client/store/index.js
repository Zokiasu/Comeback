export const state = () => ({
  user: null
})

export const getters = {
  GET_USER: (state) => {
      return state.user
  },
  isLoggedIn(state) {
      let userLoggedIn = false
      if (state.user) {
          userLoggedIn = true
      }
      return userLoggedIn
  }
}

export const actions = {
  async onAuthStateChangedAction(state, { authUser, claims }) {
    console.log('onAuthStateChangedAction', authUser)
    if (!authUser) {
      state.commit('SET_USER', authUser)
    } else {
      const { uid, email, refreshToken, displayName, photoURL } = authUser
      state.commit('SET_USER', {
          uid,
          email,
          refreshToken,
          displayName,
          photoURL
      });
    }
  },

  async nuxtServerInit({ dispatch, commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
      console.log('nuxtServerInit - authUser', authUser);
      const { uid, email } = authUser

      await dispatch('onAuthStateChangedAction', {
        authUser,
        claims,
        token
      });
    }
  }
}

export const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  }
}