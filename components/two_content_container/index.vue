<template>
	<div class="two_content_container">
		<div class="left">
			<slot name="left" />
		</div>
		<div class="right">
			<slot name="right" />
		</div>
	</div>
</template>
<script>
export default {
	name: 'two_content_container'
}
</script>
<style scoped>
.two_content_container {
	display: flex;
}
.left {
	flex-grow: 1;
	padding-right: 15px;
	max-width: 875px;
}
.right {
	width: 368px;
	max-width: 100%;
	min-width: 368px;
}
@media (max-width: 767px) {
	.two_content_container {
		flex-wrap: wrap;
	}
	.left {
		width: 100%;
		padding-right: 0px;
	}
	.right {
		width: 100%;
		min-width: auto;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.two_content_container {
		flex-wrap: wrap;
	}
	.left {
		width: 100%;
		padding-right: 0px;
	}
	.right {
		width: 100%;
	}
}
</style>
