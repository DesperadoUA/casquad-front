<template>
	<div class="casino_details">
		<div class="row">
			<div class="left">
				<AText :attributes="textProvidersSettings">{{ t('VENDORS') }}</AText>
				<div class="show_more_wrapper" v-if="vendors.length > vendorNumberItems && device === 'MOB'">
					<button class="show_more" @click="filterVendors" :class="{active: vendorsIsShow}"> 
						<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
					</button>
				</div>
			</div>
			<div class="right">
				<ALink
					v-for="(item, index) in currentVendors"
					:href="item.permalink"
					:attributes="textProviderItemSettings"
					:key="index"
					:title="`Goes to ${item.title} page`"
				>
					<AImg :attributes="{ ...imgSettings, alt: `${item.title} Logo` }" :src="item.icon" /> {{ item.title }}
				</ALink>
			</div>
			<div class="show_more_wrapper" v-if="vendors.length > vendorNumberItems && device !== 'MOB'">
				<button class="show_more" @click="filterVendors" :class="{active: vendorsIsShow}"> 
					<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
				</button>
			</div>
		</div>
		<div class="row">
			<div class="left">
				<AText :attributes="textDepositMethodsSettings">{{ t('DEPOSIT_METHODS') }}</AText>
				<div class="show_more_wrapper" v-if="deposit.length > depositNumberItems && device === 'MOB'">
					<button class="show_more" @click="filterDeposit" :class="{active: depositIsShow}"> 
						<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
					</button>
				</div>
			</div>
			<div class="right">
				<AText :attributes="textPayoutSettings" v-for="(item, index) in currentDeposit" :key="index">
					<AImg :attributes="{ ...imgSettings, alt: `${item.title} Logo` }" :src="item.thumbnail" /> {{ item.title }}
				</AText>
			</div>
			<div class="show_more_wrapper" v-if="deposit.length > depositNumberItems && device !== 'MOB'">
				<button class="show_more" @click="filterDeposit" :class="{active: depositIsShow}"> 
					<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
				</button>
			</div>
		</div>
		<div class="row">
			<div class="left">
				<AText :attributes="textWithoutMethodsSettings">{{ t('PAYMENTS_OPTIONS') }}</AText>
				<div class="show_more_wrapper" v-if="payments.length > paymentNumberItems && device === 'MOB'">
					<button class="show_more" @click="filterPayment" :class="{active: paymentIsShow}"> 
						<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
					</button>
				</div>
			</div>
			<div class="right">
				<AText :attributes="textPayoutSettings" v-for="(item, index) in currentPayment" :key="index">
					<AImg :attributes="{ ...imgSettings, alt: `${item.title} Logo` }" :src="item.thumbnail" /> {{ item.title }}
				</AText>
			</div>
			<div class="show_more_wrapper" v-if="payments.length > paymentNumberItems && device !== 'MOB'">
				<button class="show_more" @click="filterPayment" :class="{active: paymentIsShow}"> 
					<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
				</button>
			</div>
		</div>
		<div class="row">
			<div class="left">
				<AText :attributes="textGameCurrencySettings">{{ t('GAME_CURRENCY') }}</AText>
				<div class="show_more_wrapper" v-if="currencies.length > currenciesNumberItems && device === 'MOB'">
					<button class="show_more" @click="filterCurrencies" :class="{active: currenciesIsShow}"> 
						<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
					</button>
				</div>
			</div>
			<div class="right">
				<AText :attributes="textItemSettings" v-for="(item, index) in currentCurrencies" :key="index">
					<AImg :attributes="{ ...imgSettings, alt: `${item.title} Logo` }" :src="item.thumbnail" /> {{ item.title }}
				</AText>
			</div>
			<div class="show_more_wrapper" v-if="currencies.length > currenciesNumberItems && device !== 'MOB'">
				<button class="show_more" @click="filterCurrencies" :class="{active: currenciesIsShow}"> 
					<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
				</button>
			</div>
		</div>
		<div class="row">
			<div class="left">
				<AText :attributes="textLangSettings">{{ t('LANG') }}</AText>
				<div class="show_more_wrapper" v-if="languages.length > currentLanguagesItems && device === 'MOB'">
					<button class="show_more" @click="filterLanguages" :class="{active: languagesIsShow}"> 
						<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
					</button>
				</div>
			</div>
			<div class="right">
				<AText :attributes="textItemSettings" v-for="(item, index) in currentLanguages" :key="index">
					<AImg :attributes="{ ...imgSettingsFlag, alt: `${item.title} Logo` }" :src="item.thumbnail" />
					{{ item.title }}
				</AText>
			</div>
			<div class="show_more_wrapper" v-if="languages.length > currentLanguagesItems && device !== 'MOB'">
				<button class="show_more" @click="filterLanguages" :class="{active: languagesIsShow}"> 
					<AImg src="/img/arrowGreenDetails.svg" :attributes="imgSettingsArrow" />
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import components from '~/mixins/components'
import { PROVIDER_NUMBER_ITEMS, DEPOSIT_NUMBER_ITEMS, PAYMENT_NUMBER_ITEMS, CURRENCY_NUMBER_ITEMS, LANGUAGE_NUMBER_ITEMS } from './constants'
export default {
	name: 'casino_detail',
	mixins: [components],
	props: {
		vendors: {
			type: Array,
			default() {
				return []
			}
		},
		payments: {
			type: Array,
			default() {
				return []
			}
		},
		deposit: {
			type: Array,
			default() {
				return []
			}
		},
		currencies: {
			type: Array,
			default() {
				return []
			}
		},
		languages: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			textProvidersSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'medium',
				class: 'provider'
			},
			textDepositMethodsSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'medium',
				class: 'deposit_methods'
			},
			textWithoutMethodsSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'medium',
				class: 'without_methods'
			},
			textGameCurrencySettings: {
				color: 'cairo',
				size: 'small',
				weight: 'medium',
				class: 'game_currency'
			},
			textLangSettings: {
				color: 'cairo',
				size: 'small',
				weight: 'medium',
				class: 'lang'
			},
			imgSettings: {
				width: '26px',
				height: '26px',
				class: 'logo'
			},
			imgSettingsFlag: {
				width: '19px',
				height: '18px',
				class: 'flag_icon'
			},
			imgSettingsArrow: {
				width: '24px',
				height: '24px',
				class: 'arrow',
				alt: 'Green arrow'
			},
			textProviderItemSettings: {
				class: 'item_provider',
				color: 'cairo',
				size: 'small',
				weight: 'regular',
				decoration: 'none'
			},
			textPayoutSettings: {
				class: 'item_payout',
				color: 'cairo',
				weight: 'regular'
			},
			textItemSettings: {
				class: 'item',
				color: 'cairo',
				weight: 'regular'
			},
			vendorsIsShow: false,
			depositIsShow: false,
			paymentIsShow: false,
			currenciesIsShow: false,
			languagesIsShow: false,
		}
	},
	methods: {
		filterVendors() {
			this.vendorsIsShow = !this.vendorsIsShow
		},
		filterDeposit() {
			this.depositIsShow = !this.depositIsShow
		},
		filterPayment() {
			this.paymentIsShow = !this.paymentIsShow
		},
		filterCurrencies() {
			this.currenciesIsShow =!this.currenciesIsShow
		},
		filterLanguages() {
			this.languagesIsShow =!this.languagesIsShow
		}
	},
	computed: {
		currentVendors() {
			const device = this.device || 'DC'
			return this.vendorsIsShow ? this.vendors : this.vendors.slice(0,  PROVIDER_NUMBER_ITEMS[device])
		},
		currentDeposit() {
			const device = this.device || 'DC'
			return this.depositIsShow ? this.deposit : this.deposit.slice(0, DEPOSIT_NUMBER_ITEMS[device])
		},
		currentPayment() {
			const device = this.device || 'DC'
			return this.paymentIsShow ? this.payments : this.payments.slice(0, PAYMENT_NUMBER_ITEMS[device])
		},
		currentCurrencies() {
			const device = this.device || 'DC'
			return this.currenciesIsShow ? this.currencies : this.currencies.slice(0, CURRENCY_NUMBER_ITEMS[device])
		},
		currentLanguages() {
			const device = this.device || 'DC'
			return this.languagesIsShow ? this.languages : this.languages.slice(0, LANGUAGE_NUMBER_ITEMS[device])
		},
		vendorNumberItems() {
			const device = this.device || 'DC'
			return PROVIDER_NUMBER_ITEMS[device]
		},
		depositNumberItems() {
			const device = this.device || 'DC'
			return DEPOSIT_NUMBER_ITEMS[device]
		},
		paymentNumberItems() {
			const device = this.device || 'DC'
			return PAYMENT_NUMBER_ITEMS[device]
		},
		currenciesNumberItems() {
			const device = this.device || 'DC'
			return CURRENCY_NUMBER_ITEMS[device]
		},
		currentLanguagesItems() {
			const device = this.device || 'DC'
			return LANGUAGE_NUMBER_ITEMS[device]
		},
	}
}
</script>

