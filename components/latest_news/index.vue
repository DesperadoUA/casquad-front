<template>
	<section class="news_loop">
		<div class="container">
			<div class="section_title_wrapper">
				<AText tag="div" :attributes="mainContainerTitle">{{ title }}</AText>
			</div>
			<div class="news_container">
				<div class="news_item" v-for="item in posts" :key="item.title">
					<NewsMainCard
						:link="item.permalink"
						:src="item.thumbnail"
						:title="item.title"
						:date="item.create_at.slice(0, 10)"
						:desc="item.short_desc"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import NewsMainCard from '~/components/news_loop/cards/main'
import components from '~/mixins/components'
export default {
	name: 'latest_news',
	components: { NewsMainCard },
	mixins: [components],
	data: () => {
		return {
			mainContainerTitle: {
				weight: 'extra-bold',
				color: 'cairo',
				size: 'x-large'
			}
		}
	},
	props: {
		posts: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
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
@media (max-width: 576px) {
	.news_item {
		width: 100%;
		min-width: 265px;
	}
}
@media (max-width: 767px) {
	.news_container {
		gap: 20px;
		overflow-x: scroll;
		margin-right: -20px;
	}
	.news_container .item:last-child {
		margin-right: 20px;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.news_container {
		overflow-y: scroll;
		gap: 20px;
		margin-right: -20px;
	}
	.news_container .item:last-child {
		margin-right: 20px;
	}
	.news_item {
		width: calc(50% - 10px);
		min-width: 265px;
	}
}
</style>
