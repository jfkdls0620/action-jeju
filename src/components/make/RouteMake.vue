<template>
    <section class="wrap">
        <div :class="{hide : isChk}">
            <header class="header sub-header">
                <router-link to="/main" class="close">이전</router-link>
                <h1 style="display: inline-block">여행경로 만들기</h1>
                <button type="button" class="next" @click="doNext">다음</button>
            </header>
            <div class="container con-route">
            <div class="route-cover">
                <label class="upload-cover">
                    <input type="file" ref="myfile" @change="previewFile">
                </label>
                <img v-if="url === null" src="../../assets/images/img-dummy.png" alt="">
                <img v-if="url" :src="url" alt="">
            </div>
            <div class="route-wrap">
                <div class="surface">
                    <h3 class="title">여행제목</h3>
                    <input type="text" class="text-field" placeholder="여행제목" v-model="title" ref="title">
                </div>
                <div class="surface">
                    <h3 class="title">여행인원</h3>
                    <div class="amount-box">
                        <div class="amount-item" v-for="(item, idx) in personnel" :key="idx">
                            <p class="amount-name">{{item.text}}</p>
                            <div class="amount">
                                <button class="amount-btn subt" @click="downCount(item)">-</button>
                                <input type="number" class="amount-data" :value="item.number" min="1" ref="number">
                                <button class="amount-btn add" @click="upCount(item)">+</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="surface">
                    <h3 class="title">여행 일정</h3>
                    <!-- datepicker -->
                        <v-date-picker
                                class='v-date-picker'
                                v-model="ranges"
                                mode="range"
                                color="red"
                                :min-date='new Date()'
                                is-inline
                                is-expanded
                                :theme-styles='themeStyles'
                                show-caps
                                style="background-color:rgb(238,238,238);border:0;"
                        ></v-date-picker>
                    <!-- //datepicker -->
                </div>
            </div>
            <div>
                <!-- 입력완료시 active 클래스 추가 -->
<!--                <button class="btn-step active" :class="{active : isChk}" @click="doNext">-->
                <button class="btn-step active" @click="doNext">
                    다음
                </button>
            </div>
        </div>
        </div>
        <route-make2 v-if="isChk"
                     :title="title"
                     :sdate="this.$moment(this.ranges.start).format('YYYY-MM-DD')"
                     :edate="this.$moment(this.ranges.end).format('YYYY-MM-DD')"
                     :touridx="touridx"
        />
    </section>
</template>
<script>
import vDatePicker from 'v-calendar/lib/components/date-picker.umd'
import {mapGetters} from 'vuex';
import { Route } from "@/api";
import RouteMake2 from "./RouteMake2";

export default {
    name: 'Make',
    components:{vDatePicker,RouteMake2},
    data(){
        return{
            ranges:{
                start: new Date(),
                end: new Date(),
            },
            sDate:null,
            eDate:null,
            url: null,
            touridx:null,
            personnel:[
                {text: '성인' , number: 0},
                {text: '어린이' , number: 0},
            ],
            num:0,
            title:'',
            isChk:false,
            themeStyles:{
                border:'0'
            }
        }
    },
    computed: {
        ...mapGetters(['GET_MB_ID'])
    },
    methods:{
        previewFile(e){
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file)
        },
        downCount(item){
            if (item.number <= 0){
                return false
            }
            item.text === '성인' ? item.number -- : item.number --;
            this.num = item.number;
        },
        upCount(item){
            item.text === '성인' ? item.number ++ : item.number ++;
            this.num = item.number;
        },
        doNext(){
            if (this.title === ''){
                this.$alert('여행 제목을 입력해주세요');
                this.$refs.title.focus();
                this.isChk = false;
                return false
            }
            if (this.num === 0){
                this.$alert('인원을 선택해주세요');
                this.isChk = false;
                return false
            }
            const dayChk = this.$el.getElementsByClassName('vc-highlights').length;
            const postData = new FormData();
            postData.append('mb_id', this.GET_MB_ID);
            postData.append('tourname', this.title);
            postData.append('tourimg', this.url);
            postData.append('adult_cnt', this.personnel[0].number);
            postData.append('kids_cnt', this.personnel[1].number);
            if (dayChk > 11){
                this.$alert('최대 10일까지 선택가능합니다.');
                return false
            }else{
                postData.append('sdate', this.$moment(this.ranges.start).format('YYYY-MM-DD'));
                postData.append('edate', this.$moment(this.ranges.end).format('YYYY-MM-DD'));
            }
            Route.saveRoute(postData).then(res => {
                this.touridx = res.data.touridx;
                this.isChk = true;
                // if (this.isChk) this.$router.push(`/make/${getResult.touridx}`);
            }).catch(err => {
                console.error(err);
            })

        }
    },

}
</script>