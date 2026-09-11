<template>
	<div class="item">
		<div class="left">
			<AImg :attributes="{ ...imgSettings, alt: `${title} Screen` }" :src="src" />
		</div>
		<div class="right">
			<div>
				<AText tag="div" :attributes="textSettings" v-if="value_1">{{ value_1 }}</AText>
				<AText tag="div" :attributes="textSettings" v-if="value_2">{{ value_2 }}</AText>
				<AText tag="div" :attributes="textSettings" v-if="value_3">{{ value_3 }}</AText>
			</div>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
export default {
	name: 'game_symbol_item',
	mixins: [components],
	data() {
		return {
			imgSettings: {
			},
			textSettings: {
				size: 'large',
				color: 'cairo',
				weight: 'regular',
				class: 'item_text'
			}
		}
	},
	props: {
		src: {
			type: String,
			default() {
				return ''
			}
		},
		value_1: {
			type: String,
			default() {
				return ''
			}
		},
		value_2: {
			type: String,
			default() {
				return ''
			}
		},
		value_3: {
			type: String,
			default() {
				return ''
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
	display: flex;
	gap: 20px;
}
.right {
	display: flex;
	align-items: center;
}
@media (max-width: 767px) {
	.left {
		width: 80px;
	}
	.item_text {
		font-size: 12px;
	}
}
.left img {
	width: 120px;
	height: 98px;
	object-fit: contain;
}
</style>
