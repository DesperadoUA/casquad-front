<template>
	<div class="slick_bonus">
        <div class="bonus">
            <AImg src="/img/Gift.svg" :attributes="imgSettings" @onClick="refActivate(refLinks, geo)" />
        </div>
        <AButton :attributes="btnSettings" title="Get bonus" @onClick="refActivate(refLinks, geo)">
            {{ t('GET_BONUS') }}
        </AButton>
	</div>
</template>

<script>
import translateMixin from '~/mixins/translate'
import refMixin from '~/mixins/ref'
import components from '~/mixins/components'
import geo from '~/mixins/geo'
export default {
	name: 'app_slick_bonus',
    data: () => {
		return {
			imgSettings: {
				width: '35px',
				height: '35px',
                alt: 'Gif'
			},
            btnSettings: {
				bg: 'calgary',
				color: 'cucuta',
				borderRadius: 's',
				weight: 'semi-bold',
				text_transform: 'uppercase',
                class: 'action_btn'
			},
		}
	},
	mixins: [refMixin, translateMixin, components, geo],
}
</script>

<style scoped>
.slick_bonus {
    position: fixed;
    width: 60px;
    height: 50px;
    bottom: 20px;
    right: 20px;
    z-index: 5;
}
.bonus {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 60px;
    height: 50px;
    align-items: center;
    justify-content: center;
    background: var(--calgary);
    border-radius: var(--s);
    transition: 0.7s;
    z-index: 1;
}
.action_btn {
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 80px;
    width: 150px!important;
    z-index: 2;
}
@media (min-width: 767px) {
	.slick_bonus:hover .bonus {
        left: -70px;
    }
    .slick_bonus:hover .action_btn {
        left: -90px;
        transition: 0.7s;
    }
}
</style>
