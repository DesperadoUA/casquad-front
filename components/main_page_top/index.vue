<template>
	<div class="root">
		<div class="left main_gap">
			<div class="sub_gap">
				<h1 class="title">{{ h1 }}</h1>
				<div class="description">
					{{ description }}
				</div>
			</div>
			<div class="pluses">
				<Pluses src="/img/cup.svg" title="25 Years of iGaming Experience" />
				<Pluses src="/img/agreement.svg" title="100K+ Players  Trust Us" />
				<Pluses src="/img/schedule.svg" title="Updated: October 2025" />
				<Pluses src="/img/think.svg" title="Verified by Real Players" />
			</div>
		</div>
		<div class="right">
			<div class="section_item">
				<SiteSection src="/img/gambler_section.svg" link="#" title="Compare Casinos" />
			</div>
			<div class="section_item">
				<SiteSection src="/img/gift_sections.svg" link="#" title="View Bonuses" />
			</div>
			<div class="section_item">
				<SiteSection src="/img/bonus_section.svg" link="#" title="Play for Free" />
			</div>
			<div class="section_item">
				<SiteSection src="/img/vip_section.svg" link="#" title="Exclusive Materials" />
			</div>
		</div>
	</div>
</template>
<script>
import SiteSection from '~/components/main_page_top/site_sections'
import Pluses from '~/components/main_page_top/pluses'
export default {
	name: 'main_page_top',
	components: { SiteSection, Pluses },
	props: {
		h1: {
			type: String,
			default: ''
		},
		description: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.root {
	border-radius: var(--m);
	padding: 20px;
	background: linear-gradient(180deg, #1f1559 0%, #120c33 100%);
	display: flex;
	justify-content: space-between;
	gap: 100px;
}
.title {
	font-size: 24px;
	color: var(--cairo);
}
.description {
	color: var(--cairo);
	font-size: 14px;
}
.right {
	min-width: 420px;
	display: flex;
	gap: 15px;
	flex-wrap: wrap;
}
.section_item {
	aspect-ratio: 1 / 1;
	width: calc(50% - 8px);
}
.pluses {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}
@media (min-width: 768px) and (max-width: 1200px) {
	.root {
		flex-wrap: wrap;
		gap: 30px;
	}
	.left,
	.right {
		width: 100%;
	}
	.section_item {
		width: calc(25% - 12px);
	}
}
@media (max-width: 767px) {
	.root {
		flex-wrap: wrap;
		gap: 30px;
		padding: 10px;
	}
	.section_item {
		width: calc(50% - 8px);
	}
	.right {
		min-width: 100%;
	}
}
</style>
