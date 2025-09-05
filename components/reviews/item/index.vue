<template>
	<article class="item">
		<div class="wrapper">
			<div class="left">
				<div class="img_wrapper">
					<AImg :attributes="{ ...imgSettings, alt: `avatar` }" :src="src || '/img/review_author.png'" />
				</div>
			</div>
			<div class="right">
				<div class="verified_row">
					<span class="user_name">{{ userName }}</span>
					<div class="verified" v-if="verified">
						<AImg :attributes="{ ...imgVerifiedSettings, alt: `verified` }" src="/img/shield-check.svg" />
						Verified
					</div>
					<span class="review_date">{{ date }}</span>
				</div>
				<div class="rating">
					<AImg :attributes="{ ...starSettings, alt: 'Star' }" src="/img/goldStar.svg" />
					<AText tag="span" :attributes="textSettings">{{ rating / 10 }}</AText>
					<AText tag="span" :attributes="thinTextSettings">/10</AText>
				</div>
				<div class="review_title">{{ title }}</div>
				<div class="review_description">
					{{ desc }}
				</div>
			</div>
		</div>
	</article>
</template>
<script>
import components from '~/mixins/components'
export default {
	name: 'review_item',
	mixins: [components],
	data: () => {
		return {
			imgSettings: {
				width: '62px',
				height: '62px',
				class: 'object_fit_cover border_radius_50'
			},
			titleSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'bold',
				decoration: 'none',
				class: 'title'
			},
			descTextSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'regular',
				class: 'desc'
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
			imgVerifiedSettings: {
				width: '13px',
				height: '16px'
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
		userName: {
			type: String,
			default() {
				return ''
			}
		},
		desc: {
			type: String,
			default() {
				return ''
			}
		},
		verified: {
			type: Boolean,
			default() {
				return false
			}
		},
		src: {
			type: String,
			default() {
				return '/img/user.webp'
			}
		},
		rating: {
			type: Number,
			default() {
				return 0
			}
		},
		date: {
			type: String,
			default() {
				return ''
			}
		}
	}
}
</script>
<style scoped>
.item {
	padding: 20px;
	background: #29263d;
	border-radius: var(--m);
}
.img_wrapper {
	width: 62px;
	height: 62px;
}
.rating_value {
	transform: translateY(1px);
}
.rating_total_value {
	font-size: 10px;
	transform: translateY(1px);
}
.rating {
	z-index: 2;
	background: var(--cardiff);
	width: 75px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: var(--l);
}
.wrapper {
	display: flex;
	gap: 10px;
}
.verified_row {
	display: flex;
	gap: 10px;
	align-items: center;
}
.verified {
	display: flex;
	border-radius: var(--m);
	background: #054e0c;
	border: 1px solid #2a7f33;
	padding: 4px 12px;
	gap: 10px;
	color: var(--cairo);
	font-size: 14px;
}
.user_name {
	color: var(--cairo);
	font-size: 14px;
}
.review_date {
	color: #9c9ba3;
	font-size: 14px;
}
.right {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.review_title {
	font-size: 14px;
	color: var(--cairo);
	font-weight: bolder;
}
.review_description {
	font-size: 14px;
	color: var(--cairo);
	font-weight: 400;
}
@media (max-width: 767px) {
	.wrapper {
		flex-wrap: wrap;
	}
	.left {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.verified_row {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.rating {
		margin: 0 auto;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
}
</style>
