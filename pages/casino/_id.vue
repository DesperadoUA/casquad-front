<template>
	<main class="casino_page">
		<Gradient />
		<div class="container z-index-3">
			<div class="main_container">
				<TwoContentContainer>
					<template v-slot:left>
						<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
                        <Breadcrumbs :value="[
                                {
                                    title: t('BREADCRUMB_MAIN_PAGE'),
                                    permalink: '/'
                                },
                                {
                                    title: t(configCategoryTitle[data.body.label]),
                                    permalink: `/casinos/${configCategorySlug[data.body.label]}`
                                },
                                {
                                    title: data.body.title,
                                    permalink: ''
                                }
                            ]"
                        />
						<div class="left_wrapper">
							<div class="casino_card_container">
								<CasinoCard
									:src="data.body.thumbnail"
									:bonus_value="data.body.bonus_value"
									:title="data.body.title"
									:rating="data.body.rating"
									:bg="data.body.color"
									:label="data.body.label"
									:refLinks="data.body.ref"
									:advantages="data.body.advantages"
									:min_dep="data.body.min_dep"
									:wager="data.body.wager"
								/>
							</div>
							<div class="casino_characters_container">
								<AText tag="div" :attributes="titleCharactersSettings">{{ t('CASINO_CHARACTERS') }}</AText>
								<CasinoDetails
									:vendors="data.body.vendors"
									:payments="data.body.payments"
									:deposit="data.body.deposit"
									:currencies="data.body.currencies"
									:languages="data.body.languages"
								/>
							</div>
							<div class="casino_slot_container" v-if="data.body.games.length">
								<AText tag="div" :attributes="titleSlotsSettings"
									>{{ t('BEST_GAMES_IN_CASINO') }} {{ data.body.title }}</AText
								>
								<div class="slot_loop">
									<GameMainCard
										v-for="(item, index) in gamesLoop"
										:key="index"
										:link="item.permalink"
										:src="item.slider_img"
										:title="item.title"
										size="middle"
									/>
								</div>
							</div>
						</div>
					</template>
					<template v-slot:right>
						<aside class="aside">
							<AText tag="div" :attributes="asideContainerTitle">{{ t('RECOMMENDED_BONUSES') }}</AText>
							<div class="aside_bonus_container">
								<div class="aside_bonus_wrapper" v-for="(item, index) in data.body.bonuses" :key="index">
									<BonusAsideCard
										:src="item.thumbnail"
										:title="item.title"
										:desc="item.short_desc"
										:value="item.bonus"
										:min_dep="item.min_deposit"
										:wager="item.wagering"
										:refLinks="item.casino.ref"
										:permalink="item.permalink"
									/>
								</div>
							</div>
						</aside>
					</template>
				</TwoContentContainer>
			</div>
		</div>
		<div class="video_gallery" v-if="data.body.video.length">
			<div class="container">
				<AText tag="div" v-if="data.body.video_title" :attributes="videoTitleSettings">{{ data.body.video_title }}</AText>
				<VideoGallery :posts="videoListWrapper(data.body.video)" />
			</div>
		</div>
		<section class="content_wrapper">
			<div class="container">
				<TabContent :value="tabContent" />
			</div>
		</section>
		<div class="container" v-if="data.body.casinos.length">
			<div class="section_title_wrapper">
				<AText tag="div" :attributes="mainContainerTitle">{{ t('SIMILAR_CASINOS') }}</AText>
			</div>
			<div class="similar_casinos">
				<CasinoLoop :value="data.body.casinos" />
			</div>
		</div>
		<SlickBonus :refLinks="data.body.ref" />
		<Cookies />
	</main>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import pageTemplate from '~/mixins/pageTemplate'
import TwoContentContainer from '~/components/two_content_container/'
import BonusAsideCard from '~/components/bonus_loop/cards/aside_card'
import CasinoCard from '~/components/casino_card'
import CasinoDetails from '~/components/casino_detail'
import GameMainCard from '~/components/slot_loop/cards/main'
import TabContent from '~/components/content/tab_content'
import SlickBonus from '~/components/slick_bonus/'
import CasinoLoop from '~/components/casino_loop'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import device from '~/mixins/device'
import VideoGallery from '~/components/video_gallery'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import {CASINO_CATEGORY_SLUG} from '~/constants'

