<template>
	<span class="badge text_size_medium text_weight_regular" :class="variant">
		<AImg :attributes="{ ...imgSettings, alt: 'writer icon' }" :src="variants[variant]" /> {{ text }}
	</span>
</template>
<script>
import components from '~/mixins/components'

export default {
	name: 'author_badge',
	mixins: [components],
	data() {
		return {
			variants: {
				verified_user: '/img/verified_user.svg',
				active_user: '/img/active_user.svg',
				editor_in_chief: '/img/editor_in_chief.svg',
				editor_writer: '/img/editor_writer.svg'
			},
			imgSettings: {
				width: '16px'
			}
		}
	},
	props: {
		variant: {
			type: String,
			default: () => ''
		},
		text: {
			type: String,
			default: () => ''
		}
	}
}
</script>
<style scoped>
.badge {
	display: inline-flex;
	gap: 10px;
	align-items: center;
	padding: 4px 10px;
	border-radius: 9999px;
	white-space: nowrap;
}
.badge.verified_user {
	border: 1px solid var(--cali);
	background: var(--curitiba);
	color: var(--cairo);
}
.badge.active_user {
	border: 1px solid var(--cardiff);
	background: var(--cleveland);
	color: var(--cairo);
}
.badge.editor_in_chief {
	border: 1px solid var(--cardiff);
	background: var(--chicago);
	color: var(--cairo);
}
.badge.editor_writer {
	border: 1px solid var(--cardiff);
	background: var(--cuzco);
	color: var(--colombo);
}
</style>
