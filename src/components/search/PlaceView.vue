<template>
    <section class="wrap">
        <header class="sub-header">
            <a href="javascript:history.back()" class="back__btn"></a>
            <h1>{{ placeInfo.company_name }}</h1>
        </header>
        <div class="container con-place">
            <div class="place-slide-box">
                <swiper :options="visualOption">
                    <swiper-slide v-for="(item, idx) in images" :key="idx">
                        <div class="place-slide"
                             :style="{backgroundImage: `url(http://img.actionjeju.com/data/company_image${item}`}"
                        >
                        </div>
                    </swiper-slide>
                    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                </swiper>
                <div class="menu">
                    <ul class="custom-check">
                        <li class="check_like">
                            <label>
                                <input type="checkbox" :checked="isLike" @change="setLike">
                                <span></span>
                            </label>
                        </li>
                        <li class="check_favorite">
                            <label>
                                <input type="checkbox" :checked="isFavorites" @change="setFavorites">
                                <span></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- place map -->
            <!--
            <div class="place-map">
                <button class="btn-close-map">지도 접기 ▲</button>
            </div>
            -->
            <!-- //place map -->
            <div class="surface">
                <div class="center">
                    <h3 class="place-name">{{ placeInfo.company_name }}</h3>
                    <div class="score-box">
                        <p class="place-score">{{ placeInfo.star_point }}</p>
                        <div class="star_area m-star">
                            <span class="star_rating star">
                                <span :style="{width: `${(placeInfo.star_point*20)}%`}"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <ul class="place-menu-list">
                    <li class="route">경로추가</li>
                    <li class="map">지도보기</li>
                    <li class="review" @click="doReview">후기쓰기</li>
                    <li class="share">공유하기</li>
                </ul>
                <ul class="place-detail-list">
                    <li class="hashtag-list">
                        <div class="hashtag" v-for="(hashtag, idx) in hashes.slice(0, 3)" :key="idx">{{hashtag}}</div>
                    </li>
                    <li class="address">
                        <p>{{placeInfo.company_addr}}</p>
                    </li>
                    <li class="call" v-if="placeInfo.company_tel === ''">-</li>
                    <li class="call" v-else>
                        {{placeInfo.company_tel}}
                        <button class="btn-call">전화하기</button>
                    </li>
                    <li class="intro" v-if="placeInfo.company_desc === ''">-</li>
                    <li class="intro" v-else>
                        <p>{{placeInfo.company_desc}}</p>
                    </li>
                    <li class="time">
                        <p v-if="salesTime === null">-</p>
                        <p v-else>영업시간 오전 {{salesTime.sale_start}}시 ~ 오후 {{salesTime.sale_end}}시</p>
                    </li>
                    <li class="service">
                        <div>
                            <div class="tag" v-for="(item, idx) in facilities" :key="idx">{{item}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="surface">
                <p class="text">사진</p>
                <div class="place-image-list">
                    <div class="place-image" v-for="(item, idx) in reviewImages" :key="idx">
                        <img :src="`http://img.actionjeju.com/data/user_route_after${item.image_name}`" :alt="item.idx" @click="doPhoto">
                        <label class="btn-like">
                            <input type="checkbox"
                                   :checked="item.checked"
                                   @change="setPhotoLike(item.idx)">
                            <div class="shape"></div>
                        </label>
                    </div>
                </div>

            </div>
            <div class="surface">
                <p class="text">후기</p>
                <div class="place-review-list">
                    <!-- review -->
                    <div v-if="reviews === null">
                        <p style="text-align: center;font-size: 11px;padding: 15px 0;">후기가 없습니다.</p>
                    </div>
                    <div v-else class="place-review" v-for="(item, idx) in reviews" :key="idx">
                        <div class="profile">
                            <img src="../../assets/images/img-dummy.png" alt="">
                        </div>
                        <div class="review-contents">
                            <div class="score-wrap">
                                <div class="star_area m-star">
                                    <span class="star_rating star">
<!--                                        <span :style="{width: `${(placeInfo.star_point*20)}%`}"></span>-->
                                    </span>
                                </div>
                                <p class="place-score">4.5</p>
                            </div>
                            <div>
                                <p class="review-writer">하루살이</p>
                                <p class="review-time">5시간 전</p>
                            </div>
                            <div>
                                <p class="review-text">우리가 갔을때는 페인트칠을 새로 하는 건지 공사중인거 같았는데 영업안하는 줄 알고 지나칠뻔 함. 내부는 좀 길죽한 구조이다. 전체적으로
                                    어린아이와 동반하면 무난하고 즐겁게 보낼 수 있다.
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- //review -->
                </div>
                <div class="review-more" v-if="reviews">
                    <p>후기 더보기</p>
                </div>
            </div>
        </div>
        <transition name="fade">
            <review-modal v-if="showReview"
                          :title="placeInfo.company_name"
            />
            <modal-photo v-if="showModal"
                         :photo-list="reviewImages"
                         :title="placeInfo.company_name"
            />
        </transition>
    </section>
</template>
<script>
import {Route, etc} from '@/api'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ModalPhoto from "../popup/PhotoPopup";
import ReviewModal from "../popup/ReviewPopup";
import { EventBus } from "../../assets/event-bus";
import {mapGetters} from 'vuex';

export default {
    name: 'PlaceView',
    props: {
        id: {
            type: String,
            default: null
        }
    },
    components: {
        swiper, swiperSlide, ModalPhoto, ReviewModal
    },
    data() {
        return {
            showReview:false,
            showModal:false,
            placeInfo:[],
            hashes:[],
            salesTime:[],
            images:[],
            facilities:[],
            reviewImages:[],
            reviews:[],
            visualOption: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                freeMode: true,
                loop: false,
                speed: 400,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            },
            isLike:false,
            isFavorites:false,
            isPhotoLike:false
        }
    },
    computed: {
        ...mapGetters(['GET_MB_ID'])
    },
    methods:{
        doReview(){
            this.showReview = true;
        },
        doPhoto(){
            this.showModal = true;
        },
        getLike(){
            const postData = new FormData;
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('action', 'get');
            postData.append('type', 'place');
            postData.append('idx', this.id);
            etc.like(postData).then(res => {
                //console.log(res.data)
                res.data.isLike === 'N' ? this.isLike = false : this.isLike = true
            }).catch(err => {
                console.error(err);
            })
        },
        setLike(){
            const postData = new FormData;
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('action', 'set');
            postData.append('type', 'place');
            postData.append('idx', this.id);
            etc.like(postData).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.error(err);
            })
        },
        getPhotoLike(idx){
            const postData = new FormData;
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('action', 'get');
            postData.append('type', 'photo');
            postData.append('idx', idx);
            return etc.like(postData)
                .then(res => res.data)
                .then(({isLike}) => isLike)
                .catch(err => {
                    console.error(err);
                })
        },
        setPhotoLike(idx){
            const postData = new FormData;
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('action', 'set');
            postData.append('type', 'photo');
            postData.append('idx', idx);
            etc.like(postData).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.error(err);
            })
        },
        getFavorites(){
            const postData = new FormData;
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('action', 'get');
            postData.append('type', 'place');
            postData.append('idx', this.id);
            etc.Favorites(postData).then(res => {
                //console.log(res.data)
                res.data.isZzim === 'N' ? this.isFavorites = false : this.isFavorites = true
            }).catch(err => {
                console.error(err);
            })
        },
        setFavorites(){
            const postData = new FormData;
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('action', 'set');
            postData.append('type', 'place');
            postData.append('idx', this.id);
            etc.Favorites(postData).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.error(err);
            })
        }
    },
    async created() {
        try {
            const postData = new FormData();
            postData.append('place_idx', this.id);
            await Route.place(postData)
                .then(res => res.data)
                .then(info => {
                    this.placeInfo = info.placeInfo;
                    this.images = info.images;
                    this.hashes = info.hashes;
                    this.salesTime = info.salesTime;
                    this.facilities = info.facilities;
                    if (info.reviewImages){
                        info.reviewImages.forEach(async (e) => {
                            const getLike = await this.getPhotoLike(e.idx);
                            e.checked = getLike === 'Y';
                        });
                    }
                    this.reviewImages = info.reviewImages;
                    this.reviews = info.reviews
                    //console.log(this.reviewImages)
                })
                .catch(console.error);
            EventBus.$on("PlaceView", props => {
                this.showModal = props;
                this.showReview = props;
            });
            this.getLike();
            this.getFavorites();
        } catch (e) {
            console.error(e);
        }
    }
}
</script>