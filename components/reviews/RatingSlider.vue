<template>
	<div class="rating-container">
		<div class="rating-header">
			<span class="rate-label">Rate*</span>
		</div>

		<div class="rating-slider-wrapper">
			<div class="rating-info">
				<div class="star-rating">
					⭐ {{ formatRating(rating) }}<span class="out-of">/{{ maxRating }}</span>
				</div>
			</div>

			<div
				class="slider-container"
				@mousedown="handleMouseDown"
				@mouseenter="isHovering = true"
				@mouseleave="isHovering = false"
			>
				<div class="slider-track" ref="sliderTrack">
					<div class="slider-fill" :style="{ width: percentage + '%' }"></div>
					<div
						class="slider-thumb"
						:style="{ left: percentage + '%' }"
						:class="{ dragging: isDragging, hover: isHovering }"
					>
						😊
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'rating_slider',
	data() {
		return {
			rating: 9.4,
			maxRating: 10,
			isHovering: false,
			isDragging: false
		}
	},
	computed: {
		percentage() {
			return (this.rating / this.maxRating) * 100
		}
	},
	methods: {
		formatRating(value) {
			return value.toFixed(1)
		},
		handleSliderChange(event) {
			if (!this.$refs.sliderTrack) return
			const rect = this.$refs.sliderTrack.getBoundingClientRect()
			const x = event.clientX - rect.left
			const newValue = (x / rect.width) * this.maxRating
			this.rating = Math.max(0, Math.min(this.maxRating, newValue))
			this.$emit('change', this.rating)
		},
		handleMouseMove(e) {
			if (this.isDragging) {
				this.handleSliderChange(e)
			}
		},
		handleMouseUp() {
			this.isDragging = false
			document.removeEventListener('mousemove', this.handleMouseMove)
			document.removeEventListener('mouseup', this.handleMouseUp)
		},
		handleMouseDown(event) {
			this.isDragging = true
			event.preventDefault()
			this.handleSliderChange(event)
			document.addEventListener('mousemove', this.handleMouseMove)
			document.addEventListener('mouseup', this.handleMouseUp)
		}
	},
	beforeDestroy() {
		document.removeEventListener('mousemove', this.handleMouseMove)
		document.removeEventListener('mouseup', this.handleMouseUp)
	}
}
</script>

<style scoped>
.rating-container {
	width: 100%;
	color: var(--cairo);
	user-select: none;
}

.rating-header {
	margin-bottom: 5px;
}

.rate-label {
	color: var(--cairo);
	font-size: 14px;
	font-weight: 500;
}

.rating-slider-wrapper {
	display: flex;
	align-items: center;
	gap: 16px;
}

.star-rating {
	color: #ffd700;
	font-size: 14px;
	font-weight: 600;
	white-space: nowrap;
}

.out-of {
	color: #888;
	font-size: 12px;
}

.slider-container {
	flex: 1;
	position: relative;
	height: 40px;
	display: flex;
	align-items: center;
	cursor: pointer;
}

.slider-track {
	width: 100%;
	height: 8px;
	background: #3a3d4e;
	border-radius: 4px;
	position: relative;
	overflow: visible;
}

.slider-fill {
	height: 100%;
	background: linear-gradient(90deg, #6b46c1, #8b5cf6, #a855f7);
	border-radius: 4px;
	transition: all 0.2s ease;
}

.slider-thumb {
	position: absolute;
	top: 50%;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: #ffd700;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	transform: translate(-50%, -50%);
	cursor: grab;
	transition: all 0.2s ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	border: 2px solid #fff;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	touch-action: none;
	-webkit-touch-callout: none;
}

.slider-thumb:hover,
.slider-thumb.hover {
	transform: translate(-50%, -50%) scale(1.1);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.slider-thumb:active,
.slider-thumb.dragging {
	cursor: grabbing;
	transform: translate(-50%, -50%) scale(1.05);
}

.slider-thumb:hover {
	background: #ffed4a;
}
</style>
