<template>
	<form class="form" onsubmit="submit">
		<div class="form_title">
			{{ t('WRITE_REVIEW') }}
			<AButton :attributes="btnClose" @onClick="close" title="Form close" type="button">
				<AImg :attributes="{ ...whiteCrossSettings, alt: 'White Cross' }" src="/img/whiteCross.svg" />
			</AButton>
		</div>
		<div class="input_row">
			<div class="input_wrapper">
				<label class="label" for="username">{{ t('NAME') }}*</label>
				<input class="input" v-model="name" type="text" id="username" :placeholder="t('NAME')" />
			</div>
			<div class="input_wrapper">
				<label class="label" for="email">{{ t('EMAIL') }}*</label>
				<input class="input" v-model="email" type="text" id="email" :placeholder="t('EMAIL')" />
			</div>
		</div>
		<div class="input_row">
			<RatingSlider @change="changeRating" />
		</div>
		<div class="input_row">
			<div class="full-width">
				<label class="label" for="title">{{ t('TITLE_REVIEW') }}*</label>
				<input class="input" v-model="title" type="text" id="title" :placeholder="t('TITLE_REVIEW')" />
			</div>
		</div>
		<div class="input_row">
			<div class="full-width">
				<label class="label" for="msg">{{ t('DESCRIPTION_REVIEW') }}*</label>
				<textarea class="textarea" id="msg" v-model="description" :placeholder="t('DESCRIPTION_REVIEW_PLACEHOLDER')" />
			</div>
		</div>
		<div class="input_row">
			<div class="full-width row_actions">
				<AButton :attributes="btnCancel" @onClick="cancel" title="Button cancel" type="button">
					{{ t('CANCEL') }}
				</AButton>
				<AButton :attributes="btnSend" @onClick="send" title="Button send" type="button">
					{{ t('SEND') }}
				</AButton>
			</div>
		</div>
		<div class="error_row" v-if="formError">
			{{ formError }}
		</div>
		<div class="success_row" v-if="success">
			{{ success }}
		</div>
	</form>
</template>
<script>
import components from '~/mixins/components'
import RatingSlider from './RatingSlider.vue'
import { isValidEmail } from '~/functions'
export default {
	name: 'review_form',
	mixins: [components],
	data: () => {
		return {
			name: '',
			email: '',
			title: '',
			description: '',
			rating: 9.4,
			btnClose: {
				borderRadius: 'm',
				class: 'close_button'
			},
			whiteCrossSettings: {
				width: '10px',
				height: '10px'
			},
			btnCancel: {
				color: 'cairo',
				class: 'cancel_button',
				borderRadius: 'm'
			},
			btnSend: {
				color: 'cairo',
				class: 'send_button',
				borderRadius: 'm'
			},
			formError: '',
			success: ''
		}
	},
	components: { RatingSlider },
	methods: {
		close() {
			this.$emit('close')
		},
		submit(e) {
			e.preventDefault()
		},
		cancel() {
			this.name = ''
			this.email = ''
			this.title = ''
			this.description = ''
			this.rating = 0
		},
		send() {
			this.formError = ''
			if (this.name.length < 3) this.formError = this.t('ERROR_NAME_LENGTH')
			else if (!isValidEmail(this.email)) this.formError = this.t('INVALID_EMAIL')
			else if (this.description < 50) this.formError = this.t('SHORT_MSG_TEXT')
			else if (!this.title.length) this.formError = this.t('EMPTY_TITLE')
			if (!this.formError) {
				const data = {
					name: this.name,
					email: this.email,
					title: this.title,
					description: this.description,
					rating: this.rating
				}
				this.$emit('send', data)
				this.success = this.t('SUCCESS_SEND')
				setTimeout(() => {
					this.success = ''
				}, 2000)
				this.name = ''
				this.email = ''
				this.description = ''
				this.title = ''
			}
		},
		changeRating(value) {
			this.rating = value
		}
	}
}
</script>
<style scoped>
.form {
	width: 670px;
	max-width: 100%;
	border-radius: var(--m);
	background: #1b1831;
	border: 1px solid rgba(255, 255, 255, 0.15);
	padding: 20px;
}
.form_title {
	font-size: 24px;
	font-weight: bolder;
	color: var(--cairo);
	display: flex;
	justify-content: space-between;
}
.close_button {
	background: rgba(255, 255, 255, 0.06);
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.close_button img {
	display: block;
}
.input_row {
	display: flex;
	gap: 10px;
	margin-top: 10px;
}
.input_wrapper {
	width: calc(50% - 5px);
}
.input {
	background: #29263d;
	width: 100%;
	padding: 16px 8px;
	border-radius: var(--m);
	border: none;
	font-size: 16px;
	color: var(--cairo);
}
.textarea {
	background: #29263d;
	width: 100%;
	padding: 16px 8px;
	border-radius: var(--m);
	border: none;
	font-size: 16px;
	color: var(--cairo);
	min-height: 140px;
}
.label {
	font-size: 16px;
	color: var(--cairo);
	display: inline-block;
	margin-bottom: 10px;
}
.row_actions {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
}
.cancel_button {
	background: #29263d;
	padding: 10px 20px;
	color: var(--cairo);
	max-width: 90px;
}
.send_button {
	background: #054e0c;
	padding: 10px 20px;
	color: var(--cairo);
	max-width: 90px;
	border: 1px solid #2a7f33;
}
.error_row {
	margin-top: 15px;
	color: red;
	text-align: center;
}
.success_row {
	margin-top: 15px;
	color: var(--calgary);
	text-align: center;
}
</style>
