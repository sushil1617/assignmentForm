import { createStore } from "vuex";


export default createStore({

    state: {
        token: null,
    },
    getters: {
       GET_ID(state){
          return state.token;
       }
    },
    mutations: {
       UPDATE_ID(state,token){
            state.token = token;
       }
    },
    actions: {
       SET_ID({ commit }, token){
          commit("UPDATE_TOKEN", token);
       }
    }
})