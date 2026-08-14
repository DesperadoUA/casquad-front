<template>
	<div class="container sub_gap">
		<div class="title text_color_cairo text_size_x-large text_weight_bold" v-if="title">{{ title }}</div>
		<div class="casino_loop sub_gap">
			<FunnelCard
				v-for="item in posts"
				:key="item.title"
				:link="item.permalink"
				:src="item.thumbnail"
				:title="item.title"
				:refLinks="item.ref"
				:hash="item.hash"
				:author_permalink="item.authors.length ? item.authors[0].permalink : ''"
				:author_title="item.authors.length ? item.authors[0].title : ''"
				:short_desc="item.short_desc"
				:date="item.update_at.slice(0, 10)"
			/>
		</div>
	</div>
</template>

<script>
import FunnelCard from '~/components/funnel_loop/card'
import { buildItemListSchema } from '~/helpers/jsonLdSchema'
import config from '~/config'
export default {
	name: 'funnel_loop',
	components: { FunnelCard },
	props: {
		posts: {
			type: Array,
			default() {
				return []
			}
		},
		title: {
			type: String,
			default() {
				return ''
			}
		},
		// Google accepts one ItemList per page, so a template enables it for a single list
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
	}
}
</script>
<style scoped>
.casino_loop {
	display: flex;
	gap:;
}
</style>
