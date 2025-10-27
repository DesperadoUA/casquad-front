import DAL_Builder from './DAL/builder'
import config from './config'
export default {
	mode: 'universal',
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'nuxt-slot',
		htmlAttrs: {
			lang: config.HTML_ATTRS[config.LANG]
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'robots', content: 'index,follow', 'data-qmeta': 'robots' },
			{ name: 'google', content: 'notranslate' },
			{ name: 'dmca-site-verification', content: 'THpuYXN4dmdZb1JuQnJFNjczS2JBdz090' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'true' }
			/*{ href: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&display=swap', rel: 'stylesheet' }*/
		],
		script: [
			{ hid: 'gtag', src: 'https://www.googletagmanager.com/gtag/js?id=G-XK5GKT3P8' },
			{ hid: 'analytics', src: 'https://analytics.ahrefs.com/analytics.js', 'data-key': '4Janzt1ko61kpMRlF1OaXw' },
			{ hid: 'gtm', src: '/js/gtm.js' }
		]
	},
	serverMiddleware: ['~/serverMiddleware/redirects'],
	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/css/pros-cons.css'],
	router: {
		scrollBehavior(to, from, savedPosition) {
			if (to.hash) {
				const el = document.querySelector(to.hash)
				if (el) {
					setTimeout(() => {
						const offset = 75
						const top = el.getBoundingClientRect().top + window.pageYOffset - offset
						window.scrollTo({ top, behavior: 'smooth' })
					}, 100)
				}
			} else if (savedPosition) {
				return savedPosition
			} else {
				return { x: 0, y: 0 }
			}
		}
	},
	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/analytics.client.js'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxtjs/sitemap'],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		babel: {
			presets: [
				[
					require.resolve('@nuxt/babel-preset-app'),
					{
						browsers: ['IE 11', 'last 2 version']
					}
				]
			]
		}
	},
	sitemap: {
		exclude: [
			'/countries',
			'/currencies',
			'/languages',
			'/licenses',
			'/technologies',
			'/type-bonuses',
			'/type-payments'
		],
		routes: async () => {
			const request = new DAL_Builder()
			const { data } = await request.postType('pages').url('sitemap').get()
			return data.body.posts
		}
	}
}
