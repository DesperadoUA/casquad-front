<template>
	<div class="root border_radius_m">
		<div class="left sub_gap">
			<h1 class="text_color_cairo title">{{ h1 }}</h1>
			<div class="actions">
				<div class="action_item">
					<AButton :attributes="btnDemoSettings" v-if="demo" @onClick="onClickDemoActivate">{{
						t('PLAY_FOR_FREE')
					}}</AButton>
				</div>
				<div class="action_item">
					<AButton :attributes="btnSettings" @onClick="refActivate(refLinks, geo)">{{
						t('PLAY_ON_REAL_MONEY')
					}}</AButton>
				</div>
			</div>
			<div class="description text_color_cairo" v-html="short_desc" />
			<div class="meta">
				<div class="meta_item author" v-if="author_title">
					<AImg :attributes="{ width: '20', height: '20' }" alt="icon user" src="/img/icon_user.webp" />
					<NuxtLink :to="author_permalink" class="text_size_large text_color_cairo text_decoration_none">{{
						author_title
					}}</NuxtLink>
				</div>
				<div class="separator" v-if="author_title"></div>
				<div class="meta_item">
					<AImg :attributes="{ width: '20', height: '20' }" alt="calendar" src="/img/calendar.webp" />
					<time class="date text_size_large" :datetime="date">{{ date }}</time>
				</div>
			</div>
		</div>
		<div class="right">
			<AImg :attributes="{ ...imgSettings, alt: `${title} game` }" :src="src" />
		</div>
	</div>
</template>
<script>
import ref from '~/mixins/ref'
import components from '~/mixins/components'
import geo from '~/mixins/geo'
export default {
	name: 'single-game-page',
	mixins: [components, ref, geo],
	data: () => {
		return {
			imgSettings: {
				width: '377px',
				height: '380px',
				class: 'thumbnail'
			},
			btnSettings: {
				bg: 'calgary',
				color: 'cucuta',
				borderRadius: 's',
				weight: 'regular',
				text_transform: 'uppercase'
			},
			btnDemoSettings: {
				bg: 'cleveland',
				color: 'cairo',
				borderRadius: 's',
				weight: 'regular',
				class: 'demo_btn',
				text_transform: 'uppercase'
			}
		}
	},
	props: {
		title: {
			type: String,
			default() {
				return ''
			}
		},
		h1: {
			type: String,
			default() {
				return ''
			}
		},
		src: {
			type: String,
			default() {
				return '/img/slotokingLogo.png'
			}
		},
		demo: {
			type: Boolean,
			default() {
				return false
			}
		},
		short_desc: {
			type: String,
			default() {
				return ''
			}
		},
		author_title: {
			type: String,
			default() {
				return ''
			}
		},
		author_permalink: {
			type: String,
			default() {
				return ''
			}
		},
		date: {
			type: String,
			default() {
				return ''
			}
		}
	},
	methods: {
		onClickDemoActivate() {
			this.$emit('onClickDemoActivate')
		}
	}
}
</script>
<style scoped>
.root {
	display: flex;
	gap: 60px;
	background: linear-gradient(to right, #1f1559, #120c33);
	padding: 20px;
}
.left {
	flex-grow: 1;
}
.right {
	min-width: 380px;
}
.title {
	font-size: 24px;
}
.description ::v-deep p {
	font-size: 14px;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.description ::v-deep p:last-child {
	margin-bottom: 0;
}
.description ::v-deep h2,
.description ::v-deep h3,
.description ::v-deep h4,
.description ::v-deep h5,
.description ::v-deep h6 {
	font-size: 20px;
}
.actions {
	display: flex;
	justify-content: space-around;
}
.action_item {
	width: 210px;
	height: 42px;
}
.date {
	color: var(--cairo);
}
.meta_item {
	display: flex;
	align-items: center;
	gap: 10px;
}
.meta {
	display: flex;
	gap: 10px;
	margin-top: auto;
}
.separator {
	width: 1px;
	background: #888b8e;
}
@media (max-width: 767px) {
	.root {
		flex-wrap: wrap;
		gap: 20px;
	}
	.left,
	.right {
		width: 100%;
		max-width: 100%;
		min-width: 100%;
	}
	.thumbnail {
		width: 100%;
		height: auto;
	}
	.actions {
		flex-wrap: wrap;
		gap: 20px;
	}
	.meta {
		flex-wrap: wrap;
	}
	.separator {
		display: none;
	}
	.meta_item {
		width: 100%;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.root {
		flex-wrap: wrap;
		gap: 20px;
	}
	.right {
		width: 100%;
		justify-content: center;
		max-width: 100%;
		display: flex;
	}
}
</style>
