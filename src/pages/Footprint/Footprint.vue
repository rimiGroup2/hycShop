<template>
  <div class="footprint" :style="{'height':height}">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>我的足迹</span>
      <span></span>
    </div>
    <div class="productContainer"  v-if="footList">
        <!-- 商品项目 -->
          <div class="productItem" v-for="item,index in footList.slice(0,5)" :key="item.id" @click="productDetail(index)">
            <Row :gutter="16">
              <Col span="8">
                <img :src="item.product_pic.split('@')[0]" alt="">
              </Col>
              <Col span="16" class="productInfo">
                <p class="productName">{{item.product_name}}</p>
                <p class="productDesc">{{item.product_desc}}</p>
                <p class="productBtm">
                  <span class="productPrice">￥{{item.product_price}}</span>
                  <span class="productStorage">库存{{item.product_storage}}件</span>
                  <span class="productStorage">月销量{{item.product_sale}}件&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </p>
              </Col>
            </Row>
          </div>
      </div>
      <div class="warn" v-else>
          <Icon type="ios-albums-outline" />
          <p>这里还没有记录，去逛逛吧</p>
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
        }, 
        productDetail(index) {
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

    .productItem{
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid #dcdee2;
        background-color: #fff;
        img{
          width: 100px;
          height: 100px;
          max-height: 118px;
        }
        .productInfo{
          text-align: left;
          .productName{
            margin-bottom: 10px;
            color: black;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .productDesc{
            color: #666;
            font-size: 12px;
            margin-bottom: 10px;
          }
          .productBtm{
            .productPrice{
              color: orangered;
              font-size: 16px;
              font-weight: bold;
            }
            .productStorage{
              color: #666;
              font-size: 14px;
              float: right;
              line-height: 24px;
            }
          }
        }
      }
    .warn{
        width: 300px;
        height: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -150px;
        color: orangered;
        i{
            font-size: 100px;
        }
    }
    
}
</style>