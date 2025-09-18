<template>
	<div class="root">
		<div class="left">
			<div class="thumbnail_wrapper">
				<AImg :attributes="{ ...imgSettings, alt: `${title} Logo` }" :src="src" />
			</div>
		</div>
		<div class="center">
			<div class="center_wrapper">
				<AText tag="div" :attributes="titleSettings">{{ title }}</AText>
				<AText tag="div" :attributes="subTitleSettings">
					<ALink :href="vendor_permalink">
						<AImg :attributes="{ ...vendorImgSettings, alt: `${vendor_title} Logo` }" :src="vendor_icon" />
						{{ vendor_title }}
					</ALink>
				</AText>
				<AText tag="div" :attributes="sectionTitleSettings">{{ t('GAME_AVAILABLE_CASINOS') }}</AText>
				<div class="casino_wrapper" v-if="casinos.length">
					<Slider :settings="sliderSettings">
						<div class="item" v-for="(item, index) in casinos" :key="index" :style="`background: ${item.color}`">
							<ALink :href="item.permalink">
								<AImg :attributes="{ ...itemImgSettings, alt: `${item.title} Logo` }" :src="item.thumbnail" />
							</ALink>
						</div>
					</Slider>
				</div>
				<div class="action_wrapper">
					<div class="action_item">
						<AButton :attributes="btnSettings" @onClick="refActivate(refLinks, geo)">{{ t('GO_TO') }}</AButton>
					</div>
					<div class="action_item">
						<AButton :attributes="btnDemoSettings" v-if="demo" @onClick="onClickDemoActivate">{{ t('DEMO') }}</AButton>
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="characters_container">
				<GameCharacters type="rtp" title="RTP" :value="rtp" />
				<GameCharacters type="min_dep" :title="t('MIN_BET')" :value="min_bid" />
				<GameCharacters type="scheme" :title="t('SCHEMA')" :value="scheme" />
				<GameCharacters type="line" :title="t('LINES')" :value="line" />
			</div>
		</div>
	</div>
</template>
<script>
import GameCharacters from '~/components/game_characters'
import Slider from '~/components/slider'
import ref from '~/mixins/ref'
import components from '~/mixins/components'
import geo from '~/mixins/geo'
export default {
	name: 'single-game-page',
	mixins: [components, ref, geo],
	components: {
		GameCharacters,
		Slider
	},
	data: () => {
		return {
			imgSettings: {
				width: '300px',
				height: '325px',
				class: 'object_fit_cover thumbnail'
			},
			vendorImgSettings: {
				width: '26',
				height: '26',
				class: ''
			},
			titleSettings: {
				class: 'title',
				color: 'cairo',
				weight: 'bold'
			},
			subTitleSettings: {
				color: 'cairo',
				size: 'medium',
				class: 'vendor_container sub_title'
			},
			sectionTitleSettings: {
				class: 'section_title',
				color: 'cairo',
				size: 'small'
			},
			itemImgSettings: {
				width: '68px',
				height: '50px'
			},
			btnSettings: {
				bg: 'calgary',
				color: 'cucuta',
				borderRadius: 's',
				weight: 'semi-bold',
				text_transform: 'uppercase'
			},
			btnDemoSettings: {
				bg: 'calgary',
				color: 'cairo',
				borderRadius: 's',
				weight: 'semi-bold',
				class: 'demo_btn',
				text_transform: 'uppercase'
			},
			sliderSettings: {
				slidesToShow: 7,
				autoplay: true,
				speed: 2000,
				autoplaySpeed: 2000,
				initialSlide: 0,
				infinite: true,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 4,
							centerMode: false,
							initialSlide: -1
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 4,
							centerMode: false,
							initialSlide: -1
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 4,
							centerMode: false,
							initialSlide: -1
						}
					}
				]
			}
		}
	},
	props: {
		title: {
			type: String,
			default() {
				return ''
			}
		},
		src: {
			type: String,
			default() {
				return '/img/slotokingLogo.png'
			}
		},
		rtp: {
			type: String,
			default() {
				return ''
			}
		},
		min_bid: {
			type: String,
			default() {
				return ''
			}
		},
		scheme: {
			type: String,
			default() {
				return ''
			}
		},
		line: {
			type: String,
			default() {
				return ''
			}
		},
		demo: {
			type: Boolean,
			default() {
				return false
			}
		},
		vendor_title: {
			type: String,
			default() {
				return ''
			}
		},
		casinos: {
			type: Array,
			default() {
				return []
			}
		},
		vendor_permalink: {
			type: String,
			default() {
				return ''
			}
		},
		vendor_icon: {
			type: String,
			default() {
				return ''
			}
		}
	},
	methods: {
		onClickDemoActivate() {
			this.$emit('onClickDemoActivate')
		}
	}
}
</script>
<style scoped>
.thumbnail_wrapper {
	width: 300px;
	height: 325px;
	overflow: hidden;
}
.center {
	display: flex;
	align-items: center;
	min-width: 512px;
	max-width: 512px;
}
.left {
	max-width: 300px;
}
.root {
	display: flex;
	gap: 33px;
	background: var(--cucuta);
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	padding: var(--xs);
}
.title {
	font-size: var(--l);
}
.section_title {
	margin-top: 15px;
}
.casino_wrapper {
	margin-top: 12px;
}
.center_wrapper {
	width: 100%;
}
.item {
	width: 68px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 3px;
}
.item img {
	border-radius: var(--s);
}
.action_item {
	height: 40px;
	flex-grow: 1;
}
.action_wrapper {
	display: flex;
	gap: 12px;
	margin-top: 50px;
}
.demo_btn {
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.16);
}
.right {
	flex-grow: 1;
	display: flex;
	align-items: center;
	width: 100%;
}
.characters_container {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: var(--m);
}
.vendor_container {
	display: inline-block;
	margin-top: 10px;
}
.vendor_container a {
	display: flex;
	align-items: center;
	padding: 5px 10px;
	border-radius: var(--s);
	background: hsla(0, 0%, 100%, 0.1);
	white-space: nowrap;
	font-size: 10px;
	height: 40px;
	color: var(--cairo);
	font-weight: 400;
	text-decoration: none;
}
.vendor_container img {
	margin-right: 5px;
}
@media (max-width: 767px) {
	.root {
		flex-wrap: wrap;
		padding: 15px;
	}
	.left,
	.right,
	.center {
		width: 100%;
		max-width: none;
	}
	.center {
		min-width: auto;
	}
	.left {
		display: flex;
		justify-content: center;
	}
	.casino_wrapper {
		flex-wrap: wrap;
	}
	.action_wrapper {
		margin-top: 30px;
	}
	.item_character {
		padding-right: 0px;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.root {
		flex-wrap: wrap;
		padding: 15px;
	}
	.left,
	.right,
	.center {
		width: 100%;
		max-width: none;
	}
	.center {
		min-width: auto;
	}
	.left {
		display: flex;
		justify-content: center;
	}
	.casino_wrapper {
		flex-wrap: wrap;
	}
	.action_wrapper {
		margin-top: 30px;
	}
	.item_character {
		padding-right: 0px;
	}
}
</style>
