<template>
	<NuxtLink :to="link" class="tab-slide" :class="active" @click="onClick">{{ title }}</NuxtLink>
</template>
<script>
export default {
	name: 'nav_menu_item',
	props: {
		link: {
			type: String,
			default: () => ''
		},
		title: {
			type: String,
			default: () => ''
		},
		active: {
			type: Boolean,
			default: () => false
		},
		index: {
			type: Number,
			default: () => 0
		}
	},
	methods: {
		onClick() {
			this.$emit('onClick', this.index)
		}
	}
}
</script>
<style>
.nav_menu_slider .slick-current .tab-slide {
	background: var(--cleveland);
}
</style>
<style scoped>
.tab-slide {
	display: inline-block;
	background: #1a1a2e;
	color: white;
	padding: 8px 20px;
	border-radius: 8px;
	margin: 0 6px;
	white-space: nowrap;
	text-decoration: none;
}
</style>
