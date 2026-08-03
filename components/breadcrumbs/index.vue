<template>
	<div class="breadcrumbs">
		<ul itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList" class="breadcrumb-list">
			<li
				itemprop="itemListElement"
				itemscope="itemscope"
				itemtype="https://schema.org/ListItem"
				class="breadcrumb-item"
				v-for="(item, index) in items"
				:key="index"
			>
				<span
					itemtype="https://schema.org/Thing"
					v-if="item.permalink === ''"
					itemscope="itemscope"
					itemprop="item"
					:itemid="fullUrl"
					:id="index === 0 ? 'homePage' : 'single'"
					class="nuxt-link-active"
				>
					<span itemprop="name">{{ item.title }}</span>
				</span>
				<NuxtLink
					v-else
					:to="item.permalink"
					itemtype="https://schema.org/Thing"
					itemscope="itemscope"
					itemprop="item"
					:itemid="item.permalink"
					:id="index === 0 ? 'homePage' : 'single'"
					class="nuxt-link-active"
					:title="`Goes to ${item.title}`"
					><span itemprop="name">{{ item.title }}</span>
				</NuxtLink>
				<span v-if="items.length !== index + 1">/</span>
				<meta itemprop="position" :content="index + 1" />
			</li>
		</ul>
	</div>
</template>

<script>
import config from '~/config'

export default {
	name: 'app_breadcrumbs',
	props: {
		value: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			domain: config.BASE_URL[config.LANG]
		}
	},
	computed: {
		fullUrl() {
			return process.client ? window.location.origin + this.$route.fullPath : `${this.domain}${this.$route.fullPath}`
		},
		// Гарантируем непорожній name у кожному ListItem (GSC BreadcrumbList)
		items() {
			return (this.value || []).map((item) => ({
				...item,
				title: this.resolveTitle(item)
			}))
		}
	},
	methods: {
		resolveTitle(item = {}) {
			const title = String(item.title || '').trim()
			if (title) return title

			const permalink = String(item.permalink || '').trim()
			if (!permalink || permalink === '/') return 'Home'

			const slug = permalink.replace(/^\/+|\/+$/g, '').split('/').pop() || ''
			if (!slug) return 'Page'

			const humanized = slug.replace(/[-_]+/g, ' ').trim()
			return humanized ? humanized.charAt(0).toUpperCase() + humanized.slice(1) : 'Page'
		}
	}
}
</script>

<style scoped>
.breadcrumb-list {
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
}

.breadcrumb-item {
	font-size: 18px;
	line-height: 1.2;
	font-weight: 500;
	margin-right: 8px;
	color: var(--cairo);
}
.breadcrumb-item a {
	color: var(--btn-primary);
	text-decoration: none;
	display: inline-block;
	margin-right: 5px;
}
</style>
