<template>
	<main class="main_wrapper">
		<Gradient modifier="large" />
		<div class="container z-index-3">
			<MainPageTop :h1="data.body.h1" :description="data.body.short_desc" />
		</div>
		<div class="container z-index-3">
			<div class="sticky-tabs" id="nav_menu" v-if="data.body.nav_menu.length">
				<NavMenu :value="data.body.nav_menu" />
			</div>
		</div>
		<div class="container z-index-3">
			<TopCasinoList v-if="data.body.casinos.length" :posts="data.body.casinos" />
		</div>
		<div class="container z-index-3">
			<VerifiedCasinoList v-if="data.body.verified_casino.length" :posts="data.body.verified_casino" link="link" />
		</div>
		<div class="container z-index-3 main_gap" id="games">
			<ContentSupport v-if="data.body.content_2" :value="data.body.content_2" />
			<GameSlider v-if="data.body.games.length" :posts="data.body.games" />
		</div>
		<ContentWrapper class="container" v-if="data.body.content_3" id="content_3">
			<ContentSupport :value="data.body.content_3" />
		</ContentWrapper>
		<div class="container z-index-3 sub_gap">
			<h2 class="text_color_cairo m-0">How we rate casinos</h2>
			<HowCreateRating src="/img/rating.png" :text="data.body.content_4" />
		</div>
		<div class="container z-index-3 sub_gap">
			<ContentSupport :value="data.body.content_5" />
			<div class="main_gap">
				<ResponsibleMain :posts="data.body.partners" />
				<div class="learn_more_wrapper">
					<a href="#" class="link_btn cleveland">Learn More</a>
				</div>
			</div>
		</div>
		<div class="container z-index-3">
			<PlayerGuides :text="data.body.content_6" />
		</div>
		<div class="container z-index-3 sub_gap">
			<ContentSupport v-if="data.body.content_7" :value="data.body.content_7" />
			<div class="news_container">
				<div class="news_item" v-for="item in data.body.news.slice(0, 4)" :key="item.title">
					<NewsMainCard
						:link="item.permalink"
						:src="item.thumbnail"
						:title="item.title"
						:date="item.create_at.slice(0, 10)"
						:desc="item.short_desc"
					/>
				</div>
			</div>
		</div>
		<div class="container z-index-3 sub_gap">
			<h2 class="text_color_cairo m-0">Explore Game Categories</h2>
			<GameCategories />
			<ContentSupport v-if="data.body.content_8" :value="data.body.content_8" />
		</div>
		<div class="container z-index-3 sub_gap">
			<h2 class="text_color_cairo m-0">Providers</h2>
			<PartnersLogo />
		</div>
		<ContentWrapper class="container" v-if="data.body.content_9" id="content_9">
			<ContentSupport :value="data.body.content_9" />
		</ContentWrapper>
		<div class="container sub_gap z-index-3" id="mobile_version">
			<h2 class="text_color_cairo m-0">Why This Best For Mobile</h2>
			<BestForMobile
				:mobile_version_ios="Boolean(data.body.mobile_version_ios)"
				:mobile_one_hand_use="Boolean(data.body.mobile_one_hand_use)"
				:mobile_autospins="Boolean(data.body.mobile_autospins)"
				:mobile_tls="Boolean(data.body.mobile_tls)"
			/>
		</div>
		<div class="container z-index-3" v-if="data.body.authors">
			<div class="sub_gap">
				<h2 class="text_color_cairo">People who play and test themselves</h2>
				<AuthorCardLoop :posts="data.body.authors" />
			</div>
		</div>
		<div class="container z-index-3" v-if="data.body.faq.length">
			<div class="sub_gap">
				<h2 class="text_color_cairo">{{ data.body.faq_title }}</h2>
				<Faq :value="data.body.faq" />
			</div>
		</div>
		<Cookies />
	</main>
</template>

