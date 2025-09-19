<template>
	<div>
		<nav class="footer-nav">
			<div class="item" v-for="(item, index) in value" :key="index">
				<ALink :href="item.value_2" :attributes="textSettings" :title="`Goes to ${item.value_1} page`">
					{{ item.value_1 }}
				</ALink>
			</div>
		</nav>
	</div>
</template>

<script>
import components from '~/mixins/components'
export default {
	name: 'footer-menu',
	mixins: [components],
	props: {
		value: {
			type: Array,
			default: []
		}
	},
	data: () => {
		return {
			textSettings: {
				weight: 'regular',
				color: 'cairo',
				size: 'small',
				decoration: 'none',
				text_transform: 'uppercase'
			}
		}
	}
}
</script>
<style scoped>
.footer-nav {
	display: flex;
	gap: 30px;
	margin-top: 30px;
}
@media (max-width: 767px) {
	.footer-nav {
		flex-wrap: wrap;
		margin-top: 30px;
		margin-bottom: 30px;
		gap: 15px;
	}
	.item {
		width: 100%;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.footer-nav {
		flex-wrap: wrap;
		margin-top: 30px;
		margin-bottom: 30px;
		gap: 15px;
	}
}
</style>
