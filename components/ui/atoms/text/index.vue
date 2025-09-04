<template>
	<span v-if="tag === 'span'" :class="currentClasses" @click="onClick">
		<slot />
	</span>
	<p v-else-if="tag === 'p'" :class="currentClasses" @click="onClick">
		<slot />
	</p>
	<div v-else-if="tag === 'div'" :class="currentClasses" @click="onClick">
		<slot />
	</div>
	<h1 v-else-if="tag === 'h1'" :class="currentClasses" @click="onClick">
		<slot />
	</h1>
	<h2 v-else-if="tag === 'h2'" :class="currentClasses" @click="onClick">
		<slot />
	</h2>
	<h3 v-else-if="tag === 'h3'" :class="currentClasses" @click="onClick">
		<slot />
	</h3>
	<h4 v-else-if="tag === 'h4'" :class="currentClasses" @click="onClick">
		<slot />
	</h4>
	<h5 v-else-if="tag === 'h5'" :class="currentClasses" @click="onClick">
		<slot />
	</h5>
	<h6 v-else-if="tag === 'h6'" :class="currentClasses" @click="onClick">
		<slot />
	</h6>
</template>
<script>
export default {
	name: 'AText',
	data: () => {
		return {
			currentClasses: []
		}
	},
	props: {
		attributes: {
			default() {
				return {}
			},
			type: Object
		},
		tag: {
			type: String,
			default() {
				return 'span'
			}
		}
	},
	methods: {
		onClick() {
			this.$emit('onClick')
		}
	},
	mounted() {
		const classes = []
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
		const availableSize = ['small', 'medium', 'large', 'x-large', '2x-large']
		const availableDecoration = [
			'underline',
			'overline',
			'line-through',
			'blink',
			'solid',
			'wavy',
			'dotted',
			'dashed',
			'double'
		]
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
			'caracas'
		]
		const availableAlign = ['left', 'right', 'center', 'justify']
		const availableTextTransform = ['uppercase', 'lowercase', 'capitalize', 'none']
		if ('weight' in this.attributes && availableWeight.includes(this.attributes.weight)) {
			classes.push(`text_weight_${this.attributes.weight}`)
		}
		if ('size' in this.attributes && availableSize.includes(this.attributes.size)) {
			classes.push(`text_size_${this.attributes.size}`)
		}
		if ('decoration' in this.attributes && availableDecoration.includes(this.attributes.decoration)) {
			classes.push(`text_decoration_${this.attributes.decoration}`)
		}
		if ('color' in this.attributes && availableColor.includes(this.attributes.color)) {
			classes.push(`text_color_${this.attributes.color}`)
		}
		if ('align' in this.attributes && availableAlign.includes(this.attributes.align)) {
			classes.push(`text_align_${this.attributes.align}`)
		}
		if ('text_transform' in this.attributes && availableTextTransform.includes(this.attributes.text_transform)) {
			classes.push(`text_transform_${this.attributes.text_transform}`)
		}
		if ('class' in this.attributes) classes.push(this.attributes.class)
		this.currentClasses = classes.join(' ')
	}
}
</script>
<style scoped></style>
