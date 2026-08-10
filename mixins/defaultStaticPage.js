import DAL_Page from '~/DAL/static_pages'
import helper from '~/helpers/helpers'
import DefaultPage from '~/components/default_pages'
import components from '~/mixins/components'
import pageTemplate from '~/mixins/pageTemplate'
import geo from '~/mixins/geo'

function pickStaticBody(responseData, route) {
	const data = helper.headDataMixin(responseData, route)
	const body = data.body || {}
	const {
		content = '',
		h1 = '',
		title = '',
		update_at = '',
		faq = [],
		faq_title = '',
		authors = [],
		author_summary = '',
		casino: casinoRaw,
		pros: prosRaw,
		cons: consRaw,
		pros_cons_title = '',
		pros_title = '',
		cons_title = '',
		screenshots: screenshotsRaw,
		screenshots_title = '',
		toc: tocRaw,
		toc_enabled = 0
	} = body
	const casino = Array.isArray(casinoRaw) ? casinoRaw : []
	const pros = Array.isArray(prosRaw) ? prosRaw : []
	const cons = Array.isArray(consRaw) ? consRaw : []
	const screenshots = Array.isArray(screenshotsRaw) ? screenshotsRaw : []
	const toc = Array.isArray(tocRaw) ? tocRaw : []
	const [author = null] = authors
	return {
		data,
		content,
		h1,
		title,
		update_at,
		faq,
		faq_title,
		author,
		author_summary,
		casino,
		pros,
		cons,
		pros_cons_title,
		pros_title,
		cons_title,
		screenshots,
		screenshots_title,
		toc,
		toc_enabled
	}
}

export default {
	layout: 'default',
	components: { DefaultPage },
	mixins: [components, pageTemplate, geo],
	async asyncData({ route, store, error }) {
		const slug = route.path.replace(/^\/|\/$/g, '')
		const geoParam = store.getters['common/getGeo']
		try {
			const response = await DAL_Page.getData({ url: slug, geo: geoParam })
			const body = response.data && response.data.body
			const isMissing =
				response.data.confirm === 'error' ||
				!body ||
				Array.isArray(body) ||
				typeof body !== 'object'
			if (isMissing) {
				return error({ statusCode: 404, message: 'Post not found' })
			}
			return pickStaticBody(response.data, route)
		} catch (e) {
			return error({ statusCode: 404, message: 'Post not found' })
		}
	},
	watch: {
		async geo() {
			const slug = this.$route.path.replace(/^\/|\/$/g, '')
			const geoParam = this.$store.getters['common/getGeo']
			try {
				const response = await DAL_Page.getData({ url: slug, geo: geoParam })
				const body = response.data && response.data.body
				const isMissing =
					response.data.confirm === 'error' ||
					!body ||
					Array.isArray(body) ||
					typeof body !== 'object'
				if (!isMissing) {
					Object.assign(this, pickStaticBody(response.data, this.$route))
				}
			} catch (e) {}
		}
	}
}
