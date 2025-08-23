<template>
	<div>
		<main class="games_page">
			<Gradient />
			<div class="container z-index-3" v-if="data.body.h1">
				<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
			</div>
            <Breadcrumbs :value="[
                 {
                    title: t('BREADCRUMB_MAIN_PAGE'),
                    permalink: '/'
                 },
                 {
                    title: data.body.title,
                    permalink: ''
                 }
            ]" />
			<div class="container z-index-3 container_providers">
				<ProviderFilter :value="data.body.vendors" />
			</div>
			<div class="container z-index-3 container_game_week">
				<div class="left">
					<GameBigCard
						v-if="data.body.game_week.length"
						:link="data.body.game_week[0].permalink"
						:src="data.body.game_week[0].thumbnail"
						:title="data.body.game_week[0].title"
					/>
				</div>
				<div class="right">
					<GameMainCard
						v-for="(item, index) in gamesWeek"
						:key="index"
						:link="item.permalink"
						:src="item.thumbnail"
						:title="item.title"
					/>
				</div>
			</div>
			<div class="container container_loop" v-if="data.body.games.length">
				<SlotLoop :value="data.body.games" />
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
import GameMainCard from '~/components/slot_loop/cards/main'
import GameBigCard from '~/components/slot_loop/cards/big_card'
import SlotLoop from '~/components/custom_slot_loop'
import ProviderFilter from '~/components/provider_list'
import Cookies from '~/components/cookies'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import device from '~/mixins/device'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'

export default {
	name: 'games-page',
	mixins: [pageTemplate, device, components],
	components: {
		Faq,
		BonusCategory,
		GameMainCard,
		GameBigCard,
		SlotLoop,
		ProviderFilter,
		Cookies,
		Gradient,
        Breadcrumbs
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
			url: 'slots',
			geo
		}
		const response = await DAL_Page.getData(request)
		const data = helper.headDataMixin(response.data, route)
		return { data }
	},
	computed: {
		gamesWeek() {
			const config = { DC: 10, MOB: 10, TABLET: 10 }
			return this.data.body.games_week_list.slice(0, config[this.device])
		}
	}
}
</script>
<style scoped>
.games_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
	overflow: hidden;
}
.title {
	margin-bottom: var(--m);
}
.right {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}
.container_game_week {
	display: flex;
	gap: 12px;
	padding-left: 0px;
	padding-right: 0px;
}
.container_loop {
	margin-top: 12px;
	padding-left: 0px;
	padding-right: 0px;
}
.container_providers {
	padding: var(--s) 0px 21px 0px;
}
@media (max-width: 767px) {
	.container_providers {
		padding-left: 15px;
	}
	.container_game_week {
		flex-wrap: wrap;
		padding-left: 15px;
		padding-right: 15px;
	}
	.left {
		width: 100%;
		margin-bottom: 20px;
		justify-content: center;
		display: flex;
	}
	.right {
		justify-content: space-between;
	}
	.container_loop {
		padding-left: 15px;
		padding-right: 15px;
	}
}

@media (min-width: 768px) and (max-width: 1200px) {
	.container_game_week {
		gap: 8px;
	}
	.left {
		min-width: 50%;
	}
	.right {
		justify-content: space-between;
	}
}
</style>
