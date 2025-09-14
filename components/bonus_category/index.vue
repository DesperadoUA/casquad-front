<template>
	<div class="root">
		<AsideBonuses :title="title" :posts="posts" />
		<div class="items-more">
			<div class="btn_wrapper">
				<ALink :attributes="btnSettings" :href="link" title="Show more">
					{{ t('SHOW_MORE') }} <AImg :attributes="arrowSettings" src="/img/arrowGreen.svg" />
				</ALink>
			</div>
		</div>
	</div>
</template>
<script>
import BonusAsideCard from '~/components/bonus_loop/cards/aside_card'
import components from '~/mixins/components'
import AsideBonuses from '~/components/aside_bonuses'
export default {
	name: 'bonus_category',
	mixins: [components],
	props: {
		title: {
			type: String,
			default() {
				return ''
			}
		},
		link: {
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
	},
	components: {
		BonusAsideCard,
		AsideBonuses
	},
	data: () => {
		return {
			btnSettings: {
				color: 'cairo',
				class: 'load_more',
				weight: 'bold',
				size: 'medium',
				decoration: 'none'
			},
			arrowSettings: {
				width: '18px',
				height: '18px',
				class: 'arrow',
				alt: 'Green arrow'
			}
		}
	}
}
</script>
<style scoped>
.root {
	margin-bottom: 40px;
}
.items-more {
	display: flex;
	justify-content: center;
	margin-top: var(--l);
	height: 52px;
	width: 100%;
	max-width: 100%;
}
.bonus_loop .btn_wrapper {
	max-width: 272px;
	width: 272px;
}
.arrow {
	transform: rotate(90deg);
	margin-left: 10px;
}
.title {
	font-size: 18px;
	margin-bottom: var(--m);
}
.bonus_loop ::v-deep .item {
	width: 100%;
}
.btn_wrapper {
	max-width: 272px;
	width: 272px;
}
@media (max-width: 767px) {
	.items-more {
		width: 100%;
	}
}
</style>
