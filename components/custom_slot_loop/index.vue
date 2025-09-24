<template>
	<div>
		<div class="slot_loop">
			<GameMainCard
				v-for="(item, index) in currentPosts"
				:key="index"
				:link="item.permalink"
				:src="item.thumbnail"
				:title="item.title"
			/>
		</div>
		<div class="items-more" v-if="hideBtnShowMore">
			<div class="btn_wrapper">
				<AButton @onClick="postShowMore" :attributes="btnSettings" title="Show more">
					{{ t('SHOW_MORE') }} <AImg :attributes="{ ...arrowSettings, alt: 'Arrow green' }" src="/img/arrowGreen.svg" />
				</AButton>
			</div>
		</div>
	</div>
</template>

<script>
import { GAME as NumberPostOnQuery } from '~/config/postLoader'
import GameMainCard from '~/components/slot_loop/cards/main'
import components from '~/mixins/components'
import device from '~/mixins/device'
import { START_PAGE } from './constants'
export default {
	name: 'custom_slot_loop',
	components: { GameMainCard },
	props: {
		value: {
			type: Array,
			default() {
				return []
			}
		}
	},
	mixins: [device, components],
	data() {
		return {
			numberPostOnQuery: NumberPostOnQuery,
			postCurrentPage: 0,
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
	},
	computed: {
		currentPosts() {
			return this.value.slice(0, this.numberPostOnQuery * this.currentPage)
		},
		hideBtnShowMore() {
			return this.value.length > this.numberPostOnQuery * this.currentPage
		},
		currentPage() {
			const device = this.device || 'DC'
			const settingsPage = START_PAGE[device]
			return this.postCurrentPage + settingsPage
		}
	},
	methods: {
		postShowMore() {
			this.postCurrentPage += 1
		}
	}
}
</script>
<style scoped>
.slot_loop {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}
.items-more {
	display: flex;
	justify-content: center;
	margin-top: var(--l);
	height: 52px;
}
.btn_wrapper {
	max-width: 272px;
	width: 272px;
}
.load_more {
	background: rgba(255, 255, 255, 0.1);
	border-radius: var(--s);
	border: rgba(255, 255, 255, 0.05);
}
.arrow {
	transform: rotate(90deg);
	margin-left: 10px;
}
@media (max-width: 767px) {
	.slot_loop {
		justify-content: space-between;
		padding-bottom: 20px;
	}
	.items-more {
		margin-top: 0;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.slot_loop {
		justify-content: space-between;
	}
}
</style>
