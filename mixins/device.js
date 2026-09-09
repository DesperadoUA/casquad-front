export default {
    data: () => ({
        device: ''
      }),
    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
    destroyed() {
       window.removeEventListener('resize', this.onResize)
    },
    methods: {
        onResize() {
            const width = window.innerWidth
            if (width >= 768 && width <= 1200) this.device = 'TABLET'
            else if (width <= 767) this.device = 'MOB'
            else this.device = 'DC'
        }
    }
}
