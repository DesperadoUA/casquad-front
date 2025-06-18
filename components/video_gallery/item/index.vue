<template>
	<span class="item">
		<AImg :attributes="{ ...imgSettings, alt: `${title} Video` }" :src="src" />
	</span>
</template>

<script>
import components from '~/mixins/components'
export default {
	name: 'video_item',
	mixins: [components],
	data() {
		return {
			imgSettings: {
				width: '280px',
				height: '170px',
				class: 'img'
			},
            titleSettings: {
				color: 'cairo',
				size: 'large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title',
                align: 'center',
			},
		}
	},
	props: {
		src: {
			type: String,
			default() {
				return []
			}
		},
		title: {
			type: String,
			default() {
				return ''
			}
		}
	},
}
</script>

<style scoped>
.img {
	max-width: 100%;
	border-radius: var(--m);
	cursor: pointer;
    width: 100%;
}
.title {
    margin-top: 15px;
    text-decoration: none;
	display: block;
}
</style>
