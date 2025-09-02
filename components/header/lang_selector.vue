<template>
	<div class="lang_selector">
		<div class="lang_selector_ttl open single" @click="isShowLangSelector = !isShowLangSelector">
			<div class="flag">
				<AImg :attributes="{ ...imgSettings, alt: `Flag ${geo}` }" :src="`/img/geo/${geo}.webp`" />
			</div>
			<AText tag="div" :attributes="textSettings">{{ geoConfig[geo] }}</AText>
			<div class="arrow">
				<AImg :attributes="{ ...imgSettings, alt: 'arrow' }" src="/img/white_arrow.png" />
			</div>
		</div>
		<div class="lang_selector_wrapper" v-if="isShowLangSelector">
			<div class="lang_item" v-for="item in geoList" :key="item" @click="setGeo(geoConfig[item])">
				<div class="flag">
					<AImg :attributes="{ ...imgSettings, alt: `Flag ${item}` }" :src="`/img/geo/${item}.webp`" />
				</div>
				<AText tag="div" :attributes="textSettings">{{ item }}</AText>
				<div class="arrow">
					<AImg :attributes="{ ...imgSettings, alt: 'arrow' }" src="/img/white_arrow.png" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import components from '~/mixins/components'
import geo from '~/mixins/geo'
import config from '~/config'
export default {
	name: 'lang_selector',
	mixins: [components, geo],
	data() {
		return {
			options: null,
			isShowLangSelector: false,
			imgSettings: {
				width: '18px',
				height: '18px'
			},
			textSettings: {
				color: 'cairo',
				transform: 'uppercase',
				weight: 'bolder',
				class: 'text'
			}
		}
	},
	computed: {
		geoList() {
			const geo = this.$store.getters['common/getGeo']
			const availableGeo = config.AVAILABLE_GEO
			return availableGeo.add('W')
		}
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside)
	},
	beforeUnmount() {
		document.removeEventListener('click', this.handleClickOutside)
	},
	methods: {
		handleClickOutside(event) {
			if (!this.$el.contains(event.target)) {
				this.isShowLangSelector = false
			}
		}
	}
}
</script>

<style scoped lang="scss">
.lang_selector {
	position: relative;
	width: 84px;
	height: 40px;
	border-radius: 14px;
	background: rgba(16, 13, 36, 0.28);
	border: 1px solid #5e40b5;
	cursor: pointer;
}
.flag img,
.arrow img {
	display: block;
}
.lang_selector:hover .lang_selector_wrapper {
	display: flex;
}
.lang_selector_wrapper {
	position: absolute;
	top: 45px;
	left: 0px;
	display: flex;
	flex-wrap: wrap;
	border-radius: 14px;
	background: rgba(16, 13, 36, 0.8);
	border: 1px solid #5e40b5;
	padding-top: 5px;
	padding-bottom: 5px;
}
.lang_selector_ttl {
	display: flex;
	align-items: center;
	padding: 7px 5px 5px 10px;
	justify-content: space-between;
}
.text {
	font-size: 14px;
	margin-left: 5px;
}
.lang_item {
	width: 100%;
	display: flex;
	align-items: center;
	padding: 5px 2px 5px 10px;
	justify-content: space-between;
	text-decoration: none;
}
.lang_selector_wrapper .arrow img {
	transform: rotate(-90deg);
}
.single {
	justify-content: space-between;
}
@media (max-width: 1200px) {
	.lang_item {
		background: var(--cancun);
	}
}
</style>
