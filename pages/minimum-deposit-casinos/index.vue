<template>
	<div>
		<main class="main_wrapper">
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
									title,
									permalink: ''
								}
							]"
						/>
						<AText tag="h1" :attributes="titleSettings">{{ h1 }}</AText>
						<date :value="update_at.slice(0, 10)" />
					</gradientWrapper>
				</div>
			</div>
			<div class="container content_container z-index-3" v-if="content">
				<Content :value="content" />
			</div>
			<div class="container" v-if="faq.length">
				<div class="main_gap">
					<h2 class="text_color_cairo">{{ t('FAQ_MINIMUM_DEPOSIT_CASINOS') }}</h2>
					<Faq :value="faq" />
				</div>
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
import Faq from '~/components/faq'

export default {
	name: 'minimum-deposit-casinos-page',
	mixins: [pageTemplate, device, components],
	layout: 'default',
	components: { Gradient, Breadcrumbs, gradientWrapper, date, Faq },
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
			url: 'minimum-deposit-casinos'
		}
		const response = await DAL_Page.getData(request)
		const data = helper.headDataMixin(response.data, route)
		const { content, h1, title, update_at, faq } = data.body
		return { data, content, h1, title, update_at, faq }
	}
}
</script>
