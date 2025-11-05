<template>
	<div class="mobile_version">
		<div class="item">
			<MobileVersionItem :title="t('IOS_ANDROID')" src="/img/iphone.svg" :isCheck="mobile_version_ios" />
		</div>
		<div class="item">
			<MobileVersionItem :title="t('ONE_HAND_USE')" src="/img/slot-machine.svg" :isCheck="mobile_one_hand_use" />
		</div>
		<div class="item">
			<MobileVersionItem :title="t('AUTOSPINS')" src="/img/gambler.svg" :isCheck="mobile_autospins" />
		</div>
		<div class="item">
			<MobileVersionItem :title="t('TLS')" src="/img/shield.svg" :isCheck="mobile_tls" />
		</div>
	</div>
</template>
<script>
import components from '~/mixins/components'
import MobileVersionItem from '~/components/mobile_version/item'
export default {
	name: 'mobile_version',
	props: {
		mobile_version_ios: {
			type: Boolean,
			default: 0
		},
		mobile_one_hand_use: {
			type: Boolean,
			default: 0
		},
		mobile_autospins: {
			type: Boolean,
			default: 0
		},
		mobile_tls: {
			type: Boolean,
			default: 0
		}
	},
	mixins: [components],
	components: { MobileVersionItem }
}
</script>
<style scoped>
.mobile_version {
	display: flex;
	gap: 20px;
}
.item {
	width: calc(25% - 15px);
}
@media (min-width: 568px) and (max-width: 1200px) {
	.mobile_version {
		flex-wrap: wrap;
	}
	.item {
		width: calc(50% - 10px);
	}
}
@media (max-width: 567px) {
	.mobile_version {
		flex-wrap: wrap;
	}
	.item {
		width: 100%;
	}
}
</style>
