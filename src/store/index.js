import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    strict : true,
    state : {
        testList : [],
        test : 1
    },
    getters: {

    },
    mutations: {
        load(state,data){
            state.testList = data;
        }
    },
    actions: {
        loadList(context){
            axios.get('../../static/data.json')
            .then((res) => {
                context.commit('load',res.data)
            })
            .catch(() => {
                alert('数据加载错误！')
            })
        }
    }
})

