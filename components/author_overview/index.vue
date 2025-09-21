<template>
	<div class="root cms" v-html="text" />
</template>

<script>
import components from '~/mixins/components'

export default {
	name: 'author_overview',
	mixins: [components],
	props: {
		text: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped></style>
