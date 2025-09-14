<template>
	<div class="date">
		<img src="/img/calendar.svg" width="16" height="17" />
		<time class="text_size_small" :datetime="value">{{ value }}</time>
	</div>
</template>
<script>
export default {
	name: 'date',
	props: {
		value: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
.date {
	display: flex;
	width: fit-content;
	padding: 14px 10px;
	border-radius: var(--m);
	gap: 10px;
	background: #00000042;
}
time {
	color: #9c9ba3;
}
</style>
