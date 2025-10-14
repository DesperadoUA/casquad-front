<template>
	<Slider :settings="settings" class="nav_menu_slider" @onChangeSlide="changeCurrentSlide" ref="menuSlider">
		<div class="slider_item" v-for="(itemMenu, index) in value" :key="index" @click="onTabClick(index)">
			<NavMenuItem
				:title="itemMenu.value_1"
				:link="`#${itemMenu.value_2}`"
				:index="index"
				:active="currentItem === index"
			/>
		</div>
	</Slider>
</template>
<script>
import NavMenuItem from '~/components/nav_menu/item'
export default {
	name: 'nav_menu',
	components: { NavMenuItem },
	props: {
		value: {
			type: Array,
			default: () => []
		}
	},
	data: () => {
		return {
			settings: {
				variableWidth: true,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				swipeToSlide: true
			},
			currentItem: 0
		}
	},
	methods: {
		changeCurrentSlide(index) {
			const { value_2: anchor } = this.value[index]
			if (this.$route.hash !== `#${anchor}`) {
				this.$router.replace({ hash: `#${anchor}` })
			}
			this.currentItem = index
		},
		onTabClick(index) {
			this.$refs.menuSlider.goTo(index)
			this.currentItem = index
		}
	}
}
</script>
<style>
.nav_menu_slider .slick-arrow {
	display: flex !important;
	z-index: 5;
}
.nav_menu_slider .slick-prev,
.nav_menu_slider .slick-next {
	width: 24px;
	height: 24px;
	background: url('/img/arrow_24.svg') center center no-repeat #fff;
	border-radius: 50%;
}
.nav_menu_slider .slick-next {
	transform: rotate(180deg) translate(0, 50%);
}
.nav_menu_slider .slick-prev::before,
.nav_menu_slider .slick-next::before {
	display: none;
}
.nav_menu_slider .slick-next,
.nav_menu_slider .slick-next:focus,
.nav_menu_slider .slick-next:hover,
.nav_menu_slider .slick-prev,
.nav_menu_slider .slick-prev:focus,
.nav_menu_slider .slick-prev:hover {
	background: url('/img/arrow_24.svg') center center no-repeat #fff;
}
@media (max-width: 576px) {
	.nav_menu_slider .slick-prev {
		left: -15px;
	}
	.nav_menu_slider .slick-next {
		right: -15px;
	}
}
</style>
