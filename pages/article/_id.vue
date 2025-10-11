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
			<ArticleBanner
				:src="banner"
				:h1="h1"
				:short_desc="short_desc"
				:date="data.body.update_at.slice(0, 10)"
				:author_permalink="data.body.authors.length ? data.body.authors[0].permalink : ''"
				:author_title="data.body.authors.length ? data.body.authors[0].title : ''"
			/>
			<ContentWrapper v-if="data.body.content_1">
				<ContentSupport :value="data.body.content_1" />
			</ContentWrapper>
			<TopCasinoList v-if="casinos.length" :posts="casinos" />
			<ContentWrapper v-if="data.body.content_2">
				<ContentSupport :value="data.body.content_2" />
			</ContentWrapper>
			<ContentWrapper v-if="data.body.content_3">
				<ContentSupport :value="data.body.content_3" />
			</ContentWrapper>
			<ContentWrapper v-if="data.body.content_4">
				<ContentSupport :value="data.body.content_4" />
			</ContentWrapper>
			<ContentWrapper v-if="data.body.content_5">
				<ContentSupport :value="data.body.content_5" />
			</ContentWrapper>
			<ContentWrapper v-if="data.body.content_6">
				<ContentSupport :value="data.body.content_6" />
			</ContentWrapper>
			<ContentWrapper v-if="data.body.content_7">
				<ContentSupport :value="data.body.content_7" />
			</ContentWrapper>
			<ContentWrapper v-if="data.body.content_8">
				<ContentSupport :value="data.body.content_8" />
			</ContentWrapper>
			<ContentWrapper v-if="data.body.content_9">
				<ContentSupport :value="data.body.content_9" />
			</ContentWrapper>
			<ContentWrapper v-if="data.body.content_10">
				<ContentSupport :value="data.body.content_10" />
			</ContentWrapper>
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
import ArticleBanner from '~/components/article_banner'
import ContentSupport from '~/components/content/text_2'
import ContentWrapper from '~/components/content_wrapper'

export default {
	name: 'article_single',
	mixins: [pageTemplate, components],
	components: {
		Gradient,
		Breadcrumbs,
		gradientWrapper,
		AuthorSummary,
		TopCasinoList,
		ArticleBanner,
		ContentSupport,
		ContentWrapper
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
				const { author_summary, authors, casinos, banner, h1, short_desc } = response.data.body
				const [author] = authors
				return { data, author_summary, author, casinos, banner, short_desc, h1 }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	}
}
</script>
<style scoped></style>
