<template>
	<div>
		<main class="category_page">
			<Gradient />
			<div class="container z-index-3">
				<BonusLoop :value="posts" />
			</div>
			<div class="container h1_wrapper">
				<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
			</div>
			<Breadcrumbs
				:value="[
					{
						title: t('BREADCRUMB_MAIN_PAGE'),
						permalink: '/'
					},
					{
						title: t('BREADCRUMB_BONUS_TITLE_PAGE'),
						permalink: `/${bonusesRootSlug}`
					},
					{
						title: data.body.title,
						permalink: ''
					}
				]"
			/>
			<div class="container content_container">
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
import Faq from '~/components/faq'
import BonusLoop from '~/components/bonus_loop'
import Gradient from '~/components/gradient'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import { BONUSES_ROOT_SLUG } from '~/constants'
import geo from '~/mixins/geo'

export default {
	name: 'bonus-category',
	data: () => {
		return {
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title'
			},
			bonusesRootSlug: BONUSES_ROOT_SLUG
		}
	},
	components: {
		Faq,
		BonusLoop,
		Gradient,
		Breadcrumbs
	},
	mixins: [pageTemplate, components, geo],
	watch: {
		async geo() {
			const request = new DAL_Builder()
			const geo = this.$store.getters['common/getGeo']
			const response = await request.postType('bonuses').url(`${this.$route.params.id}?geo=${geo}`).get()
			this.posts = response.data.body.posts
		}
	},
	async asyncData({ route, error, store }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const geo = store.getters['common/getGeo']
			const response = await request.postType('bonuses').url(`${route.params.id}?geo=${geo}`).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { posts } = response.data.body
				return { data, posts }
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
.aside {
	padding-top: var(--xl);
}
::v-deep h1 {
	margin-bottom: 0px;
}
.h1_wrapper {
	margin-top: 40px;
}
.category_page .content_container {
	padding-top: 10px;
}
.content_container {
	margin-top: 40px;
	margin-bottom: 40px;
}
@media (max-width: 767px) {
	.content_container {
		margin-top: 20px;
		margin-bottom: 20px;
	}
}
</style>
