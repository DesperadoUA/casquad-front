<template>
	<section class="cms" v-if="value !== ''">
		<article v-html="value" />
	</section>
</template>

<script>
export default {
	name: 'text_content',
	props: ['value']
}
</script>
