<template>
	<div class="wrapper_thumbnail">
		<AImg :attributes="{ ...thumbnailSettings, alt: `${alt}` }" :src="src" />
	</div>
</template>
<script>
import AImg from '~/components/ui/atoms/img'
export default {
	name: 'banner',
	components: {
		AImg
	},
	props: {
		src: {
			type: String,
			default() {
				return ''
			}
		},
		alt: {
			type: String,
			default() {
				return ''
			}
		}
	},

	data: () => {
		return {
			thumbnailSettings: {
				width: '822px',
				height: '333px',
				class: 'thumbnail'
			}
		}
	}
}
</script>
<style scoped>
.wrapper_thumbnail {
	width: 100%;
	height: auto;
}
.thumbnail {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
@media (max-width: 767px) {
	.wrapper_thumbnail {
		width: 100%;
		height: auto;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.wrapper_thumbnail {
		width: 100%;
		height: auto;
	}
}
</style>
