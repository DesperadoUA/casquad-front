<template>
	<section class="slick_button">
		<div class="slick_button_part_left" @click="goHome()"></div>
		<div class="slick_button_part_right" @click="refActivate(refLink, geo, 'app_slick_button')"></div>
		<div class="container slick_button_container">
			<div class="slick_button_left">
				<img src="/img/arrow.png" class="slick_button_arrow left_arrow" loading="lazy" width="8" height="12" />
				<NuxtLink no-prefetch :to="link">
					{{ linkText }}
				</NuxtLink>
			</div>
			<div class="slick_button_right">
				{{ refText }}
				<img src="/img/arrow.png" class="slick_button_arrow right_arrow" loading="lazy" width="8" height="12" />
			</div>
		</div>
	</section>
</template>

<script>
import translateMixin from '~/mixins/translate'
import refMixin from '~/mixins/ref'
import geo from '~/mixins/geo'
export default {
	name: 'app_slick_button',
	props: {
		refLink: {
			type: Array,
			default() {
				return []
			}
		},
		refText: {
			type: String,
			default() {
				return ''
			}
		},
		link: {
			type: String,
			default() {
				return '#'
			}
		},
		linkText: {
			type: String,
			default() {
				return ''
			}
		}
	},
	mixins: [refMixin, translateMixin, geo],
	methods: {
		goHome() {
			this.$router.push(this.link)
		}
	}
}
</script>

<style>
.slick_button_part_left {
	width: 50%;
	height: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 2;
}
.slick_button_part_right {
	width: 50%;
	height: 100%;
	position: absolute;
	top: 0px;
	right: 0px;
	z-index: 2;
}
.slick_button {
	height: 70px;
	z-index: 10;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: linear-gradient(to right, var(--cleveland) 50%, var(--calgary) 50%);
	cursor: pointer;
}
.slick_button a,
.slick_button {
	color: var(--disabled-bg);
	text-decoration: none;
	font-family: var(--font);
	font-weight: bold;
	text-transform: uppercase;
}
.slick_button_container {
	display: flex;
	align-items: center;
	height: 100%;
}
.slick_button_left {
	width: 50%;
	color: var(--cairo);
}
.slick_button_right {
	width: 50%;
	text-align: right;
	cursor: pointer;
}
.left_arrow {
	margin-right: 10px;
	margin-top: 7px;
}
.right_arrow {
	margin-top: 7px;
	margin-left: 10px;
	transform: rotate(180deg);
}
@media (min-width: 320px) and (max-width: 767px) {
	.slick_button_part_left {
		width: 100%;
		height: 50%;
	}
	.slick_button_part_right {
		width: 100%;
		height: 50%;
		top: 50%;
	}
	.slick_button {
		box-sizing: border-box;
		background: transparent;
		height: 80px;
	}
	.slick_button_container {
		flex-wrap: wrap;
		max-width: 100%;
		padding-left: 0px;
		padding-right: 0px;
	}
	.slick_button_left,
	.slick_button_right {
		width: 100%;
		text-align: center;
	}
	.slick_button_left {
		background: var(--cleveland);
		cursor: pointer;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.slick_button_right {
		background: var(--calgary);
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.right_arrow,
	.left_arrow {
		margin-top: 2px;
	}
}
</style>
