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
	background: rgba(16, 13, 36, 0.28);
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px;
	border-radius: var(--m);
}
</style>
