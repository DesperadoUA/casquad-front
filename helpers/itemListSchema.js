function toAbsoluteUrl(domain, permalink) {
	const base = String(domain || '').replace(/\/+$/, '')
	const path = String(permalink || '').trim()
	if (!path) return ''
	if (/^https?:\/\//i.test(path)) return path
	return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildItemListSchema(items = [], { name = '', domain = '' } = {}) {
	const itemListElement = (Array.isArray(items) ? items : [])
		.filter(item => {
			const title = String((item && item.title) || '').trim()
			const permalink = String((item && item.permalink) || '').trim()
			return Boolean(title && permalink)
		})
		.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: String(item.title).trim(),
			url: toAbsoluteUrl(domain, item.permalink)
		}))

	if (!itemListElement.length) return null

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement
	}

	const listName = String(name || '').trim()
	if (listName) schema.name = listName

	return schema
}

export default buildItemListSchema
