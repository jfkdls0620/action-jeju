<template>
    <section class="wrap">
        <header class="header sub-header">
            <router-link to="/main" class="close">이전</router-link>
            <h1>여행경로 만들기</h1>
            <button type="button" class="next">완료</button>
        </header>
        <div class="container con-route overflow-y">
            <div class="route-map" style="margin-top: 0;">
                <!-- map -->
                <naver-maps
                        :width="mapSettings.width"
                        :height="mapSettings.height"
                        :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']"
                        :mapOptions="mapOptions"
                >
                </naver-maps>
                <!-- //map -->
            </div>
            <div class="all-route-wrap">
                <div class="route-wrap">
                    <div class="route-header">
                        <div>
                            <h3 class="route-title" v-if="isTitle">{{getTitle}}</h3>
                            <button class="btn-edit-info" v-if="isTitle" @click="doEdit">여행정보 수정</button>
                            <input type="text" v-if="!isTitle" v-model="getTitle">
                            <button class="btn-edit-info" v-if="!isTitle" @click="doApply">여행정보 확인</button>
                        </div>
                        <div>
                            <p class="route-date">
                                {{$moment(edate).diff($moment(sdate), 'days')}}박 {{$moment(edate).diff($moment(sdate), 'days')+1}}일
                                ({{sdate}} - {{this.$moment(edate).format('MM-DD')}})
                            </p>
                            <button class="btn-edit-route">경로편집</button>
                        </div>
                    </div>
                    <div class="route-contents">
                        <!-- route item -->
                        <div class="route-item">
                            <div class="travel-header">
                                <div class="travel-day">D-1</div>
                                <p class="travel-title">여행 1일차</p>
                                <p class="travel-date">2019.11.15</p>
                            </div>
                            <ul class="travel-list">
                                <li>
                                    <div class="place-number">1</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time"></p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                        <p class="review-text" v-if="getList !== null">
                                            {{getList}}
                                        </p>
                                        <div class="review-image-list">
                                            <div class="review-image">
                                                <img src="../../assets/images/img-dummy.png" alt="">
                                            </div>
                                            <div class="review-image">
                                                <img src="../../assets/images/img-dummy.png" alt="">
                                            </div>
                                            <div class="review-image">
                                                <img src="../../assets/images/img-dummy.png" alt="">
                                            </div>
                                            <div class="review-image">
                                                <img src="../../assets/images/img-dummy.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="place-number">2</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time">약 15분 소요</p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                                <li>
                                    <div class="place-number">3</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time">약 15분 소요</p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                            </ul>
                            <div class="btn-wrap">
                                <button class="btn-white" @click="addRoute">장소추가</button>
                            </div>
                        </div>
                        <!-- //route item -->
                        <!-- route item -->
                        <div class="route-item">
                            <div class="travel-header">
                                <div class="travel-day">D-2</div>
                                <p class="travel-title">여행 1일차</p>
                                <p class="travel-date">2019.11.15</p>
                            </div>
                            <ul class="travel-list">
                                <li>
                                    <div class="place-number">1</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time"></p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                                <li>
                                    <div class="place-number">2</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time">약 15분 소요</p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                                <li>
                                    <div class="place-number">3</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time">약 15분 소요</p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                            </ul>
                            <div class="btn-wrap">
                                <button class="btn-white">장소추가</button>
                            </div>
                        </div>
                        <!-- //route item -->
                        <!-- route item -->
                        <div class="route-item">
                            <div class="travel-header">
                                <div class="travel-day">D-3</div>
                                <p class="travel-title">여행 1일차</p>
                                <p class="travel-date">2019.11.15</p>
                            </div>
                            <ul class="travel-list">
                                <li>
                                    <div class="place-number">1</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time"></p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                                <li>
                                    <div class="place-number">2</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time">약 15분 소요</p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                                <li>
                                    <div class="place-number">3</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time">약 15분 소요</p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                            </ul>
                            <div class="btn-wrap">
                                <button class="btn-white">장소추가</button>
                            </div>
                        </div>
                        <!-- //route item -->
                        <!-- route item -->
                        <div class="route-item">
                            <div class="travel-header">
                                <div class="travel-day">D-4</div>
                                <p class="travel-title">여행 1일차</p>
                                <p class="travel-date">2019.11.15</p>
                            </div>
                            <ul class="travel-list">
                                <li>
                                    <div class="place-number">1</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time"></p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                                <li>
                                    <div class="place-number">2</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time">약 15분 소요</p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                                <li>
                                    <div class="place-number">3</div>
                                    <p class="place-name">제주국제공항</p>
                                    <p class="place-time">약 15분 소요</p>
                                    <div class="travel-contents">
                                        <!-- add travel this -->
                                    </div>
                                </li>
                            </ul>
                            <div class="btn-wrap">
                                <button class="btn-white">장소추가</button>
                            </div>
                        </div>
                        <!-- //route item -->
                    </div>
                </div>
                <div>
                    <!-- 입력완료시 active 클래스 추가 -->
                    <a class="btn-step active">
                        완료
                    </a>
                </div>
            </div>
        </div>
        <modal-search v-if="showModal"/>
    </section>
</template>
<script>
import ModalSearch from "../popup/SearchPopup";
import { EventBus } from "../../assets/event-bus";

export default {
    name: 'Make2',
    components:{ModalSearch},
    props: {
        title: {
            type: String,
        },
        sdate:{
            type: String,
        },
        edate:{
            type:String
        },
        touridx:{
            type: Number
        }
    },
    data(){
        return{
            showModal:false,
            getTitle:'',
            isTitle:true,
            marker: null,
            map: null,
            getList:null,
            dataArr:[],
            mapOptions: {
                lat: 33.38,
                lng: 126.56,
                zoom: 6,
                zoomControl: false,
                mapTypeControl: false,
            },
            mapSettings:{
                width:0,
                height:0
            }
        }
    },
    methods:{
        addRoute(){
            this.showModal = true;
        },
        doEdit(){
            this.isTitle = false;
        },
        doApply(){
            if (this.getTitle.replace(/^\s+|\s+$/g, '' ) === "" || this.getTitle === ''){
                this.$alert('제목을 입력해 주세요.')
                return false
            }else{
                this.isTitle = true;
            }
        },
        getDateList(){
            const getDateArray = function(start, end) {
                const arr = [];
                const dt = start;
                while (dt <= end) {
                    arr.push(new Date(dt));
                    dt.setDate(dt.getDate() + 1);
                }
                return arr;
            }
            // Usage
            console.log("start : "+this.sdate)
            console.log("end : "+this.edate)
            const dates = getDateArray(this.sdate, this.edate);
            console.log(dates)
            for (var i = 0; i < dates.length; i++) {
                console.log(dates[i])
            }
        }
    },
    created() {
        this.mapSettings.width = window.innerWidth;
        this.mapSettings.height = window.innerHeight;
        //console.log(this.touridx)
        EventBus.$on("Make2", (item, props) => {
            this.getList = item;
            this.showModal = props;
            console.log(this.getList)
        });
        this.getTitle = this.title;
        this.getDateList()
    },
}
</script>