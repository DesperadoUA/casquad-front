<template>
	<div class="content_wrapper">
		<slot />
	</div>
</template>
<script>
export default {
	name: 'content_wrapper'
}
</script>
<style scoped>
.content_wrapper {
	background: var(--cucuta);
	border-radius: var(--m);
	padding: 20px;
	border: 1px solid #ffffff26;
}
</style>
