<template>
	<div>
		<main class="main_wrapper_slots container_top_game main_gap">
			<Gradient modifier="large" />
			<div class="container">
				<div class="h1_wrapper z-index-3">
					<gradientWrapper>
						<div class="breadcrumbs_wrapper">
							<Breadcrumbs
								:value="[
									{
										title: t('BREADCRUMB_MAIN_PAGE'),
										permalink: '/'
									},
									{
										title: t('BREADCRUMB_SLOTS_TITLE_PAGE'),
										permalink: `/${slotsRootSlug}`
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
			</div>
			<div class="container z-index-3">
				<SlotCard
					:title="data.body.title"
					:src="data.body.thumbnail"
					:demo="data.body.iframe ? true : false"
					:h1="data.body.h1"
					:short_desc="data.body.short_desc"
					:refLinks="Array.isArray(data.body.ref) ? {} : data.body.ref"
					:date="data.body.update_at.slice(0, 10)"
					:author_permalink="data.body.authors.length ? data.body.authors[0].permalink : ''"
					:author_title="data.body.authors.length ? data.body.authors[0].title : ''"
					@onClickDemoActivate="onClickDemoActivate"
				/>
			</div>
			<div class="container z-index-3" id="nav_menu" v-if="data.body.nav_menu.length">
				<div class="sticky-tabs" :style="{ order: data.body.order_components['nav_menu'] || 3 }">
					<NavMenu :value="data.body.nav_menu" />
				</div>
			</div>
			<div class="container z-index-3" id="video" v-if="data.body.video.length">
				<VideoWithText
					:style="{ order: data.body.order_components['video'] }"
					:video="data.body.video[0]"
					:text="data.body.video_text"
				/>
			</div>
			<div class="container z-index-3" id="top_casinos" v-if="data.body.casinos.length">
				<div :style="{ order: data.body.order_components['top_casinos'] }">
					<TopCasinoList :posts="data.body.casinos" />
				</div>
			</div>
			<section id="stats" class="bg_grey p-gap">
				<div class="container main_gap">
					<AText tag="div" v-if="data.body.characters_title" :attributes="videoTitleSettings">
						{{ data.body.characters_title }}
					</AText>
					<div class="stats">
						<div class="stats_item">
							<GameStatsItem src="/img/software.svg" title="Software" :subTitle="data.body.characters_software" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/themes.svg" title="Themes" :subTitle="data.body.characters_themes" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/date.svg" title="Release Date" :subTitle="data.body.characters_release_date" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/mobile.svg" title="Mobile" :isCheck="Boolean(data.body.characters_mobile)" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/slot_types.svg" title="Slot Type" :subTitle="data.body.characters_slot_type" />
						</div>
						<div class="stats_item">
							<GameStatsItem
								src="/img/mobile.svg"
								title="Free Spins"
								:isCheck="Boolean(data.body.characters_free_spins)"
							/>
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/rtp.svg" title="RTP" :subTitle="data.body.characters_rtp" />
						</div>
						<div class="stats_item">
							<GameStatsItem
								src="/img/bonus_round.svg"
								title="Bonus Round"
								:isCheck="Boolean(data.body.characters_bonus_round)"
							/>
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/volatility.svg" title="Volatility" :subTitle="data.body.characters_volatility" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/wild.svg" title="Wild" :isCheck="Boolean(data.body.characters_wild)" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/paylines.svg" title="Paylines" :subTitle="data.body.characters_paylines" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/multiplier.svg" title="Multiplier" :isCheck="Boolean(data.body.multiplier)" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/paylines.svg" title="Reels" :subTitle="data.body.characters_reels" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/scatter.svg" title="Scatter" :isCheck="Boolean(data.body.characters_scatter)" />
						</div>
						<div class="stats_item">
							<GameStatsItem src="/img/min_bet.svg" title="Min Bet" :subTitle="data.body.characters_min_bet" />
						</div>
						<div class="stats_item">
							<GameStatsItem
								src="/img/progressive.svg"
								title="Progressive"
								:isCheck="Boolean(data.body.characters_progressive)"
							/>
						</div>
					</div>
					<AText tag="div" v-if="data.body.details_title" :attributes="videoTitleSettings">
						{{ data.body.details_title }}
					</AText>
					<div class="details">
						<div class="details_item" v-for="(item, index) in data.body.details" :key="index">
							<GameDetailsItem :src="item.src" :title="item.value_1" :subTitle="item.value_2" />
						</div>
					</div>
				</div>
			</section>
			<div class="container sub_gap z-index-3" id="rtp" v-if="data.body.rtp_description">
				<h2 class="text_color_cairo m-0" v-if="data.body.rtp_description_title">
					{{ data.body.rtp_description_title }}
				</h2>
				<ContentWrapper :style="{ order: data.body.order_components['rtp_description'] }">
					<ContentSupport :value="data.body.rtp_description" />
				</ContentWrapper>
			</div>
			<div class="container container_top_game main_gap">
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
					v-if="data.body.content_2"
					id="content_2"
					:style="{ order: data.body.order_components['content'] }"
				>
					<ContentSupport :value="data.body.content" />
				</ContentWrapper>
			</div>
			<div class="container" v-if="data.body.screenshots.length">
				<div class="screenshots">
					<AText tag="div" :attributes="symbolTitleSettings">{{ t('SCREENSHOTS') }}</AText>
					<SlotScreenshots :posts="data.body.screenshots" :title="data.body.title" />
				</div>
			</div>
			<div class="symbols" v-if="data.body.symbols.length">
				<div class="container sub_gap">
					<AText tag="div" :attributes="videoTitleSettings">{{ t('SLOT_SYMBOLS') }}</AText>
					<SlotSymbols :posts="data.body.symbols" :title="data.body.title" />
				</div>
			</div>
			<div class="container content_container" v-if="data.body.content">
				<Content :value="data.body.content" />
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
			<div class="container sub_gap" v-if="data.body.faq.length">
				<AText v-if="data.body.faq_title" tag="h2" :attributes="videoTitleSettings">{{ data.body.faq_title }}</AText>
				<div class="faq_container">
					<Faq :value="data.body.faq" />
				</div>
			</div>
			<div class="review_container">
				<Reviews :posts="reviews" post_type="game" :post_id="data.body.id" @changeFilter="changeFilter" />
			</div>
			<SlotPopUp
				v-if="isShowDemo"
				:src="data.body.iframe"
				:title="data.body.title"
				@onClickDemoClose="onClickDemoClose"
			/>
			<Cookies />
		</main>
	</div>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import pageTemplate from '~/mixins/pageTemplate'
import SlotCard from '~/components/slot_card'
import SlotSymbols from '~/components/slot_symbols'
import SlotScreenshots from '~/components/slot_screenshots'
import Faq from '~/components/faq'
import SlotPopUp from '~/components/slot_popup'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import VideoGallery from '~/components/video_gallery'
import { SLOTS_ROOT_SLUG } from '~/constants'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import geo from '~/mixins/geo'
import Reviews from '~/components/reviews'
import DAL_Review from '~/DAL/review'
import gradientWrapper from '~/components/gradient_wrapper'
import date from '~/components/date'
import AuthorSummary from '~/components/author_summary'
import TopCasinoList from '~/components/top_casino_list'
import ContentSupport from '~/components/content/text_2'
import ContentWrapper from '~/components/content_wrapper'
import GameSlider from '~/components/game_slider'
import NavMenu from '~/components/nav_menu'
import VideoWithText from '~/components/video_with_text'
import GameStatsItem from '~/components/game_stats/item'
import GameDetailsItem from '~/components/game_details/item'
import config from '~/config'

export default {
	name: 'game_single',
	mixins: [pageTemplate, components, geo],
	components: {
		SlotCard,
		SlotSymbols,
		SlotScreenshots,
		Faq,
		SlotPopUp,
		Gradient,
		VideoGallery,
		Breadcrumbs,
		Reviews,
		gradientWrapper,
		date,
		AuthorSummary,
		TopCasinoList,
		ContentSupport,
		ContentWrapper,
		GameSlider,
		NavMenu,
		VideoWithText,
		GameStatsItem,
		GameDetailsItem
	},
	layout: 'default',
	data: () => {
		return {
			symbolTitleSettings: {
				size: 'x-large',
				color: 'cairo',
				weight: 'bold',
				class: 'title'
			},
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title'
			},
			videoTitleSettings: {
				size: 'x-large',
				color: 'cairo',
				weight: 'bold',
				class: 'title'
			},
			isShowDemo: false,
			slotsRootSlug: SLOTS_ROOT_SLUG,
			badgeList: config.AUTHOR_BADGE_LIST
		}
	},
	watch: {
		async geo() {
			const request = new DAL_Builder()
			const geo = this.$store.getters['common/getGeo']
			const response = await request.postType('game').url(`${this.$route.params.id}?geo=${geo}`).get()
			this.casinos = response.data.body.casinos
		}
	},
	async asyncData({ route, error, store }) {
		if (route.params.id) {
			const geo = store.getters['common/getGeo']
			const request = new DAL_Builder()
			const response = await request.postType('game').url(`${route.params.id}?geo=${geo}`).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { casinos, reviews, id, author_summary, authors } = response.data.body
				const [author] = authors
				return { data, casinos, reviews, id, author_summary, author }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	},
	methods: {
		onClickDemoActivate() {
			this.isShowDemo = true
		},
		onClickDemoClose() {
			this.isShowDemo = false
		},
		videoListWrapper(videoList) {
			return videoList.map(item => {
				const { src } = item
				const [iframe, title] = item.value
				return {
					title,
					iframe,
					banner: src
				}
			})
		},
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
				`game/reviews/${this.id}?sort=${config[filter.key].sort}&order=${config[filter.key].order}`
			)
			if (response.data.confirm === 'ok') {
				this.reviews = response.data.body.posts
			}
		}
	}
}
</script>
<style scoped>
.screenshots,
.video_gallery {
	padding: 20px;
	border-radius: var(--m);
	background: #232036;
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.content_container {
	padding-top: 16px;
}
.screenshots .title {
	line-height: 24px;
}
.video_gallery .title {
	line-height: 32px;
}
.bg_grey {
	background: var(--cancun);
}
.p-gap {
	padding-top: var(--gap-components);
	padding-bottom: var(--gap-components);
}
.stats,
.details {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	align-items: stretch;
}
.stats_item,
.details_item {
	width: calc(25% - 15px);
}
@media (max-width: 767px) {
	.symbols,
	.screenshots {
		padding-top: 20px;
		padding-bottom: 20px;
	}
}
@media (max-width: 576px) {
	.stats_item,
	.details_item {
		width: 100%;
	}
}
@media (min-width: 577px) and (max-width: 1200px) {
	.stats_item,
	.details_item {
		width: calc(50% - 10px);
	}
}
</style>
