<template>
	<div>
		<main class="news_page">
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
			</div>
			<div class="container">
				<NewsLoop :value="data.body.news" />
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
import NewsLoop from '~/components/news_loop'
import Gradient from '~/components/gradient'
import Faq from '~/components/faq'
import helper from '~/helpers/helpers'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper'
import date from '~/components/date'

export default {
	name: 'news-page',
	mixins: [pageTemplate, components],
	components: {
		Faq,
		NewsLoop,
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
	async asyncData({ store, route }) {
		const geo = store.getters['common/getGeo']
		const request = {
			url: 'news',
			geo
		}
		const response = await DAL_Page.getData(request)
		const data = helper.headDataMixin(response.data, route)
		return { data }
	}
}
</script>
<style scoped>
.news_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.news_container {
	display: flex;
	justify-content: space-between;
	margin-top: var(--l);
}
.content_container {
	margin-top: 40px;
}
@media (max-width: 767px) {
	.content_container {
		margin-top: 20px;
	}
}
</style>
