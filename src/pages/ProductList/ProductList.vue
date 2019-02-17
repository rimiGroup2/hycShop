<template>
  <div class="productList">
      <header>
          <Row :gutter="6">
              <Col span="3" @click.native="goBack">
                <Icon type="ios-arrow-back" size="30"/>
              </Col>
              <Col span="17">
                <Input v-model="searchInput" prefix="ios-search" @click.native="search"/>
              </Col>
              <Col span="4">
                <Icon type="ios-more" size="30"/>
              </Col>
          </Row>   
          <div class="orderList">
            <ul>
              <li class="orderList-active" @click="orderByid">综合</li>
              <li @click="orderBysale">销量</li>
              <li @click="orderBystorage">库存</li>
              <li @click="orderByprice">价格
                <Icon type="md-arrow-dropup" />
                <Icon type="md-arrow-dropdown" />
              </li>
            </ul>
          </div> 
      </header>
      <!-- list container  -->
      <div class="productContainer" v-if="productList.length!=0">
        <!-- 商品项目 -->
          <div class="productItem" v-for="item,index in productList" :key="item.id" @click="toProductdetail(index)">
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
      <!-- no Data -->
      <div v-else class="noProduct">
        <Icon type="ios-planet-outline" />
        <p>找不到相关商品，请重新搜索</p>
      </div>
      <!-- loading -->
      <loading :flag="loadingFlag"></loading>
  </div>
</template>

<script>
import loading from '../../components/Loading'
export default {
  name: 'ProductList',
  data () {
    return {
      searchInput:"",
      productList : [],
      orderBypriceflag:false,
      loadingFlag : true
    }
  },
  components:{
    loading:loading
  },
  created () {
    var search = this.$route.query.search;
    var kind = this.$route.query.kind;
    var self = this;
    if(search){
      var sql = "select * from product where product_name like '%"+search+"%'";
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
      .then((res) => {
        this.productList = res.data;
        setTimeout(function(){
          self.loadingFlag=false          
        },1500)
      })
    }else{
      var sql = "select * from product where product_kind="+kind;
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
      .then((res) => {
        this.productList = res.data;
        setTimeout(function(){
          self.loadingFlag=false          
        },1500)
      })
    }
  },
  mounted () {
    $('.orderList ul li').click(function(){
      $(this).addClass('orderList-active').siblings().removeClass('orderList-active');
    })
  },
  methods:{
    hideLoading(){
      this.loadingFlag=true;
      var self = this;
      setTimeout(function(){
        self.loadingFlag=false;
      },1000)
    },
    search(){
      this.$router.push({path:'../Search'})
    },
    goBack(){
      this.$router.go(-1)
    },
    orderByid(){
      this.productList.sort(function(x,y){
        return x.product_id - y.product_id;
      })
      $('.orderList ul li:nth-child(4) i').css("color","#2c3e50")
      this.hideLoading()
    },
    orderBysale(){
      this.productList.sort(function(x,y){
        return y.product_sale - x.product_sale;
      })
      $('.orderList ul li:nth-child(4) i').css("color","#2c3e50")
      this.hideLoading()
    },
    orderBystorage(){
      this.productList.sort(function(x,y){
        return y.product_storage - x.product_storage;
      })
      $('.orderList ul li:nth-child(4) i').css("color","#2c3e50")
      this.hideLoading()
    },
    orderByprice(){
      if(this.orderBypriceflag){
        this.productList.sort(function(x,y){
          return y.product_price - x.product_price;
        })
        this.orderBypriceflag = !this.orderBypriceflag;
        $('.orderList ul li:nth-child(4) i:nth-child(1)').css("color","#2c3e50")
        $('.orderList ul li:nth-child(4) i:nth-child(2)').css("color","orangered")
      }else{
        this.productList.sort(function(x,y){
          return x.product_price - y.product_price;
        })
        this.orderBypriceflag = !this.orderBypriceflag;
        $('.orderList ul li:nth-child(4) i:nth-child(2)').css("color","#2c3e50")
        $('.orderList ul li:nth-child(4) i:nth-child(1)').css("color","orangered")
      }
      this.hideLoading()
    },
    toProductdetail(index){
      // console.log(this.productList[index].product_id);
      this.$router.push({path:'/ProductDetail',query:{productId: this.productList[index].product_id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  *{
    font-size: 15px;
  }
  .productList{
    width: 100%;
    // height: 500px;
    header{
      width: 100%;
      background-color: #fff;
      position: fixed;
      z-index: 200;
      top: 0; 
      .ivu-row{
        width: 100%;
        padding: 10px;
      }
      .orderList{
        ul{
          width: 100%;
          list-style: none;
          display: flex;
          border-top: 1px solid #dcdee2;
          border-bottom: 1px solid #dcdee2;
          li{
            width: 25%;
            padding: 10px 0;
            &.orderList-active{
              color: #ed4014;
            }
            &:nth-child(4){
              position: relative;
              i{
                position: absolute;
                top: 8;
                &:nth-child(2){
                  top: 16px;
                }
              }
            }
          }
        }
      }
    }
    // 列表内容
    .productContainer{
      margin-top: 96px;
      width: 100%;
      // height: 300px;
      // background: pink;
      .productItem{
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid #dcdee2;
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
    }
    .noProduct{
      width: 300px;
      height: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -150px;
      margin-left: -150px;
      color: orangered;
      i {
        font-size: 150px;
      }
      p{
        font-size:20px;
      }
    }
  }
</style>
