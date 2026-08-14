<template>
	<div>
		<main class="main_wrapper main_wrapper_slots">
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
										title: data.body.title,
										permalink: ''
									}
								]"
							/>
						</div>
					</gradientWrapper>
				</div>
				<ArticleBanner
					id="banner"
					:src="thumbnail"
					:h1="h1"
					:short_desc="short_desc"
					:date="update_at.slice(0, 10)"
					:author_permalink="authors.length ? authors[0].permalink : ''"
					:author_title="authors.length ? authors[0].title : ''"
				/>
			</div>
			<LatestNews v-if="news.length" :posts="news" :title="t('LAST_NEWS')" />
			<FunnelLoop v-if="funnels.length" :posts="funnels" :title="t('ALL_VIDEO_BREAKDOWNS')" schema />
			<Cookies />
		</main>
	</div>
</template>

<script>
import DAL_Page from '~/DAL/static_pages'
import pageTemplate from '~/mixins/pageTemplate'
import helper from '~/helpers/helpers'
import device from '~/mixins/device'
import Gradient from '~/components/gradient'
import Breadcrumbs from '~/components/breadcrumbs'
import components from '~/mixins/components'
import gradientWrapper from '~/components/gradient_wrapper'
import { NEWS_ROOT_SLUG } from '~/constants'
import ArticleBanner from '~/components/article_banner'
import LatestNews from '~/components/latest_news'
import FunnelLoop from '~/components/funnel_loop'

export default {
	name: 'bonus-room-casino',
	mixins: [pageTemplate, device, components],
	layout: 'default',
	components: { Gradient, Breadcrumbs, gradientWrapper, ArticleBanner, LatestNews, FunnelLoop },
	data: () => {
		return {
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title'
			},
			newsRootSlug: NEWS_ROOT_SLUG
		}
	},
	async asyncData({ store, route, error }) {
		const request = {
			url: 'bonus-room-casino'
		}
		const response = await DAL_Page.getData(request)
		if (response.data.confirm === 'error') {
			return error({ statusCode: 404, message: 'Post not found' })
		}
		const data = helper.headDataMixin(response.data, route)
		const { content, h1, title, update_at, thumbnail, short_desc, authors, news, funnels } = data.body
		return { data, content, h1, title, update_at, thumbnail, short_desc, authors, news, funnels }
	}
}
</script>
