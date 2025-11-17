<template>
	<div class="site_section">
		<div class="section_container">
			<img :src="src" :alt="`${title} icon`" width="70" height="70" />
			<NuxtLink :to="link" class="link">{{ title }}</NuxtLink>
		</div>
	</div>
</template>
<script>
export default {
	name: 'site_sections',
	props: {
		src: {
			type: String,
			default: ''
		},
		title: {
			type: String,
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
.site_section {
	height: 100%;
	width: 100%;
	display: flex;
	position: relative;
	background: #5e40b5;
	align-items: center;
	justify-content: center;
	border-radius: var(--m);
	box-shadow:
		0px 3.42px 20.25px rgba(94, 64, 181, 0.46),
		inset 0px 3.42px 25.2px rgba(26, 10, 10, 0.5);
}
.section_container {
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center;
}
.link {
	color: var(--cairo);
	text-transform: uppercase;
	font-size: 12px;
	text-decoration: none;
	text-align: center;
}
@media (min-width: 768px) and (max-width: 1200px) {
	.link {
		font-size: 10px;
		max-width: 90%;
	}
}
</style>
