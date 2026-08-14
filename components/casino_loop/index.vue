<template>
	<div>
		<div class="casino_loop">
			<CasinoMainCard
				v-for="item in currentPosts"
				:key="item.title"
				:link="item.permalink"
				:src="item.thumbnail"
				:bg="item.color"
				:title="item.title"
				:label="item.label"
				:advantages="item.advantages"
				:bonus_value="item.bonus_value"
				:wager="item.wager"
				:min_dep="item.min_dep"
				:vendors="item.vendors"
				:rating="item.rating"
				:refLinks="item.ref"
			/>
		</div>
		<div class="items-more" v-if="hideBtnShowMore">
			<AButton @onClick="postShowMore" :attributes="btnSettings">
				{{ t('SHOW_MORE') }} <AImg :attributes="arrowSettings" src="/img/arrowGreen.svg" />
			</AButton>
		</div>
	</div>
</template>

<script>
import { CASINO as NumberPostOnQuery } from '~/config/postLoader'
import CasinoMainCard from '~/components/casino_loop/cards/main'
import postLoader from '~/mixins/postLoader'
import components from '~/mixins/components'
export default {
	name: 'casino_loop_downloads',
	components: { CasinoMainCard },
	props: {
		value: {
			type: Array,
			default() {
				return []
			}
		}
	},
	mixins: [components, postLoader],
	data() {
		return {
			numberPostOnQuery: NumberPostOnQuery,
			postCurrentPage: 1,
			btnSettings: {
				color: 'cairo',
				class: 'load_more',
				weight: 'bold',
				size: 'medium'
			},
			arrowSettings: {
				width: '18px',
				height: '18px',
				class: 'arrow'
			}
		}
	}
}
</script>
<style scoped>
.casino_loop {
	display: flex;
	gap: var(--m);
	flex-wrap: wrap;
}
.items-more {
	width: 820px;
	height: 52px;
	margin-top: var(--l);
	max-width: 100%;
}
.arrow {
	transform: rotate(90deg);
	margin-left: 10px;
}
@media (max-width: 767px) {
	.casino_loop {
		padding-bottom: 40px;
	}
	.items-more {
		margin-top: 0px;
		width: 272px;
		margin: 0 auto;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.casino_loop {
		justify-content: space-between;
	}
}
</style>
