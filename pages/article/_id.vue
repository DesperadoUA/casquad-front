<template>
	<main class="main_wrapper_slots">
		<Gradient modifier="large" />
		<div class="container z-index-3 main_gap">
			<div class="h1_wrapper">
				<gradientWrapper>
					<div class="breadcrumbs_wrapper">
						<Breadcrumbs
							:value="[
								{
									title: t('BREADCRUMB_MAIN_PAGE'),
									permalink: '/'
								},
								{
									title: t('BREADCRUMB_NEWS_TITLE_PAGE'),
									permalink: `/${newsRootSlug}`
								},
								{
									title: data.body.title,
									permalink: ''
								}
							]"
						/>
					</div>
				</gradientWrapper>
			</div>
			<TopCasinoList :posts="casinos" />
			<div class="container" v-if="author_summary && author">
				<AuthorSummary
					:social="author.social"
					:short_desc="author_summary"
					:title="author.title"
					:create_at="author.create_at.slice(0, 10)"
					:position="author.position"
					:img="author.thumbnail"
					:totalPosts="author.total_posts || 0"
					:role="badgeList[author.role]"
					:roleText="author.role"
					:permalink="author.permalink"
				/>
			</div>
		</div>
		<Cookies />
	</main>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import pageTemplate from '~/mixins/pageTemplate'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import { NEWS_ROOT_SLUG } from '~/constants'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper'
import AuthorSummary from '~/components/author_summary'
import config from '~/config'
import TopCasinoList from '~/components/top_casino_list'

export default {
	name: 'article_single',
	mixins: [pageTemplate, components],
	components: {
		Gradient,
		Breadcrumbs,
		gradientWrapper,
		AuthorSummary,
		TopCasinoList
	},
	layout: 'default',
	data: () => {
		return {
			newsRootSlug: NEWS_ROOT_SLUG,
			badgeList: config.AUTHOR_BADGE_LIST
		}
	},
	async asyncData({ route, error }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request.postType('article').url(route.params.id).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { author_summary, authors, casinos } = response.data.body
				const [author] = authors
				return { data, author_summary, author, casinos }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	}
}
</script>
<style scoped></style>
