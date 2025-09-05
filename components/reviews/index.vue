<template>
	<section class="reviews">
		<div class="container">
			<div class="reviews_wrapper">
				<div class="reviews_top">
					<AText tag="div" :attributes="titleTextSettings">{{ t('PLAYERS_FEEDBACK') }}</AText>
					<div class="actions">
						<Filters
							v-if="posts.length"
							@changeFilter="changeFilter"
							:currentValue="currentFilter"
							:items="filterItems"
						/>
						<AButton :attributes="btnFormSettings" @onClick="formAction" title="Form action">
							{{ t('WRITE_REVIEW') }}
						</AButton>
					</div>
				</div>
				<div class="reviews_total" v-if="posts.length">
					<div class="rating">
						<div class="rating">
							<AImg :attributes="{ ...starSettings, alt: 'Star' }" src="/img/goldStar.svg" />
							<AText tag="span" :attributes="textSettings">{{ totalRating.toFixed(1) }}</AText>
							<AText tag="span" :attributes="thinTextSettings">/10</AText>
						</div>
					</div>
					<div class="total_reviews">&#x2022; {{ posts.length }} {{ t('FEEDBACK') }}</div>
				</div>
				<div class="review_loop" v-if="currentPosts.length">
					<ReviewItem
						v-for="(item, index) in currentPosts"
						:key="index"
						:title="item.title"
						:desc="item.desc"
						:verified="!!item.verified"
						:rating="Number(item.rating)"
						:date="item.date.slice(0, 10)"
						:userName="item.userName"
						:src="item.src"
					/>
				</div>
				<div class="reviews_load_more" v-if="hideBtnShowMore">
					<AButton :attributes="btnShowMoreSettings" @onClick="postShowMore" title="Show more action">
						{{ t('SHOW_MORE_LOADER') }}
					</AButton>
				</div>
			</div>
		</div>
		<PopUp @onClick="clickOnPopUp" v-if="isShowPopUp">
			<Form @close="closeForm" @send="send" />
		</PopUp>
	</section>
</template>

<script>
import { REVIEWS as NumberPostOnQuery } from '~/config/postLoader'
import components from '~/mixins/components'
import Filters from '~/components/reviews/filters'
import ReviewItem from '~/components/reviews/item'
import PopUp from '~/components/pop_up'
import Form from '~/components/reviews/form'
import DAL_Review from '~/DAL/review'
export default {
	name: 'reviews',
	components: { Filters, ReviewItem, PopUp, Form },
	props: {
		posts: {
			type: Array,
			default() {
				return []
			}
		},
		post_type: {
			type: String,
			default() {
				return ''
			}
		},
		post_id: {
			type: Number,
			default() {
				return 0
			}
		}
	},
	mixins: [components],
	data() {
		return {
			numberPostOnQuery: NumberPostOnQuery,
			postCurrentPage: 1,
			isShowPopUp: false,
			currentFilter: {},
			filterItems: [],
			sortKey: 'new',
			titleTextSettings: {
				color: 'cairo',
				size: 'x-large',
				class: 'section_title',
				weight: 'bold'
			},
			btnFormSettings: {
				color: 'cochin',
				size: 'text_size_small',
				bg: 'calgary',
				borderRadius: 'm',
				weight: 'semi-bold',
				class: 'form_button'
			},
			btnShowMoreSettings: {
				color: 'cairo',
				size: 'text_size_small',
				bg: 'cleveland',
				borderRadius: 'm',
				class: 'show_more_button'
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
			}
		}
	},
	methods: {
		formAction() {
			this.isShowPopUp = true
		},
		changeFilter(filter) {
			this.currentFilter = filter
			this.$emit('changeFilter', this.currentFilter)
		},
		clickOnPopUp() {
			this.isShowPopUp = false
		},
		closeForm() {
			this.isShowPopUp = false
		},
		postShowMore() {
			this.postCurrentPage += 1
		},
		async send(data) {
			await DAL_Review.storeReview({
				data: {
					...data,
					rating: Math.trunc(data.rating * 10),
					post_type: this.post_type,
					post_id: this.post_id
				}
			})
		}
	},
	computed: {
		totalRating() {
			if (!this.posts.length) return 0
			return this.posts.reduce((sum, item) => sum + Number(item.rating), 0) / (this.posts.length * 10)
		},
		currentPosts() {
			return this.posts.slice(0, this.numberPostOnQuery * this.postCurrentPage)
		},
		hideBtnShowMore() {
			return this.posts.length > this.numberPostOnQuery * this.postCurrentPage
		}
	},
	mounted() {
		this.currentFilter = {
			title: this.t('NEW'),
			key: 'new'
		}
		this.filterItems = [
			{ title: this.t('NEW'), key: 'new' },
			{ title: this.t('HIGHEST_RATING'), key: 'rating_desc' },
			{ title: this.t('LOWEST_RATING'), key: 'rating_asc' }
		]
	}
}
</script>
<style scoped>
.reviews_wrapper {
	border-radius: var(--m);
	border: 1px solid rgba(255, 255, 255, 0.15);
	padding: 27px 22px;
	background: var(--cucuta);
	margin-bottom: 40px;
}
.reviews_top {
	display: flex;
	justify-content: space-between;
	z-index: 3;
	position: relative;
}

.actions {
	display: flex;
	gap: 10px;
}
.form_button {
	white-space: nowrap;
	padding: 12px 21px;
}
.review_loop {
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 15px;
}
.reviews_total {
	display: flex;
	gap: 15px;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
}
.total_reviews {
	color: #d0d0d3;
	font-size: 14px;
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
.reviews_load_more {
	margin-top: 20px;
	text-align: center;
}
.show_more_button {
	width: auto;
	padding: 12px 31px;
}
@media (max-width: 767px) {
	.reviews_top {
		flex-wrap: wrap;
		gap: 15px;
	}
	.actions {
		flex-wrap: wrap;
		gap: 15px;
		justify-content: center;
		width: 100%;
	}
	.form_button {
		height: auto;
		max-width: 170px;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
}
</style>
