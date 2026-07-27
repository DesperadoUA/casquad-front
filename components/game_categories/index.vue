<template>
	<div class="game_categories">
		<div class="game_category_item">
			<div class="img_wrapper">
				<img src="/img/slot_category.webp" class="thumbnail" />
			</div>
			<div class="game_category_item_content">
				<NuxtLink to="/slots" class="game_category_item_title">
					<img src="/img/gambler_icon.svg" width="40" height="40" alt="gambler icon" />
					Slots
				</NuxtLink>
				<div class="game_category_item_description">
					Slots that actually hit. Classics and new releases with honest RTP and real x-potential - all part of our
					CASQUAD online slots testing.
				</div>
				<div class="game_category_item_action">
					<NuxtLink to="/slots" class="game_category_item_btn">Read more</NuxtLink>
				</div>
			</div>
		</div>
		<div class="game_category_item">
			<div class="img_wrapper">
				<img src="/img/app_casino_category.webp" class="thumbnail" />
			</div>
			<div class="game_category_item_content">
				<NuxtLink to="/casino-apps" class="game_category_item_title">
					<img src="/img/smartphone.svg" width="40" height="40" alt="smartphone icon" />
					Best Casino Apps
				</NuxtLink>
				<div class="game_category_item_description">
					Top mobile casinos without lag or payout bugs - curated through our CASQUAD casino apps scoring. We tested
					logins, bonuses and withdrawals - everything works just as smoothly as on desktop.
				</div>
				<div class="game_category_item_action">
					<NuxtLink to="/casino-apps" class="game_category_item_btn">Read more</NuxtLink>
				</div>
			</div>
		</div>
		<div class="game_category_item">
			<div class="img_wrapper">
				<img src="/img/crypto_casino.webp" class="thumbnail" />
			</div>
			<div class="game_category_item_content">
				<NuxtLink to="/crypto-casinos" class="game_category_item_title">
					<img src="/img/diamond.svg" width="40" height="40" alt="diamond icon" />
					Crypto casinos
				</NuxtLink>
				<div class="game_category_item_description">
					Crypto is the king of speed: instant deposits, fast cashouts and juicy bonuses. All tested under CASQUAD
					crypto casinos standards.
				</div>
				<div class="game_category_item_action">
					<NuxtLink to="/crypto-casinos" class="game_category_item_btn">Read more</NuxtLink>
				</div>
			</div>
		</div>
		<div class="game_category_item">
			<div class="img_wrapper">
				<img src="/img/min_dep_category.webp" class="thumbnail" />
			</div>
			<div class="game_category_item_content">
				<NuxtLink to="/minimum-deposit-casinos" class="game_category_item_title">
					<img src="/img/mobile-banking.svg" width="40" height="40" alt="mobile banking icon" />
					MinDep Casinos
				</NuxtLink>
				<div class="game_category_item_description">
					Low-deposit casinos that still offer fair winning chances - selected within our CASQUAD minimum deposit
					casinos list.
				</div>
				<div class="game_category_item_action">
					<NuxtLink to="/minimum-deposit-casinos" class="game_category_item_btn">Read more</NuxtLink>
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
	display: flex;
	flex-direction: column;
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
	height: 100%;
	display: flex;
	flex-direction: column;
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
	margin-bottom: 25px;
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
	text-decoration: none;
}
.game_category_item_action {
	margin-top: auto;
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
