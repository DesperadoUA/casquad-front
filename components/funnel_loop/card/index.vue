<template>
	<article class="card" :id="hash">
		<div class="left">
			<div class="thumbnail_wrapper">
				<NuxtLink :to="link">
					<AImg :attributes="{ ...imgSettings, alt: `${title} logo` }" :src="src" />
				</NuxtLink>
			</div>
		</div>
		<div class="right">
			<div class="right_top">
				<div class="right_top_left">
					<NuxtLink
						:to="link"
						class="text_color_calgary font_weight_bold text_size_large text_decoration_none title_article"
						>{{ title }}</NuxtLink
					>
					<div class="description text_color_cairo">{{ short_desc }}</div>
				</div>
				<div class="right_top_right">
					<NuxtLink :to="link" class="btn" :title="`Goes to ${title}`">{{ t('READ_MORE') }}</NuxtLink>
				</div>
			</div>
			<div class="right_bottom">
				<div class="meta_item author" v-if="author_title">
					<AImg :attributes="{ width: '20', height: '20' }" alt="icon user" src="/img/icon_user.webp" />
					<NuxtLink :to="author_permalink" class="text_size_large text_color_cairo text_decoration_none">{{
						author_title
					}}</NuxtLink>
				</div>
				<div class="meta_item">
					<AImg :attributes="{ width: '20', height: '20' }" alt="calendar" src="/img/calendar.webp" />
					<time class="date text_size_large text_color_cairo" :datetime="date">{{ date }}</time>
				</div>
			</div>
		</div>
	</article>
</template>
<script>
import ref from '~/mixins/ref'
import components from '~/mixins/components'
import geo from '~/mixins/geo'

export default {
	name: 'funnel_loop_item',
	mixins: [components, ref, geo],
	props: {
		link: {
			type: String,
			default: () => ''
		},
		src: {
			type: String,
			default: () => ''
		},
		title: {
			type: String,
			default: () => ''
		},
		refLinks: {
			type: Object,
			default: () => {}
		},
		hash: {
			type: String,
			default: () => ''
		},
		author_permalink: {
			type: String,
			default: () => ''
		},
		author_title: {
			type: String,
			default: () => ''
		},
		short_desc: {
			type: String,
			default: () => ''
		},
		date: {
			type: String,
			default: () => ''
		}
	},
	data() {
		return {
			imgSettings: {
				width: '410',
				height: '244',
				class: 'object_fit_cover border_radius_m'
			}
		}
	}
}
</script>
<style scoped>
.card {
	display: flex;
	background: #ffffff1a;
	padding: 4px;
	border-radius: var(--m);
}
.thumbnail_wrapper {
	aspect-ratio: 410/244;
	max-width: 410px;
}
.right {
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 28px 28px 8px;
}
.right_bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: auto;
}
.right_top {
	display: flex;
	gap: 20px;
}
.right_top_left {
	flex: 1;
}
.right_top_right {
	align-items: center;
	display: flex;
}
.btn {
	background: var(--calgary);
	color: var(--cucuta);
	border-radius: var(--s);
	font-weight: 600;
	text-transform: uppercase;
	text-decoration: none;
	min-width: 210px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.right_top_left {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.meta_item {
	display: flex;
	align-items: center;
	gap: 10px;
}
.description {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.title_article {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
@media (min-width: 768px) and (max-width: 1200px) {
	.right {
		flex-wrap: wrap;
		gap: 10px;
		padding: 15px;
	}
	.right_top,
	.right_top_left {
		width: 100%;
	}
	.right_top {
		gap: 10px;
	}
	.right_top_left {
		gap: 5px;
	}
	.right_top_right {
		width: 100%;
	}
	.right_top {
		flex-wrap: wrap;
		width: 100%;
	}
	.left {
		max-width: 300px;
	}
	.right_top_right {
		display: none;
	}
}
@media (max-width: 576px) {
	.card {
		flex-wrap: wrap;
	}
	.left,
	.right {
		width: 100%;
	}
	.right {
		padding: 15px;
		flex-wrap: wrap;
		flex-direction: column-reverse;
		gap: 15px;
	}
	.right_bottom {
		flex-wrap: wrap;
		gap: 5px;
	}
	.meta_item {
		width: 100%;
	}
	.right_top {
		flex-wrap: wrap;
	}
	.right_top_left,
	.right_top_right {
		width: 100%;
		gap: 10px;
	}
}
</style>
