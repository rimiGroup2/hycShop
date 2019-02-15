<template>
    <div class="recommendInfo">
        <div class="recommend-item" v-for="(obj,index) in prop" :key="obj.id" @click="productDetail(index)">
          <div class="imgContainer">
              <img :src="obj.product_pic.split('@')[0]">
          </div>
          
          <p>{{obj.product_name}}</p>
          <span>￥{{obj.product_price}}</span>
        </div>
        <!-- 占位 -->
        <div class="seizeSeat"></div>
    </div>
</template>
<script>
export default {
    props:["prop"],
    data(){
        return{
        }
    },methods:{
        productDetail(index) {
            this.$router.push('/ProductDetail?productId=' + this.prop[index].product_id)
            // this.footprintList(this.prop[index])
        },                          
    }
}
</script>
<style lang="scss" scoped="">
 .recommendInfo{
    width: 100%;
    // height: 65px;
    color: red;
    z-index: 1000;
    background-color: white;
    .recommend-item{
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 10px;
        box-sizing: border-box;
        text-align: left;
        float: left;
        border-bottom: 1px solid #dcdcdc;
        border-right: 1px solid #dcdcdc;
        .imgContainer{
            width: 100%;
            img{
                width: 100%;
                max-height:211px; 
                margin: 0 auto;
            }
        }
        p{
            font-size: 16px;
            line-height:20px;
            color: #333;
            margin-top: 10px;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
        }
        span{
            font-size: 16px;
            line-height:20px;
            color: red; 
        }
    }
    .seizeSeat{
        width: 100%;
        height: 68px;
        clear: both;
    }
  }
</style>
