<template>
	<div class="root">
		<div class="card_top">
			<div class="card_top_left">
				<div class="img_wrapper">
					<NuxtLink :to="permalink" :title="`Goes to ${title}`">
						<AImg :attributes="{ ...imgSettings, alt: `icon` }" class="border_radius_50" :src="img" />
					</NuxtLink>
				</div>
				<div class="user_meta">
					<div class="user_name text_size_x-large text_weight_bold">
						<NuxtLink class="text_color_cairo text_decoration_none" :to="permalink" :title="`Goes to ${title}`">{{
							title
						}}</NuxtLink>
						<AuthorBadge :variant="role" :text="roleText" />
					</div>
					<div class="user_position text_size_small text_color_cordoba" v-if="device === 'DC' || device === 'TABLET'">
						{{ position }}
					</div>
					<div class="text_color_cairo text_size_small" v-if="device === 'DC'">{{ short_desc }}</div>
				</div>
			</div>
			<div class="card_top_right">
				<NuxtLink to="/news" class="counter_posts text_color_cairo text_decoration_none">
					<AImg :attributes="{ ...imgPostsSettings, alt: `posts` }" src="/img/posts.webp" />
					Posts ({{ totalPosts }})
				</NuxtLink>
			</div>
		</div>
		<div class="card_center" v-if="device !== 'DC'">
			<div class="user_position text_size_small text_color_cordoba" v-if="device === 'MOB'">
				{{ position }}
			</div>
			<div class="text_color_cairo text_size_small">{{ short_desc }}</div>
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
</template>
<script>
import components from '~/mixins/components'
import AuthorBadge from '~/components/author_badge'
export default {
	name: 'author_card_summary',
	mixins: [components],
	components: { AuthorBadge },
	data() {
		return {
			imgSettings: {
				width: '100px',
				height: '100px'
			},
			imgPostsSettings: {
				width: '16px',
				height: '16px'
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
	},
	props: {
		social: {
			type: Array,
			default: []
		},
		short_desc: {
			type: String,
			default: ''
		},
		permalink: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		create_at: {
			type: String,
			default: ''
		},
		position: {
			type: String,
			default: ''
		},
		img: {
			type: String,
			default: ''
		},
		totalPosts: {
			type: Number,
			default: 0
		},
		role: {
			type: String,
			default: ''
		},
		roleText: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.root {
	background: var(--cancun);
	padding: 20px;
	border-radius: var(--m);
}
.card_top {
	display: flex;
	gap: 20px;
}
.img_wrapper {
	min-width: 100px;
}
.card_top_left {
	width: calc(80% - 10px);
}
.card_top_right {
	width: calc(20% - 10px);
}
.card_top_left {
	display: flex;
	gap: 20px;
}
.user_meta {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.card_top_right {
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
}
.counter_posts {
	display: flex;
	padding: 20px;
	align-items: center;
	background: var(--cardiff);
	gap: 10px;
	border-radius: var(--s);
}
.card_center {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}
.experience_list {
	list-style: none;
	padding-left: 20px;
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.experience_list li {
	position: relative;
}
.experience_list li:before {
	content: '';
	width: 24px;
	height: 24px;
	background: url(/img/success.svg) 50% no-repeat;
	position: absolute;
	top: -3px;
	left: -30px;
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
	margin-top: 15px;
}
.social {
	display: flex;
	gap: 16px;
}
.social img {
	display: block;
}
.user_name {
	display: flex;
	gap: 10px;
	align-items: center;
}
@media (max-width: 576px) {
	.root {
		gap: 10px;
		display: flex;
		flex-direction: column;
	}
	.card_top {
		flex-wrap: wrap;
		gap: 10px;
	}
	.card_top_left {
		width: 100%;
	}
	.card_top_right {
		width: 100%;
		justify-content: center;
	}
	.card_bottom {
		margin-top: 0px;
	}
	.user_name {
		flex-wrap: wrap;
	}
}
@media (min-width: 577px) and (max-width: 1200px) {
	.card_top {
		flex-wrap: wrap;
		gap: 10px;
	}
	.card_top_left {
		width: 100%;
		flex-wrap: wrap;
	}
	.card_top_right {
		width: 100%;
		justify-content: center;
	}
}
</style>
