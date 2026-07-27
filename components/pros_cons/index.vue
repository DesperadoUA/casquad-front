<template>
	<div class="pros_cons">
		<div class="pros" v-if="prosList && prosList.length">
			<div class="pros_cons_title pros_icon" v-if="prosList">{{ prosTitle }}</div>
			<ul class="pros_list">
				<li v-for="(item, index) in prosList" :key="index">{{ item }}</li>
			</ul>
		</div>

		<div class="cons" v-if="consList && consList.length">
			<div class="pros_cons_title cons_icon" v-if="consTitle">{{ consTitle }}</div>
			<ul class="cons_list">
				<li v-for="(item, index) in consList" :key="index">{{ item }}</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name: 'pros_cons',
	props: {
		prosList: {
			type: Array,
			default: []
		},
		consList: {
			type: Array,
			default: []
		},
		prosTitle: {
			type: String,
			default: ''
		},
		consTitle: {
			type: String,
			default: ''
		}
	}
}
</script>
