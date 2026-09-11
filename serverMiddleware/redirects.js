import DAL_Redirects from '../DAL/redirects'
import store from './storeRedirects.js'

const CACHE_TTL_MS = 5 * 60 * 1000

function normalizePath(path) {
	if (!path || typeof path !== 'string') return ''
	const normalized = path.split('?')[0].replace(/\/+$/, '')
	return normalized || '/'
}

function normalizeRedirectsMap(body) {
	const map = {}
	Object.keys(body).forEach(from => {
		const key = normalizePath(from)
		if (key && body[from]) {
			map[key] = body[from]
		}
	})
	return map
}

function isCacheFresh() {
	return store.loadedAt > 0 && Date.now() - store.loadedAt < CACHE_TTL_MS
}

async function ensureRedirects() {
	if (isCacheFresh()) return
	if (store.loading) return store.loading

	store.loading = (async () => {
		try {
			const { data } = await DAL_Redirects.getRedirects()
			store.redirects =
				data.confirm === 'ok' && data.body && !Array.isArray(data.body)
					? normalizeRedirectsMap(data.body)
					: {}
		} catch (e) {
			store.redirects = {}
		} finally {
			store.loadedAt = Date.now()
			store.loading = null
		}
	})()

	return store.loading
}

const CANONICAL_ORIGIN = 'https://casquad.org'

function getHostname(host) {
	return (host || '').split(':')[0].toLowerCase()
}

module.exports = async function(req, res, next) {
	const host = req.headers.host
	const hostname = getHostname(host)
	let url = req.url.split('?')[0]
	let urlParams = null

	if (hostname === 'casquad.com' || hostname === 'www.casquad.com') {
		res.writeHead(301, { Location: CANONICAL_ORIGIN + req.url })
		res.end()
		return
	}

	if (hostname.startsWith('www.')) {
		res.writeHead(301, { Location: CANONICAL_ORIGIN + req.url })
		res.end()
		return
	}

	if (req.url.includes('?')) {
		urlParams = '?' + req.url.split('?')[1]
	}

	await ensureRedirects()

	const path = normalizePath(url)
	const to = store.redirects[path]

	if (to) {
		const newLocation = urlParams ? to + urlParams : to
		res.writeHead(301, {
			Location: newLocation
		})
		res.end()
		return
	}

	next()
}
