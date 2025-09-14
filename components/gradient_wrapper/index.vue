<template>
	<div class="gradient_wrapper">
		<slot />
	</div>
</template>
<script>
export default {
	name: 'gradient_wrapper'
}
</script>
<style scoped>
.gradient_wrapper {
	background: var(--coruna);
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px;
	border-radius: var(--m);
}
</style>
