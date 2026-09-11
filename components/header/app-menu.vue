<template>
	<div class="header_menu">
		<nav class="header_menu_container">
			<div
				v-for="(item, index) in settings"
				:key="index"
				class="header_menu_item"
				:class="{
					'has-submenu': hasSubmenu(item),
					'submenu-open': openSubmenuIndex === index
				}"
				:data-active="isItemActive(item)"
				@mouseenter="onMouseEnter(index, item)"
				@mouseleave="onMouseLeave"
			>
				<template v-if="hasSubmenu(item)">
					<div class="header_menu_dropdown" @click.stop="toggleSubmenu(index)">
						<ALink
							v-if="item.value_2"
							:href="item.value_2"
							:attributes="linkSettings"
							class="header_menu_dropdown_link"
							@click.stop
						>
							{{ item.value_1 }}
						</ALink>
						<span v-else class="header_menu_dropdown_btn">
							{{ item.value_1 }}
						</span>
						<span class="header_menu_arrow_btn" :class="{ open: openSubmenuIndex === index }">
							<AImg :attributes="arrowImgSettings" src="/img/white_arrow.png" />
						</span>
					</div>
					<div class="header_menu_submenu">
						<div
							v-for="(subItem, subIndex) in getSubmenu(item)"
							:key="subIndex"
							class="header_menu_submenu_item"
							:data-active="activeLink(subItem.value_2)"
						>
							<ALink
								:href="subItem.value_2"
								:attributes="submenuLinkSettings"
								@click="closeSubmenu"
							>
								{{ subItem.value_1 }}
							</ALink>
						</div>
					</div>
				</template>
				<template v-else>
					<ALink :href="item.value_2" :attributes="linkSettings">{{
						item.value_1
					}}</ALink>
				</template>
			</div>
		</nav>
	</div>
</template>
<script>
import components from '~/mixins/components'
export default {
	name: 'app-menu',
	mixins: [components],
	data() {
		return {
			linkSettings: {
				color: 'cairo',
				text_transform: 'uppercase',
				weight: 'regular',
				size: 'small',
				decoration: 'none'
			},
			submenuLinkSettings: {
				color: 'cairo',
				text_transform: 'uppercase',
				weight: 'regular',
				size: 'small',
				decoration: 'none'
			},
			arrowImgSettings: {
				alt: 'arrow'
			},
			settings: [],
			openSubmenuIndex: null
		}
	},
	watch: {
		'$route.path'() {
			this.openSubmenuIndex = null
		}
	},
	methods: {
		hasSubmenu(item) {
			return this.getSubmenu(item).length > 0
		},
		getSubmenu(item) {
			const submenu = item.child || item.children || item.submenu || item.value
			return Array.isArray(submenu) ? submenu.filter(subItem => subItem && subItem.value_1) : []
		},
		activeLink(link) {
			if (!link) return false
			const currentPath = this.$route.path.replace(/\/+$/, '') || '/'
			const menuPath = link.replace(/\/+$/, '') || '/'
			return currentPath === menuPath
		},
		isItemActive(item) {
			if (this.activeLink(item.value_2)) {
				return true
			}
			return this.getSubmenu(item).some(subItem => this.activeLink(subItem.value_2))
		},
		toggleSubmenu(index) {
			this.openSubmenuIndex = this.openSubmenuIndex === index ? null : index
		},
		closeSubmenu() {
			this.openSubmenuIndex = null
		},
		onMouseEnter(index, item) {
			if (this.device === 'DC' && this.hasSubmenu(item)) {
				this.openSubmenuIndex = index
			}
		},
		onMouseLeave() {
			if (this.device === 'DC') {
				this.openSubmenuIndex = null
			}
		},
		handleClickOutside(event) {
			if (this.device === 'DC' && !this.$el.contains(event.target)) {
				this.openSubmenuIndex = null
			}
		}
	},
	async mounted() {
		const data = { lang: 1 }
		await this.$store.dispatch('settings/setSettings', data)
		const settings = this.$store.getters['settings/getSettings']
		if (settings.length !== 0) {
			this.settings = settings.filter(item => item.key === 'header_menu')[0].value
		}
		document.addEventListener('click', this.handleClickOutside)
	},
	beforeDestroy() {
		document.removeEventListener('click', this.handleClickOutside)
	}
}
</script>

