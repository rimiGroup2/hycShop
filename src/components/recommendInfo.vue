<template>
    <div class="recommendInfo">
        <div class="recommend-item" v-for="(obj,index) in prop.slice(0,6)" :key="obj.id" @click="productDetail(index)">
          <img :src="obj.product_pic.split('@')[0]">
          <p>{{obj.product_desc}}</p>
          <span>{{obj.product_price}}</span>
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
            this.footprintList(this.prop[index])
        },
        footprintList(data){
            if(data){
                var footList=[]
                var footListArr = []
                //将点击的数据追加到数组（此时footListArr内只有一条数据）
                footListArr.unshift(data)
                if (JSON.parse(sessionStorage.getItem('footData'))) {
                    //将footListArr与得到的footData使用concat连接在一起（footList为多条数据）
                    footList = footListArr.concat(JSON.parse(sessionStorage.getItem('footData')))
                }             
                sessionStorage.setItem('footData', JSON.stringify(footList))           
            }        
        },                            
    }
}
</script>
<style lang="scss" scoped="">
 .recommendInfo{
    width: 100%;
    height: 65px;
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
        img{
            width: 100%;
            height:130px;
            margin: 0 auto;
        }
        p{
            font-size: 10px;
            line-height:20px;
            color: #333;
            margin-top: 10px;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
        }
        span{
            font-size: 10px;
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
