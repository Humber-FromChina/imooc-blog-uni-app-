import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import user from './modules/user'
import video from './modules/video'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 模块
	modules: {
		search,
		user,
		video
	}
})

export default store
