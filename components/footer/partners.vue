<template>
	<div class="container">
		<div class="partners">
			<AImg
				v-for="(item, index) in value"
				:attributes="{ ...imgSettings, width: item.value_1, alt: 'Partners logo' }"
				:key="index"
				:src="item.src"
			/>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
export default {
	name: 'app-partners',
	mixins: [components],
	props: {
		value: {
			type: Array,
			default: []
		}
	},
	data: () => {
		return {
			imgSettings: {
			}
		}
	},
}
</script>
<style scoped>
.partners {
	display: flex;
	gap: 20px;
	margin-bottom: var(--m);
}
@media (max-width: 767px) {
	.partners {
		flex-wrap: wrap;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.partners {
		padding: 0 20px;
		flex-wrap: wrap;
	}
}
.partners img {
	height: 40px;
	width: auto;
}
</style>
