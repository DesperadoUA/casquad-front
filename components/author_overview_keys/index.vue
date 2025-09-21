<template>
	<div class="root">
		<div class="item" v-for="(item, index) in posts" :key="index">
			<Item :item="item" />
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
import Item from '~/components/author_overview_keys/item'

export default {
	name: 'author_overview_keys',
	mixins: [components],
	components: { Item },
	props: {
		posts: {
			type: Array,
			default: []
		}
	}
}
</script>
<style scoped>
.root {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}
.item {
	width: calc(25% - 15px);
}
@media (max-width: 576px) {
	.item {
		width: 100%;
		flex: none;
	}
}
@media (min-width: 576px) and (max-width: 1200px) {
	.item {
		width: calc(50% - 10px);
		flex: none;
	}
}
</style>
