<template>
	<article class="item">
		<div class="wrapper" :style="`background: ${color}`">
			<div class="rating">
				<AImg :attributes="{ ...starSettings, alt: 'Star' }" src="/img/goldStar.svg" />
				<AText tag="span" :attributes="textSettings">{{ rating / 10 }}</AText>
				<AText tag="span" :attributes="thinTextSettings">/10</AText>
			</div>
			<ALink :href="link" :title="`Goes to ${title} page`">
				<AImg :attributes="{ ...imgSettings, alt: `${title} logo` }" :src="src" />
			</ALink>
		</div>
	</article>
</template>
<script>
import components from '~/mixins/components'
export default {
	name: 'casino_slider_card',
	mixins: [components],
	data: () => {
		return {
			imgSettings: {
				class: 'border_radius_s'
			},
			starSettings: {
				class: ' m_r_xs'
			},
			textSettings: {
				color: 'cairo',
				size: 'small',
				bold: 'semi-bold',
				class: 'rating_value'
			},
			thinTextSettings: {
				color: 'cordoba',
				size: 'small',
				bold: 'thin',
				class: 'rating_total_value'
			}
		}
	},
	props: {
		rating: {
			type: Number,
			default() {
				return 9
			}
		},
		link: {
			type: String,
			default() {
				return '/game'
			}
		},
		src: {
			type: String,
			default() {
				return '/img/noImages.png'
			}
		},
		color: {
			type: String,
			default() {
				return '#000000FF'
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
.item {
	width: 118px;
	height: 118px;
	padding: 5px;
}
.wrapper {
	position: relative;
	border: 1px solid #886dff;
	border-radius: 14px;
	overflow: hidden;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.rating {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	z-index: 2;
	background: var(--cardiff);
	width: 75px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0 0 var(--s) var(--s);
}
.rating_value {
	transform: translateY(1px);
}
.rating_total_value {
	font-size: 10px;
	transform: translateY(1px);
}
@media (max-width: 767px) {
	.item {
		width: 110px;
		height: 110px;
	}
	.wrapper {
		padding-top: 5px;
	}
}
.rating img {
	width: 14px;
	height: 14px;
}
.wrapper > a img {
	width: 80px;
	height: 80px;
	object-fit: cover;
}
</style>
