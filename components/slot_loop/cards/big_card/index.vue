<template>
	<article class="item">
		<div class="badge">
			<AText :attributes="textSettings">{{ t('GAME_WEEK') }}</AText>
		</div>
		<div class="wrapper">
			<ALink :href="link" :title="`Goes to ${title} page`">
				<!-- <AImg :attributes="{ ...imgSettings, alt: `${title} Logo` }" :src="src" />-->
				<img :alt="`${title} Logo`" :src="src" width="329px" height="355px" class="object_fit_cover thumbnail"/>
			</ALink>
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
				width: '329px',
				height: '355px',
				class: 'object_fit_cover thumbnail'
			},
			textSettings: {
				color: 'cairo',
				class: 'badgeText',
				weight: 'medium'
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
	width: 329px;
	height: 355px;
	border-radius: 14px;
	position: relative;
	overflow: hidden;
}
.badgeText {
	font-size: 10px;
	line-height: 14px;
}
.badge {
	background: #ff005c;
	position: absolute;
	top: 8px;
	left: 16px;
	border-radius: var(--s);
	padding: 2px 16px 6px 25px;
}
.badge::before {
	content: '';
	width: 18px;
	height: 18px;
	position: absolute;
	top: 50%;
	left: 6px;
	transform: translateY(-50%);
	background: url('/img/fire.png');
}
@media (max-width: 767px) {
	.item {
		width: 100%;
	}
}
</style>
