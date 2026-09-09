let __thirdPartyScriptsLoaded = false

function loadScript(src, attributes = {}) {
	const script = document.createElement('script')
	script.src = src
	script.async = true
	Object.entries(attributes).forEach(([key, value]) => {
		script.setAttribute(key, value)
	})
	document.head.appendChild(script)
}

function loadThirdPartyScripts() {
	if (__thirdPartyScriptsLoaded) return
	__thirdPartyScriptsLoaded = true

	loadScript('/js/gtm.js')
	loadScript('https://analytics.ahrefs.com/analytics.js', {
		'data-key': '4Janzt1ko61kpMRlF1OaXw'
	})
}

function scheduleThirdPartyScripts() {
	const events = ['scroll', 'click', 'touchstart', 'keydown']

	const trigger = () => {
		events.forEach((event) => window.removeEventListener(event, trigger))
		loadThirdPartyScripts()
	}

	events.forEach((event) => {
		window.addEventListener(event, trigger, { passive: true })
	})

	window.addEventListener(
		'load',
		() => {
			setTimeout(loadThirdPartyScripts, 8000)
		},
		{ once: true }
	)
}

export default () => {
	if (!process.client) return
	scheduleThirdPartyScripts()
}
