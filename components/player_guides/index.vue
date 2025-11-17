<template>
	<div class="root">
		<div class="left main_gap">
			<Content :value="text" />
			<div class="bad_casino_item_wrapper">
				<div class="bad_casino_item">
					<img src="/img/bad_casino_1.svg" />
					<div class="bad_casino_item_title">Unpaid winnings</div>
					<div class="bad_casino_item_text">
						We recorded violations and do not recommend playing. Share confirmed cases and we’ll investigate.
					</div>
				</div>
				<div class="bad_casino_item">
					<img src="/img/bad_casino_2.svg" />
					<div class="bad_casino_item_title">Fake license</div>
					<div class="bad_casino_item_text">
						We recorded violations and do not recommend playing. Share confirmed cases and we’ll investigate.
					</div>
				</div>
				<div class="bad_casino_item">
					<img src="/img/bad_casino_3.svg" />
					<div class="bad_casino_item_title">Hidden T&Cs</div>
					<div class="bad_casino_item_text">
						We recorded violations and do not recommend playing. Share confirmed cases and we’ll investigate.
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<img src="/img/bad_casino.png" alt="Bad casino" />
		</div>
	</div>
</template>
<script>
import Content from '~/components/content/text_2.vue'
export default {
	name: 'player_guides',
	components: { Content },
	props: {
		text: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.root {
	display: flex;
	gap: 40px;
}
.left {
	width: calc(70% - 20px);
}
.right {
	width: calc(30% - 20px);
}
.bad_casino_item_wrapper {
	display: flex;
	gap: 24px;
}
.bad_casino_item {
	border: 4px solid #d21037;
	width: calc(33.3% - 8px);
	padding: 20px;
	background: #2e0d27;
	border-radius: 16px;
}
.bad_casino_item_title {
	color: var(--cairo);
	font-size: 14px;
	margin-top: 20px;
}
.bad_casino_item_text {
	color: var(--cordoba);
	font-size: 10px;
	margin-top: 10px;
}
@media (min-width: 578px) and (max-width: 1200px) {
	.root {
		flex-wrap: wrap;
		gap: 20px;
	}
	.left,
	.right {
		width: 100%;
	}
	.right {
		text-align: center;
	}
}
@media (max-width: 577px) {
	.root {
		flex-wrap: wrap;
		gap: 20px;
	}
	.left,
	.right {
		width: 100%;
	}
	.bad_casino_item_wrapper {
		flex-wrap: wrap;
	}
	.bad_casino_item {
		width: 100%;
	}
}
</style>
