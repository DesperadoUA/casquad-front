<template>
		<Fancybox :options="{Carousel: {infinite: false}}">
			<div class="item_container video_gallery_slider">
                <Slider :settings="sliderSettings">
                    <a class="item" v-for="(item, index) in posts" :key="index"  data-fancybox="iframe" :href="item.iframe">
					    <VideoItem :src="item.banner" :title="item.title" />
				    </a>
                </Slider>
			</div>
		</Fancybox>
</template>
<script>
import Fancybox  from '~/components/fancybox';
import VideoItem from '~/components/video_gallery/item'
import Slider from '~/components/slider'
export default {
	name: 'video_gallery',
	components: { Fancybox, VideoItem, Slider },
    data: () => {
        return {
            sliderSettings: {
                slidesToShow: 2.2,
                infinite: false,
                swipeToSlide: true,
                dots: true,
                responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 2.5,
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1.2,
						}
					}
				]
			},
        }
    },
    props: {
		posts: {
			type: Array,
			default() {
				return []
			}
		}
	},
    methods: {
        listLeftPart(posts) {
            return posts.slice(1)
        }
    }
}
</script>
<style>
.video_gallery_slider .slick-dots li {
    height: 2px;
    width: 35px;
    border-radius: var(--xs);
    opacity: 0.7;
    transition: 0.7s;
}
.video_gallery_slider .slick-dots li button {
    background: var(--calgary);
    width: 100%;
    height: 100%;
    border-radius: var(--xs);
}
.video_gallery_slider .slick-dots li button:before {
    display: none;
}
.video_gallery_slider li.slick-active {
     width: 50px!important;
     opacity: 1!important;
}
.video_gallery_slider .slick-slide {
    padding-right: 15px;
    box-sizing: border-box;
}
</style>
<style scoped>
@media (max-width: 767px) {
    
}
@media (min-width: 768px) and (max-width: 1200px) {
	
}
</style>
