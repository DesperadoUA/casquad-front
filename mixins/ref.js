import config from '~/config'

export default {
	props: {
		refLinks: {
			type: [Object, Array],
			default() {
				return {}
			}
		}
	},
	methods: {
		refActivate(links, geo) {
			// CMS may have no link for the visitor country, WORLD is the global fallback
			const map = links && !Array.isArray(links) ? links : {}
			const link = map[geo] || map[config.DEFAULT_GEO]
			if (link) window.open(link, '_blank')
		}
	}
}
