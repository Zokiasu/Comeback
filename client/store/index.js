// your-project/store/index.js

export const state = () => ({
    authUser: null,
    isAdmin: null,
    tokenUser: null,
    dataUser: null
})

export const getters = {
    GET_USER: (state) => {
        return state.authUser
    },

    GET_DATA_USER: (state) => {
        return state.dataUser
    },

    GET_TOKEN_USER: (state) => {
        return state.tokenUser
    }
}

export const actions = {
    async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
        if (!authUser) {
            //await dispatch('cleanupAction')
            return
        } else {
            const { uid, email, emailVerified, displayName, photoURL } = authUser

            commit('SET_USER', {
              uid,
              email,
              emailVerified,
              displayName,
              photoURL,
              isAdmin: claims.custom_claim
            })
        }
    }
}

export const mutations = {

    SET_DATA_USER (state, value) {
        state.dataUser = value
    },

    SET_TOKEN_USER (state, value) {
        state.tokenUser = value
    },

    SET_USER: (state, payload) => {
        state.authUser = payload;
    }
}