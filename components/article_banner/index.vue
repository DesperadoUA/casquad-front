<template>
	<section class="root" :style="{ backgroundImage: `url(${src})` }">
		<h1>{{ h1 }}</h1>
		<div class="description">{{ short_desc }}</div>
		<div class="meta">
			<div class="meta_item author" v-if="author_title">
				<AImg :attributes="{ width: '20', height: '20' }" alt="icon user" src="/img/icon_user.webp" />
				<NuxtLink :to="author_permalink" class="text_size_large text_color_cairo text_decoration_none">{{
					author_title
				}}</NuxtLink>
			</div>
			<div class="separator"></div>
			<div class="meta_item">
				<AImg :attributes="{ width: '20', height: '20' }" alt="calendar" src="/img/calendar.webp" />
				<time class="date text_size_large" :datetime="date">{{ date }}</time>
			</div>
		</div>
	</section>
</template>
<script>
import AImg from '../ui/atoms/img/index.vue'

export default {
	name: 'article_banner',
	components: { AImg },
	props: {
		src: {
			type: String,
			default: ''
		},
		h1: {
			type: String,
			default: ''
		},
		short_desc: {
			type: String,
			default: ''
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
	}
}
</script>
<style scoped>
.root {
	aspect-ratio: 21/7;
	border: 1px solid blue;
	background-size: cover;
	display: flex;
	flex-direction: column;
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
</style>
