<template>
	<div class="game_details_card">
		<div class="card__icon">
			<AImg :attributes="{ ...imgSettings, alt: `${title} icon` }" :src="src" />
		</div>
		<div class="card__content">
			<div class="text_size_medium text_weight_bold title_card">{{ title }}</div>
			<div class="text_size_small text_color_cordoba">
				{{ subTitle }}
			</div>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'

export default {
	name: 'game_details_item',
	mixins: [components],
	data() {
		return {
			imgSettings: {
				width: '32',
				height: '32'
			}
		}
	},
	props: {
		src: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		subTitle: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.game_details_card {
	background: #ffffff1a;
	border-radius: var(--m);
	padding: 27px 20px;
	display: flex;
	gap: 10px;
	flex-direction: column;
	height: 100%;
}
.title_card {
	color: var(--cairo);
}
.card__content {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.check {
	display: flex;
	align-items: center;
	gap: 5px;
}
</style>