<style scoped lang="scss">
.header_menu_container {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	gap: 20px;
	justify-content: center;
}
.header_menu_item {
	position: relative;
	display: inline-flex;
	align-items: center;
	flex-shrink: 0;
	padding-bottom: 6px;
	border-bottom: 4px solid transparent;
	box-sizing: border-box;
}
@media (min-width: 1201px) {
	.header_menu_item.has-submenu::after {
		content: '';
		position: absolute;
		top: 100%;
		left: -20px;
		right: -20px;
		height: 16px;
	}
}
.header_menu_item[data-active='true'] {
	border-bottom-color: var(--calgary);
}
.header_menu_dropdown {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	cursor: pointer;
	line-height: 1;
	white-space: nowrap;
}
.header_menu_dropdown_btn {
	color: var(--cairo);
	font-size: 14px;
	line-height: 1;
	text-transform: uppercase;
}
.header_menu_item > a {
	line-height: 1;
	white-space: nowrap;
}
.header_menu_arrow_btn {
	display: flex;
	align-items: center;
	flex-shrink: 0;
	transition: transform 0.2s;
}
.header_menu_arrow_btn img {
	display: block;
}
.header_menu_item.submenu-open .header_menu_arrow_btn,
.header_menu_arrow_btn.open {
	transform: rotate(180deg);
}
@media (min-width: 1201px) {
	.header_menu_item.has-submenu:hover .header_menu_arrow_btn {
		transform: rotate(180deg);
	}
}
.header_menu_submenu {
	display: none;
	position: absolute;
	top: calc(100% + 6px);
	left: 50%;
	transform: translateX(-50%);
	min-width: 220px;
	padding: 6px 0;
	border-radius: 14px;
	background: #311b92;
	border: none;
	box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
	z-index: 20;
	overflow: hidden;
}
@media (min-width: 1201px) {
	.header_menu_submenu::before {
		content: '';
		position: absolute;
		bottom: 100%;
		left: -20px;
		right: -20px;
		height: 12px;
	}
}
@media (min-width: 1201px) {
	.header_menu_item.has-submenu:hover .header_menu_submenu,
	.header_menu_item.submenu-open .header_menu_submenu {
		display: block;
	}
}
.header_menu_submenu_item {
	padding: 8px 16px;
	white-space: nowrap;
	transition: background-color 0.15s ease;
}
.header_menu_submenu_item:hover,
.header_menu_submenu_item[data-active='true'] {
	background: rgba(255, 255, 255, 0.12);
}
@media (max-width: 767px) {
	.header_menu_container {
		flex-direction: column;
		flex-wrap: nowrap;
		gap: 12px;
		margin-top: 20px;
	}
	.header_menu_item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		padding-bottom: 0;
		border-bottom: none;
	}
	.header_menu_submenu {
		position: static;
		transform: none;
		width: 100%;
		margin-top: 8px;
		padding: 4px 0;
		background: #311b92;
		border: none;
		border-radius: 14px;
		box-shadow: none;
		overflow: hidden;
	}
	.header_menu_item.has-submenu.submenu-open .header_menu_submenu {
		display: block;
	}
	.header_menu_dropdown {
		width: 100%;
		justify-content: space-between;
	}
}
@media (min-width: 768px) and (max-width: 1200px) {
	.header_menu_container {
		flex-direction: column;
		flex-wrap: nowrap;
		gap: 12px;
		margin-top: 20px;
	}
	.header_menu_item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		padding-bottom: 0;
		border-bottom: none;
	}
	.header_menu_submenu {
		position: static;
		transform: none;
		width: 100%;
		margin-top: 8px;
		padding: 4px 0;
		background: #311b92;
		border: none;
		border-radius: 14px;
		box-shadow: none;
		overflow: hidden;
	}
	.header_menu_item.has-submenu.submenu-open .header_menu_submenu {
		display: block;
	}
	.header_menu_dropdown {
		width: 100%;
		justify-content: space-between;
	}
}
.header_menu_arrow_btn img {
	width: 12px;
	height: 12px;
	display: block;
}
</style>
