<template>
	<div>
		<main class="vendor_page">
			<div class="container">
				<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
				<div class="main_container">
					<TwoContentContainer>
						<template v-slot:left>
							<div class="banner_wrapper" v-if="data.body.banner">
								<Banner :src="data.body.banner" :alt="`${data.body.title} Logo`" />
							</div>
							<div class="content_container">
								<Content :value="data.body.content" />
							</div>
						</template>
						<template v-slot:right>
							<aside class="aside">
								<AText tag="div" :attributes="asideContainerTitle">{{ t('RECOMMENDED_BONUSES') }}</AText>
								<div class="aside_bonus_container">
									<div class="aside_bonus_wrapper" v-for="item in data.body.top_bonuses" :key="item.title">
										<BonusAsideCard
											:link="item.permalink"
											:src="item.thumbnail"
											:title="item.title"
											:desc="item.short_desc"
											:value="item.bonus"
											:min_dep="item.min_deposit"
											:wager="item.wagering"
											:refLinks="item.casino.ref"
										/>
									</div>
								</div>
							</aside>
						</template>
					</TwoContentContainer>
					<div class="casino_wrapper">
						<TwoContentContainer>
							<template v-slot:left>
								<CasinoLoop :value="data.body.casinos" />
							</template>
						</TwoContentContainer>
					</div>
					<div class="container_loop" v-if="data.body.games.length">
						<AText tag="div" :attributes="titleSlotsSettings"> {{ t('BEST_GAMES_PROVIDER') }} {{ data.body.title }} </AText>
						<SlotLoop :value="data.body.games" />
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import helper from '~/helpers/helpers'
import pageTemplate from '~/mixins/pageTemplate'
import TwoContentContainer from '~/components/two_content_container/'
import CategoryFilter from '~/components/category_filter'
import BonusAsideCard from '~/components/bonus_loop/cards/aside_card'
import CasinoLoop from '~/components/casino_loop'
import SlotLoop from '~/components/slot_loop'
import Banner from '~/components/banner/'
export default {
	name: 'single-vendor',
	data: () => {
		return {
			asideContainerTitle: {
				weight: 'bold',
				color: 'cairo',
				size: 'large'
			},
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title'
			},
			titleSlotsSettings: {
				color: 'cairo',
				weight: 'regular',
				class: 'slots_title'
			}
		}
	},
	components: {
		TwoContentContainer,
		CategoryFilter,
		BonusAsideCard,
		CasinoLoop,
		SlotLoop,
		Banner
	},
	mixins: [pageTemplate],
	async asyncData({ route, error }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request
				.postType('vendor')
				.url(route.params.id)
				.get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				return { data }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	}
}
</script>

<style scoped>
.vendor_page {
	background: url('/img/casinoPageBg.jpg') top center var(--colombo);
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
.slots_title {
	font-size: 22px;
	margin-bottom: 30px;
}
.casino_wrapper {
	padding-top: var(--l);
	padding-bottom: var(--l);
}
.banner_wrapper {
	padding-bottom: var(--m);
}
@media (max-width: 767px) {
	.content_container {
		margin-left: -15px;
		margin-right: -15px;
	}
	.aside {
		margin-top: 20px;
	}
	.aside_bonus_wrapper {
		width: 100%;
	}
	.casino_wrapper {
		padding-top: var(--m);
		padding-bottom: var(--m);
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.aside {
		margin-top: 20px;
	}
	.aside_bonus_wrapper {
		width: 48%;
	}
}
</style>
