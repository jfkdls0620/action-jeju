<template>
    <section class="wrap modal">
        <main class="header-mt con-route">
            <div class="overlay">
                <div class="place-review">
                    <div class="review-header">
                        <button type="button" class="btn-close" @click="close()">모달닫기</button>
                        <h3 class="place-name">{{title}} <span>후기쓰기</span></h3>
                        <div class="btn-write">완료</div>
                    </div>
                    <div class="rate-wrap">
                        <star-rating :rounded-corners="true"
                                     active-color="rgb(243,100,90)"
                                     :star-size="28"
                                     :show-rating="false"
                                     :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                                     @current-rating="showCurrentRating"
                                     @rating-selected="setCurrentSelectedRating"
                        ></star-rating>
                        <p class="rate-text">좋아요. 추천해요!</p>
                    </div>
                    <div class="review-textarea">
                        <textarea placeholder="이 장소의 경험을 함께 공유해 보세요" spellcheck="false"></textarea>
                    </div>
                    <div class="review-image-list">
                        <div class="add-image">
                            이미지 추가
                        </div>
                        <div class="image-item">
                            <div class="image-box">
                                <img src="/images/img-dummy.png" alt="">
                            </div>
                            <button class="btn-remove">사진삭제</button>
                        </div>
                        <div class="image-item">
                            <div class="image-box">
                                <img src="/images/img-dummy.png" alt="">
                            </div>
                            <button class="btn-remove">사진삭제</button>
                        </div>
                        <div class="image-item">
                            <div class="image-box">
                                <img src="/images/img-dummy.png" alt="">
                            </div>
                            <button class="btn-remove">사진삭제</button>
                        </div>
                        <div class="image-item">
                            <div class="image-box">
                                <img src="/images/img-dummy.png" alt="">
                            </div>
                            <button class="btn-remove">사진삭제</button>
                        </div>
                        <div class="image-item">
                            <div class="image-box">
                                <img src="/images/img-dummy.png" alt="">
                            </div>
                            <button class="btn-remove">사진삭제</button>
                        </div>
                    </div>
                    <!-- 입력완료시 active 클래스 추가 -->
                    <div class="review-complate active">
                        완료
                    </div>

                </div>

            </div>
        </main>
    </section>
</template>
<script>
import { EventBus } from "../../assets/event-bus";
import StarRating from "vue-star-rating/dist/star-rating.min"
export default {
    name: 'ReviewPopup',
    components:{
        StarRating
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
            showReview:false,
            currentRating:0,
        }
    },
    methods: {
        showCurrentRating(rating){
            this.currentRating = (rating === 0) ? this.currentSelectedRating : "Click to select " + rating + " stars"
        },
        setCurrentSelectedRating: function(rating) {
            this.currentSelectedRating = "You have Selected: " + rating + " stars";
            console.log(rating)
        },
        close() {
            EventBus.$emit("PlaceView", this.showReview);
        },
    },
    created() {

    }
}
</script>