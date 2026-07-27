<template>
	<div class="author_loop_card">
		<div class="left">
			<div class="img_wrapper">
				<NuxtLink :to="permalink" :title="`Goes to ${title}`">
					<AImg :attributes="{ ...imgSettings, alt: `icon` }" class="border_radius_50" :src="img" />
				</NuxtLink>
			</div>
		</div>
		<div class="right">
			<div class="user_meta">
				<div class="user_name text_size_x-large text_weight_bold">
					<NuxtLink class="text_color_cairo text_decoration_none" :to="permalink" :title="`Goes to ${title}`">{{
						title
					}}</NuxtLink>
					<AuthorBadge :variant="role" :text="roleText" />
				</div>
				<div class="user_position text_size_small text_color_cordoba">
					{{ position }}
				</div>
				<div class="card_bottom">
					<div class="date text_color_cordoba text_size_small">{{ create_at }}</div>
					<div class="share_arrow border-radius-50">
						<AImg :attributes="{ ...imgShareSettings, alt: 'share' }" src="/img/share_arrow.webp" />
					</div>
					<div class="social">
						<a v-for="(item, index) in social" :href="item.value_1" :key="index">
							<AImg :attributes="{ ...imgSocialSettings, alt: item.value_2 }" :src="item.src" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import AuthorBadge from '~/components/author_badge'
import components from '~/mixins/components'
export default {
	name: 'author_card_item',
	mixins: [components],
	components: { AuthorBadge },
	props: {
		permalink: {
			type: String,
			default: ''
		},
		img: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		position: {
			type: String,
			default: ''
		},
		roleText: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: ''
		},
		social: {
			type: Array,
			default: []
		},
		create_at: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			imgSettings: {
				width: '64px',
				height: '64px',
				class: 'icon'
			},
			imgSocialSettings: {
				width: '24px',
				height: '24px'
			},
			imgShareSettings: {
				width: '18px',
				height: '18px',
				class: 'border-radius-50'
			}
		}
	}
}
</script>
<style scoped>
.author_loop_card {
	padding: 16px;
	border-radius: 16px;
	background: var(--cancun);
	display: flex;
	gap: 15px;
}
.right {
	flex-grow: 1;
}
.user_meta {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.user_name {
	display: flex;
	align-items: center;
	gap: 10px;
}
.user_position {
	color: var(--cordoba);
}
.share_arrow {
	background: var(--cayenne);
	overflow: hidden;
	border-radius: 9999px;
}
.share_arrow img {
	display: block;
}
.card_bottom {
	display: flex;
	align-items: center;
	gap: 10px;
}
.social {
	display: flex;
	gap: 16px;
}
.social img {
	display: block;
}
@media (max-width: 568px) {
	.author_loop_card {
		flex-wrap: wrap;
	}
	.user_name {
		display: flex;
		flex-wrap: wrap;
	}
	.left {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.icon {
		width: 100px;
		height: 100px;
	}
	.user_name {
		justify-content: center;
	}
	.user_position {
		text-align: center;
	}
	.card_bottom {
		justify-content: center;
	}
}
</style>
