<template>
	<div>
		<main class="bonuses_page">
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
				<div class="bonus_category_container">
					<div class="bonus_category_item" v-for="(item, index) in bonus_category" :key="index">
						<BonusCategory :title="item.title" :link="item.permalink" :posts="item.posts" />
					</div>
				</div>
			</div>
			<div class="container content_container">
				<Content :value="data.body.content" />
			</div>
			<div class="container">
				<div class="faq_container">
					<Faq :value="data.body.faq" />
				</div>
			</div>
			<Cookies />
		</main>
	</div>
</template>

<script>
import DAL_Page from '~/DAL/static_pages'
import pageTemplate from '~/mixins/pageTemplate'
import Faq from '~/components/faq'
import BonusCategory from '~/components/bonus_category'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper/index.vue'
import date from '~/components/date'
import geo from '~/mixins/geo'

export default {
	name: 'bonuses-page',
	mixins: [pageTemplate, components, geo],
	components: {
		Faq,
		BonusCategory,
		Gradient,
		Breadcrumbs,
		gradientWrapper,
		date
	},
	layout: 'default',
	data: () => {
		return {
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title'
			}
		}
	},
	watch: {
		async geo() {
			const geo = this.$store.getters['common/getGeo']
			const request = {
				url: 'bonuses',
				geo
			}
			const response = await DAL_Page.getData(request)
			this.bonus_category = response.data.body.bonus_category
		}
	},
	async asyncData({ store, route }) {
		const geo = store.getters['common/getGeo']
		const request = {
			url: 'bonuses',
			geo
		}
		const response = await DAL_Page.getData(request)
		const data = helper.headDataMixin(response.data, route)
		const { bonus_category } = response.data.body
		return { data, bonus_category }
	}
}
</script>
<style scoped>
.bonuses_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.news_container {
	display: flex;
	justify-content: space-between;
	margin-top: var(--l);
}
.bonus_category_container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 30px;
}
.bonus_category_item {
	width: calc(33% - 30px);
}
::v-deep h1 {
	margin-bottom: 0px;
}
.category_page .content_container {
	padding-top: 10px;
}
@media (max-width: 767px) {
	.bonus_category_container {
		gap: 20px;
	}
	.bonus_category_item {
		width: 100%;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.bonus_category_item {
		width: 100%;
	}
	.bonus_category_container {
		gap: 12px;
	}
	.bonuses_page .content_container {
		padding: 20px;
	}
}
</style>
