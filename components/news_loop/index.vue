<template>
	<div>
		<div class="news_loop">
			<div class="news_item" v-for="item in currentPosts" :key="item.title">
				<NewsMainCard
					:link="item.permalink"
					:src="item.thumbnail"
					:title="item.title"
					:date="item.create_at.slice(0, 10)"
					:desc="item.short_desc"
				/>
			</div>
		</div>
		<div class="items-more" v-if="hideBtnShowMore">
			<div class="btn_wrapper">
				<AButton @onClick="postShowMore" :attributes="btnSettings" title="Show more">
					{{ t('SHOW_MORE') }} <AImg :attributes="arrowSettings" src="/img/arrowGreen.svg" />
				</AButton>
			</div>
		</div>
	</div>
</template>

<script>
import { NEWS as NumberPostOnQuery } from '~/config/postLoader'
import NewsMainCard from '~/components/news_loop/cards/main'
import postLoader from '~/mixins/postLoader'
import components from '~/mixins/components'
export default {
	name: 'news_loop',
	components: { NewsMainCard },
	props: {
		value: {
			type: Array,
			default() {
				return []
			}
		}
	},
	mixins: [components, postLoader],
	data() {
		return {
			numberPostOnQuery: NumberPostOnQuery,
			btnSettings: {
				color: 'cairo',
				class: 'load_more',
				weight: 'bold',
				size: 'medium'
			},
			arrowSettings: {
				width: '18px',
				height: '18px',
				class: 'arrow'
			}
		}
	}
}
</script>
<style scoped>
.news_loop {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
}
.items-more {
	display: flex;
	justify-content: center;
	margin-top: var(--l);
	height: 52px;
}
.btn_wrapper {
	max-width: 272px;
	width: 272px;
}
.load_more {
	background: rgba(255, 255, 255, 0.1);
	border-radius: var(--s);
	border: rgba(255, 255, 255, 0.05);
}
.arrow {
	transform: rotate(90deg);
	margin-left: 10px;
}
@media (max-width: 767px) {
	.news_loop {
		justify-content: center;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.news_loop {
		justify-content: space-between;
	}
}
</style>
