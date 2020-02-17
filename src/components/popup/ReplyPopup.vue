<template>
    <div>
        <div class="wrap modal">
            <div class="post-header sticky">
                <div class="text-box">
                    <p class="post-title">{{tourInfo.name}}</p>
                    <p class="post-route-date">{{tourInfo.days-1}}박 {{tourInfo.days}}일 여행</p>
                </div>
                <button type="button" class="prev" @click="close()">이전</button>
            </div>
            <div class="post-comment-wrap">
                <div class="comment-list">
                    <!-- card -->
                    <div class="comment-card" v-for="(item, idx) in replyList" :key="idx">
                        <div class="comment-profile">
                            <img src="../../assets/images/img-dummy.png" alt="">
                        </div>
                        <div class="comment-box">
                            <div>
                                <p class="comment-name">{{item.mb_nick}}</p>
                                <p class="comment-time">{{getReg}}</p>
                                <button class="btn-more">메뉴</button>
                            </div>
                            <div>
                                <p class="comment-text">
                                    {{item.comment}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- //card -->
                </div>
                <div class="comment-input">
                    <form>
                        <textarea class="textarea" placeholder="이 경로를 본 소감을 따뜻하게 적어주세요!"></textarea>
                        <button class="btn-write">작성</button>
                    </form>
                </div>
            </div>
        </div>
<!--        <div class="overlay">-->
<!--            <ul class="overlay-menu">-->
<!--                <li><a href="">댓글 수정하기</a></li>-->
<!--                <li><a href="">댓글 삭제하기</a></li>-->
<!--            </ul>-->
<!--        </div>-->
    </div>
</template>
<script>
import { EventBus } from "../../assets/event-bus";
import {Route} from '@/api';
import "moment/locale/ko";

export default {
    name: 'ReplyPopup',
    props:{
        tourInfo:{
            type: Object,
            default() {
                return []
            },
            require: true
        },
        tourIdx:{
            type: String
        }
    },
    data(){
      return{
          isReply:false,
          replyList:[],
          getReg:null,
      }
    },
    methods:{
        getReplyList() {
            const postData = new FormData;
            postData.append('tour_idx', this.tourIdx);
            console.log(this.tourIdx)
            Route.replyList(postData).then(res => {
                //console.log(res.data)
                this.replyList = res.data.replyList;
                const date = this.$moment(this.replyList.regdt).format('YYYY-MM-DD');
                this.getReg = this.$moment(date).fromNow();
            }).catch(err => {
                console.error(err);
            })
        },
        close(){
            EventBus.$emit("RouteView", this.isReply);
        }
    },
    created() {
        this.getReplyList();
    }
}
</script>