<template>
	<main class="main_wrapper">
		<Gradient modifier="large" />
		<div class="container z-index-3">
			<div class="h1_wrapper">
				<gradientWrapper>
					<Breadcrumbs :value="breadcrumbs" />
					<AText tag="h1" :attributes="titleSettings">{{ h1 }}</AText>
					<date :value="update_at ? update_at.slice(0, 10) : ''" />
				</gradientWrapper>
			</div>
		</div>
		<div class="container z-index-3 casino_cards_block" v-if="casino.length">
			<CasinoLoop :value="casino" />
		</div>
		<div class="container content_container z-index-3" v-if="content">
			<Content :value="content" />
		</div>
		<div class="container z-index-3" v-if="pros.length || cons.length">
			<div class="sub_gap">
				<h2 class="text_color_cairo m-0" v-if="pros_cons_title">{{ pros_cons_title }}</h2>
				<ProsCons :prosList="pros" :consList="cons" :prosTitle="pros_title" :consTitle="cons_title" />
			</div>
		</div>
		<div class="container" v-if="author_summary && author">
			<AuthorSummary
				:social="author.social"
				:short_desc="author_summary"
				:title="author.title"
				:create_at="author.create_at.slice(0, 10)"
				:position="author.position"
				:img="author.thumbnail"
				:totalPosts="author.total_posts || 0"
				:role="badgeList[author.role]"
				:roleText="author.role"
				:permalink="author.permalink"
			/>
		</div>
		<div class="container" v-if="faq.length">
			<div class="main_gap">
				<h2 class="text_color_cairo">{{ faq_title }}</h2>
				<Faq :value="faq" />
			</div>
		</div>
		<Cookies />
	</main>
</template>

<script>
import Gradient from '~/components/gradient'
import Breadcrumbs from '~/components/breadcrumbs'
import gradientWrapper from '~/components/gradient_wrapper'
import date from '~/components/date'
import Faq from '~/components/faq'
import AuthorSummary from '~/components/author_summary'
import CasinoLoop from '~/components/casino_loop'
import ProsCons from '~/components/pros_cons'
import config from '~/config'
import components from '~/mixins/components'

export default {
	name: 'default_page',
	mixins: [components],
	components: {
		Gradient,
		Breadcrumbs,
		gradientWrapper,
		date,
		Faq,
		AuthorSummary,
		CasinoLoop,
		ProsCons
	},
	props: {
		breadcrumbs: {
			type: Array,
			default: []
		},
		h1: {
			type: String,
			default: ''
		},
		update_at: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		author_summary: {
			type: String,
			default: ''
		},
		author: {
			type: Object,
			default: () => {}
		},
		faq_title: {
			type: String,
			default: ''
		},
		faq: {
			type: Array,
			default: []
		},
		casino: {
			type: Array,
			default: () => []
		},
		pros: {
			type: Array,
			default: () => []
		},
		cons: {
			type: Array,
			default: () => []
		},
		pros_cons_title: {
			type: String,
			default: ''
		},
		pros_title: {
			type: String,
			default: ''
		},
		cons_title: {
			type: String,
			default: ''
		}
	},
	data: () => {
		return {
			titleSettings: {
				color: 'cairo',
				size: 'x-large',
				weight: 'bold',
				transform: 'uppercase',
				class: 'title'
			},
			badgeList: config.AUTHOR_BADGE_LIST || {}
		}
	}
}
</script>

<style scoped>
.casino_cards_block {
	margin-top: 24px;
}
</style>
