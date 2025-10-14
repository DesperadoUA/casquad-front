<template>
	<div>
		<VueSlickCarousel class="sliderContainer" v-bind="settings" @afterChange="onAfterChange" ref="carousel">
			<slot />
		</VueSlickCarousel>
	</div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
	name: 'Slider',
	components: { VueSlickCarousel },
	props: {
		settings: {
			type: Object,
			default: () => ({})
		}
	},
	methods: {
		onAfterChange(currentSlide) {
			this.$emit('onChangeSlide', currentSlide)
		},
		goTo(index) {
			this.$refs.carousel.goTo(index)
		}
	}
}
</script>
<style>
/*
.slick-list {
	padding: 0 20% 0 0 !important;
}
*/
.slick-arrow {
	display: none !important;
}
@media (max-width: 767px) {
	.slick-list {
		padding-left: 0px !important;
	}
}

@media (min-width: 768px) and (max-width: 1200px) {
	.slick-list {
		padding-left: 0px !important;
	}
}
</style>
<style scoped></style>
