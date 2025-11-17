<template>
	<div class="verified_casinos_list sub_gap">
		<div class="row">
			<div class="casino_list_item" v-for="({ src, title, subTitle }, index) in posts" :key="index">
				<VerifiedCasinoListItem :src="src" :title="title" :subTitle="subTitle" />
			</div>
		</div>
		<div class="action" v-if="link">
			<NuxtLink :to="link" class="action_link"
				>Verified Casinos List <img src="/img/arrowGreen.svg" height="11"
			/></NuxtLink>
		</div>
	</div>
</template>
<script>
import VerifiedCasinoListItem from '~/components/verified_casinos_list/item'
export default {
	name: 'verified_casinos_list',
	components: { VerifiedCasinoListItem },
	props: {
		posts: {
			type: Array,
			default: ''
		},
		link: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.verified_casinos_list {
	display: flex;
	gap: 24px;
	flex-wrap: wrap;
}
.row {
	display: flex;
	gap: 24px;
	flex-wrap: wrap;
}
.casino_list_item {
	width: calc(33.3% - 16px);
}
.action {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.action_link {
	padding: 12px 30px;
	border-radius: 14px;
	border: 1px solid #ffffff1a;
	display: flex;
	align-items: center;
	gap: 10px;
	color: var(--cairo);
	font-weight: bold;
	text-decoration: none;
	background: #1a1a2e;
}
@media (max-width: 568px) {
	.casino_list_item {
		width: 100%;
	}
}
</style>
