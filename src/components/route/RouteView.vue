<template>
    <div class="wrap">
        <main class="con-route">
            <!-- class:sticky toggle -->
            <div v-if="!isReply">
                <div class="post-wrap" :class="{sticky : isSticky}">
                    <div class="post-header">
                        <div class="text-box">
                            <p class="post-title">{{tourInfo.name}}</p>
                            <p class="post-route-date">{{tourInfo.days-1}}박 {{tourInfo.days}}일 여행</p>
                        </div>
                        <a href="javascript:history.back()" class="prev">이전</a>
                        <button class="btn-more">메뉴</button>
                    </div>
                    <div class="post-cover" v-if="!isSticky" :style="{backgroundImage: `url(http://img.actionjeju.com/data/user_route_image${tourInfo.image}`}">
                        <button class="btn-map" @click="openMap">지도보기 ▲</button>
                        <h2 class="post-title">{{tourInfo.name}}</h2>
                        <p class="post-date">{{tourInfo.days-1}}박 {{tourInfo.days}}일 여행</p>
                        <p class="post-write">{{tourInfo.nick}}</p>
                    </div>
                    <div class="route-map" v-if="isSticky">
                        <button class="btn-draw">맵 드로어</button>
                    </div>
                </div>
                <!-- map -->

                <!-- //map -->
                <div class="route-wrap">
                    <div class="route-contents">
                        <div class="hashtag-list">
                            <div class="hashtag">제주혼행</div>
                            <div class="hashtag">제주혼행</div>
                            <div class="hashtag">제주혼행</div>
                        </div>
                        <!-- route item -->
                        <div class="route-item" v-for="(item, idx) in days" :key="idx">
                            <div class="travel-header">
                                <div class="travel-day">D-{{item.day}}</div>
                                <p class="travel-title">여행 {{item.day}}일차</p>
                                <p class="travel-date">{{item.date}}</p>
                            </div>
                            <ul class="travel-list">
                                <li v-for="(path, idx) in item.path" :key="idx">
                                    <div class="place-number">{{idx+1}}</div>
                                    <p class="place-name">{{path.company_name}}</p>
                                    <p class="place-time"></p>
                                    <div class="travel-contents">
                                        <p class="review-text">
                                            {{path.review}}
                                        </p>
                                        <div class="review-image-list">
                                            <div class="review-image" v-for="(image, idx) in path.images" :key="idx">
    <!--                                            <img src="../../assets/images/img-dummy.png" alt="">-->
                                                <img :src="`http://img.actionjeju.com/data/user_route_after${image.name}`" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!-- //route item -->
                        <ul class="post-menu-list">
                            <li>
                                <label class="btn-like">
                                    <input type="checkbox" :checked="isLike" @change="setLike">
                                    <div class="shape"></div>
                                </label>
                                <p v-if="tourInfo.user_like_count >= 999">999+</p>
                                <p v-else>{{tourInfo.user_like_count}}</p>
                            </li>
                            <li>
                                <label class="btn-favorite">
                                    <input type="checkbox" :checked="isFavorites" @change="setFavorites">
                                    <div class="shape"></div>
                                </label>
                                <p v-if="tourInfo.zzim_count >= 999">999+</p>
                                <p v-else>{{tourInfo.zzim_count}}</p>
                            </li>
                            <li>
                                <button type="button" class="btn-comment" @click="doReply"></button>
                                <p v-if="tourInfo.reply_count >= 999">999+</p>
                                <p v-else>{{tourInfo.reply_count}}</p>
                            </li>
                            <li>
                                <button class="btn-share">공유</button>
                                <p>공유하기</p>
                            </li>
                        </ul>
                        <a href="" class="btn-get-route">경로 가져오기</a>
                    </div>
                </div>
                <div class="recommend-wrap">
                <div>
                    <p class="title">이런 제주여행은 어떠세요?</p>
                    <a href="" class="more">더보기</a>
                </div>
                <div class="card-list">
                    <!-- card -->
                    <div class="card" style="background-image: url('../../assets/images/img-dummy.png');">
                        <div class="card-text">
                            <p class="card-title">세상의 모든 초록빛, 제주 숲으로 안내합니다</p>
                            <ul class="hashtag-list">
                                <li>사려니숲길</li>
                                <li>힐링여행</li>
                                <li>곶자왈도립공원</li>
                            </ul>
                        </div>
                        <label class="btn-like">
                            <input type="checkbox">
                            <div class="shape"></div>
                        </label>
                        <p class="card-writer">제주조아</p>
                        <p class="card-date">3박 4일 여행</p>
                        <a href="" class="link"></a>
                    </div>
                    <!-- //card -->
                    <!-- card -->
                    <div class="card" style="background-image: url('../../assets/images/img-dummy.png');">
                        <div class="card-text">
                            <p class="card-title">세상의 모든 초록빛, 제주 숲으로 안내합니다</p>
                            <ul class="hashtag-list">
                                <li>사려니숲길</li>
                                <li>힐링여행</li>
                                <li>곶자왈도립공원</li>
                            </ul>
                        </div>
                        <label class="btn-like">
                            <input type="checkbox">
                            <div class="shape"></div>
                        </label>
                        <p class="card-writer">제주조아</p>
                        <p class="card-date">3박 4일 여행</p>
                        <a href="" class="link"></a>
                    </div>
                    <!-- //card -->
                </div>
            </div>
            </div>
            <transition name="fade">
                <ReplyPopup v-if="isReply"
                            :tourIdx="id"
                            :tour-info="tourInfo"/>
            </transition>
        </main>
