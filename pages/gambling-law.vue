<template>
	<div>
		<main class="games_page">
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
			<div class="container content_container z-index-3" v-if="data.body.content">
				<Content :value="data.body.content" />
			</div>
			<Cookies />
		</main>
	</div>
</template>

<script>
import DAL_Page from '~/DAL/static_pages'
import pageTemplate from '~/mixins/pageTemplate'
import helper from '~/helpers/helpers'
import device from '~/mixins/device'
import Gradient from '~/components/gradient'
import Breadcrumbs from '~/components/breadcrumbs'
import components from '~/mixins/components'
import gradientWrapper from '~/components/gradient_wrapper'
import date from '~/components/date'

export default {
	name: 'gambling-law-page',
	mixins: [pageTemplate, device, components],
	layout: 'default',
	components: { Gradient, Breadcrumbs, gradientWrapper, date },
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
			url: 'gambling-law'
		}
		const response = await DAL_Page.getData(request)
		const data = helper.headDataMixin(response.data, route)
		return { data }
	}
}
</script>
<style scoped>
.games_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
	margin-bottom: 40px;
}
</style>
