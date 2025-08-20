<template>
	<main class="bonus_page">
		<Gradient />
		<div class="container z-index-3">
			<TwoContentContainer>
				<template v-slot:left>
					<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
                    <Breadcrumbs :value="[
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
					<Banner v-if="data.body.banner" :src="data.body.banner" :alt="`${data.body.title}`" />
                    <div class="action_container">
                        <button class="action" @click="refActivate(data.body.casino.ref)">Get Bonus</button>
                    </div>
					<div class="content_container">
						<Content :value="data.body.content" />
					</div>
                    <div class="action_container">
                        <button class="action" @click="refActivate(data.body.casino.ref)">Get Bonus</button>
                    </div>
				</template>
				<template v-slot:right>
					<AText tag="div" :attributes="subTitleSettings">{{ t('MOST_PROFITABLE_BONUSES') }}</AText>
					<aside class="aside">
                       <div class="aside_bonus_container">
								<div class="aside_bonus_wrapper" v-for="item in data.body.bonuses" :key="item.title">
									<BonusAsideCard
										:src="item.thumbnail"
										:title="item.title"
										:desc="item.short_desc"
										:value="item.bonus"
										:min_dep="item.min_deposit"
										:wager="item.wagering"
										:refLinks="item.casino.ref"
										:permalink="item.permalink"
									/>
								</div>
							</div>
					</aside>
				</template>
			</TwoContentContainer>
		</div>
		<SlickBonus :refLinks="data.body.casino.ref" />
		<Cookies />
	</main>
</template>
<script>
import DAL_Builder from '~/DAL/builder'
import pageTemplate from '~/mixins/pageTemplate'
import TwoContentContainer from '~/components/two_content_container/'
import BonusAsideCard from '~/components/bonus_loop/cards/aside_card'
import SlickBonus from '~/components/slick_bonus/'
import Banner from '~/components/banner/'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import ref from '~/mixins/ref'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import {BONUSES_ROOT_SLUG} from '~/constants'
export default {
	name: 'bonus_single',
	mixins: [ref, pageTemplate, components],
	components: {
		TwoContentContainer,
		Banner,
        BonusAsideCard,
		SlickBonus,
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
				class: 'title'
			},
			subTitleSettings: {
				color: 'cairo',
				size: 'large',
				weight: 'bold',
				class: 'sub_title'
			},
            bonusesRootSlug: BONUSES_ROOT_SLUG
		}
	},
	async asyncData({ route, error }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request
				.postType('bonus')
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
.bonus_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.title {
	margin-bottom: 32px;
}
.sub_title {
	margin-bottom: 16px;
}
.thumbnail {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.section_title_wrapper {
	display: flex;
	justify-content: space-between;
}
.action_container {
    padding-top: var(--m);
    padding-bottom: var(--m);
    display: flex;
    justify-content: center;
}
.action {
    background: var(--calgary);
    width: 250px;
    height: 50px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: var(--s);
    font-weight: bolder;
	text-transform: uppercase;
	color: var(--cucuta);
}
.aside_bonus_container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.aside_bonus_wrapper {
    width: 100%;
}
@media (max-width: 767px) {
	.content_container {
		margin-left: -15px;
		margin-right: -15px;
	}
    .aside_bonus_container {
		margin-bottom: 20px;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.aside {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 25px;
		justify-content: space-between;
	}
	.sub_title {
		margin-top: 15px;
	}
	.aside_post_wrapper {
		width: 48%;
	}
    .aside_bonus_container {
		justify-content: space-between;
	}
}
</style>
