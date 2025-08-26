export default {
	props: {
		refLinks: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	methods: {
		refActivate(arr, geo) {
            console.log(arr, geo)
			if (arr[geo]) window.open(arr[geo], '_blank')
		}
	}
}
