<template>
	<main class="main_wrapper_slots pb-0">
		<Gradient modifier="large" />
		<div class="container z-index-3 main_gap">
			<div class="h1_wrapper" id="breadcrumbs" :style="{ order: data.body.order_components['breadcrumbs'] }">
				<gradientWrapper>
					<div class="breadcrumbs_wrapper">
						<Breadcrumbs
							:value="[
								{
									title: t('BREADCRUMB_MAIN_PAGE'),
									permalink: '/'
								},
								{
									title: t('BREADCRUMBS_BONUS_ROOM_CASINO_PAGE'),
									permalink: `/${bonusRoomCasinoRootSlug}`
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
				:style="{ order: data.body.order_components['banner'] }"
				:src="banner"
				:h1="h1"
				:short_desc="short_desc"
				:date="data.body.update_at.slice(0, 10)"
				:author_permalink="data.body.authors.length ? data.body.authors[0].permalink : ''"
				:author_title="data.body.authors.length ? data.body.authors[0].title : ''"
			/>
			<div
				class="sticky-tabs"
				id="nav_menu"
				v-if="data.body.nav_menu.length"
				:style="{ order: data.body.order_components['nav_menu'] || 3 }"
			>
				<NavMenu :value="data.body.nav_menu" />
			</div>
			<ContentWrapper
				v-if="data.body.content_1"
				id="content_1"
				:style="{ order: data.body.order_components['content_1'] }"
			>
				<ContentSupport :value="data.body.content_1" />
			</ContentWrapper>
			<div id="top_casinos" :style="{ order: data.body.order_components['top_casinos'] }">
				<TopCasinoList v-if="data.body.casinos.length" :posts="data.body.casinos" />
			</div>
			<ContentWrapper
				v-if="data.body.content_2"
				id="content_2"
				:style="{ order: data.body.order_components['content_2'] }"
			>
				<ContentSupport :value="data.body.content_2" />
			</ContentWrapper>
			<div
				class="main_gap"
				v-if="data.body.content_3"
				id="games"
				:style="{ order: data.body.order_components['games'] }"
			>
				<ContentSupport :value="data.body.content_3" />
				<GameSlider v-if="data.body.games.length" :posts="data.body.games" />
			</div>
			<ContentWrapper
				v-if="data.body.content_4"
				id="content_4"
				:style="{ order: data.body.order_components['content_4'] }"
			>
				<ContentSupport :value="data.body.content_4" />
			</ContentWrapper>
			<ContentWrapper
				v-if="data.body.content_5"
				id="content_5"
				:style="{ order: data.body.order_components['content_5'] }"
			>
				<ContentSupport :value="data.body.content_5" />
			</ContentWrapper>
			<ContentWrapper
				v-if="data.body.content_6"
				id="content_6"
				:style="{ order: data.body.order_components['content_6'] }"
			>
				<ContentSupport :value="data.body.content_6" />
			</ContentWrapper>
			<ContentWrapper
				v-if="data.body.content_7"
				id="content_7"
				:style="{ order: data.body.order_components['content_7'] }"
			>
				<ContentSupport :value="data.body.content_7" />
			</ContentWrapper>
			<ContentWrapper
				v-if="data.body.content_8"
				id="content_8"
				:style="{ order: data.body.order_components['content_8'] }"
			>
				<ContentSupport :value="data.body.content_8" />
			</ContentWrapper>
			<ContentWrapper
				v-if="data.body.pros.length || data.body.cons.length"
				id="pros_cons"
				:style="{ order: data.body.order_components['pros_cons'] }"
				class="sub_gap"
			>
				<h2 class="text_color_cairo m-0" v-if="data.body.pros_cons_title">
					{{ data.body.pros_cons_title }}
				</h2>
				<ProsCons
					:prosList="data.body.pros"
					:consList="data.body.cons"
					:prosTitle="data.body.pros_title"
					:consTitle="data.body.cons_title"
				/>
			</ContentWrapper>
			<ContentWrapper
				v-if="data.body.content_9"
				id="content_9"
				:style="{ order: data.body.order_components['content_9'] }"
			>
				<ContentSupport :value="data.body.content_9" />
			</ContentWrapper>
			<ContentWrapper
				v-if="data.body.content_10"
				id="content_10"
				:style="{ order: data.body.order_components['content_10'] }"
			>
				<ContentSupport :value="data.body.content_10" />
			</ContentWrapper>
			<div v-if="data.body.faq.length" class="sub_gap" :style="{ order: data.body.order_components['faq'] }">
				<h2 class="text_color_cairo">{{ data.body.faq_title }}</h2>
				<Faq :value="data.body.faq" />
			</div>
			<div
				v-if="author_summary && author"
				id="author_summary"
				:style="{ order: data.body.order_components['author_summary'] }"
			>
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
			<Reviews
				:posts="reviews"
				:style="{ order: data.body.order_components['reviews'] }"
				post_type="funnel"
				:post_id="data.body.id"
				@changeFilter="changeFilter"
				id="reviews"
			/>
		</div>
		<LatestNews v-if="data.body.news.length" :posts="data.body.news" :title="t('LAST_NEWS')" />
		<Cookies />
	</main>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import pageTemplate from '~/mixins/pageTemplate'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import { BONUS_ROOM_CASINO_ROOT_SLUG } from '~/constants'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper'
import AuthorSummary from '~/components/author_summary'
import config from '~/config'
import TopCasinoList from '~/components/top_casino_list'
import ArticleBanner from '~/components/article_banner'
import ContentSupport from '~/components/content/text_2'
import ContentWrapper from '~/components/content_wrapper'
import ProsCons from '~/components/pros_cons'
import GameSlider from '~/components/game_slider'
import LatestNews from '~/components/latest_news'
import NavMenu from '~/components/nav_menu'
import DAL_Review from '~/DAL/review'

export default {
	name: 'funnel_single',
	mixins: [pageTemplate, components],
	components: {
		Gradient,
		Breadcrumbs,
		gradientWrapper,
		AuthorSummary,
		TopCasinoList,
		ArticleBanner,
		ContentSupport,
		ContentWrapper,
		ProsCons,
		GameSlider,
		LatestNews,
		NavMenu
	},
	layout: 'default',
	data: () => {
		return {
			bonusRoomCasinoRootSlug: BONUS_ROOM_CASINO_ROOT_SLUG,
			badgeList: config.AUTHOR_BADGE_LIST
		}
	},
	async asyncData({ route, error }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request.postType('funnel').url(route.params.id).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { author_summary, authors, casinos, banner, h1, short_desc, reviews } = response.data.body
				const [author] = authors
				return { data, author_summary, author, casinos, banner, short_desc, h1, reviews }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	},
	methods: {
		async changeFilter(filter) {
			const config = {
				new: {
					sort: 'update_at',
					order: 'desc'
				},
				rating_desc: {
					sort: 'rating',
					order: 'desc'
				},
				rating_asc: {
					sort: 'rating',
					order: 'asc'
				}
			}
			const response = await DAL_Review.getReviews(
				`funnel/reviews/${this.id}?sort=${config[filter.key].sort}&order=${config[filter.key].order}`
			)
			if (response.data.confirm === 'ok') {
				this.reviews = response.data.body.posts
			}
		}
	}
}
</script>
<style>
.sticky-tabs .slick-track {
	padding: 10px 0;
}
</style>
<style scoped>
.sticky-tabs {
	position: sticky;
	top: 0;
	z-index: 100;
}
</style>
