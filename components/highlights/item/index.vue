<template>
	<div class="card">
		<div class="card__icon">
			<AImg :attributes="{ ...imgSettings, alt: `${item.value_1} icon` }" :src="item.src" />
		</div>
		<div class="card__content">
			<div class="text_size_small title_card">{{ item.value_1 }}</div>
			<p class="text_size_x-small text_color_cairo">{{ item.value_2 }}</p>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'

export default {
	name: 'highlights',
	mixins: [components],
	data() {
		return {
			imgSettings: {
				width: '40px',
				height: '40px'
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
	width: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--coruna);
}

.card__content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10px;
	background: #ffffff1a;
}
.card__content .title_card {
	margin: 0 0 5px 0;
	color: var(--calgary);
}
.card__content p {
	margin: 0;
}
.card {
	display: flex;
	flex: 1;
}
</style>
