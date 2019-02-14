<template>
  <div class="footprint" :style="{'height':height}">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>我的足迹</span>
      <span></span>
    </div>
    <!-- content  -->
    <div class="footprint-info">
      <div class="list-info" v-for="(obj,index) in footList.slice(0,5)" :key="obj.id" @click="productDetail(index)"> 
            <img :src="obj.product_pic.split('@')[0]">
            <div>
                <p>{{obj.product_name}}</p>
                <p style="color: #999">{{obj.product_desc}}</p>
                <p style="color:red">￥{{obj.product_price}}</p>
            </div>
      </div>
    </div>
  </div>
</template>

<script> 
export default {
    data () {
        return {
            height:"",
            footList:JSON.parse(sessionStorage.getItem('footData'))
        }
    },mounted() {
        this.height = document.documentElement.clientHeight + 'px'
        window.onresize=()=>{
        this.height = document.documentElement.clientHeight + 'px'
        }
    },methods: {
        goBack(){
            this.$router.go(-1)
        }, productDetail(index) {
            this.$router.push('/ProductDetail?productId=' + this.footList[index].product_id)
            // this.footprintList(this.prop[index])
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$padding: 10px;
.footprint{
    background-color: #f7f7f7;
    width: 100%;
    .header{
        padding:$padding; 
        width: 100%;
        height: 40px;
        text-align:center;
        font-size: 14px;
        position: relative;
        display: flex;
        justify-content:space-between;
    }
    .footprint-info{
        width: 100%;
        .list-info{             
            width: 100%;
            padding: 15px ;             
            color: #333333;
            font-size: 14px;
            text-align: left;
            background-color: white;
            display: flex;
            margin: 10px 0;               
            img{
                width: 30%;
                height: 30%;
            }  
            div{
                margin-left: 10px;
                width: 70%;
                height: auto;
                line-height: 35px;
                font-size: 13px;
            }                       
        }
    }
}
</style>