<template>
	<Fancybox :options="{ Carousel: { infinite: false } }">
		<div class="item_container">
			<a class="item_wrapper" v-for="(item, index) in posts" :key="index" data-fancybox="gallery" :href="item.src">
				<SlotScreenshotsItem :src="item.src" :title="title" />
			</a>
		</div>
	</Fancybox>
</template>

<script>
import SlotScreenshotsItem from '~/components/slot_screenshots/item'
import Fancybox from '~/components/fancybox'
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
	}
}
</script>

<style scoped>
.item_container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 20px;
}
.item_wrapper {
	display: block;
	width: 100%;
	min-width: 0;
}
@media (max-width: 767px) {
	.item_container {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.item_container {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}
</style>
