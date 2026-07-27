<template>
	<div class="partners">
		<div v-for="(post, index) in posts" :key="index">
			<img :src="post" alt="Partners logo" />
		</div>
	</div>
</template>
<script>
import Content from '~/components/content/text_2.vue'
export default {
	name: 'responsible_main',
	components: { Content },
	props: {
		posts: {
			type: Array,
			default: []
		}
	}
}
</script>
<style scoped>
.partners {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	justify-content: space-between;
}
</style>
