<template>
	<main class="bonus_page">
		<Gradient />
		<div class="container z-index-3">
			<div class="h1_wrapper">
				<gradientWrapper>
					<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
					<Breadcrumbs
						:value="[
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
					<date :value="data.body.update_at.slice(0, 10)" />
				</gradientWrapper>
			</div>
			<TwoContentContainer>
				<template v-slot:left>
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
					<aside class="aside">
						<AsideBonuses :title="t('MOST_PROFITABLE_BONUSES')" :posts="bonuses" />
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
import SlickBonus from '~/components/slick_bonus/'
import Banner from '~/components/banner/'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import ref from '~/mixins/ref'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import { BONUSES_ROOT_SLUG } from '~/constants'
import gradientWrapper from '~/components/gradient_wrapper/index.vue'
import date from '~/components/date'
import geo from '~/mixins/geo'
import AsideBonuses from '~/components/aside_bonuses'

export default {
	name: 'bonus_single',
	mixins: [ref, pageTemplate, components, geo],
	components: {
		TwoContentContainer,
		Banner,
		SlickBonus,
		Gradient,
		Breadcrumbs,
		gradientWrapper,
		date,
		AsideBonuses
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
	watch: {
		async geo() {
			const request = new DAL_Builder()
			const geo = this.$store.getters['common/getGeo']
			const response = await request.postType('bonus').url(`${this.$route.params.id}?geo=${geo}`).get()
			this.bonuses = response.data.body.bonuses
		}
	},
	async asyncData({ route, error, store }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const geo = store.getters['common/getGeo']
			const response = await request.postType('bonus').url(`${route.params.id}?geo=${geo}`).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { bonuses } = response.data.body
				return { data, bonuses }
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
.aside_bonus_wrapper {
	width: 100%;
}
@media (max-width: 767px) {
	.content_container {
		margin-left: 0;
		margin-right: 0;
		width: 100%;
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
}
</style>
