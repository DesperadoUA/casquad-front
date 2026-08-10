<template>
	<nav class="toc" v-if="visibleItems.length" aria-label="Table of contents">
		<div class="toc__title">{{ t('TABLE_OF_CONTENTS') }}</div>
		<ol class="toc__list">
			<li
				v-for="item in visibleItems"
				:key="item.id"
				class="toc__item"
				:class="'toc__item--level-' + item.level"
			>
				<a class="toc__link" :href="'#' + item.id" @click.prevent="goTo(item.id)">{{ item.text }}</a>
			</li>
		</ol>
		<button
			v-if="hasMore"
			type="button"
			class="toc__toggle"
			@click="expanded = !expanded"
		>
			{{ expanded ? t('HIDE') : t('SHOW_MORE') }}
		</button>
	</nav>
</template>

<script>
import translateMixin from '~/mixins/translate'

export default {
	name: 'Toc',
	mixins: [translateMixin],
	props: {
		items: {
			type: Array,
			default: () => []
		},
		enabled: {
			type: [Number, Boolean],
			default: 0
		},
		limit: {
			type: Number,
			default: 5
		}
	},
	data() {
		return {
			expanded: false
		}
	},
	computed: {
		isEnabled() {
			return this.enabled === 1 || this.enabled === true || this.enabled === '1'
		},
		safeItems() {
			if (!this.isEnabled || !Array.isArray(this.items)) return []
			return this.items.filter((item) => item && item.id && item.text)
		},
		hasMore() {
			return this.safeItems.length > this.limit
		},
		visibleItems() {
			if (this.expanded || !this.hasMore) return this.safeItems
			return this.safeItems.slice(0, this.limit)
		}
	},
	methods: {
		goTo(id) {
			const hash = `#${id}`
			if (this.$route.hash !== hash) {
				this.$router.replace({ hash })
			} else {
				const el = typeof document !== 'undefined' ? document.getElementById(id) : null
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
		}
	}
}
</script>

<style scoped>
/* Подложка как у gradient_wrapper над блоком */
.toc {
	margin: 0 0 24px;
	padding: 20px;
	border-radius: var(--m);
	background: var(--coruna);
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.toc__title {
	margin: 0;
	font-weight: 700;
	font-size: 18px;
	line-height: 1.3;
	color: #fff;
}
.toc__list {
	margin: 0;
	padding: 0;
	list-style: none;
}
.toc__item {
	margin: 0 0 8px;
}
.toc__item--level-3 {
	padding-left: 12px;
}
.toc__item--level-4 {
	padding-left: 24px;
}
.toc__item--level-5 {
	padding-left: 36px;
}
.toc__item--level-6 {
	padding-left: 48px;
}
.toc__link {
	color: #fff;
	text-decoration: none;
	font-size: 15px;
	line-height: 1.4;
}
.toc__link:hover {
	text-decoration: underline;
}
.toc__toggle {
	margin-top: 8px;
	padding: 0;
	border: 0;
	background: transparent;
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	text-decoration: underline;
}
</style>
