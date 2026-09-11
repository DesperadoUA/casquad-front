<template>
	<article class="item" :class="size">
		<div class="wrapper">
			<ALink :href="link" :title="`Goes to ${title} page`">
				<AImg :attributes="{ ...imgSettings, alt: `${title} Logo` }" :src="src" />
			</ALink>
		</div>
		<div class="mask" @click="goTo(link)">
			<div class="action">
				<ALink :attributes="linkSettings" :href="link" :title="`Goes to ${title} page`">{{ t('PLAY') }}</ALink>
			</div>
		</div>
	</article>
</template>
<script>
import components from '~/mixins/components'
export default {
	name: 'game_main_card',
	mixins: [components],
	data: () => {
		return {
			imgSettings: {
				class: 'object_fit_cover thumbnail'
			},
			linkSettings: {
				color: 'cairo',
				weight: 'regular',
				size: 'medium',
				decoration: 'none'
			}
		}
	},
	props: {
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
		size: {
			type: String,
			default() {
				return 'big'
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
		goTo(permalink) {
			this.$router.push(permalink)
		}
	}
}
</script>
<style scoped>
.item {
	border-radius: 14px;
	position: relative;
	overflow: hidden;
}
.item.big {
	width: 159px;
	height: 172px;
}
.item.middle {
	width: 114px;
	height: 114px;
}
.item:hover .mask {
	opacity: 1;
}
.thumbnail {
	display: block;
}
.mask {
	position: absolute;
	top: 0px;
	left: 0px;
	background: rgba(0, 0, 0, 0.63);
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: 0.7s;
	cursor: pointer;
}
.action {
	position: relative;
	padding-left: 20px;
}
.action::before {
	content: '';
	width: 16px;
	height: 16px;
	left: 2px;
	top: 50%;
	transform: translateY(-50%);
	background: url('/img/link_arrow.png');
	position: absolute;
}
@media (max-width: 767px) {
	.item.big,
	.item.middle {
		width: 48%;
		height: auto;
	}
}
.thumbnail {
	width: 100%;
	height: 100%;
}
</style>
