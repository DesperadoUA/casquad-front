<template>
	<div class="root">
		<div class="left">
			<img :src="src" class="preview" />
		</div>
		<div class="right">
			<Content :value="text" />
		</div>
	</div>
</template>
<script>
import Content from '~/components/content/text_2.vue'
export default {
	name: 'verified_casinos_list',
	components: { Content },
	props: {
		src: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.root {
	display: flex;
	gap: 40px;
}
.left,
.right {
	width: calc(50% - 20px);
}
.preview {
	width: 100%;
}
@media (max-width: 568px) {
	.root {
		flex-wrap: wrap;
		gap: 20px;
	}
	.left,
	.right {
		width: 100%;
	}
}
</style>
