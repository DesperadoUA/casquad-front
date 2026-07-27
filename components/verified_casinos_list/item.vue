<template>
	<div class="verified_casinos_list_item">
		<img :src="src" :alt="title" width="34" />
		<div class="title">{{ title }}</div>
		<div class="sub_title">{{ subTitle }}</div>
	</div>
</template>
<script>
export default {
	name: 'verified_casinos_list_item',
	props: {
		src: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		subTitle: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.verified_casinos_list_item {
	padding: 20px;
	border-radius: var(--m);
	background: #272a33;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.title {
	color: var(--cairo);
	font-size: 14px;
}
.sub_title {
	color: var(--cordoba);
	font-size: 14px;
}
</style>
