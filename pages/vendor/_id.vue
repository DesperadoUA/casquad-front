<template>
	<div>
		<main class="vendor_page">
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
                                    title: data.body.title,
                                    permalink: ''
                                }
                            ]"
                            />
							<div class="banner_wrapper" v-if="data.body.banner">
								<Banner :src="data.body.banner" :alt="`${data.body.title} Logo`" />
							</div>
							<div class="content_container">
								<Content :value="data.body.content" />
							</div>
						</template>
						<template v-slot:right>
							<aside class="aside">
								<AText tag="div" :attributes="asideContainerTitle">{{ t('RECOMMENDED_BONUSES') }}</AText>
								<div class="aside_bonus_container">
									<div class="aside_bonus_wrapper" v-for="item in data.body.top_bonuses" :key="item.title">
										<BonusAsideCard
											:permalink="item.permalink"
											:src="item.thumbnail"
											:title="item.title"
											:desc="item.short_desc"
											:value="item.bonus"
											:min_dep="item.min_deposit"
											:wager="item.wagering"
											:refLinks="item.casino.ref"
										/>
									</div>
								</div>
							</aside>
						</template>
					</TwoContentContainer>
					<div class="video_gallery" v-if="data.body.video.length">
						<div class="container">
							<AText tag="div" v-if="data.body.video_title" :attributes="videoTitleSettings">{{ data.body.video_title }}</AText>
							<VideoGallery :posts="videoListWrapper(data.body.video)" />
						</div>
					</div>
					<div class="section_title_wrapper">
						<AText tag="div" :attributes="mainContainerTitle">{{ t('AVAILABLE_THESE_CASINOS') }}</AText>
					</div>
					<div class="casino_wrapper">
						<TwoContentContainer>
							<template v-slot:left>
								<CasinoLoop :value="data.body.casinos" />
								<div class="container_loop" v-if="data.body.games.length">
									<AText tag="div" :attributes="titleSlotsSettings"> {{ t('BEST_GAMES_PROVIDER') }} {{ data.body.title }} </AText>
									<SlotLoop :value="data.body.games" />
								</div>
							</template>
						</TwoContentContainer>
					</div>
				</div>
			</div>
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
			},
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
        Breadcrumbs
	},
	mixins: [pageTemplate, components],
	async asyncData({ route, error }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request
				.postType('vendor')
				.url(route.params.id)
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
.vendor_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.title {
	margin-bottom: var(--m);
}
.category_filter_wrapper {
	padding-top: var(--m);
	padding-bottom: var(--m);
}
.aside_bonus_container {
	margin-top: var(--s);
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
}
.slots_title {
	font-size: 22px;
	margin-bottom: 30px;
}
.casino_wrapper {
	padding-top: var(--l);
	padding-bottom: var(--l);
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
	padding-top: 0px;
	padding-bottom: 40px;
}
.video_title {
	margin-bottom: 24px;
}
@media (max-width: 767px) {
	.content_container {
		margin-left: -15px;
		margin-right: -15px;
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
}
@media (min-width: 768px) and (max-width: 1200px) {
	.aside {
		margin-top: 20px;
	}
	.aside_bonus_wrapper {
		width: 48%;
	}
}
</style>
