<template>
	<div class="header_logo">
		<ALink href="/" title="Goes to Casquads main page">
			<AImg :attributes="{ ...imgSettings, alt: 'Casquads Logo' }" src="/img/logo-2.svg" />
		</ALink>
	</div>
</template>
<script>
import components from '~/mixins/components'
export default {
	name: 'logo',
	mixins: [components],
	data() {
		return {
			options: null,
			imgSettings: {
				width: '160',
				height: '36'
			}
		}
	}
}
</script>

<style lang="scss"></style>
