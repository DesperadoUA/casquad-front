<template>
	<section class="logos">
		<div class="items-wrap">
			<!-- первая лента -->
			<div class="items marquee">
				<div class="item" v-for="(post, index) in posts" :key="index">
					<NuxtLink :to="post.permalink">
						<img :src="post.src" width="52" height="52" :alt="post.title" />
					</NuxtLink>
				</div>
			</div>

			<!-- дубликат для бесконечной ленты -->
			<div aria-hidden="true" class="items marquee">
				<div class="item" v-for="(post, index) in posts" :key="'clone-' + index">
					<NuxtLink :to="post.permalink">
						<img :src="post.src" width="52" height="52" :alt="post.title" />
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'logos',
	props: {
		posts: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
.items-wrap {
	position: relative;
	display: flex;
	overflow: hidden;
	user-select: none;
	gap: 24px;
	padding-top: 24px;
	padding-bottom: 24px;
}
.items {
	flex-shrink: 0;
	display: flex;
	gap: 20px;
	counter-reset: item;
	justify-content: space-around;
	min-width: 100%;
}
.item {
	flex: 0 0 auto;
	height: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px 0;
	transition: all 0.1s ease-in-out;
}
.marquee {
	animation: scroll 40s linear infinite;
}
.items-wrap:hover .marquee {
	animation-play-state: paused;
}
@keyframes scroll {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(calc(-100% - 20px));
	}
}
@media (max-width: 640px) {
	.logos {
		padding-top: 15px;
		padding-bottom: 15px;
	}
}
</style>
