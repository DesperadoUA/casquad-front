export default {
	API_URL: {
		UA: 'https://api.casquads.com/api/',
		RU: 'https://api.casquads.com/api/',
		EN: 'https://api.casquads.com/api/'
		//EN: 'http://127.0.0.1:8000/api/'
	},
	BASE_URL: {
		RU: 'https://casquad.com',
		EN: 'https://casquad.com',
		UA: 'https://casquad.com'
	},
	AMP_PREFIX: '/amp',
	HTML_ATTRS: {
		RU: 'ru',
		UA: 'uk',
		EN: 'en'
	},
	LANG: 'EN',
	DEFAULT_LANG: {
		RU: 'ru-UA',
		UA: 'ru-UA',
		EN: 'en'
	},
	DEFAULT_GEO: 'WORLD',
	AVAILABLE_GEO: new Set(['GB', 'AU', 'CA', 'NL', 'DE' /*'IN', 'ID', 'GR', 'ZA', 'PH', 'SE', 'BD'*/])
}