<style scoped>
.flag_icon {
	margin-right: 5px;
	display: block;
}
.row {
	display: flex;
	padding-bottom: 15px;
	padding-top: 20px;
}
.left {
	width: 200px;
	min-width: 200px;
	padding-right: 10px;
}
.right {
	flex-grow: 1;
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	position: relative;
}
.provider,
.deposit_methods,
.without_methods,
.game_currency,
.lang {
	padding-left: 25px;
	position: relative;
}
.provider::before,
.deposit_methods::before,
.without_methods::before,
.game_currency::before,
.lang::before {
	content: '';
	width: 20px;
	height: 20px;
	position: absolute;
	top: 50%;
	left: 0px;
	transform: translateY(-50%);
	background: url('/img/providers.svg') no-repeat;
}
.deposit_methods::before {
	background: url('/img/deposit_methods.svg') no-repeat;
}
.without_methods::before {
	background: url('/img/without.svg') no-repeat;
}
.game_currency::before {
	background: url('/img/game_currency.svg') no-repeat;
}
.lang::before {
	background: url('/img/lang.svg') no-repeat;
}
.item_provider {
	display: flex;
	align-items: center;
	padding: 5px 10px;
	border-radius: var(--s);
	background: rgba(255, 255, 255, 0.1);
	white-space: nowrap;
	font-size: 10px;
	height: 40px;
}
.logo {
	display: block;
	margin-right: 5px;
}
.item_payout {
	font-size: 10px;
	display: flex;
	align-items: center;
	padding: 5px 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	height: 40px;
}
.item {
	font-size: 10px;
	display: flex;
	align-items: center;
	padding: 5px 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	height: 40px;
}
.show_more {
	width: 40px;
	height: 40px;
	border-radius: var(--s);
	background: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: rotate(180deg);
	cursor: pointer;
	transition: 0.7s;
	border: none;
}
.show_more.active {
	transform: rotate(0deg);
}
.show_more_wrapper {
	display: flex;
	justify-content: flex-end;
}
@media (max-width: 767px) {
	.row {
		flex-wrap: wrap;
		padding-top: 0px;
		padding-bottom: 10px;
	}
	.left {
		width: 100%;
		max-width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		padding-right: 0px;
	}
	.right {
		width: 100%;
	}
}
</style>
