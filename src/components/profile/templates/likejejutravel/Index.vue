<template>
    <div class="card" @click="doView(data.idx)">
        <div class="card-image">
            <img :src="`http://img.actionjeju.com/data/user_route_image${data.image}`" alt="">
        </div>
        <div class="favorite">
            찜
        </div>
        <div class="card-contents">
            <div class="card-title">
                <p><a href="#">{{data.name}}</a></p>
                <div class="like" v-if="data.user_like_point > 999">999+</div>
                <div class="like" v-else>{{data.user_like_point}}</div>
            </div>
            <div class="card-info">
                <p class="card-tern">{{data.days}}박 {{data.days+1}}일 여행</p>
                <p class="card-writer">{{data.nick}}</p>
            </div>
            <div class="list-hashtag">
                <div class="hashtag" v-for="(item, idx) in hashList.slice(0, 3)" :key="idx">{{item.name}}</div>
            </div>
        </div>
        <a href="" class="link"></a>
    </div>
</template>
<script>
import {etc} from '@/api';
export default {
    name: 'LikeTravel',
    props:['data'],
    data(){
        return{
            hashList:[]
        }
    },
    methods: {
        getHashList() {
            const postData = new FormData;
            postData.append('request_code', 'hashList');
            etc.fetchList(postData).then(res => {
                //console.log(res.data)
                this.hashList = res.data.hashes;
            }).catch(err => {
                console.error(err);
            })
        },
        doView(idx){
            this.$router.push(`/route/${idx}`)
        }
    },
    created() {
        this.getHashList()
    }
}
</script>