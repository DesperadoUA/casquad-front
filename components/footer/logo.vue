<template>
	<div class="footer-logo">
		<ALink href="/" title="Goes to Casquads main page">
			<AImg :attributes="{ ...imgSettings, alt: 'Casquads logo' }" src="/img/logo_footer.png" />
		</ALink>
		<div class="footer_social">
			<a v-for="(item, index) in social" :href="item.value_1" :key="index" :title="`Goes to ${item.value_1} main page`">
				<AImg :attributes="{ ...imgSocialSettings, alt: `Social logo ${item.value_1}` }" :src="item.src" />
			</a>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'
export default {
	name: 'footer-logo',
	mixins: [components],
	props: {
		social: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			imgSettings: {
				width: '160px',
				height: '36px'
			},
			imgSocialSettings: {
				width: '24px',
				height: '24px'
			}
		}
	}
}
</script>
<style scoped>
.footer-logo {
	display: flex;
	align-items: center;
}
.footer_social {
	display: flex;
	gap: 20px;
	justify-content: center;
	margin-left: 80px;
}
@media (max-width: 767px) {
	.footer_social {
		margin-left: 20px;
		gap: 10px;
		flex-grow: 1;
		justify-content: end;
	}
}
</style>
