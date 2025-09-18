<template>
	<article class="item">
		<div class="wrapper">
			<div class="top">
				<div class="img_wrapper">
					<ALink :href="link" :title="`Goes to ${title} page`">
						<AImg :attributes="{ ...imgSettings, alt: `${title} logo` }" :src="src" />
					</ALink>
				</div>
			</div>
			<div class="center">
				<AText tag="div" :attributes="dateTextSettings">{{ date }}</AText>
				<ALink :href="link" :attributes="titleLinkSettings" :title="`Goes to ${title} page`">
					{{ title }}
				</ALink>
				<AText tag="div" :attributes="descTextSettings">{{ desc }}</AText>
			</div>
		</div>
	</article>
</template>
<script>
import LinkWithArrow from '~/components/ui/atoms/links/link_with_arrow'
import components from '~/mixins/components'
export default {
	name: 'news_main_card',
	components: { LinkWithArrow },
	mixins: [components],
	data: () => {
		return {
			imgSettings: {
				width: '276px',
				height: '160px',
				class: 'object_fit_cover thumbnail'
			},
			descTextSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'regular',
				class: 'desc'
			},
			titleLinkSettings: {
				size: 'medium',
				color: 'calgary',
				weight: 'semi-bold',
				decoration: 'none',
				class: 'title'
			},
			dateTextSettings: {
				size: 'small',
				color: 'cairo',
				weight: 'regular',
				class: 'date'
			}
		}
	},
	props: {
		link: {
			type: String,
			default() {
				return '/game'
			}
		},
		title: {
			type: String,
			default() {
				return ''
			}
		},
		desc: {
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
		},
		src: {
			type: String,
			default() {
				return '/img/noImages.png'
			}
		}
	}
}
</script>
<style scoped>
.item {
	width: 280px;
	height: 365px;
	background: rgba(255, 255, 255, 0.1);
	padding: var(--xs);
	border-radius: var(--m);
}
.img_wrapper {
	width: 100%;
	height: 160px;
}
.thumbnail {
	border-radius: 14px;
}
.bottom {
	display: flex;
}
.center {
	padding: var(--m) var(--s);
	height: 190px;
}
.desc {
	font-size: 10px;
	margin-top: var(--m);
	-webkit-line-clamp: 3;
	display: inline;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
}
::v-deep .read_more {
	-webkit-line-clamp: 2;
	display: inline;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
}
.date {
	font-size: 10px;
	margin-top: var(--xs);
}
.bottom {
	padding: 0 var(--s);
}
.title {
	-webkit-line-clamp: 3;
	display: inline;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
}
@media (min-width: 320px) and (max-width: 576px) {
	.item {
		width: 100%;
	}
}
@media (max-width: 767px) {
	.item {
		flex-shrink: 0;
		height: auto;
	}
	.center {
		height: auto;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.item {
		flex-shrink: 0;
	}
}
</style>
