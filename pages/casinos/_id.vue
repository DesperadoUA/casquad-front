<template>
	<div>
		<main class="category_page">
			<Gradient />
			<div class="container z-index-3">
				<div class="main_container">
					<TwoContentContainer>
						<template v-slot:left>
							<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
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
							<div class="category_filter_wrapper">
								<CategoryFilter :value="[{
								title: 'All',
								permalink: '/',
								thumbnail: ''
							}].concat(data.body.casino_category)" />
							</div>
							<CasinoLoop :value="posts" />
						</template>
						<template v-slot:right>
							<aside class="aside">
								<AText tag="div" :attributes="asideContainerTitle">{{ t('RECOMMENDED_BONUSES') }}</AText>
								<div class="aside_bonus_container">
									<div class="aside_bonus_wrapper" v-for="item in top_bonuses" :key="item.title">
										<BonusAsideCard
											:link="item.permalink"
											:src="item.thumbnail"
											:title="item.title"
											:desc="item.short_desc"
											:value="item.bonus"
											:min_dep="item.min_deposit"
											:wager="item.wagering"
                                            :refLinks="Array.isArray(item.ref) ? {} : item.ref"
											:permalink="item.permalink"
										/>
									</div>
								</div>
							</aside>
						</template>
					</TwoContentContainer>
				</div>
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
import DAL_Builder from '~/DAL/builder'
import helper from '~/helpers/helpers'
import pageTemplate from '~/mixins/pageTemplate'
import TwoContentContainer from '~/components/two_content_container/'
import CategoryFilter from '~/components/category_filter'
import BonusAsideCard from '~/components/bonus_loop/cards/aside_card'
import Faq from '~/components/faq'
import CasinoLoop from '~/components/casino_loop'
import Gradient from '~/components/gradient'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import geo from '~/mixins/geo'
export default {
	name: 'casino-category',
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


		}
	},
	components: {
		TwoContentContainer,
		BonusAsideCard,
		Faq,
		CasinoLoop,
		CategoryFilter,
		Gradient,
        Breadcrumbs
	},
	mixins: [pageTemplate, components, geo],
    watch: {
        async geo() {
            const request = new DAL_Builder()
            const geo = this.$store.getters['common/getGeo']
            const response = await request
                .postType('casinos')
                .url(`${this.$route.params.id}?geo=${geo}`)
                .get()
            this.posts = response.data.body.posts
            this.top_bonuses = response.data.body.top_bonuses
        }
    },
	async asyncData({ route, error, store }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const geo = store.getters['common/getGeo']
			const response = await request
				.postType('casinos')
				.url(`${route.params.id}?geo=${geo}`)
				.get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
                const { posts, top_bonuses } = response.data.body
				return { data, posts, top_bonuses }
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
@media (max-width: 767px) {
	.aside {
		padding-top: var(--l);
	}
	.aside_bonus_wrapper {
		width: 100%;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.aside_bonus_wrapper {
		width: 48%;
	}
	.aside_bonus_container {
		justify-content: space-between;
	}
}
</style>
