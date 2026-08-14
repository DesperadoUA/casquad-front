import config from '~/config'

const CASQUAD_SAME_AS_FALLBACK = [
	'https://www.youtube.com/@Casquad25',
	'https://x.com/Casquad25'
]

const AUTHOR_NAME_MAX_LENGTH = 100
const ITEM_LIST_MIN_ITEMS = 2

export function toAbsoluteUrl(domain, permalink) {
	const base = String(domain || '').replace(/\/+$/, '')
	const path = String(permalink || '').trim()
	if (!path) return ''
	if (/^https?:\/\//i.test(path)) return path
	return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function toIsoDate(value) {
	if (!value) return ''
	const raw = String(value).trim()
	if (!raw) return ''
	const iso = raw.slice(0, 10)
	return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : ''
}

export function stripHtml(html) {
	if (!html) return ''
	return String(html)
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

export function plainTextSummary(html, maxLength = 500) {
	const text = stripHtml(html)
	if (!text) return ''
	if (text.length <= maxLength) return text
	return `${text.slice(0, maxLength).trim()}...`
}

export function collectSameAs(settings) {
	const fromCms = []
	if (Array.isArray(settings)) {
		const social = settings.find(item => item && item.key === 'social')
		const values = social && Array.isArray(social.value) ? social.value : []
		values.forEach(item => {
			const url = String((item && item.value_1) || '').trim()
			if (/^https?:\/\//i.test(url)) fromCms.push(url)
		})
	}
	const merged = [...fromCms, ...CASQUAD_SAME_AS_FALLBACK]
	return [...new Set(merged)]
}

export function detectPageJsonLdKind(path = '') {
	const normalized = String(path || '')
		.replace(/^\/amp(?=\/|$)/, '')
		.replace(/\/+$/, '') || '/'
	if (/^\/casino\/[^/]+$/.test(normalized)) return 'review'
	if (/^\/vendor\/[^/]+$/.test(normalized)) return 'review'
	return 'article'
}

export function detectReviewKind(path = '') {
	const normalized = String(path || '')
		.replace(/^\/amp(?=\/|$)/, '')
		.replace(/\/+$/, '') || '/'
	if (/^\/vendor\/[^/]+$/.test(normalized)) return 'vendor'
	return 'casino'
}

function buildCasquadOrganization(domain, sameAs = []) {
	const org = {
		'@type': 'Organization',
		'@id': `${domain}/#organization`,
		name: 'CASQUAD',
		url: `${domain}/`,
		logo: `${domain}/img/logo-2.svg`
	}
	if (sameAs.length) org.sameAs = sameAs
	return org
}

function buildBrandOrganization({ name, url }) {
	return {
		'@type': 'Organization',
		'@id': `${url}#brand`,
		name,
		url
	}
}

function isValidAuthorName(title) {
	const name = String(title || '').trim()
	return Boolean(name) && name.length < AUTHOR_NAME_MAX_LENGTH
}

export function resolveAuthorEntity(body = {}) {
	const authors = Array.isArray(body.authors) ? body.authors : []
	const [cmsAuthor = null] = authors
	if (cmsAuthor && isValidAuthorName(cmsAuthor.title)) return cmsAuthor

	const fallback = config.DEFAULT_AUTHOR || null
	if (!fallback || !isValidAuthorName(fallback.title)) return null
	return { ...fallback, create_at: fallback.create_at || body.update_at || '' }
}

function buildAuthor(author, domain) {
	if (!author || !isValidAuthorName(author.title)) return null
	const node = {
		'@type': 'Person',
		name: String(author.title).trim()
	}
	const authorUrl = toAbsoluteUrl(domain, author.permalink)
	if (authorUrl) node.url = authorUrl
	return node
}

function buildReviewRating(rating) {
	const numeric = Number(rating)
	if (!Number.isFinite(numeric) || numeric <= 0) return null
	return {
		'@type': 'Rating',
		ratingValue: (numeric / 10).toFixed(1),
		bestRating: '10',
		worstRating: '1'
	}
}

function buildReviewNode({ body, domain, kind }) {
	const pageUrl = String(body.currentUrl || '').trim()
	const name = String(body.title || body.h1 || '').trim()
	if (!pageUrl || !name) return null

	const author = buildAuthor(resolveAuthorEntity(body), domain)
	if (!author) return null

	const dateModified = toIsoDate(body.update_at)
	const datePublished = toIsoDate(body.create_at) || dateModified
	const reviewBodySource =
		kind === 'casino'
			? body.content_reviews || body.description || ''
			: body.content || body.description || ''
	const reviewBody = plainTextSummary(reviewBodySource)
	const reviewRating = buildReviewRating(body.rating)
	const brand = buildBrandOrganization({ name, url: pageUrl })

	const review = {
		'@type': 'Review',
		'@id': `${pageUrl}#review`,
		name: `${name} Review`,
		url: pageUrl,
		author,
		publisher: { '@id': `${domain}/#organization` },
		itemReviewed: {
			'@type': 'Organization',
			'@id': brand['@id'],
			name: brand.name,
			url: brand.url
		}
	}

	if (datePublished) review.datePublished = datePublished
	if (dateModified) review.dateModified = dateModified
	if (reviewRating) review.reviewRating = reviewRating
	if (reviewBody) review.reviewBody = reviewBody

	return { review, brand }
}

function buildArticleNode({ body, domain }) {
	const pageUrl = String(body.currentUrl || '').trim()
	const headline = String(body.h1 || body.title || body.meta_title || '').trim()
	if (!pageUrl || !headline) return null

	const dateModified = toIsoDate(body.update_at)
	const datePublished = toIsoDate(body.create_at) || dateModified
	const authors = Array.isArray(body.authors) ? body.authors : []
	const author = buildAuthor(authors[0], domain)
	const description = String(body.description || '').trim()
	const image = toAbsoluteUrl(domain, body.social_img)

	const article = {
		'@type': 'Article',
		'@id': `${pageUrl}#article`,
		headline,
		publisher: { '@id': `${domain}/#organization` },
		mainEntityOfPage: pageUrl
	}

	if (description) article.description = description
	if (datePublished) article.datePublished = datePublished
	if (dateModified) article.dateModified = dateModified
	if (author) article.author = author
	if (image) article.image = image

	return article
}

// Google supports a single ItemList per page, so a template must pass one list only
function buildItemListNode({ items, name, domain, pageUrl }) {
	const seen = new Set()
	// Summary-page list: ListItem must hold only @type, position and url, urls must be unique
	const itemListElement = (Array.isArray(items) ? items : [])
		.map(item => toAbsoluteUrl(domain, item && item.permalink))
		.filter(url => {
			if (!url || seen.has(url)) return false
			seen.add(url)
			return true
		})
		.map((url, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url
		}))

	if (itemListElement.length < ITEM_LIST_MIN_ITEMS) return null

	const node = {
		'@type': 'ItemList',
		itemListElement
	}

	if (pageUrl) node['@id'] = `${pageUrl}#itemlist`
	const listName = String(name || '').trim()
	if (listName) node.name = listName

	return node
}

export function buildPageJsonLd({
	kind = 'article',
	domain = '',
	sameAs = [],
	body = {},
	reviewKind = 'casino',
	listItems = [],
	listName = ''
} = {}) {
	const base = String(domain || '').replace(/\/+$/, '')
	if (!base || !body || typeof body !== 'object') return null

	const graph = [buildCasquadOrganization(base, sameAs)]

	if (kind === 'review') {
		const built = buildReviewNode({ body, domain: base, kind: reviewKind })
		// Review without a valid author is a critical error in Search Console, better to skip the node
		if (built) graph.push(built.brand, built.review)
	} else {
		const article = buildArticleNode({ body, domain: base })
		if (!article) return null
		graph.push(article)
	}

	const itemList = buildItemListNode({
		items: listItems,
		name: listName || body.h1 || body.title,
		domain: base,
		pageUrl: String(body.currentUrl || '').trim()
	})
	if (itemList) graph.push(itemList)

	return {
		'@context': 'https://schema.org',
		'@graph': graph
	}
}

export default buildPageJsonLd
