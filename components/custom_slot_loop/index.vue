<template>
	<div>
		<div class="games_grid">
			<div class="week-card" v-if="weekGame">
				<GameBigCard
					:link="weekGame.permalink"
					:src="weekGame.thumbnail"
					:title="weekGame.title"
				/>
			</div>
			<GameMainCard
				v-for="(item, index) in prepend"
				:key="'week-' + index"
				:link="item.permalink"
				:src="item.thumbnail"
				:title="item.title"
			/>
			<GameMainCard
				v-for="(item, index) in currentPosts"
				:key="'loop-' + index"
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
import GameBigCard from '~/components/slot_loop/cards/big_card'
import components from '~/mixins/components'
import device from '~/mixins/device'
import { buildItemListSchema } from '~/helpers/jsonLdSchema'
import config from '~/config'
import { START_PAGE } from './constants'
export default {
	name: 'custom_slot_loop',
	components: { GameMainCard, GameBigCard },
	props: {
		value: {
			type: Array,
			default() {
				return []
			}
		},
		prepend: {
			type: Array,
			default() {
				return []
			}
		},
		weekGame: {
			type: Object,
			default: null
		},
		// Google accepts one ItemList per page, so a template enables it for a single loop
		schema: {
			type: Boolean,
			default: false
		},
		schemaName: {
			type: String,
			default: ''
		}
	},
	mixins: [device, components],
	head() {
		if (!this.schema) return {}

		const itemList = buildItemListSchema({
			items: this.schemaItems,
			name: this.schemaName,
			domain: config.BASE_URL[config.LANG]
		})
		if (!itemList) return {}

		return {
			script: [
				{
					hid: 'itemlist-jsonld',
					type: 'application/ld+json',
					json: itemList
				}
			]
		}
	},
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
		},
		// Keeps schema in sync with the grid: week game first, then prepended and loaded posts
		schemaItems() {
			return [this.weekGame, ...this.prepend, ...this.currentPosts].filter(Boolean)
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
.games_grid {
	display: grid;
	grid-template-columns: repeat(7, 159px);
	grid-auto-rows: 172px;
	gap: 12px;
	justify-content: start;
	align-content: start;
}
.week-card {
	grid-column: span 2;
	grid-row: span 2;
	position: relative;
	min-width: 0;
	min-height: 0;
}
.week-card >>> .item {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
}
.games_grid >>> article.item.big {
	width: 100%;
	height: 100%;
}
.games_grid >>> .wrapper,
.games_grid >>> .wrapper a {
	display: block;
	width: 100%;
	height: 100%;
}
.games_grid >>> .thumbnail {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
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
	.games_grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-auto-rows: auto;
		gap: 12px;
		padding-bottom: 20px;
	}
	.week-card {
		grid-column: span 2;
		grid-row: span 1;
		aspect-ratio: 329 / 355;
	}
	.games_grid >>> article.item.big {
		aspect-ratio: 159 / 172;
		height: auto;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.games_grid {
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-auto-rows: auto;
		gap: 8px;
		align-items: start;
	}
	.week-card {
		grid-column: span 2;
		grid-row: span 2;
		aspect-ratio: 330 / 356;
		height: auto;
	}
	.games_grid >>> article.item.big {
		aspect-ratio: 159 / 172;
		height: auto;
	}
}
</style>