<!--        <div class="overlay">-->
<!--            <ul class="overlay-menu">-->
<!--                <li><a href="">이 여행경로 편집</a></li>-->
<!--                <li><a href="">이 여행일정 삭제</a></li>-->
<!--                <li><a href="">SNS 공유하기</a></li>-->
<!--            </ul>-->
<!--        </div>-->

    </div>
</template>
<script>
import {Route, etc} from '@/api';
import {mapGetters} from 'vuex';
import { EventBus } from "../../assets/event-bus";
import ReplyPopup from "../popup/ReplyPopup";

export default {
    name:'RouteView',
    components:{
        ReplyPopup
    },
    props: {
        id: {
            type: String,
            default: null
        }
    },
    data(){
      return{
          tourInfo:[],
          days:[],
          isSticky: false,
          isLike: false,
          isFavorites: false,
          isReply:false
      }
    },
    computed: {
        ...mapGetters(['GET_MB_ID'])
    },
    methods:{
        getRouteList() {
            const postData = new FormData;
            postData.append('tour_idx', this.id);
            Route.routeListDetail(postData).then(res => {
                //console.log(res.data)
                this.tourInfo = res.data.tourInfo;
                this.days = res.data.days;
            }).catch(err => {
                console.error(err);
            })
        },
        openMap(){
            this.isSticky = true;
        },
        getLike(){
            const postData = new FormData;
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('action', 'get');
            postData.append('type', 'route');
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
            postData.append('type', 'route');
            postData.append('idx', this.id);
            etc.like(postData).then(res => {
                console.log(res.data)
                res.data.isLike === 'N' ? this.tourInfo.user_like_count-- : this.tourInfo.user_like_count++
            }).catch(err => {
                console.error(err);
            })
        },
        getFavorites(){
            const postData = new FormData;
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('action', 'get');
            postData.append('type', 'route');
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
            postData.append('type', 'route');
            postData.append('idx', this.id);
            etc.Favorites(postData).then(res => {
                //console.log(res.data)
                res.data.isZzim === 'N' ? this.tourInfo.zzim_count-- : this.tourInfo.zzim_count++
            }).catch(err => {
                console.error(err);
            })
        },
        doReply(){
            this.isReply = true;
        }
    },
    created() {
        this.getRouteList();
        this.getLike();
        this.getFavorites();
        EventBus.$on("RouteView", props => {
            this.isReply = props;
        });
    }
}
</script>