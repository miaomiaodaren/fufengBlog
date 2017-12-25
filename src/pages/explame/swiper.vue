<template>
    <div class="swiper">
        <div class="explame1">
            <ul class="clearfix">
                <template v-for="(item, index) in banners" :keys="index">
                    <li :style="{backgroundImage: `url(${item.imgUrl})`}"></li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
    import img1 from '@/assets/img/1.jpg'
    import img2 from '@/assets/img/2.jpg'
    import img3 from '@/assets/img/3.jpg'
    import img4 from '@/assets/img/4.jpg'
    export default {
        data() {
            return {
                banners: [
                    { imgUrl: img1 }, { imgUrl: img2 }, { imgUrl: img3 },{ imgUrl: img4 }
                ]
            }
        },
        componets: {
        },
        mounted() {
            console.info(img1, '222');
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    @import './swiper.sass'
</style>

