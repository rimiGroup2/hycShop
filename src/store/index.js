import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moduleA from './moduleA'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        a:moduleA,
    },
   
})

