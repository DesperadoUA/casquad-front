export default {
    data: () => {
        return {
            geoConfig: {
                'WORLD': 'WD',
                'GB': 'GB',
                'BD': 'BD',
                'AU': 'AU',
                'GR': 'GR',
                'IN': 'IN',
                'ID': 'ID',
                'CA': 'CA',
                'NL': 'NL',
                'DE': 'DE',
                'ZA': 'ZA',
                'PH': 'PH',
                'SE': 'SE'
            }
        }
    },
    computed: {
        geo() {
            return this.$store.getters['common/getGeo']
        }
    },
}
