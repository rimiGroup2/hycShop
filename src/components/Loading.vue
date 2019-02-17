<template>
    <div class="spinContainer" v-if="flag">
        <Spin size="large"></Spin>
    </div>
</template>
<script>
export default {
    name:'Loading',
    props : ['flag']
}
</script>
<style lang="scss" scoped>
    .spinContainer{
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        .ivu-spin{
          width: 100px;
          height: 100px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: 0;
          margin-left: -18px;
        }
    }
</style>


