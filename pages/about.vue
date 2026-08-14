<template>
	<main class="main_wrapper">
		<Gradient modifier="large" />
		<div class="container z-index-3" id="hero">
			<MainPageTop :h1="data.body.h1" :description="data.body.short_desc" />
		</div>
		<div class="container sticky-tabs z-index-3">
			<div id="nav_menu" v-if="data.body.nav_menu.length">
				<NavMenu :value="data.body.nav_menu" />
			</div>
		</div>
		<div class="container z-index-3 sub_gap" id="top-casinos">
			<h2 class="text_color_cairo m-0">{{ topCasinosTitle }}</h2>
			<TopCasinoList
				v-if="data.body.casino.length"
				:posts="data.body.casino"
				schema
				:schema-name="topCasinosTitle"
			/>
		</div>
		<div class="container z-index-3">
			<VerifiedCasinoList
				v-if="data.body.verified_casino.length"
				:posts="data.body.verified_casino"
				link="/best-casinos"
			/>
		</div>
		<div class="container z-index-3 sub_gap" id="bonuses">
			<ContentSupport v-if="data.body.content_1" :value="data.body.content_1" />
		</div>
		<div class="container z-index-3 main_gap" id="free-games">
			<ContentSupport v-if="data.body.content_2" :value="data.body.content_2" />
			<GameSlider v-if="data.body.games.length" :posts="data.body.games" />
		</div>
		<ContentWrapper class="container" v-if="data.body.content_3" id="compare">
			<ContentSupport :value="data.body.content_3" />
		</ContentWrapper>
		<div class="container z-index-3 sub_gap" id="methodology">
			<h2 class="text_color_cairo m-0">How We Rank Casinos - No Paid Reviews, No Lies</h2>
			<ContentSupport v-if="data.body.content_2" :value="data.body.content_4" />
			<HowCreateRating src="/img/rating.png" :text="data.body.content_5" />
			<ContentSupport v-if="data.body.content_2" :value="data.body.content_6" />
		</div>
		<div class="container z-index-3 sub_gap" id="safety">
			<ContentSupport :value="data.body.content_7" />
			<div class="main_gap">
				<ResponsibleMain :posts="data.body.partners" />
				<div class="learn_more_wrapper">
					<a href="/responsible-gambling" class="link_btn cleveland">Learn More</a>
				</div>
			</div>
		</div>
		<div class="container z-index-3" id="blacklist">
			<PlayerGuides :text="data.body.content_8" />
		</div>
		<div class="container z-index-3" id="about-casquad">
			<ContentSupport v-if="data.body.content_9" :value="data.body.content_9" />
		</div>
		<div class="container z-index-3 sub_gap" id="news">
			<ContentSupport v-if="data.body.content_10" :value="data.body.content_10" />
			<div class="news_container">
				<div class="news_item" v-for="item in data.body.news.slice(0, 4)" :key="item.title">
					<NewsMainCard
						:link="item.permalink"
						:src="item.thumbnail"
						:title="item.title"
						:date="item.create_at.slice(0, 10)"
						:desc="item.short_desc"
					/>
				</div>
			</div>
		</div>
		<div class="container z-index-3 sub_gap" id="categories">
			<h2 class="text_color_cairo m-0">Play Smarter - Pick by Category</h2>
			<GameCategories />
		</div>
		<div class="container z-index-3 sub_gap" id="providers">
			<h2 class="text_color_cairo m-0">Top Game Providers - Verified Through the CASQUAD casino providers Audit</h2>
			<PartnersLogo :posts="data.body.vendors" />
		</div>
		<ContentWrapper class="container" v-if="data.body.content_11">
			<ContentSupport :value="data.body.content_11" />
		</ContentWrapper>
		<div class="container sub_gap z-index-3" id="mobile-casinos">
			<h3 class="text_color_cairo m-0">Mobile Gaming the Way It Should Be - Fast, Smooth, Fair</h3>
			<ContentSupport :value="data.body.content_13" />
			<BestForMobile />
		</div>
		<ContentWrapper class="container" id="trust" v-if="data.body.content_15">
			<ContentSupport :value="data.body.content_15" />
		</ContentWrapper>
		<div class="container z-index-3" id="about-casquad" v-if="data.body.authors">
			<div class="sub_gap">
				<h2 class="text_color_cairo" id="team">People who play and test themselves</h2>
				<AuthorCardLoop :posts="data.body.authors" />
			</div>
		</div>
		<div class="container z-index-3" v-if="data.body.faq.length">
			<div class="sub_gap">
				<h2 class="text_color_cairo">{{ data.body.faq_title }}</h2>
				<Faq :value="data.body.faq" />
			</div>
		</div>
		<Cookies />
	</main>
