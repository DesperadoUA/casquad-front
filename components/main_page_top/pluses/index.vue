<template>
	<div class="plus_item">
		<img :src="src" :alt="`${title} icon`" width="24" height="24" />
		<div class="text">{{ title }}</div>
	</div>
</template>
<script>
export default {
	name: 'site_sections',
	props: {
		src: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.plus_item {
	background: #1b1831;
	display: flex;
	gap: 10px;
	align-items: center;
	border-radius: var(--s);
	padding: 10px 20px;
	border: 1px solid #ffffff26;
}
.text {
	color: var(--cairo);
}
@media (max-width: 767px) {
	.plus_item {
		width: 100%;
	}
}
</style>
