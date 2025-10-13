<template>
	<main class="main_wrapper pb-0">
		<Gradient />
		<div class="container z-index-3 main_gap">
			<div class="h1_wrapper">
				<gradientWrapper>
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
					<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
					<date :value="data.body.update_at.slice(0, 10)" />
				</gradientWrapper>
			</div>
			<TwoContentContainer>
				<template v-slot:left>
					<div class="main_gap">
						<Banner :src="data.body.thumbnail" :alt="`${data.body.title} Logo`" />
						<div class="content_container">
							<Content :value="data.body.content" />
						</div>
					</div>
				</template>
				<template v-slot:right>
					<AText tag="div" :attributes="subTitleSettings">{{ t('POPULAR_NEWS') }}</AText>
					<aside class="aside">
						<div class="aside_post_wrapper" v-for="item in data.body.last_news" :key="item.title">
							<NewsSliderCard
								:link="item.permalink"
								:src="item.icon"
								:title="item.title"
								:desc="item.create_at.slice(0, 10)"
							/>
						</div>
					</aside>
				</template>
			</TwoContentContainer>
		</div>
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
		<section class="similar_casino_wrapper" v-if="data.body.casinos.length">
			<div class="container">
				<div class="section_title_wrapper">
					<AText tag="div" :attributes="mainContainerTitle">{{ t('RECOMMENDED_CASINOS') }}</AText>
				</div>
				<div class="casino_wrapper">
					<TwoContentContainer>
						<template v-slot:left>
							<CasinoLoop :value="data.body.casinos" />
						</template>
					</TwoContentContainer>
				</div>
			</div>
		</section>
		<LatestNews v-if="data.body.posts.length" :posts="data.body.posts" :title="t('LAST_NEWS')" />
		<Cookies />
	</main>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import pageTemplate from '~/mixins/pageTemplate'
import TwoContentContainer from '~/components/two_content_container/'
import NewsSliderCard from '~/components/news_loop/cards/slider_card'
import LinkWithArrow from '~/components/ui/atoms/links/link_with_arrow'
import NewsMainCard from '~/components/news_loop/cards/main'
import Gradient from '~/components/gradient'
import CasinoLoop from '~/components/casino_loop'
import Banner from '~/components/banner/'
import helper from '~/helpers/helpers'
import { NEWS_ROOT_SLUG } from '~/constants'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper'
import date from '~/components/date'
import AuthorSummary from '~/components/author_summary'
import config from '~/config'
import LatestNews from '~/components/latest_news'

export default {
	name: 'news_single',
	mixins: [pageTemplate, components],
	components: {
		TwoContentContainer,
		NewsSliderCard,
		LinkWithArrow,
		LatestNews,
		Banner,
		Gradient,
		CasinoLoop,
		Breadcrumbs,
		gradientWrapper,
		date,
		AuthorSummary
	},
	layout: 'default',
	data: () => {
		return {
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				class: 'title'
			},
			subTitleSettings: {
				color: 'cairo',
				size: 'large',
				weight: 'bold',
				class: 'sub_title'
			},
			mainContainerTitle: {
				weight: 'extra-bold',
				color: 'cairo',
				size: 'x-large'
			},
			newsRootSlug: NEWS_ROOT_SLUG,
			badgeList: config.AUTHOR_BADGE_LIST
		}
	},
	async asyncData({ route, error }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request.postType('news').url(route.params.id).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { author_summary, authors } = response.data.body
				const [author] = authors
				return { data, author_summary, author }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	}
}
</script>
<style scoped>
.sub_title {
	margin-bottom: 16px;
}
.thumbnail {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.section_title_wrapper {
	display: flex;
	justify-content: space-between;
}
.news_loop {
	padding-top: 40px;
	padding-bottom: 60px;
	background: var(--cancun);
}
.news_container {
	display: flex;
	justify-content: space-between;
	margin-top: var(--l);
}
.aside_post_wrapper ::v-deep .item {
	padding-right: 0px;
}
@media (max-width: 767px) {
	.content_container {
		margin-left: 0;
		margin-right: 0;
		width: 100%;
	}
	.news_container {
		gap: 20px;
		overflow-x: scroll;
		margin-right: -20px;
	}
	.news_container .item:last-child {
		margin-right: 20px;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.aside {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 25px;
		justify-content: space-between;
	}
	.sub_title {
		margin-top: 15px;
	}
	.aside_post_wrapper {
		width: 48%;
	}

	.news_container {
		overflow-y: scroll;
		gap: 20px;
		margin-right: -20px;
	}
	.news_container .item:last-child {
		margin-right: 20px;
	}
}
</style>
