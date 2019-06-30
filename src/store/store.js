import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favouritesCount: 0,
    favouritesList: [],
    formattedRes: []
  },
  mutations: {
    updateFavourites (state, payload) {
      // update localStorage and then update state
      state.favouritesList = payload.favouritesList
      state.favouritesCount = Object.keys(payload.favouritesList).length
    },
    updateFormattedRes (state, payload) {
      state.formattedRes = payload.formattedRes
    }
  }
})
