<template>
	<div class="card">
		<div class="card__icon">
			<AImg :attributes="{ ...imgSettings, alt: `${item.value_1} icon` }" :src="item.src" />
		</div>
		<div class="card__content">
			<div class="text_size_medium text_weight_bold title_card">{{ item.value_1 }}</div>
			<p class="text_size_small text_color_cairo">{{ item.value_2 }}</p>
			<p class="text_size_small text_color_cordoba">{{ item.value_3 }}</p>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'

export default {
	name: 'experience_item',
	mixins: [components],
	data() {
		return {
			imgSettings: {
				width: '140px'
			}
		}
	},
	props: {
		item: {
			type: Object,
			default: {}
		}
	}
}
</script>
<style scoped>
.card__icon {
	flex-shrink: 0;
	width: 210px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card__content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10px;
	gap: 10px;
}
.card__content .title_card {
	color: var(--calgary);
}
.card__content p {
	margin: 0;
}
.card {
	display: flex;
	flex: 1;
	background: var(--coruna);
	border-radius: var(--m);
}
@media (max-width: 570px) {
	.card__icon {
		width: 100px;
		padding: 10px;
	}
	.card__content {
		gap: 5px;
	}
}
</style>
