<template>
	<span class="item">
		<AImg :attributes="{ ...imgSettings, alt: `${title} Screen` }" :src="src" />
	</span>
</template>

<script>
import components from '~/mixins/components'
export default {
	name: 'game_screenshots_item',
	mixins: [components],
	data() {
		return {
			imgSettings: {
				width: '280px',
				height: '170px',
				class: 'img'
			},
			isShowScreen: false
		}
	},
	props: {
		src: {
			type: String,
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
	methods: {
		onClickScreenActivate() {
			this.isShowScreen = true
		},
		onClickScreenClose() {
			this.isShowScreen = false
		}
	}
}
</script>

<style scoped>
.item {
	display: block;
	width: 100%;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	border-radius: var(--m);
}
.img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	cursor: pointer;
}
</style>
