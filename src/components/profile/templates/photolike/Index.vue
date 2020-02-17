<template>
    <div :style="{backgroundImage: `url(http://img.actionjeju.com/data/user_route_after${data.image_name}`}">
        <div class="btn-favorite">찜</div>
    </div>
</template>
<script>
export default {
    name: 'PhotoLike',
    props:['data']
}
</script>