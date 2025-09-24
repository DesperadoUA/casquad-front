<template>
	<div class="root">
		<div class="card_top">
			<div class="card_top_left">
				<div class="img_wrapper">
					<AImg :attributes="{ ...imgSettings, alt: `icon` }" class="border_radius_50" :src="img" />
				</div>
				<div class="user_meta">
					<div class="user_name text_size_large text_color_cairo text_weight_bold">
						{{ title }} <AuthorBadge :variant="role" :text="roleText" />
					</div>
					<div class="user_position text_size_small text_color_cordoba">
						{{ position }}
					</div>
				</div>
			</div>
			<div class="card_top_right">
				<a href="#posts" class="counter_posts text_color_cairo text_decoration_none">
					<AImg :attributes="{ ...imgPostsSettings, alt: `posts` }" src="/img/posts.webp" />
					Posts ({{ totalPosts }})
				</a>
			</div>
		</div>
		<div class="card_center">
			<div class="card_center_left">
				<ul class="experience_list text_color_cairo text_size_small">
					<li v-for="(item, index) in advantages" :key="index">{{ item }}</li>
				</ul>
			</div>
			<div class="card_center_right text_color_cairo text_size_small">
				{{ short_desc }}
			</div>
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
	name: 'author_card_top',
	mixins: [components],
	components: { AuthorBadge },
	props: {
		social: {
			type: Array,
			default: []
		},
		short_desc: {
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
		advantages: {
			type: Array,
			default: []
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
	},
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
.card_top_left {
	width: calc(70% - 10px);
}
.card_top_right {
	width: calc(30% - 10px);
}
.card_center_left {
	width: calc(40% - 10px);
}
.card_center_right {
	width: calc(60% - 10px);
	padding-left: 20px;
	border-left: 2px solid var(--cascais);
	display: flex;
	align-items: center;
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
	gap: 20px;
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
	.card_top,
	.card_center {
		flex-wrap: wrap;
		gap: 10px;
	}
	.card_center_left {
		width: 100%;
	}
	.card_center_right {
		width: 100%;
	}
	.card_top_left {
		width: 100%;
	}
	.card_top_right {
		width: 100%;
		justify-content: center;
	}
	.experience_list {
		margin-top: 0px;
		margin-bottom: 0px;
	}
	.card_bottom {
		margin-top: 0px;
	}
	.user_name {
		flex-wrap: wrap;
	}
}
</style>