</template>

<script>
import DAL_Page from '~/DAL/static_pages'
import Gradient from '~/components/gradient'
import components from '~/mixins/components'
import MainPageTop from '~/components/main_page_top'
import VerifiedCasinoList from '~/components/verified_casinos_list'
import GameSlider from '~/components/game_slider'
import ContentSupport from '~/components/content/text_2'
import NavMenu from '~/components/nav_menu'
import ContentWrapper from '~/components/content_wrapper'
import HowCreateRating from '~/components/how_create_rating'
import ResponsibleMain from '~/components/responsible_main'
import PlayerGuides from '~/components/player_guides'
import NewsMainCard from '~/components/news_loop/cards/main'
import GameCategories from '~/components/game_categories'
import PartnersLogo from '~/components/partners_logo'
import BestForMobile from '~/components/best_for_mobile'
import AuthorCardLoop from '~/components/author_card_loop'
import helper from '~/helpers/helpers'
import pageTemplate from '~/mixins/pageTemplate'

export default {
	name: 'front_page',
	mixins: [components, pageTemplate],
	layout: 'default',
	middleware: ['getHeaders'],
	components: {
		Gradient,
		MainPageTop,
		NavMenu,
		VerifiedCasinoList,
		ContentSupport,
		GameSlider,
		ContentWrapper,
		HowCreateRating,
		ResponsibleMain,
		PlayerGuides,
		NewsMainCard,
		GameCategories,
		PartnersLogo,
		BestForMobile,
		AuthorCardLoop
	},
	data() {
		return {
			topCasinosTitle: 'CASQUAD Picks - Only Trusted Online Casinos of the Month'
		}
	},
	async asyncData({ store, route, error }) {
		const geo = store.getters['common/getGeo']
		const request = {
			url: 'about',
			geo
		}
		const response = await DAL_Page.getData(request)
		if (response.data.confirm === 'error') {
			return error({ statusCode: 404, message: 'Post not found' })
		}
		const data = helper.headDataMixin(response.data, route)
		data.body.nav_menu = [
			{
				value_1: 'CASQUAD',
				value_2: 'hero'
			},
			{
				value_1: 'Top Casinos of the Month',
				value_2: 'top-casinos'
			},
			{
				value_1: 'CASQUAD Bonus Hub',
				value_2: 'bonuses'
			},
			{
				value_1: 'Free Games & Slots',
				value_2: 'free-games'
			},
			{
				value_1: 'Casino Comparison',
				value_2: 'compare'
			},
			{
				value_1: 'CASQUAD Methodology',
				value_2: 'methodology'
			},
			{
				value_1: 'Responsible & Safe Gaming',
				value_2: 'safety'
			},
			{
				value_1: 'Blacklisted Casinos',
				value_2: 'blacklist'
			},
			{
				value_1: 'CASQUAD Movement',
				value_2: 'about-casquad'
			},
			{
				value_1: 'News & Insights',
				value_2: 'news'
			},
			{
				value_1: 'Casino Categories',
				value_2: 'categories'
			},
			{
				value_1: 'Game Providers',
				value_2: 'providers'
			},
			{
				value_1: 'Payment Methods',
				value_2: 'payments'
			},
			{
				value_1: 'Mobile Casinos & Apps',
				value_2: 'mobile-casinos'
			},
			{
				value_1: 'Why You Can Trust Us',
				value_2: 'trust'
			},
			{
				value_1: 'CASQUAD Team',
				value_2: 'team'
			}
		]
		data.body.verified_casino = [
			{
				src: '/img/sack-dollar.svg',
				title: 'High real-world payouts',
				subTitle: 'We only list casinos where we checked RTP and cashouts with our own money.'
			},
			{
				src: '/img/shield-check.svg',
				title: 'Genuine licenses',
				subTitle: 'Every site is manually vetted - no fake regulators, no random “badge” images.'
			},
			{
				src: '/img/bolt_green.svg',
				title: 'Fast withdrawals',
				subTitle:
					'We keep only casinos that pay without delays - and highlight CASQUAD real money casinos that passed our deposit-play-withdraw test.'
			}
		]
		data.body.partners = [
			'https://api.casquads.com/public/downloads/dmca-656c41f6467af-66bc66b92c3c5-68342d3cbca45.webp',
			'https://api.casquads.com/public/downloads/begamblingaware-656c4218547ac-66bc66d530219-68342d8568f5f.webp',
			'https://api.casquads.com/public/downloads/mc-656c422ab4ed7-66bc66e2bb324-68342e0c9479e.webp',
			'https://api.casquads.com/public/downloads/mc-2-656c42394e609-66bc66ec1f71c-68342e5b6da56.webp',
			'https://api.casquads.com/public/downloads/mc-3-656c42487d651-66bc66fa9c91a-68342eae85f71.webp',
			'https://api.casquads.com/public/downloads/mc-4-656c42a34831f-66bc6704e7538-68342f15532ea.webp'
		]
		data.body.mobile_version_ios = true
		data.body.mobile_one_hand_use = true
		data.body.mobile_autospins = true
		data.body.mobile_tls = true
		data.body.authors = [
			{
				title: 'Alex Hunter',
				permalink: '/author/alex-hunter',
				thumbnail: 'https://api.casquads.com/public/downloads/author-thumbnail-68d3ba38d4c43.png',
				create_at: '2025-09-24 00:00:00',
				position: '@alexhunter • Author at Casquad.com since • 2020',
				social: [],
				role: 'Editor Writer'
			},
			{
				title: 'Emily Carter',
				permalink: '/author/emily-carter',
				thumbnail: 'https://api.casquads.com/public/downloads/892a7493-ebfd-4365-85ee-e37dbe110393-6920dfe6a7c98.png',
				create_at: '2025-11-21 00:00:00',
				position: '@emilycarter • Analyst at Casquad.com since • 2021',
				social: [],
				role: 'Editor Writer'
			}
		]
		return { data }
	}
}
</script>
<style scoped>
.learn_more_wrapper {
	display: flex;
	justify-content: center;
}
.learn_more_wrapper .link_btn {
	display: inline-flex;
	padding: 13px 27px;
	border-radius: 16px;
	text-decoration: none;
	font-size: 16px;
}
.learn_more_wrapper .link_btn.cleveland {
	background: var(--cleveland);
	color: var(--cairo);
}
.news_container {
	display: flex;
	justify-content: space-between;
}
@media (max-width: 767px) {
	.news_container {
		overflow-y: scroll;
		gap: 20px;
		margin-right: -20px;
	}
	.news_container .item:last-child {
		margin-right: 20px;
	}
	@media (min-width: 768px) and (max-width: 1200px) {
		.news_container {
			overflow-y: scroll;
			gap: 20px;
			margin-right: -20px;
		}
		.news_container .item:last-child {
			margin-right: 20px;
		}
	}
}
</style>
