<template>
	<div class="root" id="provider_list">
		<div class="wrapper">
			<AText :attributes="btnSettings" :data-state="isShowAll ? 'open' : 'hide'" data-active="true" @onClick="toggle">{{ t('ALL_PROVIDERS') }}
				<img src="/img/arrowWhite.svg" width="18px" height="18px" class="arrow" alt="White arrow">
			</AText>
			<ALink
				v-for="(item, index) in currentValue" :key="index"
				:href="item.permalink"
				:attributes="textSettings"
				:data-active="item.active"
				:title="`Goes to ${item.title} page`"
			>
				<AImg :attributes="{ ...imgSettings, alt: `${item.title} Logo` }" :src="item.icon" /> {{ item.title }}
			</ALink>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
import { NUMBER_ITEMS } from './constants'
export default {
	name: 'providers_filter',
	mixins: [components],
	props: {
		value: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			textSettings: {
				class: 'item',
				color: 'cairo',
				size: 'small',
				weight: 'regular',
				decoration: 'none'
			},
			imgSettings: {
				width: '26px',
				height: '26px',
				class: 'logo'
			},
			btnSettings: {
				class: 'item_btn',
				color: 'colombo',
				size: 'small',
				weight: 'regular',
				decoration: 'none'
			},
			isShowAll: false
		}
	},
	methods: {
		toggle() {
			this.isShowAll = !this.isShowAll
		}
	},
	computed: {
		currentValue() {
			const device = this.device || 'DC'
			return this.isShowAll ? this.value : this.value.slice(0, NUMBER_ITEMS[device]) 
		}
	}
}
</script>
<style scoped>
.item {
	display: flex;
	align-items: center;
	padding: 5px 15px;
	border-radius: var(--s);
	background: rgba(255, 255, 255, 0.1);
	white-space: nowrap;
	font-size: 10px;
}
.logo {
	display: block;
	margin-right: 5px;
}
.item_btn {
	height: 36px;
	display: flex;
	padding: 5px 10px 5px 15px;
	white-space: nowrap;
	align-items: center;
	justify-content: center;
	border-radius: var(--s);
	background: var(--cleveland);
	cursor: pointer;
}
[data-active='true'] {
	background: var(--chicago);
}
[data-state='open'] .arrow {
	transform: rotate(-90deg);
}
[data-state='hide'] .arrow {
	transform: rotate(90deg);
}
.wrapper {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}
@media (max-width: 767px) {
	.wrapper a,
	.wrapper span {
		flex-shrink: 0;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.wrapper {
		width: auto;
	}
	.wrapper a,
	.wrapper span {
		flex-shrink: 0;
	}
}
</style>
