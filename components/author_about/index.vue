<template>
	<div class="root">
		<div class="title text_size_x-large text_color_cairo text_weight_bold">{{ t('ABOUT_ME') }}</div>
		<div v-if="text" class="left cms" :class="{ 'full-width': !src }" v-html="text" />
		<div class="right" v-if="src">
			<AImg :attributes="{ ...imgSettings, alt: `photo author` }" :src="src" />
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'

export default {
	name: 'author_about',
	mixins: [components],
	data() {
		return {
			imgSettings: {
				width: '100%',
				class: 'border_radius_m'
			}
		}
	},
	props: {
		text: {
			type: String,
			default: ''
		},
		src: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.root {
	display: flex;
	gap: 20px;
	width: 100%;
	flex-wrap: wrap;
}
.title {
	width: 100%;
}
.left,
.right {
	width: calc(50% - 10px);
	max-width: calc(50% - 10px);
	min-width: calc(50% - 10px);
}
@media (max-width: 1200px) {
	.left,
	.right {
		width: 100%;
		max-width: 100%;
		min-width: 100%;
	}
}
</style>
