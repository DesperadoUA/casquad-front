<template>
	<span class="item-list-schema" aria-hidden="true" />
</template>

<script>
import config from '~/config'
import { buildItemListSchema } from '~/helpers/itemListSchema'

export default {
	name: 'item_list_schema',
	props: {
		items: {
			type: Array,
			default: () => []
		},
		hid: {
			type: String,
			required: true
		},
		name: {
			type: String,
			default: ''
		}
	},
	head() {
		const schema = buildItemListSchema(this.items, {
			name: this.name,
			domain: config.BASE_URL[config.LANG]
		})
		if (!schema) return {}

		return {
			script: [
				{
					hid: this.hid,
					type: 'application/ld+json',
					json: schema
				}
			]
		}
	}
}
</script>
