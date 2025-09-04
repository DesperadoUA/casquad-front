<template>
	<div class="pop_up" @click.self="onClick">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'pop_up',
	methods: {
		onClick() {
			this.$emit('onClick')
		}
	}
}
</script>
<style scoped>
.pop_up {
	width: 100vw;
	height: 100vh;
	overflow-y: auto;
	background: rgba(8, 5, 26, 0.8);
	padding: 20px;
	box-sizing: border-box;
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
@media (max-width: 767px) {
}
@media (min-width: 768px) and (max-width: 1200px) {
}
</style>
