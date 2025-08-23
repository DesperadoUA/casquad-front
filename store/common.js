import config from '~/config'
export const state = () => ({
	common: {
		showSearch: false,
		mobileMenu: false,
		headers: undefined,
		geo: config.DEFAULT_GEO
	}
})
export const mutations = {
	setShowSearch(state, data) {
		state.common.showSearch = data
	},
	setMobileMenu(state, data) {
		state.common.mobileMenu = data
	},
	setHeaders(state, data) {
		state.common.headers = data
	},
	setGeo(state, data) {
		state.common.geo = config.AVAILABLE_GEO.has(data) ? data : config.DEFAULT_GEO
	}
}
export const actions = {
	setShowSearch({ commit }, data) {
		commit('setShowSearch', data)
	},
	setMobileMenu({ commit }, data) {
		commit('setMobileMenu', data)
	},
	setHeaders({ commit }, data) {
		commit('setHeaders', data)
	},
	setGeo({ commit }, data) {
		commit('setGeo', data)
	}
}
export const getters = {
	getShowSearch(state) {
		return state.common.showSearch
	},
	getMobileMenu(state) {
		return state.common.mobileMenu
	},
	getHeaders(state) {
		return state.common.headers
	},
	getGeo(state) {
		return state.common.geo
	}
}
