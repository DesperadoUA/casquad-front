<template>
	<div class="root">
		<div class="title text_size_x-large text_color_cairo text_weight_bold">{{ title }}</div>
		<div class="loop">
			<div class="item_highlight" v-for="item in currentPosts" :key="item.value_1">
				<Item :item="item" />
			</div>
		</div>
		<div class="btn_wrapper" v-if="posts.length > defaultNumberPosts" :class="showAll ? 'active' : ''">
			<AButton @onClick="showToggle" :attributes="btnSettings">
				{{ showAll ? t('HIDE') : t('SHOW_MORE') }} <AImg :attributes="arrowSettings" src="/img/arrowGreen.svg" />
			</AButton>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
import Item from '~/components/author_experience/item'

export default {
	name: 'author_experience',
	components: { Item },
	mixins: [components],
	data() {
		return {
			defaultNumberPosts: 3,
			showAll: false,
			btnSettings: {
				color: 'cairo',
				class: 'load_more',
				weight: 'bold',
				size: 'medium'
			},
			arrowSettings: {
				width: '18px',
				height: '18px',
				class: 'arrow',
				alt: 'Green Arrow'
			}
		}
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		posts: {
			type: Array,
			default: []
		}
	},
	computed: {
		currentPosts() {
			return this.showAll ? this.posts : this.posts.slice(0, this.defaultNumberPosts)
		}
	},
	methods: {
		showToggle() {
			this.showAll = !this.showAll
		}
	}
}
</script>
<style scoped>
.root {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.loop {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.btn_wrapper {
	max-width: 272px;
	width: 272px;
	height: 52px;
	margin: 0 auto;
}
.arrow {
	margin-left: 10px;
	transform: rotate(90deg);
}
.active .arrow {
	transform: rotate(270deg);
}
</style>
