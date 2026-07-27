import axios from 'axios'
import config from '../config'

class DAL_Redirects {
	static getRedirects() {
		return axios.get(config.API_URL[config.LANG] + 'redirects')
	}
}

export default DAL_Redirects
