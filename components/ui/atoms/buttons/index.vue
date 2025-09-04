<template>
	<button class="btn" :class="currentClasses" @click="onClick" :disabled="disabled">
		<slot />
	</button>
</template>
<script>
export default {
	name: 'AButton',
	data: () => {
		return {
			currentClasses: []
		}
	},
	props: {
		attributes: {
			default: {},
			type: Object
		},
		disabled: {
			default: false,
			type: Boolean
		}
	},
	methods: {
		onClick() {
			this.$emit('onClick')
		}
	},
	mounted() {
		const classes = []
		const availableColor = [
			'cairo',
			'calgary',
			'cordoba',
			'callao',
			'cucuta',
			'colombo',
			'cancun',
			'cochin',
			'cardiff',
			'cleveland',
			'chicago',
			'caracas'
		]
		const availableBorderRadius = ['xxs', 'xs', 's', 'm', 'l', 'xl']
		const availableWeight = [
			'thin',
			'extra-light',
			'light',
			'regular',
			'medium',
			'semi-bold',
			'bold',
			'extra-bold',
			'black'
		]
		const availableTextTransform = ['uppercase', 'lowercase', 'capitalize', 'none']
		if ('color' in this.attributes && availableColor.includes(this.attributes.color)) {
			classes.push(`text_color_${this.attributes.color}`)
		}
		if ('bg' in this.attributes && availableColor.includes(this.attributes.bg)) {
			classes.push(`bg_color_${this.attributes.bg}`)
		}
		if ('borderRadius' in this.attributes && availableBorderRadius.includes(this.attributes.borderRadius)) {
			classes.push(`border_radius_${this.attributes.borderRadius}`)
		}
		if ('weight' in this.attributes && availableWeight.includes(this.attributes.weight)) {
			classes.push(`text_weight_${this.attributes.weight}`)
		}
		if ('text_transform' in this.attributes && availableTextTransform.includes(this.attributes.text_transform)) {
			classes.push(`text_transform_${this.attributes.text_transform}`)
		}
		if ('class' in this.attributes) classes.push(this.attributes.class)
		this.currentClasses = classes.join(' ')
	}
}
</script>
<style scoped>
.btn {
	width: 100%;
	height: 100%;
	font-size: 16px;
	cursor: pointer;
	border: none;
}
</style>
