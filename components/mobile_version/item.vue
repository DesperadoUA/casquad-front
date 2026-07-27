<template>
	<div class="mobile_item_card">
		<div class="left">
			<AImg :attributes="{ ...imgSettings, alt: `${title} icon` }" :src="src" />
		</div>
		<div class="right">
			<div class="title text_size_small text_color_cairo">{{ title }}</div>
			<div v-if="isCheck" class="check">
				<img src="/img/accept.svg" alt="accept" width="15" height="15" />
				{{ t('YES') }}
			</div>
			<div v-else class="check text_size_small">
				<img src="/img/cons_cros.svg" alt="decline" width="15" height="15" />
				{{ t('NO') }}
			</div>
		</div>
	</div>
</template>
<script>
import components from '~/mixins/components'
export default {
	name: 'mobile_version',
	props: {
		src: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		isCheck: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			imgSettings: {
				width: '40',
				height: '40'
			}
		}
	},
	mixins: [components]
}
</script>
<style scoped>
.mobile_item_card {
	height: 100%;
	display: flex;
	height: 120px;
	border-radius: var(--m);
	overflow: hidden;
	width: 100%;
}
.left {
	width: 90px;
	min-width: 90px;
	background: var(--coruna);
	display: flex;
	align-items: center;
	justify-content: center;
}
.right {
	background: #ffffff1a;
	flex-grow: 1;
	padding: 27px 20px;
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.check {
	display: flex;
	align-items: center;
	color: var(--cordoba);
	gap: 2px;
}
</style>
