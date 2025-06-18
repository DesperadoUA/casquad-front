<template>
	<div class="casino_card" :style="`background: ${bg}`">
		<div class="wrapper">
			<div class="left">
				<AText tag="div" :attributes="labelSettings" v-if="label && device === 'MOB'" :class="label">{{ label }}</AText>
				<div class="rating">
					<AImg :attributes="{ ...starSettings, alt: 'Gold Star' }" src="/img/goldStar.svg" />
					<AText tag="span" :attributes="textSettings">{{ rating / 10 }} </AText>
					<AText tag="span" :attributes="thinTextSettings">/ 10</AText>
				</div>
				<div class="img_wrapper">
					<AImg :attributes="{ ...imgSettings, alt: `${title} Logo` }" :src="src" />
				</div>
			</div>
			<div class="right">
				<AText tag="div" :attributes="labelSettings" v-if="label && device !== 'MOB'" :class="label">{{ label }}</AText>
				<div class="wrapper_desc">
					<AText tag="div" :attributes="titleSettings">{{ title }}</AText>
					<div class="wrapper_characters">
						<div class="characters_left">
							<AText tag="div" :attributes="bonusNameSettings">{{ t('WELCOME_BONUS') }}</AText>
							<AText tag="div" :attributes="bonusValueSettings">{{ bonus_value }}</AText>
							<div class="action_wrapper">
								<div class="btn_wrapper">
									<AButton :attributes="btnSettings" @onClick="refActivate(refLinks)" :title="`Goes to ${title}`">{{
										t('GO_TO')
									}}</AButton>
								</div>
							</div>
						</div>
						<div class="characters_right">
							<AText tag="div" :attributes="advantagesItemSettings" v-for="(item, index) in advantages" :key="index">
								{{ item }}
							</AText>
							<AText tag="div" :attributes="bonusNameSettings">
								Min. dep.: {{ min_dep }} &middot; Wager: {{ wager }}
							</AText>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ref from '~/mixins/ref'
import components from '~/mixins/components'
export default {
	name: 'casino_card',
	mixins: [components, ref],
	data() {
		return {
			imgSettings: {
				width: '210px',
				height: '92px',
				class: 'object_fit_cover'
			},
			titleSettings: {
				color: 'cairo',
				size: 'large',
				weight: 'bold',
				decoration: 'none',
				class: 'title'
			},
			bonusNameSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'regular',
				class: 'bonus_name'
			},
			advantagesItemSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'regular',
				class: 'advantages'
			},
			bonusValueSettings: {
				color: 'calgary',
				size: 'x-large',
				weight: 'bold',
				class: 'bonus_value'
			},
			btnSettings: {
				bg: 'calgary',
				color: 'cucuta',
				borderRadius: 's',
				weight: 'semi-bold',
				text_transform: 'uppercase'
			},
			starSettings: {
				width: '14px',
				height: '14px',
				class: ' m_r_xs'
			},
			textSettings: {
				color: 'cairo',
				size: 'small',
				bold: 'semi-bold',
				class: 'rating_value'
			},
			thinTextSettings: {
				color: 'cordoba',
				size: 'small',
				bold: 'thin',
				class: 'rating_total_value'
			},
			labelSettings: {
				color: 'colombo',
				size: 'small',
				bold: 'regular',
				text_transform: 'uppercase',
				class: 'label'
			}
		}
	},
	props: {
		src: {
			type: String,
			default() {
				return '/img/slotokingLogo.png'
			}
		},
		bonus_value: {
			type: String,
			default() {
				return '125 000 ₴ + 500 FS'
			}
		},
		title: {
			type: String,
			default() {
				return ''
			}
		},
		label: {
			type: String,
			default() {
				return ''
			}
		},
		bg: {
			type: String,
			default() {
				return '#D21037'
			}
		},
		rating: {
			type: Number,
			default() {
				return 0
			}
		},
		advantages: {
			type: Array,
			default() {
				return []
			}
		},
		min_dep: {
			type: String,
			default() {
				return ''
			}
		},
		wager: {
			type: String,
			default() {
				return ''
			}
		}
	}
}
</script>
<style scoped>
.casino_card {
	width: 100%;
	height: 206px;
	padding: var(--xs);
	border-radius: var(--m);
	overflow: hidden;
}
.img_wrapper {
	width: 210px;
	height: 92px;
}
.left {
	width: 210px;
	min-width: 210px;
	display: flex;
	height: 100%;
	align-items: center;
	position: relative;
}
.right {
	display: flex;
	flex-grow: 1;
	background: rgba(16, 13, 36, 0.7);
	border-radius: var(--m);
	padding: var(--m);
	position: relative;
}
.wrapper {
	display: flex;
	height: 100%;
}
.characters_right .bonus_name {
	margin-top: var(--m);
}
.bonus_name, .advantages {
	margin-top: var(--s);
}
.bonus_value {
	margin-top: var(--s);
}
.btn_wrapper {
	width: 206px;
	height: 40px;
}
.action_wrapper {
	display: flex;
	margin-top: var(--m);
}
.rating {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	z-index: 2;
	background: var(--cardiff);
	width: 75px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: var(--s);
}
.rating_value {
	transform: translateY(1px);
}
.rating_total_value {
	font-size: 10px;
	transform: translateY(1px);
}
.label {
	background: rgba(255, 0, 92, 1);
	padding: 4px 8px;
	position: absolute;
	right: 6px;
	top: 6px;
	border-radius: 8px;
}
.label.trusted {
	background: rgba(0, 184, 107, 1);
}
.label.new {
	background: rgba(0, 163, 255, 1);
}
.label.popular {
	background: rgba(255, 0, 92, 1);
}
.label.best {
	background: var(--chicago);
}
.wrapper_characters {
	width: 100%;
	display: flex;
}
.characters_left {
	width: 50%;
}
.characters_right {
	width: 50%;
}
.wrapper_desc {
	width: 100%;
}
.advantages {
	position: relative;
	padding-left: 25px;
}
.advantages::before {
	content: '';
	width: 18px;
	height: 18px;
	background: url('/img/success.svg');
	background-position: center;
	background-repeat: no-repeat;
	position: absolute;
	top: 0;
	left: 0;
}
@media (max-width: 767px) {
	.title,
	.bonus_name,
	.bonus_value {
		text-align: center;
		flex-grow: 1;
		flex-shrink: 0;
	}
	.wrapper_desc,
	.btn_wrapper {
		width: 100%;
	}
	.bonus_value {
		font-size: 20px;
	}
	.left {
		width: 100%;
		justify-content: center;
	}
	.casino_card {
		height: auto;
	}
	.wrapper {
		flex-wrap: wrap;
		height: auto;
	}
	.img_wrapper {
		margin-top: 25px;
	}
	.label {
		top: 0;
		right: 3px;
	}
	.wrapper_characters {
		flex-wrap: wrap;
		flex-direction: column-reverse;
	}
	.characters_left {
		width: 100%;
	}
	.characters_right {
		width: 100%;
	}
}
</style>
