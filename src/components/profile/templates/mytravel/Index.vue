<template>
    <div class="route-card">
        <!-- card -->
        <div class="card">
            <div class="card-image">
                <img src="/images/img-dummy.png" alt="">
            </div>
            <div class="card-contents">
                <div class="card-title">
                    <p>가을가을한 제주여행</p>
                    <div class="like">999</div>
                </div>
                <div class="card-info">
                    <p class="card-tern">2박 3일 여행</p>
                    <p class="card-writer">애월댁</p>
                </div>
                <div class="list-hashtag">
                    <div class="hashtag">제주혼행</div>
                    <div class="hashtag">제주혼행</div>
                    <div class="hashtag">제주혼행</div>
                </div>
                <div class="more"></div>
            </div>
        </div>
        <!-- //card -->
        <!-- card more -->
        <div class="card-more">
            <p>경로 더보기</p>
        </div>
        <!-- //card-more -->
    </div>
</template>
<script>
export default {
    name: 'MyTravel',
    props:['data']
}
</script>