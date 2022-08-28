import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 模块
	modules: {
		search,
		user
	}
})

export default store
