<template>
	<div class="row">
		<div class="item" v-for="(item, index) in posts" :key="index">
			<Card
				:img="item.thumbnail"
				:permalink="item.permalink"
				:title="item.title"
				:position="item.position"
				:role="badgeList[item.role]"
				:roleText="item.role"
				:social="item.social"
				:create_at="item.create_at.slice(0, 10)"
			/>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
import Card from '~/components/author_card_loop/card.vue'
import config from '~/config'

export default {
	name: 'author_card_loop',
	mixins: [components],
	components: { Card },
	props: {
		posts: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			badgeList: config.AUTHOR_BADGE_LIST
		}
	}
}
</script>
<style scoped>
.row {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
}
.item {
	width: calc(50% - 10px);
}
@media (max-width: 968px) {
	.item {
		width: 100%;
	}
}
</style>
