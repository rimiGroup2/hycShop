import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moduleA from './moduleA'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        a:moduleA,
    },
    strict : true,
    state : {
        testList : []
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

