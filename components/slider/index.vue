<template>
	<div ref="root">
		<component :is="carouselComponent" v-if="isReady" class="sliderContainer" v-bind="settings">
			<slot />
		</component>
		<div v-else class="sliderContainer sliderContainer--placeholder">
			<slot />
		</div>
	</div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
	name: 'Slider',
	props: {
		settings: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			isReady: false,
			carouselComponent: null
		}
	},
	mounted() {
		if (!process.client) return

		const loadCarousel = () => {
			if (this.isReady) return

			import('vue-slick-carousel').then((module) => {
				this.carouselComponent = module.default
				this.isReady = true
			})
		}

		if (!('IntersectionObserver' in window)) {
			loadCarousel()
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return
				loadCarousel()
				observer.disconnect()
			},
			{ rootMargin: '200px 0px' }
		)

		observer.observe(this.$refs.root)
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
<style scoped>
.sliderContainer--placeholder {
	overflow: hidden;
}
</style>
