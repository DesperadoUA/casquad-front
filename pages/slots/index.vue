<template>
	<div>
		<main class="games_page">
			<Gradient />
			<div class="container z-index-3" v-if="data.body.h1">
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
			<div class="container z-index-3 container_providers">
				<ProviderFilter :value="data.body.vendors" />
			</div>
			<div class="container z-index-3" v-if="data.body.games.length || gamesWeek.length">
				<SlotLoop
					:value="data.body.games"
					:prepend="gamesWeek"
					:week-game="weekGame"
				/>
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
import DAL_Page from '~/DAL/static_pages'
import pageTemplate from '~/mixins/pageTemplate'
import Faq from '~/components/faq'
import BonusCategory from '~/components/bonus_category'
import SlotLoop from '~/components/custom_slot_loop'
import ProviderFilter from '~/components/provider_list'
import Cookies from '~/components/cookies'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import device from '~/mixins/device'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper'
import date from '~/components/date'

export default {
	name: 'games-page',
	mixins: [pageTemplate, device, components],
	components: {
		Faq,
		BonusCategory,
		SlotLoop,
		ProviderFilter,
		Cookies,
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
	async asyncData({ store, route, error }) {
		const geo = store.getters['common/getGeo']
		const request = {
			url: 'slots',
			geo
		}
		const response = await DAL_Page.getData(request)
		if (response.data.confirm === 'error') {
			return error({ statusCode: 404, message: 'Post not found' })
		}
		const data = helper.headDataMixin(response.data, route)
		return { data }
	},
	computed: {
		gamesWeek() {
			const config = { DC: 10, MOB: 10, TABLET: 8 }
			return this.data.body.games_week_list.slice(0, config[this.device])
		},
		weekGame() {
			if (!this.data.body.game_week.length) return null
			return this.data.body.game_week[0]
		}
	}
}
</script>
<style scoped>
.games_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
	display: flex;
	flex-direction: column;
	gap: var(--gap-components);
	padding-bottom: 40px;
}
.container_providers {
	padding: 0;
}
.content_container {
	margin-top: 0;
	margin-bottom: 0;
}
@media (max-width: 767px) {
	.container_providers {
		padding-left: 15px;
	}
}
</style>
