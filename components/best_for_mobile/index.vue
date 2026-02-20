<template>
	<div class="mobile_version">
		<div class="item">
			<MobileVersionItem title="Works smoothly on any device." src="/img/iphone.svg" />
		</div>
		<div class="item">
			<MobileVersionItem title="Easy to play with one hand." src="/img/slot-machine.svg" />
		</div>
		<div class="item">
			<MobileVersionItem title="All games are optimised for mobile screens." src="/img/gambler.svg" />
		</div>
		<div class="item">
			<MobileVersionItem title="Secure payments and data protection." src="/img/shield.svg" />
		</div>
		<div class="item">
			<MobileVersionItem title="Fast payouts and responsive support." src="/img/gold_bolt.svg" />
		</div>
	</div>
</template>
<script>
import components from '~/mixins/components'
import MobileVersionItem from '~/components/best_for_mobile/item'
export default {
	name: 'best_for_mobile',
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
