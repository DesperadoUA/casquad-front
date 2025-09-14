<template>
	<div>
		<main class="vendor_page">
			<Gradient />
			<div class="container z-index-3">
				<div class="h1_wrapper">
					<gradientWrapper>
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
						<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
						<date :value="data.body.update_at.slice(0, 10)" />
					</gradientWrapper>
				</div>
				<div class="main_container">
					<TwoContentContainer>
						<template v-slot:left>
							<div class="banner_wrapper" v-if="data.body.banner">
								<Banner :src="data.body.banner" :alt="`${data.body.title} Logo`" />
							</div>
							<div class="content_container">
								<Content :value="data.body.content" />
							</div>
						</template>
						<template v-slot:right>
							<aside class="aside">
								<AsideBonuses :title="t('RECOMMENDED_BONUSES')" :posts="top_bonuses" />
							</aside>
						</template>
					</TwoContentContainer>
					<div class="video_gallery" v-if="data.body.video.length">
						<div class="container">
							<AText tag="div" v-if="data.body.video_title" :attributes="videoTitleSettings">{{
								data.body.video_title
							}}</AText>
							<VideoGallery :posts="videoListWrapper(data.body.video)" />
						</div>
					</div>
					<div class="section_title_wrapper available_title">
						<AText tag="div" :attributes="mainContainerTitle">{{ t('AVAILABLE_THESE_CASINOS') }}</AText>
					</div>
					<div class="casino_wrapper">
						<TwoContentContainer>
							<template v-slot:left>
								<CasinoLoop :value="casinos" />
								<div class="container_loop" v-if="data.body.games.length">
									<AText tag="div" :attributes="titleSlotsSettings">
										{{ t('BEST_GAMES_PROVIDER') }} {{ data.body.title }}
									</AText>
									<SlotLoop :value="data.body.games" />
								</div>
							</template>
						</TwoContentContainer>
					</div>
				</div>
			</div>
			<Reviews :posts="reviews" post_type="vendor" :post_id="data.body.id" @changeFilter="changeFilter" />
			<Cookies />
		</main>
	</div>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import helper from '~/helpers/helpers'
import pageTemplate from '~/mixins/pageTemplate'
import TwoContentContainer from '~/components/two_content_container/'
import CategoryFilter from '~/components/category_filter'
import BonusAsideCard from '~/components/bonus_loop/cards/aside_card'
import CasinoLoop from '~/components/casino_loop'
import SlotLoop from '~/components/slot_loop'
import Banner from '~/components/banner/'
import Gradient from '~/components/gradient'
import VideoGallery from '~/components/video_gallery'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import geo from '~/mixins/geo'
import Reviews from '~/components/reviews'
import DAL_Review from '~/DAL/review'
import gradientWrapper from '~/components/gradient_wrapper'
import date from '~/components/date'
import AsideBonuses from '~/components/aside_bonuses'

export default {
	name: 'single-vendor',
	data: () => {
		return {
			asideContainerTitle: {
				weight: 'bold',
				color: 'cairo',
				size: 'large'
			},
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title'
			},
			titleSlotsSettings: {
				color: 'cairo',
				weight: 'regular',
				class: 'slots_title'
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
			}
		}
	},
	components: {
		TwoContentContainer,
		CategoryFilter,
		BonusAsideCard,
		CasinoLoop,
		SlotLoop,
		Banner,
		Gradient,
		VideoGallery,
		Breadcrumbs,
		Reviews,
		gradientWrapper,
		date,
		AsideBonuses
	},
	mixins: [pageTemplate, components, geo],
	watch: {
		async geo() {
			const request = new DAL_Builder()
			const geo = this.$store.getters['common/getGeo']
			const response = await request.postType('vendor').url(`${this.$route.params.id}?geo=${geo}`).get()
			this.casinos = response.data.body.casinos
			this.top_bonuses = response.data.body.top_bonuses
		}
	},
	async asyncData({ route, error, store }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const geo = store.getters['common/getGeo']
			const response = await request.postType('vendor').url(`${route.params.id}?geo=${geo}`).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { top_bonuses, casinos, reviews, id } = response.data.body
				return { data, top_bonuses, casinos, reviews, id }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	},
	methods: {
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
				`vendor/reviews/${this.id}?sort=${config[filter.key].sort}&order=${config[filter.key].order}`
			)
			if (response.data.confirm === 'ok') {
				this.reviews = response.data.body.posts
			}
		}
	}
}
</script>

<style scoped>
.vendor_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.slots_title {
	font-size: 22px;
	margin-bottom: 30px;
}
.casino_wrapper {
	padding-top: var(--l);
}
.banner_wrapper {
	padding-bottom: var(--m);
}
.container_loop {
	border: 1px solid rgba(255, 255, 255, 0.15);
	background: rgba(27, 24, 49, 1);
	margin-top: 40px;
	border-radius: 20px;
	padding: 32px 22px;
	max-width: 820px;
}
.video_gallery {
	padding-top: 40px;
}
.video_title {
	margin-bottom: 24px;
}
.available_title {
	margin-top: 40px;
}
@media (max-width: 767px) {
	.content_container {
		margin-left: 0;
		margin-right: 0;
		width: 100%;
	}
	.aside {
		margin-top: 20px;
	}
	.aside_bonus_wrapper {
		width: 100%;
	}
	.casino_wrapper {
		padding-top: var(--m);
		padding-bottom: var(--m);
	}
	.container_loop {
		margin-top: 0px;
	}
	.available_title {
		margin-top: 20px;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.aside {
		margin-top: 20px;
	}
	.aside_bonus_wrapper {
		width: 48%;
	}
	.vendor_page .content_container {
		padding: 20px;
	}
}
</style>
