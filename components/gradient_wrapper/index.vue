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
	background: linear-gradient(to right, #1b1831e5, #332395e5);
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px;
	border-radius: var(--m);
}
</style>
