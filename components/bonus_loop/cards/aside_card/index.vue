<template>
	<article class="item" @click="refActivate(refLinks)">
		<div class="wrapper">
			<div class="left">
				<div class="img_wrapper">
					<AText>
						<AImg :attributes="{ ...imgSettings, alt: `${title} logo` }" :src="src" />
					</AText>
				</div>
			</div>
			<div class="right">
				<div>
					<AText tag="div" :attributes="titleSettings">{{ title }}</AText>
				</div>
				<div>
					<AText tag="div" :attributes="descTextSettings">{{ desc }}</AText>
				</div>
				<div>
					<AText tag="div" :attributes="valueTextSettings">{{ value }}</AText>
				</div>
			</div>
			<div class="action">
				<AText>
					<AImg :attributes="{ ...arrowSettings, alt: 'Arrow Green' }" src="/img/arrowGreen.svg" />
				</AText>
			</div>
		</div>
		<div class="bottom">
			<AText tag="div" :attributes="bottomTextSettings"
				>Min. deposit: {{ min_dep }} &middot; Wagering: {{ wager }}</AText
			>
		</div>
	</article>
</template>
<script>
import ref from '~/mixins/ref'
import components from '~/mixins/components'
export default {
	name: 'bonus_aside_card',
	mixins: [ref, components],
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
				transform: 'uppercase'
			},
			bottomTextSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'regular',
				align: 'center'
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
		min_dep: {
			type: String,
			default() {
				return ''
			}
		},
		wager: {
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
		}
	}
}
</script>
<style scoped>
.item {
	width: 356px;
	max-width: 100%;
	cursor: pointer;
}
.wrapper {
	position: relative;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	background: rgba(255, 255, 255, 0.1);
	display: flex;
	padding-top: 5px;
	padding-bottom: 5px;
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
}
.right {
	flex-grow: 1;
	padding: 4px 0px;
}
.desc {
	line-height: 18px;
}
.title {
	line-height: 12px;
	margin-bottom: 8px;
}
.action {
	min-width: 26px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.bottom {
	background: rgba(255, 255, 255, 0.25);
	padding: var(--s);
	border-bottom-left-radius: 14px;
	border-bottom-right-radius: 14px;
}
@media (max-width: 767px) {
	.item {
		width: 100%;
	}
}
</style>
