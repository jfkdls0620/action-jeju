<template>
    <div class="card-place" @click="doPlace(data.company_idx)">
        <div>
            <p class="place-name">{{data.name}}</p>
            <p class="place-distance">2.5km</p>
            <div class="place-call">전화하기</div>
        </div>
        <div>
            <p class="place-score">{{data.star}}</p>
            <div class="star_area m-star">
                <span class="star_rating star">
                    <span :style="{width: `${(data.star*20)}%`}"></span>
                </span>
            </div>
            <p class="place-review">후기 {{data.reviews}}</p>
        </div>
        <div class="favorite">찜</div>
        <div class="list-image">
            <div class="image" v-for="(item, idx) in data.images" :key="idx">
                <img :src="`http://img.actionjeju.com/data/company_image${item}`" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LikePlace',
    props:['data'],
    methods:{
        doPlace(idx){
            this.$router.push(`/map/${idx}`)
        }
    }
}
</script>