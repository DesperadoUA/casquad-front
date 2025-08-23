<template>
	<article class="item">
		<div class="wrapper">
			<div class="left">
				<div class="img_wrapper">
					<AText>
						<AImg :attributes="{ ...imgSettings, alt: `${title} logo` }" :src="src" @click="refActivate(refLinks, geo)" />
					</AText>
				</div>
			</div>
			<div class="right">
				<div @click="refActivate(refLinks, geo)">
					<AText :attributes="titleSettings">{{ title }}</AText>
				</div>
				<div @click="refActivate(refLinks, geo)">
					<AText :attributes="descTextSettings">{{ desc }}</AText>
				</div>
				<div @click="refActivate(refLinks, geo)">
					<AText :attributes="valueTextSettings">{{ value }}</AText>
				</div>
			</div>
			<div class="action">
				<ALink :href="permalink" :title="`Goes to ${title} page`">
					<AImg :attributes="{ ...arrowSettings, alt: 'arrow' }" src="/img/arrowGreen.svg" />
				</ALink>
			</div>
		</div>
	</article>
</template>
<script>
import ref from '~/mixins/ref'
import components from '~/mixins/components'
import geo from '~/mixins/geo'
export default {
	name: 'bonus_slider_card',
	mixins: [ref, components, geo],
	data: () => {
		return {
			imgSettings: {
				width: '62px',
				height: '62px',
				class: 'object_fit_cover border_radius_50'
			},
			arrowSettings: {
				width: '26px',
				height: '26px'
			},
			titleSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'bold',
				decoration: 'none',
				class: 'title'
			},
			descTextSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'regular',
				class: 'desc'
			},
			valueTextSettings: {
				color: 'calgary',
				size: 'large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'bonus_card_value'
			}
		}
	},
	props: {
		title: {
			type: String,
			default() {
				return ''
			}
		},
		desc: {
			type: String,
			default() {
				return ''
			}
		},
		value: {
			type: String,
			default() {
				return ''
			}
		},
		src: {
			type: String,
			default() {
				return '/img/noImages.png'
			}
		},
		permalink: {
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
	width: 356px;
	height: 95px;
	padding: 5px;
	padding-right: 25px;
	cursor: pointer;
}
.wrapper {
	position: relative;
	border-radius: 14px;
	height: 100%;
	background: rgba(255, 255, 255, 0.1);
	display: flex;
}
.img_wrapper {
	width: 62px;
	height: 62px;
}
.left {
	width: 90px;
	min-width: 90px;
	align-items: center;
	justify-content: center;
	display: flex;
	height: 100%;
}
.right {
	flex-grow: 1;
}
.desc {
	line-height: 18px;
	display: block;
	margin-top: 8px;
}
.title {
	line-height: 12px;
	display: block;
	margin-top: 15px;
}
.action {
	min-width: 26px;
	display: flex;
	align-items: center;
	justify-content: center;
}
@media (max-width: 767px) {
	.item {
		padding-right: 0px;
		width: 100%;
	}
	.bonus_card_value {
		font-size: 14px;
	}
	.desc {
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 190px;
		overflow: hidden;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.item {
		padding-right: 0px;
		width: 100%;
	}
	.bonus_card_value {
		font-size: 14px;
	}
	.desc {
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 190px;
		overflow: hidden;
	}
}
</style>
