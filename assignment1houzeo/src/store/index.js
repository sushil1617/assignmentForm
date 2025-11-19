import { createStore } from "vuex";


export default createStore({

    state: {
        id: null,
    },
    getters: {
       GET_ID(state){
          return state.id;
       }
    },
    mutations: {
       UPDATE_ID(state,id){
            state.id = id;
       }
    },
    actions: {
       SET_ID({ commit }, id){
          commit("UPDATE_ID", id);
       }
    }
})