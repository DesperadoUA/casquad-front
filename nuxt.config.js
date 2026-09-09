import DAL_Builder from './DAL/builder'
import config from './config'
export default {
	telemetry: false,
	mode: 'universal',
	modern: 'client',
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
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
			{
				rel: 'preload',
				href: 'https://fonts.gstatic.com/s/unbounded/v8/Yq6W-LOTXCb04q32xlpwu8Zf.woff2',
				as: 'font',
				type: 'font/woff2',
				crossorigin: 'anonymous'
			}
			/*{ href: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&display=swap', rel: 'stylesheet' }*/
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
		},
		middleware: ['stripTrailingSlash']
	},
	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/analytics.client.js', '~/plugins/third-party-scripts.client.js'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxtjs/sitemap'],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		babel: {
			presets({ isModern }) {
				return [
					[
						require.resolve('@nuxt/babel-preset-app'),
						isModern
							? {
									targets: { esmodules: true },
									useBuiltIns: false
								}
							: {
									targets: {
										browsers: ['> 0.5%', 'last 2 versions', 'not dead', 'not ie 11']
									}
								}
					]
				]
			}
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
			'/type-payments',
			'/go/**',
			'/front'
		],
		routes: async () => {
			const request = new DAL_Builder()
			const { data } = await request.postType('pages').url('sitemap').get()
			return data.body.posts
		}
	}
}
