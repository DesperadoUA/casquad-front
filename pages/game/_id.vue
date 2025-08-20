<template>
	<div>
		<main class="game_page">
			<Gradient />
			<div class="container container_top_game z-index-3">
				<SlotCard
					:title="data.body.title"
					:src="data.body.thumbnail"
					:rtp="data.body.rtp"
					:min_bid="data.body.min_bid"
					:line="data.body.lines"
					:scheme="data.body.scheme"
					:demo="data.body.iframe ? true : false"
					:vendor_title="data.body.vendor.length ? data.body.vendor[0].title : ''"
					:vendor_permalink="data.body.vendor.length ? data.body.vendor[0].permalink : ''"
					:vendor_icon="data.body.vendor.length ? data.body.vendor[0].icon : ''"
					:casinos="data.body.casinos"
					:refLinks="data.body.ref"
					@onClickDemoActivate="onClickDemoActivate"
				/>
			</div>
            <Breadcrumbs :value="[
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
            ]" />
			<div class="symbols" v-if="data.body.symbols.length">
				<div class="container">
					<AText tag="div" :attributes="videoTitleSettings">{{ t('SLOT_SYMBOLS') }}</AText>
					<SlotSymbols :posts="data.body.symbols" :title="data.body.title" />
				</div>
			</div>
			<div class="screenshots" v-if="data.body.screenshots.length">
				<div class="container">
					<AText tag="div" :attributes="symbolTitleSettings">{{ t('SCREENSHOTS') }}</AText>
					<SlotScreenshots :posts="data.body.screenshots" :title="data.body.title" />
				</div>
			</div>
			<div class="video_gallery" v-if="data.body.video.length">
				<div class="container">
					<AText tag="div" v-if="data.body.video_title" :attributes="symbolTitleSettings">{{ data.body.video_title }}</AText>
					<VideoGallery :posts="videoListWrapper(data.body.video)" />
				</div>
			</div>
			<div class="container">
				<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
			</div>
			<div class="container content_container" v-if="data.body.content">
				<Content :value="data.body.content" />
			</div>
			<div class="container" v-if="data.body.faq.length">
				<div class="faq_container">
					<Faq :value="data.body.faq" />
				</div>
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
import {SLOTS_ROOT_SLUG} from '~/constants'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'

export default {
	name: 'game_single',
	mixins: [pageTemplate, components],
	components: {
		SlotCard,
		SlotSymbols,
		SlotScreenshots,
		Faq,
		SlotPopUp,
		Gradient,
		VideoGallery,
        Breadcrumbs
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
            slotsRootSlug: SLOTS_ROOT_SLUG
        }
	},
	async asyncData({ route, error }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request
				.postType('game')
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
		onClickDemoActivate() {
			this.isShowDemo = true
		},
		onClickDemoClose() {
			this.isShowDemo = false
		},
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
.game_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.container_top_game {
	padding-bottom: 20px;
}
.symbols {
	background: var(--cucuta);
	padding-top: 20px;
	padding-bottom: 20px;
}
.screenshots {
	padding-top: 20px;
	padding-bottom: 20px;
}
.title {
	margin-bottom: 24px;
}
.video_gallery {
	padding-top: 20px;
	padding-bottom: 40px;
}
.content_container {
	padding-top: 16px;
}
@media (max-width: 767px) {
	.symbols,
	.screenshots {
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.container_top_game {
		padding-bottom: 20px;
	}
}
</style>
