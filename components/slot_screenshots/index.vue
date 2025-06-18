<template>
		<Fancybox :options="{Carousel: {infinite: false}}">
			<div class="item_container">
				<a class="item_wrapper" v-for="(item, index) in posts" :key="index" data-fancybox="gallery" :href="item.src">
					<SlotScreenshotsItem :src="item.src" :title="title" />
				</a>
			</div>
		</Fancybox>
</template>

<script>
import SlotScreenshotsItem from '~/components/slot_screenshots/item'
import Fancybox  from '~/components/fancybox';
export default {
	name: 'game_screenshots',
	components: { SlotScreenshotsItem, Fancybox },
	data() {
		return {
			currentValue: []
		}
	},
	props: {
		posts: {
			type: Array,
			default() {
				return []
			}
		},
		title: {
			type: String,
			default() {
				return ''
			}
		}
	},
}
</script>

<style scoped>
.item_container {
	display: flex;
	flex-wrap: wrap;
	gap: 32px 3%;
}
.item_wrapper {
	min-width: 22%;
	max-width: 22%;
}
@media (max-width: 767px) {
	.item_container {
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.item_wrapper {
		width: calc(50% - 10px);
		max-width: none;
		min-width: none;
	}
	.item_container {
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20px;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.item_wrapper {
		min-width: 45%;
		max-width: 45%;
	}
}
</style>
