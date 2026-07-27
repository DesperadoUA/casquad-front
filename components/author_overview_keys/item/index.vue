<template>
	<div class="card">
		<div class="counter text_color_calgary text_size_x-large text_weight_bold">{{ item.value_1 }}</div>
		<div class="title text_color_cairo text_size_medium text_weight_extra-bold">{{ item.value_2 }}</div>
		<div class="content text_weight_regular text_color_cairo text_size_x-small">{{ item.value_3 }}</div>
	</div>
</template>

<script>
import components from '~/mixins/components'

export default {
	name: 'author_overview_keys_item',
	mixins: [components],
	props: {
		item: {
			type: Object,
			default: {}
		}
	}
}
</script>
<style scoped>
.card {
	background: #ffffff1a;
	border-radius: var(--m);
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.counter {
	line-height: 100%;
}
</style>