<script>
import Gradient from '~/components/gradient'
import components from '~/mixins/components'
import MainPageTop from '~/components/main_page_top'
import VerifiedCasinoList from '~/components/verified_casinos_list'
import GameSlider from '~/components/game_slider'
import ContentSupport from '~/components/content/text_2'
import NavMenu from '~/components/nav_menu'
import ContentWrapper from '~/components/content_wrapper'
import HowCreateRating from '~/components/how_create_rating'
import ResponsibleMain from '~/components/responsible_main'
import PlayerGuides from '~/components/player_guides'
import NewsMainCard from '~/components/news_loop/cards/main'
import GameCategories from '~/components/game_categories'
import PartnersLogo from '~/components/partners_logo'
import BestForMobile from '~/components/best_for_mobile'
import AuthorCardLoop from '~/components/author_card_loop'

export default {
	name: 'front_page',
	mixins: [components],
	components: {
		Gradient,
		MainPageTop,
		NavMenu,
		VerifiedCasinoList,
		ContentSupport,
		GameSlider,
		ContentWrapper,
		HowCreateRating,
		ResponsibleMain,
		PlayerGuides,
		NewsMainCard,
		GameCategories,
		PartnersLogo,
		BestForMobile,
		AuthorCardLoop
	},
	async asyncData({ store, route }) {
		const data = {
			body: {
				h1: 'We test. We play. You win.',
				short_desc:
					'We dive into every casino ourselves — testing games, checking bonuses, and verifying true RTPs. No hype, just honest data to help you play safer and win more often. Each casino featured on CASQUAD is independently tested by our experts. We evaluate bonuses, payout rates, and player experience to ensure accuracy, transparency, and safer gameplay.',
				nav_menu: [
					{
						value_1: 'Why This Method Matters',
						value_2: 'content_1'
					},
					{
						value_1: 'Rule of 30 Spins',
						value_2: 'content_2'
					},
					{
						value_1: 'Slot Selection',
						value_2: 'content_4'
					},
					{
						value_1: 'High vs Low Volatility',
						value_2: 'content_5'
					},
					{
						value_1: 'Session Diagnostics',
						value_2: 'content_6'
					},
					{
						value_1: 'Pressure & Extraction',
						value_2: 'content_7'
					},
					{
						value_1: 'Bankroll Management',
						value_2: 'content_8'
					},
					{
						value_1: 'Trusted Platforms',
						value_2: 'content_9'
					},
					{
						value_1: 'FAQ & Myths',
						value_2: 'faq'
					},
					{
						value_1: 'Summary & Next Steps',
						value_2: 'content_10'
					},
					{
						value_1: 'Add Review',
						value_2: 'reviews'
					}
				],
				casinos: [
					{
						thumbnail: 'https://api.casquads.com/public/downloads/rocketplay-210x92-bez-fona-white-6841aeca06746.webp',
						rating: 97,
						permalink: '/casino/rocketplay',
						title: 'Rocketplay',
						ref: {
							WORLD: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=979',
							CA: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=979',
							AU: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=978',
							DE: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=980'
						},
						color: '#272A33',
						label: 'best',
						advantages: [
							'Fast Withdrawals',
							'Crypto & Fiat Payments',
							'Mobile-Optimized, Clean UI, Secure Platform',
							'Sports Betting Section + Tournaments'
						],
						wager: '40x',
						min_dep: '$20',
						bonus_value: '100% to $1,000 + 100 FS',
						vendors: [
							{
								title: 'Pragmatic Play',
								permalink: '/vendor/pragmatic-play',
								thumbnail: 'https://api.casquads.com/public/downloads/pragmatic-play-108x68-669c0706aeefb.png'
							},
							{
								title: 'Yggdrasil',
								permalink: '/vendor/yggdrasil',
								thumbnail: 'https://api.casquads.com/public/downloads/yggdrasil-108x68-669c0729bc4a4.png'
							},
							{
								title: 'Quickspin',
								permalink: '/vendor/quickspin',
								thumbnail: 'https://api.casquads.com/public/downloads/quickspin-108x68-669c051ba4ae2.png'
							},
							{
								title: 'Betsoft Gaming',
								permalink: '/vendor/betsoft',
								thumbnail: 'https://api.casquads.com/public/downloads/betsoft-108x68-669c0407555a1.png'
							},
							{
								title: "Play'n GO",
								permalink: '/vendor/playn-go',
								thumbnail: 'https://api.casquads.com/public/downloads/playngo-108x68-669c0831bf01c.png'
							},
							{
								title: 'Booming Games',
								permalink: '/vendor/booming-games',
								thumbnail: 'https://api.casquads.com/public/downloads/booming-108x68-669c04e2dac15.png'
							},
							{
								title: 'Microgaming',
								permalink: '/vendor/microgaming',
								thumbnail:
									'https://api.casquads.com/public/downloads/microgaming-108x68-bez-fona-v3-1-669c062ee2ab6.png'
							}
						],
						icon: 'https://api.casquads.com/public/downloads/rocketplay-200x200-bez-fona-v2-6841aed7b43b5.webp',
						payout: '0-5d',
						win_rate: '96%'
					},
					{
						thumbnail: 'https://api.casquads.com/public/downloads/win-spirit-210x92-6781110e27121-6830187e6cd28.webp',
						rating: 94,
						permalink: '/casino/winspirit',
						title: 'WinSpirit',
						ref: {
							WORLD: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=987',
							CA: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=987',
							AU: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=986',
							DE: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=988'
						},
						color: '#2A2442',
						label: 'best',
						advantages: [
							'7,500+ Games from 70+ Providers',
							'Fast Withdrawals',
							'12-Level VIP & Loyalty Program',
							'Mobile App + 20 No-Deposit FS Bonus'
						],
						wager: '40x',
						min_dep: '$30',
						bonus_value: '100% to $1,000 + 100 FS',
						vendors: [
							{
								title: 'Pragmatic Play',
								permalink: '/vendor/pragmatic-play',
								thumbnail: 'https://api.casquads.com/public/downloads/pragmatic-play-108x68-669c0706aeefb.png'
							},
							{
								title: 'Yggdrasil',
								permalink: '/vendor/yggdrasil',
								thumbnail: 'https://api.casquads.com/public/downloads/yggdrasil-108x68-669c0729bc4a4.png'
							},
							{
								title: 'Quickspin',
								permalink: '/vendor/quickspin',
								thumbnail: 'https://api.casquads.com/public/downloads/quickspin-108x68-669c051ba4ae2.png'
							},
							{
								title: 'Betsoft Gaming',
								permalink: '/vendor/betsoft',
								thumbnail: 'https://api.casquads.com/public/downloads/betsoft-108x68-669c0407555a1.png'
							},
							{
								title: "Play'n GO",
								permalink: '/vendor/playn-go',
								thumbnail: 'https://api.casquads.com/public/downloads/playngo-108x68-669c0831bf01c.png'
							},
							{
								title: 'Booming Games',
								permalink: '/vendor/booming-games',
								thumbnail: 'https://api.casquads.com/public/downloads/booming-108x68-669c04e2dac15.png'
							},
							{
								title: 'Microgaming',
								permalink: '/vendor/microgaming',
								thumbnail:
									'https://api.casquads.com/public/downloads/microgaming-108x68-bez-fona-v3-1-669c062ee2ab6.png'
							}
						],
						icon: 'https://api.casquads.com/public/downloads/win-spirit-200x200-6781111719219-68300d6dcb953.webp',
						payout: '0-24h',
						win_rate: '96%'
					},
					{
						thumbnail:
							'https://api.casquads.com/public/downloads/golden-star-210x92-1-669bfdd0953b4-68301e5d35ec9.webp',
						rating: 92,
						permalink: '/casino/golden-star-casino',
						title: 'Golden Star Casino',
						ref: {
							WORLD: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=2686',
							CA: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=2686',
							AU: 'https://wondrous-paramount-exuberance.space/?sub1=seo&sub3=172&offer_id=2685'
						},
						color: '#141A24',
						label: 'best',
						advantages: [
							'Instant Crypto Payments',
							'Over 4,000 Games from 50+ top studios',
							'Comp Points & VIP Levels',
							'Exclusive Telegram & WhatsApp Bonuses'
						],
						wager: '40x',
						min_dep: '$30',
						bonus_value: '100% to $1,500 + 300 FS',
						vendors: [
							{
								title: 'Pragmatic Play',
								permalink: '/vendor/pragmatic-play',
								thumbnail: 'https://api.casquads.com/public/downloads/pragmatic-play-108x68-669c0706aeefb.png'
							},
							{
								title: 'Yggdrasil',
								permalink: '/vendor/yggdrasil',
								thumbnail: 'https://api.casquads.com/public/downloads/yggdrasil-108x68-669c0729bc4a4.png'
							},
							{
								title: 'Quickspin',
								permalink: '/vendor/quickspin',
								thumbnail: 'https://api.casquads.com/public/downloads/quickspin-108x68-669c051ba4ae2.png'
							},
							{
								title: 'Betsoft Gaming',
								permalink: '/vendor/betsoft',
								thumbnail: 'https://api.casquads.com/public/downloads/betsoft-108x68-669c0407555a1.png'
							},
							{
								title: 'Booming Games',
								permalink: '/vendor/booming-games',
								thumbnail: 'https://api.casquads.com/public/downloads/booming-108x68-669c04e2dac15.png'
							},
							{
								title: 'Novomatic',
								permalink: '/vendor/novomatic',
								thumbnail: 'https://api.casquads.com/public/downloads/novomatic-108x68-669c056521d1d.png'
							}
						],
						icon: 'https://api.casquads.com/public/downloads/golden-star-200x200-1-669bfdd4edb57-68301646cf6b9.webp',
						payout: '0-5d',
						win_rate: '96%'
					}
				],
				verified_casino: [
					{
						src: '/img/sack-dollar.svg',
						title: 'Top Payouts',
						subTitle: 'We feature casinos with the highest verified payout rates and fair RTPs.'
					},
					{
						src: '/img/shield-check.svg',
						title: 'Verified Licenses',
						subTitle: 'Every brand is checked for valid licensing, player protection, and transparency.'
					},
					{
						src: '/img/bolt_green.svg',
						title: 'Instant Withdrawals',
						subTitle: 'Fast and hassle-free cashouts so your winnings reach you without delay.'
					}
				],
				games: [
					{
						title: 'Sugar Rush',
						permalink: '/game/sugar-rush',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3263-654759013fa3b.png',
						vendor: {
							title: 'Ezugi',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-9-6546419b28b00.png',
							permalink: '/vendor/tom-horn-gaming'
						},
						game_week: 0,
						slider_img: 'http://127.0.0.1:8000/downloads/bonus-1-682d88533dfe8.webp',
						iframe: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs20doghouse',
						ref: {
							WORLD: 'test-link-1',
							GB: 'test-link-2',
							BD: 'test-link-3',
							AU: 'test-link-3'
						}
					},
					{
						title: 'Dog house',
						permalink: '/game/dog-house',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3267-65475936d8315.png',
						vendor: {
							title: 'Yggdrasil',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-10-654641a8404f7.png',
							permalink: '/vendor/new-vendor-test'
						},
						game_week: 0,
						slider_img: '',
						iframe: '',
						ref: []
					},
					{
						title: 'Sweet Bonanza',
						permalink: '/game/sweet-bonanza',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3264-65475a00692a9.png',
						vendor: {
							title: 'Microgaming',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-12-654642707f525.png',
							permalink: '/vendor/netgame'
						},
						game_week: 0,
						slider_img: '',
						iframe: '',
						ref: []
					},
					{
						title: 'Fat Panda',
						permalink: '/game/fat-panda',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3265-65475aa526e3a.png',
						vendor: {
							title: 'Yggdrasil',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-10-654641a8404f7.png',
							permalink: '/vendor/new-vendor-test'
						},
						game_week: 0,
						slider_img: '',
						iframe: '',
						ref: []
					},
					{
						title: 'Lobster Bobs',
						permalink: '/game/lobster-bobe',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3261-653e11286b645.png',
						vendor: {
							title: 'Yggdrasil',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-10-654641a8404f7.png',
							permalink: '/vendor/new-vendor-test'
						},
						game_week: 0,
						slider_img: '',
						iframe:
							'https://staticpff.yggdrasilgaming.com/init/launchClient.html?gameid=7304&org=Demo&currency=EUR&lang=en&channel=pc&key=',
						ref: {
							GB: 'link-1',
							BD: 'link-2',
							CA: 'link-3',
							AU: 'link-4',
							WORLD: 'link-5',
							default: null
						}
					},
					{
						title: 'Spell Binding',
						permalink: '/game/spell-binding',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3263-653e11babc7e4.png',
						vendor: {
							title: 'Kalamba',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-11-654642c919843.png',
							permalink: '/vendor/thunderkick'
						},
						game_week: 0,
						slider_img: '',
						iframe: '',
						ref: []
					},
					{
						title: 'Mammonts Peak',
						permalink: '/game/mammonts-peak',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3267-653e124818643.png',
						vendor: {
							title: 'Ezugi',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-9-6546419b28b00.png',
							permalink: '/vendor/tom-horn-gaming'
						},
						game_week: 0,
						slider_img: '',
						iframe: '',
						ref: []
					},
					{
						title: 'Lamp of Infinity',
						permalink: '/game/lamp-of-infinity',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3265-653e12d0c38ea.png',
						vendor: {
							title: 'Microgaming',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-12-654642707f525.png',
							permalink: '/vendor/netgame'
						},
						game_week: 0,
						slider_img: '',
						iframe: '',
						ref: []
					},
					{
						title: 'Luxor Gold',
						permalink: '/game/luxor-gold',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3268-653e13602051e.png',
						vendor: {
							title: 'Kalamba',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-11-654642c919843.png',
							permalink: '/vendor/thunderkick'
						},
						game_week: 0,
						slider_img: '',
						iframe: '',
						ref: []
					},
					{
						title: 'Royal Joker',
						permalink: '/game/royal-joker',
						thumbnail: 'http://127.0.0.1:8000/downloads/rectangle-3269-653e13ca676bc.png',
						vendor: {
							title: 'Kalamba',
							thumbnail: 'http://127.0.0.1:8000/downloads/group-11-654642c919843.png',
							permalink: '/vendor/thunderkick'
						},
						game_week: 0,
						slider_img: '',
						iframe: 'adsda',
						ref: []
					}
				],
				content_3: `<div class="table-wrapper">
 <table class="custom-table">
  <thead>
   <tr>
    <th>Term</th>
    <th>Explanation</th>
    <th>Term</th>
    <th>Explanation</th>
    <th>Term</th>
    <th>Explanation</th>
   </tr>
  </thead>
  <tbody>
   <tr>
    <td class="term">HTML</td>
    <td>The standard markup language used to structure content on the web.</td>
    <td class="term">CSS</td>
    <td>A style sheet language used for describing the look and layout of HTML elements.</td>
    <td class="term">JavaScript</td>
    <td>A scripting language that enables interactive and dynamic web pages.</td>
   </tr>
   <tr>
    <td class="term">Frontend</td>
    <td>The part of a website or app that users interact with directly.</td>
    <td class="term">Backend</td>
    <td>The server-side logic and database operations that power a web app.</td>
    <td class="term">API</td>
    <td>A set of rules that allows communication between software components.</td>
   </tr>
   <tr>
    <td class="term">Framework</td>
    <td>A pre-built collection of tools and libraries for faster and more organized development.</td>
    <td class="term">Library</td>
    <td>A reusable collection of code focused on specific functionality.</td>
    <td class="term">Database</td>
    <td>A structured system for storing and managing data efficiently.</td>
   </tr>
   <tr>
    <td class="term">SEO</td>
    <td>Search Engine Optimization — improving a site’s visibility in search results.</td>
    <td class="term">Hosting</td>
    <td>A service that stores website files and makes them accessible online.</td>
    <td class="term">Domain</td>
    <td>The unique web address where a website can be found.</td>
   </tr>
   <tr>
    <td class="term">Responsive Design</td>
    <td>An approach to web design that ensures content looks good on all devices.</td>
    <td class="term">UX</td>
    <td>User Experience — how easy and pleasant it is to interact with a product.</td>
    <td class="term">UI</td>
    <td>User Interface — the visual layout of elements that users interact with.</td>
   </tr>
  </tbody>
 </table>
</div>`,
				content_4:
					'<p>Every casino featured on CASQUAD goes through a 25-step real-player review process. We don’t rely on promotional claims — our team tests every platform hands-on to see how it performs in real play conditions. Each casino is also rated for customer support quality, game variety, and mobile performance, giving players an honest look at what to expect before signing up.</p><p><b>We verify licenses and security standards, test bonuses and wagering terms for fairness, and measure cashout speedthrough real withdrawals.</b></p><p><a href="#" class="link_btn cleveland">Learn about our process</a></p>',
				content_5: `<h2 style="text-align: center">Safer play is our priority</h2>
                    <p style="text-align: center"><b>Need help? Regional support services</b></p>
                    <p style="text-align: center">We promote responsible gaming: deposit limits, time‑outs, and self‑exclusion. If it stops being fun — take a break and reach out to specialist organizations.</p>
                    <p style="text-align: center"><b>We partner with leading responsible gambling organizations.</b></p>`,
				partners: [
					'https://api.casquads.com/public/downloads/dmca-656c41f6467af-66bc66b92c3c5-68342d3cbca45.webp',
					'https://api.casquads.com/public/downloads/begamblingaware-656c4218547ac-66bc66d530219-68342d8568f5f.webp',
					'https://api.casquads.com/public/downloads/mc-656c422ab4ed7-66bc66e2bb324-68342e0c9479e.webp',
					'https://api.casquads.com/public/downloads/mc-2-656c42394e609-66bc66ec1f71c-68342e5b6da56.webp',
					'https://api.casquads.com/public/downloads/mc-3-656c42487d651-66bc66fa9c91a-68342eae85f71.webp',
					'https://api.casquads.com/public/downloads/mc-4-656c42a34831f-66bc6704e7538-68342f15532ea.webp'
				],
				content_6: `<h2>Player‑Ready Guides</h2>
                    <p><b>Need help? Regional support services</b></p>
                    <p>We promote responsible gaming: deposit limits, time‑outs, and self‑exclusion. If it stops being fun — take a break and reach out to specialist organizations.</p>
                    <p><b>We partner with leading responsible gambling organizations.</b></p>`,
				content_7: '<h2>What’s new in iGaming</h2><p>Short insights, regulator updates, and editor’s picks.</p>',
				news: [
					{
						title: 'New Regulations on Gambling Ads Every Canadian Player Should Know',
						permalink: '/news/new-regulations-on-gambling-ads-every-canadian-player-should-know',
						thumbnail: 'https://api.casquads.com/public/downloads/tcxtz-fux3i-68340982ce66c.webp',
						icon: 'https://api.casquads.com/public/downloads/v2-ads-128-66fd9b57927e5.png',
						create_at: '2024-10-02 00:00:00',
						short_desc:
							'Applies to Every Canadian Gambler! Risks and benefits of new gambling ad regulations in Canada. What does it mean for your gaming experience?'
					},
					{
						title: 'Big Wins Ahead: Play Alberta and Flames Unite',
						permalink: '/news/big-wins-ahead-play-alberta-and-flames-unite',
						thumbnail: 'https://api.casquads.com/public/downloads/t85cc-nmeet-68340afa82ce6.webp',
						icon: 'https://api.casquads.com/public/downloads/play-alberta-66fbeac433e6c.png',
						create_at: '2024-09-20 00:00:00',
						short_desc:
							'Discover how Play Alberta’s sponsorship of the Calgary Flames unlocks exciting new opportunities for gamblers, including exclusive bonuses, special promotions, and bigger rewards.'
					},
					{
						title: 'Loto-Québec’s Revenue Slump: Is Digital Gaming the Future?',
						permalink: '/news/loto-quebecs-revenue-slump-is-digital-gaming-the-future',
						thumbnail: 'https://api.casquads.com/public/downloads/tii4m-zdvcp-68340b45a13dd.webp',
						icon: 'https://api.casquads.com/public/downloads/quebecs-revenue-66fbeb6461aee.png',
						create_at: '2024-09-06 00:00:00',
						short_desc:
							'Discover why Loto-Québec’s profits dropped by 6% and how their shift to mobile gaming could bring them back on top. Is it time to place your bets online?'
					},
					{
						title: 'DraftKings and EveryMatrix Unite: What’s in it for Ontario Players?',
						permalink: '/news/draftkings-and-everymatrix-unite-whats-in-it-for-ontario-players',
						thumbnail: 'https://api.casquads.com/public/downloads/tx210-yd0un-68340b942522b.webp',
						icon: 'https://api.casquads.com/public/downloads/everymatrix-66fbe179a29da.png',
						create_at: '2024-08-29 00:00:00',
						short_desc:
							'DraftKings and EveryMatrix just joined forces, unlocking huge jackpot opportunities and more games for Ontario players. Get in early for your shot at massive wins!'
					}
				],
				content_8:
					'<p>Slots: varied volatility & RTP — check info panels. Roulette: prefer European (single zero). Blackjack: learn basic strategy; side bets raise variance. Video Poker: paytables matter. Live Games: social & immersive — watch table limits.</p>',
				content_9: `
<h2>Payment methods</h2>
<div class="table-wrapper">
 <table class="custom-table">
  <thead>
   <tr>
    <th>Term</th>
    <th>Explanation</th>
    <th>Term</th>
    <th>Explanation</th>
    <th>Term</th>
    <th>Explanation</th>
   </tr>
  </thead>
  <tbody>
   <tr>
    <td class="term">HTML</td>
    <td>The standard markup language used to structure content on the web.</td>
    <td class="term">CSS</td>
    <td>A style sheet language used for describing the look and layout of HTML elements.</td>
    <td class="term">JavaScript</td>
    <td>A scripting language that enables interactive and dynamic web pages.</td>
   </tr>
   <tr>
    <td class="term">Frontend</td>
    <td>The part of a website or app that users interact with directly.</td>
    <td class="term">Backend</td>
    <td>The server-side logic and database operations that power a web app.</td>
    <td class="term">API</td>
    <td>A set of rules that allows communication between software components.</td>
   </tr>
   <tr>
    <td class="term">Framework</td>
    <td>A pre-built collection of tools and libraries for faster and more organized development.</td>
    <td class="term">Library</td>
    <td>A reusable collection of code focused on specific functionality.</td>
    <td class="term">Database</td>
    <td>A structured system for storing and managing data efficiently.</td>
   </tr>
   <tr>
    <td class="term">SEO</td>
    <td>Search Engine Optimization — improving a site’s visibility in search results.</td>
    <td class="term">Hosting</td>
    <td>A service that stores website files and makes them accessible online.</td>
    <td class="term">Domain</td>
    <td>The unique web address where a website can be found.</td>
   </tr>
   <tr>
    <td class="term">Responsive Design</td>
    <td>An approach to web design that ensures content looks good on all devices.</td>
    <td class="term">UX</td>
    <td>User Experience — how easy and pleasant it is to interact with a product.</td>
    <td class="term">UI</td>
    <td>User Interface — the visual layout of elements that users interact with.</td>
   </tr>
  </tbody>
 </table>
</div>`,
				faq_title: 'Faq',
				faq: [
					{
						value_1: 'Are mobile platforms safe?',
						value_2:
							'Yes, if they’re licensed (MGA, Curacao, UKGC) and protected by SSL. Most online gambling apps also use advanced encryption to ensure that players’ data and transactions remain secure.'
					},
					{
						value_1: 'Can you win real money from your phone?',
						value_2:
							'Absolutely - I’ve done it many times. Just use a verified account and trusted casino apps real money platforms to ensure secure payouts and fair play.'
					},
					{
						value_1: 'How fast are payouts?',
						value_2:
							'From 10 minutes (crypto) to 2 days (cards). The exact speed often depends on the payment method and the platform you choose - even the best real money online casino sites can vary in how quickly they process withdrawals.'
					},
					{
						value_1: 'Do I need to install an app?',
						value_2:
							'Not necessarily - you can play directly in your browser, but real gambling apps are often faster, more stable, and more convenient for frequent players.'
					},
					{
						value_1: 'Do mobile versions offer bonuses?',
						value_2:
							'The same ones as desktop - and sometimes even exclusive free rounds. Many casino apps for real money online also feature special mobile-only promotions to attract players on the go.'
					}
				],
				authors: [
					{
						title: 'Alex Hunter',
						permalink: '/author/alex-hunter',
						thumbnail: 'https://api.casquads.com/public/downloads/author-thumbnail-68d3ba38d4c43.png',
						create_at: '2025-09-24 00:00:00',
						position: '@alexhunter • Author at Casquad.com since • 2020',
						social: [
							{
								src: 'http://127.0.0.1:8000/downloads/telega-68ccdc0e01c94.png',
								value_1: 'telegram/link',
								value_2: 'telegram alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/fb-68ccdc315f466.png',
								value_1: 'fb/link',
								value_2: 'fb alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/x-68ccdc5e880c7.png',
								value_1: 'x/link',
								value_2: 'x alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/insta-68ccdc75b37da.png',
								value_1: 'insta/link',
								value_2: 'insta alt'
							}
						],
						role: 'Editor Writer'
					},
					{
						title: 'Alex Hunter',
						permalink: '/author/alex-hunter',
						thumbnail: 'https://api.casquads.com/public/downloads/author-thumbnail-68d3ba38d4c43.png',
						create_at: '2025-09-24 00:00:00',
						position: '@alexhunter • Author at Casquad.com since • 2020',
						social: [
							{
								src: 'http://127.0.0.1:8000/downloads/telega-68ccdc0e01c94.png',
								value_1: 'telegram/link',
								value_2: 'telegram alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/fb-68ccdc315f466.png',
								value_1: 'fb/link',
								value_2: 'fb alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/x-68ccdc5e880c7.png',
								value_1: 'x/link',
								value_2: 'x alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/insta-68ccdc75b37da.png',
								value_1: 'insta/link',
								value_2: 'insta alt'
							}
						],
						role: 'Editor Writer'
					},
					{
						title: 'Alex Hunter',
						permalink: '/author/alex-hunter',
						thumbnail: 'https://api.casquads.com/public/downloads/author-thumbnail-68d3ba38d4c43.png',
						create_at: '2025-09-24 00:00:00',
						position: '@alexhunter • Author at Casquad.com since • 2020',
						social: [
							{
								src: 'http://127.0.0.1:8000/downloads/telega-68ccdc0e01c94.png',
								value_1: 'telegram/link',
								value_2: 'telegram alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/fb-68ccdc315f466.png',
								value_1: 'fb/link',
								value_2: 'fb alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/x-68ccdc5e880c7.png',
								value_1: 'x/link',
								value_2: 'x alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/insta-68ccdc75b37da.png',
								value_1: 'insta/link',
								value_2: 'insta alt'
							}
						],
						role: 'Editor Writer'
					},
					{
						title: 'Alex Hunter',
						permalink: '/author/alex-hunter',
						thumbnail: 'https://api.casquads.com/public/downloads/author-thumbnail-68d3ba38d4c43.png',
						create_at: '2025-09-24 00:00:00',
						position: '@alexhunter • Author at Casquad.com since • 2020',
						social: [
							{
								src: 'http://127.0.0.1:8000/downloads/telega-68ccdc0e01c94.png',
								value_1: 'telegram/link',
								value_2: 'telegram alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/fb-68ccdc315f466.png',
								value_1: 'fb/link',
								value_2: 'fb alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/x-68ccdc5e880c7.png',
								value_1: 'x/link',
								value_2: 'x alt'
							},
							{
								src: 'http://127.0.0.1:8000/downloads/insta-68ccdc75b37da.png',
								value_1: 'insta/link',
								value_2: 'insta alt'
							}
						],
						role: 'Editor Writer'
					}
				]
			}
		}
		return { data }
	}
}
</script>
<style scoped>
.learn_more_wrapper {
	display: flex;
	justify-content: center;
}
.learn_more_wrapper .link_btn {
	display: inline-flex;
	padding: 13px 27px;
	border-radius: 16px;
	text-decoration: none;
	font-size: 16px;
}
.learn_more_wrapper .link_btn.cleveland {
	background: var(--cleveland);
	color: var(--cairo);
}
.news_container {
	display: flex;
	justify-content: space-between;
}
@media (max-width: 767px) {
	.news_container {
		overflow-y: scroll;
		gap: 20px;
		margin-right: -20px;
	}
	.news_container .item:last-child {
		margin-right: 20px;
	}
	@media (min-width: 768px) and (max-width: 1200px) {
		.news_container {
			overflow-y: scroll;
			gap: 20px;
			margin-right: -20px;
		}
		.news_container .item:last-child {
			margin-right: 20px;
		}
	}
}
</style>
