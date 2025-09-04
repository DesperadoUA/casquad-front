<template>
	<div class="filter_wrapper">
		<AButton :attributes="btnSettings" @onClick="filtersAction" title="filters">
			<AImg :attributes="{ ...filterSettings, alt: 'Filters' }" src="/img/filters.svg" />
			{{ currentValue.title }}
			<AImg :attributes="{ ...arrowSettings, alt: 'Arrow white' }" src="/img/arrowWhite.svg" />
		</AButton>
		<div class="filter_selector" v-if="isShowFilters">
			<div
				v-for="item in items"
				class="filter_item text_size_small text_color_cairo"
				@click="changeFilter(item)"
				:class="currentValue.key === item.key ? 'active' : ''"
			>
				{{ item.title }}
			</div>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
export default {
	name: 'filter_reviews',
	mixins: [components],
	props: {
		currentValue: {
			type: Object,
			default() {
				return {}
			}
		},
		items: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			isShowFilters: false,
			currentFilter: '',
			filterSettings: {
				width: '15px',
				height: '16px'
			},
			btnSettings: {
				color: 'cairo',
				size: 'text_size_small',
				bg: 'caracas',
				borderRadius: 'm',
				weight: 'semi-bold',
				class: 'filter_button'
			},
			arrowSettings: {
				width: '18px',
				height: '18px',
				class: 'arrow'
			}
		}
	},
	methods: {
		filtersAction() {
			this.isShowFilters = true
		},
		changeFilter(filter) {
			this.isShowFilters = false
			this.$emit('changeFilter', filter)
		},
		handleClickOutside(event) {
			if (!this.$el.contains(event.target)) {
				this.isShowFilters = false
			}
		}
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside)
	},
	beforeUnmount() {
		document.removeEventListener('click', this.handleClickOutside)
	}
}
</script>
<style scoped>
.reviews_wrapper {
	border-radius: var(--m);
	border: 1px solid rgba(255, 255, 255, 0.15);
	padding: 27px 22px;
	background: var(--cucuta);
	margin-bottom: 40px;
}
.filter_button {
	padding: 12px 44px;
	gap: 10px;
	align-items: center;
	display: inline-flex;
	justify-content: center;
	white-space: nowrap;
}
.arrow {
	transform: rotate(90deg);
}

.filter_wrapper {
	position: relative;
}
.filter_selector {
	position: absolute;
	left: 0;
	top: 50px;
	width: 100%;
	padding: 20px 10px;
	border: 1px solid #3d3b50;
	background: #4c4a5b;
	blur: 4;
	border-radius: var(--m);
	display: flex;
	flex-direction: column;
	gap: 7px;
}
.filter_item {
	opacity: 0.4;
	cursor: pointer;
}
.filter_item.active {
	opacity: 1;
}
@media (max-width: 767px) {
}
@media (min-width: 768px) and (max-width: 1200px) {
}
</style>
