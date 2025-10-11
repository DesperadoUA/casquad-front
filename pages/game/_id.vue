<template>
	<div>
		<main class="main_wrapper_slots">
			<Gradient modifier="large" />
			<div class="container container_top_game z-index-3 main_gap">
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
			<div class="symbols" v-if="data.body.symbols.length">
				<div class="container">
					<AText tag="div" :attributes="videoTitleSettings">{{ t('SLOT_SYMBOLS') }}</AText>
					<SlotSymbols :posts="data.body.symbols" :title="data.body.title" />
				</div>
			</div>
			<div class="container" v-if="data.body.screenshots.length">
				<div class="screenshots">
					<AText tag="div" :attributes="symbolTitleSettings">{{ t('SCREENSHOTS') }}</AText>
					<SlotScreenshots :posts="data.body.screenshots" :title="data.body.title" />
				</div>
			</div>
			<div class="container" v-if="data.body.video.length">
				<div class="video_gallery">
					<AText tag="div" v-if="data.body.video_title" :attributes="symbolTitleSettings">{{
						data.body.video_title
					}}</AText>
					<VideoGallery :posts="videoListWrapper(data.body.video)" />
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
		AuthorSummary
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
.symbols {
	background: var(--cucuta);
	padding-top: 20px;
	padding-bottom: 20px;
}
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
@media (max-width: 767px) {
	.symbols,
	.screenshots {
		padding-top: 20px;
		padding-bottom: 20px;
	}
}
</style>
