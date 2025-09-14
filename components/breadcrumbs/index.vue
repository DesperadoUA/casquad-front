<template>
	<div class="breadcrumbs">
		<ul itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList" class="breadcrumb-list">
			<li
				itemprop="itemListElement"
				itemscope="itemscope"
				itemtype="https://schema.org/ListItem"
				class="breadcrumb-item"
				v-for="(item, index) in value"
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
					><span itemprop="name">{{ item.title }} </span>
				</NuxtLink>
				<span v-if="value.length !== index + 1">/</span>
				<meta itemprop="position" :content="++index" />
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
			default: []
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
