<template>
	<div class="root">
		<div class="title text_size_x-large text_color_cairo text_weight_bold">{{ title }}</div>
		<div class="loop">
			<div class="item_highlight" v-for="item in posts" :key="item.value_1">
				<Item :item="item" />
			</div>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
import Item from '~/components/highlights/item'

export default {
	name: 'highlights',
	mixins: [components],
	props: {
		title: {
			type: String,
			default: ''
		},
		posts: {
			type: Array,
			default: []
		}
	},
	components: { Item }
}
</script>
<style scoped>
.root {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.loop {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	align-items: stretch;
}
.item_highlight {
	width: calc(25% - 15px);
	border-radius: var(--m);
	overflow: hidden;
	display: flex;
	flex: 1;
}
@media (max-width: 576px) {
	.item_highlight {
		width: 100%;
		flex: none;
	}
}
@media (min-width: 576px) and (max-width: 1200px) {
	.item_highlight {
		width: calc(50% - 10px);
		flex: none;
	}
}
</style>
