import DAL_Page from '~/DAL/static_pages'
import helper from '~/helpers/helpers'
import DefaultPage from '~/components/default_pages'
import components from '~/mixins/components'
import pageTemplate from '~/mixins/pageTemplate'

export default {
	layout: 'default',
	components: { DefaultPage },
	mixins: [components, pageTemplate],
	async asyncData({ route }) {
		const slug = route.path.replace(/^\/|\/$/g, '')
		const response = await DAL_Page.getData({ url: slug })
		const data = helper.headDataMixin(response.data, route)

		const {
			content = '',
			h1 = '',
			title = '',
			update_at = '',
			faq = [],
			faq_title = '',
			authors = [],
			author_summary = ''
		} = data.body || {}

		const [author = {}] = authors

		return { data, content, h1, title, update_at, faq, faq_title, author, author_summary }
	}
}
