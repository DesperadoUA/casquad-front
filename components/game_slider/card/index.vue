<template>
	<article class="game_card">
		<div class="img_wrapper">
			<img :src="thumbnail" :alt="`logo ${title}`" class="thumbnail" />
			<div class="mask">
				<div class="game_title">{{ title }}</div>
				<NuxtLink :to="permalink" class="linkButton">{{ t('PLAY_FOR_FREE') }}</NuxtLink>
				<AButton
					:attributes="btnSettings"
					:title="`Goes to ${title}`"
					@onClick="refActivate(refLinks, geo, 'game_slider_card')"
				>
					{{ t('PLAY_FOR_REAL') }}
				</AButton>
			</div>
		</div>
		<div class="vendor_wrapper" v-if="vendor.title">
			<NuxtLink :to="vendor.permalink" :title="`Goes to ${vendor.title}`">
				<img :src="vendor.thumbnail" :alt="`Logo ${vendor.title}`" />
			</NuxtLink>
		</div>
	</article>
</template>
<script>
import ref from '~/mixins/ref'
import geo from '~/mixins/geo'
import components from '~/mixins/components'
export default {
	name: 'game_slider_card',
	mixins: [components, ref, geo],
	props: {
		title: {
			type: String,
			default: ''
		},
		thumbnail: {
			type: String,
			default: ''
		},
		permalink: {
			type: String,
			default: ''
		},
		refLinks: {
			type: Object,
			default: () => ({})
		},
		vendor: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => {
		return {
			btnSettings: {
				bg: 'calgary',
				color: 'cucuta',
				borderRadius: 's',
				weight: 'regular',
				text_transform: 'uppercase',
				class: 'ref_btn'
			}
		}
	}
}
</script>
<style scoped>
.game_card {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	border-radius: var(--m);
}
.thumbnail {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.img_wrapper {
	position: relative;
	aspect-ratio: 300 / 325;
	overflow: hidden;
}
.mask {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	background: #00000080;
	opacity: 0;
	transition: 0.7s;
	flex-direction: column;
	border-radius: var(--m);
}
.game_card:hover .mask {
	opacity: 1;
}
.game_card .ref_btn,
.game_card .linkButton {
	height: 38px;
	width: 220px;
	font-size: 16px;
	font-weight: bold;
}
.game_card .linkButton {
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--cleveland);
	color: var(--cairo);
	font-size: 16px;
	font-weight: bold;
	border-radius: var(--s);
	text-decoration: none;
}
.game_title {
	color: var(--cairo);
	font-size: 16px;
	font-weight: bold;
}
.vendor_wrapper {
	padding: 20px;
	border-bottom-left-radius: var(--m);
	border-bottom-right-radius: var(--m);
	background: var(--cancun);
	min-height: 82px;
	display: flex;
	align-items: center;
}
.vendor_wrapper a {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 42px;
}
.vendor_wrapper img {
	display: block;
	max-width: 100%;
	max-height: 42px;
	object-fit: contain;
}
@media (max-width: 576px) {
	.linkButton {
		max-width: 90%;
		font-size: 14px;
	}
	.ref_btn {
		max-width: 90%;
		font-size: 14px;
	}
}
</style>