export default {
	name: 'casino_single',
	mixins: [pageTemplate, device, components],
	components: {
		BonusAsideCard,
		TwoContentContainer,
		CasinoCard,
		CasinoDetails,
		GameMainCard,
		TabContent,
		SlickBonus,
		CasinoLoop,
		Gradient,
		VideoGallery,
        Breadcrumbs
	},
	layout: 'default',
	data: () => {
		return {
			titleSettings: {
				color: 'cairo',
				weight: 'bold',
				class: 'title'
			},
			titleCharactersSettings: {
				color: 'cairo',
				weight: 'bold',
				size: 'x-large',
				class: 'detail_title'
			},
			titleSlotsSettings: {
				color: 'cairo',
				weight: 'regular',
				class: 'slots_title'
			},
			asideContainerTitle: {
				weight: 'bold',
				color: 'cairo',
				size: 'large'
			},
			mainContainerTitle: {
				weight: 'extra-bold',
				color: 'cairo',
				size: 'x-large'
			},
			videoTitleSettings: {
				size: 'x-large',
				color: 'cairo',
				weight: 'bold',
				class: 'video_title'
			},
            configCategoryTitle: {
                new: 'BREADCRUMB_CATEGORY_CASINO_NEW_PAGE',
                popular: 'BREADCRUMB_CATEGORY_CASINO_POPULAR_PAGE',
                trusted: 'BREADCRUMB_CATEGORY_CASINO_TRUSTED_PAGE',
                best: 'BREADCRUMB_CATEGORY_CASINO_BEST_PAGE'
            },
            configCategorySlug: CASINO_CATEGORY_SLUG
		}
	},
	computed: {
		tabContent() {
			const data = [
				{ title: this.t('REVIEWS'), content: this.data.body.content_reviews, icon: '/img/Review.svg' },
				{ title: this.t('BONUSES'), content: this.data.body.content_bonuses, icon: '/img/icon_stars.svg' },
				{ title: this.t('GAMES'), content: this.data.body.content_games, icon: '/img/icon_slots.svg' }
			]
			return data
		},
		gamesLoop() {
			const config = {
				DC: 12,
				MOB: 6,
				TABLET: 10
			}
			return this.data.body.games.slice(0, config[this.device])
		}
	},
	async asyncData({ route, error, store }) {
		if (route.params.id) {
			const request = new DAL_Builder()
            const geo = store.getters['common/getGeo']
			const response = await request
				.postType('casino')
				.url(`${route.params.id}?geo=${geo}`)
				.get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				return { data }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	},
	methods: {
		videoListWrapper(videoList) {
			return videoList.map(item => {
				const {src} = item
				const [iframe, title] = item.value
				return {
					title,
					iframe,
					banner: src
				}
			})
		}
	}
}
</script>
<style scoped>
.casino_page {
	background: url('/img/topBg.webp') top center var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.title {
	font-size: 32px;
}
.aside {
	padding-top: 10px;
}
.aside_bonus_container {
	margin-top: 14px;
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
}
.casino_card_container {
	margin-top: var(--l);
}
.similar_casinos {
	padding-bottom: var(--l);
	padding-top: var(--l);
}
.casino_characters_container,
.casino_slot_container {
	border: 1px solid rgba(255, 255, 255, 0.15);
	background: rgba(27, 24, 49, 1);
	margin-top: 40px;
	border-radius: 20px;
	padding: 32px 22px;
}
.left_wrapper {
	max-width: 820px;
}
.slots_title {
	font-size: 22px;
}
.slot_loop {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	margin-top: 24px;
	justify-content: space-between;
}
.content_wrapper {
	background: rgba(8, 5, 26, 1);
	padding: 20px 0px 40px 0px;
}
.video_gallery {
	padding-top: 20px;
	padding-bottom: 40px;
}
.video_title {
	margin-bottom: 24px;
}
.main_container {
	padding-bottom: 20px;
}
@media (max-width: 767px) {
	.title {
		font-size: 24px;
	}
	.detail_title {
		font-size: 17px;
	}
	.slot_loop {
		gap: 10px;
	}
	.casino_page {
		padding-top: 150px;
	}
	.aside_bonus_wrapper {
		width: 100%;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.aside_bonus_wrapper {
		width: 48%;
	}
	.casino_slot_container {
		margin-bottom: 25px;
	}
	.aside_bonus_wrapper {
		width: 48%;
	}
}
</style>
