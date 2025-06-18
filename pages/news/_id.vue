<template>
	<main class="news_page">
		<Gradient />
		<div class="container z-index-3">
			<TwoContentContainer>
				<template v-slot:left>
					<AText tag="h1" :attributes="titleSettings">{{ data.body.h1 }}</AText>
					<Banner :src="data.body.thumbnail" :alt="`${data.body.title} Logo`" />
					<div class="content_container">
						<Content :value="data.body.content" />
					</div>
				</template>
				<template v-slot:right>
					<AText tag="div" :attributes="subTitleSettings">{{ t('POPULAR_NEWS') }}</AText>
					<aside class="aside">
						<div class="aside_post_wrapper" v-for="item in data.body.last_news" :key="item.title">
							<NewsSliderCard
								:link="item.permalink"
								:src="item.icon"
								:title="item.title"
								:desc="item.create_at.slice(0, 10)"
							/>
						</div>
					</aside>
				</template>
			</TwoContentContainer>
		</div>
		<section class="similar_casino_wrapper"  v-if="data.body.casinos.length">
			<div class="container">
				<div class="section_title_wrapper">
					<AText tag="div" :attributes="mainContainerTitle">{{ t('RECOMMENDED_CASINOS') }}</AText>
				</div>
				<div class="casino_wrapper">
					<TwoContentContainer>
						<template v-slot:left>
							<CasinoLoop :value="data.body.casinos" />
						</template>
					</TwoContentContainer>
				</div>
			</div>
		</section>
		<div class="news_loop">
			<div class="container">
				<div class="section_title_wrapper">
					<AText tag="div" :attributes="mainContainerTitle">{{ t('LAST_NEWS') }}</AText>
				</div>
				<div class="news_container">
					<NewsMainCard
						v-for="item in data.body.posts"
						:key="item.title"
						:link="item.permalink"
						:src="item.thumbnail"
						:title="item.title"
						:date="item.create_at.slice(0, 10)"
						:desc="item.short_desc"
					/>
				</div>
			</div>
		</div>
		<Cookies />
	</main>
</template>

<script>
import DAL_Builder from '~/DAL/builder'
import pageTemplate from '~/mixins/pageTemplate'
import TwoContentContainer from '~/components/two_content_container/'
import NewsSliderCard from '~/components/news_loop/cards/slider_card'
import LinkWithArrow from '~/components/ui/atoms/links/link_with_arrow'
import NewsMainCard from '~/components/news_loop/cards/main'
import Gradient from '~/components/gradient'
import CasinoLoop from '~/components/casino_loop'
import Banner from '~/components/banner/'
import helper from '~/helpers/helpers'

export default {
	name: 'news_single',
	mixins: [pageTemplate],
	components: {
		TwoContentContainer,
		NewsSliderCard,
		LinkWithArrow,
		NewsMainCard,
		Banner,
		Gradient,
		CasinoLoop
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
			mainContainerTitle: {
				weight: 'extra-bold',
				color: 'cairo',
				size: 'x-large'
			}
		}
	},
	async asyncData({ route, error }) {
		if (route.params.id) {
			const request = new DAL_Builder()
			const response = await request
				.postType('news')
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
.news_page {
	background: var(--colombo);
	background-repeat: no-repeat;
	padding-top: 165px;
}
.title {
	margin-bottom: 32px;
}
.sub_title {
	margin-bottom: 16px;
	margin-top: 60px;
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
.news_loop {
	padding-top: 40px;
	padding-bottom: 60px;
	background: var(--cancun);
}
.news_container {
	display: flex;
	justify-content: space-between;
	margin-top: var(--l);
}
.casino_wrapper {
	padding-top: var(--l);
	padding-bottom: var(--l);
}
@media (max-width: 767px) {
	.content_container {
		margin-left: -15px;
		margin-right: -15px;
	}
	.aside {
		margin-bottom: 40px;
	}
	.news_container {
		gap: 20px;
		overflow-x: scroll;
		margin-right: -20px;
	}
	.news_container .item:last-child {
		margin-right: 20px;
	}
	.casino_wrapper {
		padding-top: var(--m);
		padding-bottom: var(--m);
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
	.news_container {
		overflow-y: scroll;
		gap: 20px;
		margin-right: -20px;
	}
	.news_container .item:last-child {
		margin-right: 20px;
	}
}
</style>
