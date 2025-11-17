<template>
	<div class="game_categories">
		<div class="game_category_item">
			<div class="img_wrapper">
				<img src="/img/slot_category.webp" class="thumbnail" />
			</div>
			<div class="game_category_item_content">
				<NuxtLink to="#" class="game_category_item_title">
					<img src="/img/gambler_icon.svg" width="40" height="40" alt="gambler icon" />
					Slots
				</NuxtLink>
				<div class="game_category_item_description">
					Classic and modern reels with exciting themes. Spin anytime, win big fun.
				</div>
				<div class="game_category_item_action">
					<button class="game_category_item_btn">Play for free</button>
				</div>
			</div>
		</div>
		<div class="game_category_item">
			<div class="img_wrapper">
				<img src="/img/app_casino_category.webp" class="thumbnail" />
			</div>
			<div class="game_category_item_content">
				<NuxtLink to="#" class="game_category_item_title">
					<img src="/img/smartphone.svg" width="40" height="40" alt="smartphone icon" />
					Best Casino Apps
				</NuxtLink>
				<div class="game_category_item_description">Top-rated mobile casinos for smooth gameplay anywhere you go.</div>
				<div class="game_category_item_action">
					<button class="game_category_item_btn">Play for free</button>
				</div>
			</div>
		</div>
		<div class="game_category_item">
			<div class="img_wrapper">
				<img src="/img/crypto_casino.webp" class="thumbnail" />
			</div>
			<div class="game_category_item_content">
				<NuxtLink to="#" class="game_category_item_title">
					<img src="/img/diamond.svg" width="40" height="40" alt="diamond icon" />
					Crypto casinos
				</NuxtLink>
				<div class="game_category_item_description">
					Start small, play smart. The best low deposit casinos with real payouts.
				</div>
				<div class="game_category_item_action">
					<button class="game_category_item_btn">Play for free</button>
				</div>
			</div>
		</div>
		<div class="game_category_item">
			<div class="img_wrapper">
				<img src="/img/min_dep_category.webp" class="thumbnail" />
			</div>
			<div class="game_category_item_content">
				<NuxtLink to="#" class="game_category_item_title">
					<img src="/img/mobile-banking.svg" width="40" height="40" alt="mobile banking icon" />
					MinDep Casinos
				</NuxtLink>
				<div class="game_category_item_description">
					Jacks or Better, Deuces Wild — strategy turns good hands into great returns.
				</div>
				<div class="game_category_item_action">
					<button class="game_category_item_btn">Play for free</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'game_categories',
	props: {
		posts: {
			type: Array,
			default: () => []
		}
	}
}
</script>
<style scoped>
.game_categories {
	display: flex;
	gap: 20px;
}
.game_category_item {
	box-sizing: border-box;
	width: calc(25% - 15px);
	border-radius: var(--m);
	overflow: hidden;
}
.img_wrapper {
	width: 100%;
	aspect-ratio: 290/303;
}
.thumbnail {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.game_category_item_content {
	padding: 20px;
	background: var(--cancun);
}
.game_category_item_title {
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 16px;
	color: var(--cairo);
	text-decoration: none;
}
.game_category_item_description {
	font-size: 12px;
	color: var(--cairo);
	margin-top: 15px;
}
.game_category_item_btn {
	background: var(--cleveland);
	cursor: pointer;
	color: var(--cairo);
	font-size: 16px;
	border-radius: 8px;
	border: none;
	height: 47px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-transform: uppercase;
}
.game_category_item_action {
	margin-top: 25px;
}
@media (max-width: 1000px) {
	.game_categories {
		flex-wrap: wrap;
	}
}
@media (min-width: 568px) and (max-width: 1200px) {
	.game_category_item {
		width: calc(50% - 10px);
	}
}
@media (max-width: 567px) {
	.game_category_item {
		width: 100%;
	}
}
</style>
