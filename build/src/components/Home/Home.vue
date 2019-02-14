<template>
  <div class="home">
      <!-- header -->
      <header class="home-header">
        <!-- 头部左边 -->
        <div class="header-text">
         <router-link to="./category"> <Icon type="ios-menu" size="27" /></router-link> 
        </div>
         <!-- 头部中间 -->
        <div class="header-search">
            <span style="color:red;">新春爆款</span>
            <span>|</span>
            <Icon type="ios-search" slot="suffix" size="18"/>
            <router-link to="./search"><span>家电新春返厂特惠</span></router-link>
        </div> 
         <!-- 头部右边 -->
        <div class="header-text">
          <router-link to="./login" v-if="isLogin"><span>登陆</span></router-link>
          <router-link to="./user" v-else><span><Icon type="ios-person" size="24"/></span></router-link>
        </div>
      </header>
      <!-- header end -->
      <!-- banner -->
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide">
                  <img src="../../../static/images/Home/banner1.jpg">
              </div>
              <div class="swiper-slide">
                  <img src="../../../static/images/Home/banner2.jpg">
              </div>
              <div class="swiper-slide">
                  <img src="../../../static/images/Home/banner3.jpg">
              </div>
          </div>
      </div>
      <!-- banner end-->
      <!-- content 第一部分-->
      <div class="content-section">
        <div class="section-box" v-for="(obj,index) in contentList" :key="obj.id" @click=selectCategory(index)>
            <img :src="obj.url">
            <p>{{obj.title}}</p>
        </div>
      </div>
      <!-- content 第二部分-->
      <div class="content-floor">
        <div class="floor-list">
            <div class="list-img">
                <img src="../../../static/images/Home/list1.jpg">
            </div>
            <div class="floor-content">
                <div class="content-category" v-for="obj in productList" :key="obj.id">
                    <p style="color:#333;">{{obj.text1}}</p>
                    <p style="color:red; font-size:14px;">{{obj.text2}}</p>
                    <div class="floor-products">
                        <img :src="obj.url1">
                        <img :src="obj.url2">
                    </div>
                </div>
            </div>
        </div>
        <div class="floor-list">
            <div class="list-img">
                <img src="../../../static/images/Home/list2.jpg">
            </div>
            <div class="floor-content">
                <div class="content-category" v-for="obj in shopList" :key="obj.id">
                    <p style="color:#333;">{{obj.text1}}</p>
                    <p style="color:red; font-size:14px;">{{obj.text2}}</p>
                    <div class="floor-products">
                        <img :src="obj.url1">
                        <img :src="obj.url2">
                    </div>
                </div>
            </div>
        </div>
      </div>    
      <!-- content end -->
      <!-- 底部占位 -->
      <div class="seizeSeat"></div>
      <!-- 底部 -->
     <nav-buttom></nav-buttom>
  </div>
</template>

<script>
// 导入Swiper
import navButtom from '../navButtom'
import Swiper from 'swiperjs' 
import 'swipercss' 

export default {
  data(){
    return{
        contentList:"",
        productList:"",
        shopList:"",
        value:"",
    }
  },computed:{
    isLogin(){
      if(window.sessionStorage.getItem("islogin")){
        return false
      }else{
        return true
      }    
    }
  },created(){
      axios.get('../../../static/Home/Home_data.json').then((res)=>{
        this.contentList=res.data.section;
        this.productList=res.data.product;
        this.shopList=res.data.shopping;
      })
  },mounted () {
    //轮播
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: true,
      loop:true
    })
    //滚动条滑动header变色
    $(window).scroll(function(){
      if($(document).scrollTop() >= 100){
        $('.home-header').addClass('color')
      }else{
        $('.home-header').removeClass('color')
      }  
    })
  },methods:{
    //第一部分点击跳转
    selectCategory(index){
      this.$router.push('./product-list?'+index)
    }
  },components : {
    navButtom : navButtom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$padding:13px 10px;
$font:16px;
.home{
  //头部
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  .color{
    background-color: red;
  }
  .home-header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height:60px;
    color: white;
    padding: $padding;
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    text-align: center;
    transition: all 1s;
    .header-search{
      padding: 4px 10px;
      margin-top: 5px;
      width: 65%;
      height: 80%;
      background-color: white;
      color:gray;
      border-radius: 20px;
      text-align: left;
      font-size:12px;
      a{
        span{
          color:gray;
          font-size: 8px;
        }
      }
    }
    .header-text{
      width: 15%;
      color: white;
      line-height: 35px;
      a{
        color: white;
      }
    }
  }
  //轮播
  .swiper-slide{
    height: 180px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  // content第一部分
  .content-section{
    width: 100%;
    height: 150px;
    margin-bottom: 10px;
    .section-box{
      width: 20%;
      height: 50%;
      text-align: center;
      float: left;
      img{
        margin: 10px 0 2px 0;
        width: 55%;
        width: 55%;
        border-radius:20px;
      }
    }
  }
  //content第二部分
  .floor-list{
    width: 100%;
    // height: 460px;
      .list-img{
        width: 100%;
        height: 40px;
        background-color: rgb(235, 231, 231);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .floor-content{
        width: 100%;
        height:420px;
        background-color: white;
        text-align: left;
        .content-category{
          width: 50%;
          height: 140px;
          padding:$padding;
          font-size: $font;
          float: left;
          border-right: 0.5px solid gainsboro;
          border-bottom: 0.5px solid gainsboro;
          .floor-products{
            margin-top: 5px;
            display: flex;   
            justify-content: space-around;
            width: 100%;
            img{
              width: 40%;
              height: 50%;
            }
          }
        }
      }
  }
  //底部占位
  .seizeSeat{
    width: 100%;
    height: 68px;
  }
}
</style>