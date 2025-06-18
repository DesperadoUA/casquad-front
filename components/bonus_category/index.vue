<template>
	<div class="root">
		<AText tag="div" :attributes="titleSettings">{{ title }}</AText>
		<div class="bonus_loop">
			<BonusAsideCard
				v-for="(item, index) in posts"
				:key="index"
				:src="item.thumbnail"
				:title="item.title"
				:desc="item.short_desc"
				:value="item.bonus"
				:min_dep="item.min_deposit"
				:wager="item.wagering"
				:refLinks="item.casino.ref"
				:permalink="item.permalink"
			/>
		</div>
		<div class="items-more">
			<div class="btn_wrapper">
				<ALink :attributes="btnSettings" :href="link" title="Show more">
					{{ t('SHOW_MORE') }} <AImg :attributes="arrowSettings" src="/img/arrowGreen.svg"/>
				</ALink>
			</div>
		</div>
	</div>
</template>
<script>
import BonusAsideCard from '~/components/bonus_loop/cards/aside_card'
import components from '~/mixins/components'
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
		BonusAsideCard
	},
	data: () => {
		return {
			titleSettings: {
				color: 'cairo',
				weight: 'bold',
				class: 'title'
			},
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
				alt: "Green arrow"
			}
		}
	}
}
</script>
<style scoped>
.root {
	margin-bottom: 40px;
}
.bonus_loop {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}
.items-more {
	display: flex;
	justify-content: center;
	margin-top: var(--l);
	height: 52px;
	width: 356px;
	max-width: 100%;
}
.btn_wrapper {
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
@media (max-width: 767px) {
	.items-more {
		width: 100%;
	}
}
</style>
