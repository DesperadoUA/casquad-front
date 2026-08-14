<template>
	<div class="root">
		<div class="container loop_row">
			<div class="title text_size_x-large text_color_cairo text_weight_bold">{{ title }}</div>
			<div class="loop">
				<div class="item_author" v-for="(item, index) in posts" :key="index">
					<Card
						:link="item.permalink"
						:src="item.thumbnail"
						:title="item.title"
						:date="item.update_at.slice(0, 10)"
						:desc="item.short_desc"
					/>
				</div>
			</div>
			<div class="load_more_author" v-if="posts.length < total">
				<AButton :attributes="btnShowMoreSettings" @onClick="postShowMore" title="Show more action">
					{{ t('SHOW_MORE') }} <AImg :attributes="arrowSettings" src="/img/arrowGreen.svg" />
				</AButton>
			</div>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
import Card from '~/components/news_loop/cards/main'
import { buildItemListSchema } from '~/helpers/jsonLdSchema'
import config from '~/config'

export default {
	name: 'author_loop',
	mixins: [components],
	components: { Card },
	props: {
		posts: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: () => ''
		},
		total: {
			type: Number,
			default: () => 0
		},
		// Google accepts one ItemList per page, so a template enables it for a single loop
		schema: {
			type: Boolean,
			default: false
		}
	},
	head() {
		if (!this.schema) return {}

		const itemList = buildItemListSchema({
			items: this.posts,
			name: this.title,
			domain: config.BASE_URL[config.LANG]
		})
		if (!itemList) return {}

		return {
			script: [
				{
					hid: 'itemlist-jsonld',
					type: 'application/ld+json',
					json: itemList
				}
			]
		}
	},
	data: () => {
		return {
			btnShowMoreSettings: {
				color: 'cairo',
				weight: 'bold',
				size: 'medium',
				decoration: 'none',
				class: 'show_more_button'
			},
			arrowSettings: {
				width: '18px',
				height: '18px',
				class: 'arrow',
				alt: 'Green arrow'
			}
		}
	},
	methods: {
		postShowMore() {
			this.$emit('showMore')
		}
	}
}
</script>
<style scoped>
.loop_row {
	display: flex;
	gap: 20px;
	flex-direction: column;
	align-items: stretch;
}
.loop {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
}
.item_author {
	width: calc(25% - 15px);
}
.show_more_button {
	width: 280px;
	height: 52px;
	max-width: 100%;
	background: #ffffff14;
	border: 1px solid #ffffff1a;
	padding: 12px 31px;
	border-radius: var(--m);
}
.load_more_author {
	display: flex;
	justify-content: center;
}
.btn_wrapper {
	max-width: 272px;
	width: 272px;
}
.arrow {
	transform: rotate(90deg);
}
@media (max-width: 576px) {
	.item_author {
		width: 100%;
	}
	.loop_row {
		padding-left: 0;
		padding-right: 0;
	}
}
@media (min-width: 577px) and (max-width: 1200px) {
	.item_author {
		width: calc(50% - 10px);
	}
	.loop_row {
		padding-left: 0;
		padding-right: 0;
		max-width: 100%;
	}
}
</style>
