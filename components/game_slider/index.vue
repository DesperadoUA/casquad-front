<template>
	<Slider :settings="settings" class="game_slider">
		<div class="slider_item" v-for="(game, index) in posts" :key="index">
			<GameSliderCard
				:title="game.title"
				:thumbnail="game.thumbnail"
				:permalink="game.permalink"
				:refLinks="game.ref"
				:vendor="game.vendor"
			/>
		</div>
	</Slider>
</template>
<script>
import Slider from '~/components/slider'
import GameSliderCard from '~/components/game_slider/card'
export default {
	name: 'game_slider',
	components: { Slider, GameSliderCard },
	props: {
		posts: Array,
		default: []
	},
	data: () => {
		return {
			settings: {
				slidesToShow: 4,
				centerMode: false,
				autoplay: false,
				speed: 2000,
				autoplaySpeed: 2000,
				initialSlide: 0,
				infinite: true,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 5
						}
					},
					{
						breakpoint: 1023,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2
						}
					}
				]
			}
		}
	}
}
</script>
<style>
.game_slider .slick-list {
	margin: 0 -10px !important;
	position: relative;
}
.game_slider .slick-list::before {
	content: '';
	width: 100px;
	height: 100%;
	background: linear-gradient(to right, #08051a 0%, transparent 100%);
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
}
.game_slider .slick-list::after {
	content: '';
	width: 100px;
	height: 100%;
	background: linear-gradient(to left, #08051a 0%, transparent 100%);
	position: absolute;
	right: 0;
	top: 0;
	z-index: 2;
}
.game_slider .slick-arrow {
	display: flex !important;
	z-index: 5;
}
.game_slider .slick-prev,
.game_slider .slick-next {
	width: 40px;
	height: 40px;
	background: url('/img/slider_arrow.svg') center center no-repeat #fff;
	border-radius: 50%;
}
.game_slider .slick-next {
	transform: rotate(180deg) translate(0, 50%);
}
.game_slider .slick-prev::before,
.game_slider .slick-next::before {
	display: none;
}
.game_slider .slick-next,
.game_slider .slick-next:focus,
.game_slider .slick-next:hover,
.game_slider .slick-prev,
.game_slider .slick-prev:focus,
.game_slider .slick-prev:hover {
	background: url('/img/slider_arrow.svg') center center no-repeat #fff;
}
@media (max-width: 576px) {
	.game_slider .slick-prev,
	.game_slider .slick-next {
		width: 30px;
		height: 30px;
	}
	.game_slider .slick-prev {
		left: -10px;
	}
	.game_slider .slick-next {
		right: -10px;
	}
	.game_slider .slick-list::before {
		width: 50px;
	}
	.game_slider .slick-list::after {
		width: 50px;
	}
}
</style>
<style scoped>
.slider_item {
	padding: 0 10px;
}
</style>
