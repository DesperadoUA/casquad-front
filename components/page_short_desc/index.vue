<template>
	<div v-if="value" class="page_short_desc">
		<AText tag="div" :attributes="descSettings">{{ value }}</AText>
	</div>
</template>
<script>
export default {
	name: 'page_short_desc',
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		descSettings: {
			color: 'cairo',
			size: 'medium',
			weight: 'regular'
		}
	})
}
</script>
<style scoped>
.page_short_desc {
	display: block;
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	border-radius: var(--m);
	background: var(--coruna);
	color: #fff;
}
.page_short_desc ::v-deep div {
	color: #fff;
}
</style>
