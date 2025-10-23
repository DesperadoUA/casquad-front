<template>
	<ContentWrapper>
		<div class="root">
			<div class="left cms">
				<article v-html="text" />
			</div>
			<div class="right">
				<Fancybox v-if="src" :options="{ Carousel: { infinite: false } }">
					<a class="item" data-fancybox="iframe" :href="iframe">
						<AImg :attributes="{ ...imgSettings, alt }" :src="src" />
					</a>
				</Fancybox>
			</div>
		</div>
	</ContentWrapper>
</template>
<script>
import Fancybox from '~/components/fancybox'
import components from '~/mixins/components'
import ContentWrapper from '~/components/content_wrapper'
export default {
	name: 'video_with_text',
	mixins: [components],
	components: { Fancybox, ContentWrapper },
	data: () => {
		return {
			imgSettings: {
				width: '280px',
				height: '170px',
				class: 'img'
			},
			src: '',
			alt: '',
			iframe: ''
		}
	},
	props: {
		text: {
			type: String,
			default() {
				return ''
			}
		},
		video: {
			type: Object,
			default() {
				return []
			}
		}
	},
	mounted() {
		const { src = '', value = [] } = this.video
		this.src = src
		const [iframe = '', alt = ''] = value
		this.iframe = iframe
		this.alt = alt
	}
}
</script>
<style scoped>
.root {
	display: flex;
	gap: 40px;
}
.right {
	width: 60%;
	min-width: 60%;
}
.right img {
	width: 100%;
	border-radius: var(--m);
}
@media (max-width: 568px) {
	.root {
		flex-wrap: wrap;
	}
	.left,
	.right {
		width: 100%;
	}
}
</style>
