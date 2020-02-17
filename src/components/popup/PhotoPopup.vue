<template>
    <section class="wrap modal">
        <main class="container con-search">
            <div class="image-detail-view">
                <div class="detail-header">
                    <p class="name">{{title}}</p>
                    <button class="btn-prev" @click="close">이전</button>
                    <button class="btn-list">목록보기</button>
                </div>
                <div class="detail-view">
                    <swiper :options="visualOption">
                        <swiper-slide v-for="(item, idx) in photoList" :key="idx">
                            <div class="place-slide"
                                 :style="{backgroundImage: `url(http://img.actionjeju.com/data/user_route_after${item.image_name})`}"
                            >
<!--                                <img :src="`http://img.actionjeju.com/data/user_route_after${item.image_name}`" alt="">-->
                            </div>
                        </swiper-slide>
                        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                        <div class="swiper-pagination"></div>
                    </swiper>
                </div>
                <div class="detail-footer">
                    <label class="favorite">
                        <input type="checkbox">
                        <div class="shape"></div>
                    </label>
<!--                    <p class="paginate">15 / 127</p>-->
                </div>
            </div>
        </main>
    </section>
</template>
<script>
import { EventBus } from "../../assets/event-bus";
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
    name: 'PhotoPopup',
    components: {
        swiperSlide,
        swiper
    },
    props:{
        photoList: {
            type: Array,
            default() {
                return []
            },
            require: true
        },
        title: {
            type: String,
        }
    },
    data() {
        return {
            showModal: false,
            visualOption:{
                slidesPerView: 1,
                slidesPerGroup: 1,
                freeMode: false,
                loop: false,
                speed: 400,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                },
            }
        }
    },
    methods: {
        close() {
            EventBus.$emit("PlaceView", this.showModal);
        },
    },
    created() {

    }
}
</script>