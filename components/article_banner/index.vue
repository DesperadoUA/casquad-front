<template>
	<section class="root" :style="{ backgroundImage: `url(${src})` }">
		<h1 class="heading">{{ h1 }}</h1>
		<div class="description">{{ short_desc }}</div>
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
	</section>
</template>
<script>
import components from '~/mixins/components'

export default {
	name: 'article_banner',
	mixins: [components],
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
	border-radius: var(--m);
	background-size: cover;
	display: flex;
	flex-direction: column;
	padding: 25px 20px;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
	max-width: 100%;
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
	justify-content: center;
}
.separator {
	width: 1px;
	background: #888b8e;
}
.heading {
	text-align: center;
	width: 1000px;
	max-width: 100%;
	text-align: center;
	color: var(--cairo);
	font-size: 50px;
	line-height: 100%;
}
.description {
	width: 1000px;
	max-width: 100%;
	text-align: center;
	color: var(--cairo);
	font-size: 12px;
}
@media (max-width: 1024px) {
	.heading {
		font-size: 36px;
	}
	.root {
		aspect-ratio: auto;
	}
}
@media (max-width: 568px) {
	.heading {
		font-size: 36px;
	}
}
</style>
