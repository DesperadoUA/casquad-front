let __analyticsInitialized = false

function getReferrerSource(refParam) {
	try {
		const currentHost = window.location.hostname
		let source = 'direct'

		if (refParam) {
			source = refParam
		} else if (document.referrer) {
			const refHost = new URL(document.referrer).hostname
			if (refHost && refHost !== currentHost) {
				source = document.referrer
			}
		}

		return source
	} catch (err) {
		console.warn('[analytics] Failed to determine referrer source:', err)
		return 'direct'
	}
}

export default ({ store }) => {
	if (!process.client || __analyticsInitialized) return
	__analyticsInitialized = true

	try {
		const params = new URLSearchParams(window.location.search)
		const refParam = params.get('referrer')

		const savedData = JSON.parse(localStorage.getItem('analytics') || '{}')

		const analyticsData = {
			first_source: savedData.first_source || null,
			referrer: 'direct',
			...savedData
		}

		if (!analyticsData.first_source) {
			analyticsData.first_source = getReferrerSource(refParam)
		}
		analyticsData.referrer = getReferrerSource(refParam)
		localStorage.setItem('analytics', JSON.stringify(analyticsData))
		store.dispatch('analytics/initAnalytics', analyticsData)
	} catch (err) {
		console.warn('[analytics] Failed to initialize analytics:', err)
	}
}
