import axios from 'axios'
import config from '../config'

class DAL_Pages {
	static getData(data) {
		return axios.get(`${config.API_URL[config.LANG]}pages/${data.url}?geo=${data.geo}`)
	}
}
export default DAL_Pages
