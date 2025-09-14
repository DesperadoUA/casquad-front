<template>
	<div>
		<AText tag="div" :attributes="asideContainerTitle">{{ title }}</AText>
		<div class="aside_bonus_container bonuses_wrapper">
			<BonusAsideCard
				v-for="(item, index) in posts"
				:key="`${item.title}_${index}`"
				:src="item.thumbnail"
				:title="item.title"
				:desc="item.short_desc"
				:value="item.bonus"
				:min_dep="item.min_deposit"
				:wager="item.wagering"
				:refLinks="Array.isArray(item.ref) ? {} : item.ref"
				:permalink="item.permalink"
			/>
		</div>
	</div>
</template>
<script>
import BonusAsideCard from '~/components/bonus_loop/cards/aside_card'
import components from '~/mixins/components'

export default {
	name: 'aside_bonuses_list',
	components: { BonusAsideCard },
	mixins: [components],
	data: () => {
		return {
			asideContainerTitle: {
				weight: 'bold',
				color: 'cairo',
				size: 'large',
				class: 'aside_container_title'
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
		posts: {
			type: Array,
			default() {
				return []
			}
		}
	}
}
</script>
<style scoped>
.aside_bonus_container {
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
}
.bonuses_wrapper {
	background: rgba(255, 255, 255, 0.1);
	border-bottom-left-radius: var(--m);
	border-bottom-right-radius: var(--m);
	overflow: hidden;
	padding: 10px;
}
.aside_container_title {
	border-top-left-radius: var(--m);
	border-top-right-radius: var(--m);
	background: #3e395a;
	padding: 12px 20px;
}
@media (min-width: 768px) and (max-width: 1200px) {
	.aside_bonus_container {
		justify-content: space-between;
	}
}
</style>
