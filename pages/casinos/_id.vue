<template>
	<div>
		<main class="category_page">
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
						<CategoryFilter
							:value="
								[
									{
										title: 'All',
										permalink: '/',
										thumbnail: ''
									}
								].concat(data.body.casino_category)
							"
						/>
					</gradientWrapper>
				</div>
				<div class="main_container">
					<TwoContentContainer>
						<template v-slot:left>
							<CasinoLoop :value="posts" />
						</template>
						<template v-slot:right>
							<aside class="aside">
								<AsideBonuses :title="t('RECOMMENDED_BONUSES')" :posts="top_bonuses" />
							</aside>
						</template>
					</TwoContentContainer>
				</div>
			</div>
			<div class="container content_container" v-if="data.body.content">
				<Content :value="data.body.content" />
			</div>
			<div class="container" v-if="data.body.faq.length">
				<div class="faq_container">
					<Faq :value="data.body.faq" />
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
import Faq from '~/components/faq'
import CasinoLoop from '~/components/casino_loop'
import Gradient from '~/components/gradient'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper'
import geo from '~/mixins/geo'
import AsideBonuses from '~/components/aside_bonuses'

export default {
	name: 'casino-category',
	data: () => {
		return {
			asideContainerTitle: {
				weight: 'bold',
				color: 'cairo',
				size: 'large',
				class: 'aside_container_title'
			},
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title'
			}
		}
	},
	components: {
		TwoContentContainer,
		Faq,
		CasinoLoop,
		CategoryFilter,
		Gradient,
		Breadcrumbs,
		gradientWrapper,
		AsideBonuses
	},
	mixins: [pageTemplate, components, geo],
	watch: {
		async geo() {
			const request = new DAL_Builder()
			const geo = this.$store.getters['common/getGeo']
			const response = await request.postType('casinos').url(`${this.$route.params.id}?geo=${geo}`).get()
			this.posts = response.data.body.posts
			this.top_bonuses = response.data.body.top_bonuses
		}
	},
	async asyncData({ route, error, store }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const geo = store.getters['common/getGeo']
			const response = await request.postType('casinos').url(`${route.params.id}?geo=${geo}`).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { posts, top_bonuses } = response.data.body
				return { data, posts, top_bonuses }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	}
}
</script>

<style scoped>
.category_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.content_container {
	margin-bottom: 40px;
}
@media (max-width: 767px) {
	.content_container {
		margin-bottom: 20px;
	}
	.category_page ::v-deep .casino_loop {
		padding-bottom: 0px;
	}
	.aside {
		padding-top: var(--l);
	}
}
</style>
