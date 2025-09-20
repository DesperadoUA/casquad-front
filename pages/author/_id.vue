<template>
	<div>
		<main class="main_wrapper">
			<Gradient />
			<div class="container container_top_game z-index-3">
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
			<div class="container main_gap">
				<AuthorCardTop />
				<Highlights v-if="data.body.highlights" :title="t('HIGHLIGHTS')" :posts="data.body.highlights" />
				<AuthorAbout :text="data.body.about" :src="data.body.about_img" />
				<div class="container_experience">
					<div v-if="data.body.experience.length" class="experience_col">
						<AuthorExperience :posts="data.body.experience" :title="t('PROFESSIONAL_EXPERIENCE')" />
					</div>
					<div v-if="data.body.education.length" class="experience_col">
						<AuthorExperience :posts="data.body.education" :title="t('EDUCATION')" />
					</div>
				</div>
				<AuthorOverview />
				<AuthorOverviewKeys />
				<div class="content_wrapper">
					<Content v-if="data.body.content" :value="data.body.content" />
				</div>
				<Faq v-if="data.body.faq.length" :value="data.body.faq" />
			</div>
			<Cookies />
		</main>
	</div>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import pageTemplate from '~/mixins/pageTemplate'
import Faq from '~/components/faq'
import Gradient from '~/components/gradient'
import helper from '~/helpers/helpers'
import components from '~/mixins/components'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper'
import date from '~/components/date'
import AuthorCardTop from '~/components/author_card_top'
import Highlights from '~/components/highlights'
import AuthorAbout from '~/components/author_about'
import AuthorExperience from '~/components/author_experience'
import AuthorOverview from '~/components/author_overview'
import AuthorOverviewKeys from '~/components/author_overview_keys/index.vue'

export default {
	name: 'author_single',
	mixins: [pageTemplate, components],
	components: {
		Faq,
		Gradient,
		Breadcrumbs,
		gradientWrapper,
		AuthorCardTop,
		date,
		Highlights,
		AuthorAbout,
		AuthorExperience,
		AuthorOverview,
		AuthorOverviewKeys
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

	async asyncData({ route, error, store }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request.postType('author').url(route.params.id).get()
			if (response.data.confirm === 'error') {
				error({ statusCode: 404, message: 'Post not found' })
			} else {
				const data = helper.headDataMixin(response.data, route)
				const { casinos, reviews, id } = response.data.body
				return { data, casinos, reviews, id }
			}
		} else {
			error({ statusCode: 404, message: 'Post not found' })
		}
	}
}
</script>
<style scoped>
.container_experience {
	display: flex;
	gap: 22px;
}
.experience_col {
	width: calc(50% - 11px);
}
.content_wrapper {
	padding: 20px;
	background: #232036;
	border-radius: var(--m);
}
@media (max-width: 1200px) {
	.content_wrapper {
		padding: 20px 0;
	}
}
@media (max-width: 1200px) {
	.container_experience {
		flex-wrap: wrap;
	}
	.experience_col {
		width: 100%;
	}
}
</style>
