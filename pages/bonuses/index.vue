<template>
	<div>
		<main class="bonuses_page">
			<div class="container">
				<AText tag="div" :attributes="titleSettings">{{ data.body.h1 }}</AText>
			</div>
			<div class="container">
				<div class="bonus_category_container">
					<div class="bonus_category_item" v-for="(item, index) in data.body.bonus_category" :key="index">
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
		</main>
	</div>
</template>

<script>
import DAL_Page from '~/DAL/static_pages'
import pageTemplate from '~/mixins/pageTemplate'
import Faq from '~/components/faq'
import BonusCategory from '~/components/bonus_category'
import helper from '~/helpers/helpers'

export default {
	name: 'bonuses-page',
	mixins: [pageTemplate],
	components: {
		Faq,
		BonusCategory
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
	async asyncData({ store, route }) {
		const request = {
			url: 'bonuses'
		}
		const response = await DAL_Page.getData(request)
		const data = helper.headDataMixin(response.data, route)
		return { data }
	}
}
</script>
<style scoped>
.bonuses_page {
	background: url('/img/casinoPageBg.jpg') top center var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.news_container {
	display: flex;
	justify-content: space-between;
	margin-top: var(--l);
}
.title {
	margin-bottom: var(--m);
}
.bonus_category_container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.bonus_category_item {
	width: 32%;
}
@media (max-width: 767px) {
	.bonus_category_item {
		width: 100%;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.bonus_category_item {
		width: 48%;
	}
	.bonus_category_container {
		gap: 12px;
	}
}
</style>
