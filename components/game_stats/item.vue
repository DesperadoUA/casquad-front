<template>
	<div class="game_stats_card">
		<div class="card__icon">
			<AImg :attributes="{ ...imgSettings, alt: `${title} icon` }" :src="src" />
		</div>
		<div class="card__content">
			<div class="text_size_medium text_weight_bold title_card">{{ title }}</div>
			<div class="text_size_small text_color_cordoba">
				<div v-if="isCheck !== undefined">
					<div v-if="isCheck" class="check">
						<img src="/img/accept.svg" alt="accept" width="15" height="15" />
						{{ t('YES') }}
					</div>
					<div v-else class="check">
						<img src="/img/cons_cros.svg" alt="decline" width="15" height="15" />
						{{ t('NO') }}
					</div>
				</div>
				<div v-else>
					{{ subTitle }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import components from '~/mixins/components'

export default {
	name: 'experience_item',
	mixins: [components],
	data() {
		return {
			imgSettings: {
				width: '32',
				height: '32'
			}
		}
	},
	props: {
		src: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		subTitle: {
			type: String,
			default: ''
		},
		isCheck: {
			type: Boolean,
			default: undefined
		}
	}
}
</script>
<style scoped>
.game_stats_card {
	background: #ffffff1a;
	border-radius: var(--m);
	padding: 27px 20px;
	display: flex;
	gap: 20px;
	align-items: center;
}
.title_card {
	color: var(--cairo);
}
.card__content {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.check {
	display: flex;
	align-items: center;
	gap: 5px;
}
</style>
