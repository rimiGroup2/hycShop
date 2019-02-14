<template>
  <div id="productDetail">
    <!-- <h1>{{msg}}</h1> -->
    <header>
        <Row :gutter="6">
            <Col span="4"  @click.native="goBack">
                <Icon type="ios-arrow-back" size="30"/>
            </Col>
            <Col span="16" class="detailSection">
                <ul>
                    <li class="detail-active" @click="detailSection(1)">
                        <Icon type="ios-medical" />
                        <a href="#product">商品</a>
                    </li>
                    <li @click="detailSection(2)">
                        <Icon type="ios-medical" />
                        <a href="#detail">详情</a>
                    </li>
                    <li @click="detailSection(3)">
                        <Icon type="ios-medical" />
                        <a href="#recommend">推荐</a>
                    </li>
                </ul>
            </Col>
            <Col span="4">
                <Icon type="ios-more" size="30"/>
            </Col>
        </Row>   
    </header>
    <div id="product" class="detailContainer">
        <!-- 轮播图 -->
        <Carousel autoplay loop :autoplay-speed="5000">
            <CarouselItem  v-for="item,index in productPic" :key="item.id">
                <div class="demo-carousel">
                    <img :src="item" alt="">
                </div>
            </CarouselItem>
        </Carousel>
        <!-- 资料 -->
        <div class="detailInfo">
            <p class="detailName">{{productItem.product_name}}</p>
            <p class="detailDesc">{{productItem.product_desc}}</p>
            <p class="detailNum">
                <span class="detailPrice">￥{{productItem.product_price}}.00</span>
                <span class="detailStorage">库存 {{productItem.product_storage}} 件</span>
                <span class="detailSale">月销量 {{productItem.product_sale}} 件</span>
            </p>
        </div>
        <div id="detail" class="detailMore">
            <Tabs value="name1">
                <TabPane label="概述" name="name1">标签一的内容测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</TabPane>
                <TabPane label="参数" name="name2">标签二的内容</TabPane>
                <TabPane label="汇服务" name="name3">标签三的内容</TabPane>
                <TabPane label="常见问题" name="name4">标签四的内容</TabPane>
            </Tabs>
        </div>
        <div class="detailOperation">
            <Row>
                <Col span="6" id="like" @click.native="likeBtn">                
                    <Icon type="ios-heart" class="orange" v-if="isLike"></Icon>
                    <Icon type="ios-heart-outline" v-else></Icon>
                    <p>喜欢</p> 
                </Col>
                <Col span="6" id="cartIcon" @click.native="toCart">
                    <Badge :count="cartNum" v-if="cartNum!=0"></Badge>
                    <Icon type="ios-cart-outline" ></Icon>
                    <p>购物车</p> 
                </Col>
                <Col span="12" id="addCart">
                    加入购物车
                </Col>
            </Row>
        </div>
    </div>

    <!-- 遮罩层 -->
    <!-- <div class="shade"></div> -->

    <!-- 弹出层 -->
    <div class="popup">
        <div class="popContainer">
            <Row class="popHead" :gutter="20">
                <Col span="8">
                    <img class="popLeft" :src="productPic[0]" alt="">
                </Col>
                <Col span="16" class="popRight">
                    <p class="popPrice">￥{{productItem.product_price}}</p>
                    <p class="popName">{{productItem.product_name}}</p>
                </Col>
                <Icon type="ios-close" class="popClose"></Icon>
            </Row>
            <div class="popBody">
                <div class="popInfo">
                    <p>商品介绍</p>
                    <div class="popDesc">{{productItem.product_desc}}</div>
                    <p>商品数量</p>
                    <counter @minNum="minnumber" 
                @addNum="addnumber" :number="productNum"></counter>
                </div>
            </div>
            <div class="popFoot">
                <div class="orange" @click="addTocart">确&nbsp;&nbsp;&nbsp;&nbsp;认</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiperjs'
import counter from '../../components/Counter'
import 'swipercss' 

export default {
  name: 'ProductDetail',
  data(){
      return {
          msg : "this is productDetail",
          productItem : [],
          productPic : [],
          productNum : 1,
        //   购物车数量
          cartNum : null,
        //   商品原本数量
          origNum : null,
          isLike:false,
          likeList:[],
          likeIndex:null
      }
  },components:{
      counter:counter
  },
  created (){
    // 获取商品信息  
      var sql = 'select * from product where product_id='+this.$route.query.productId;
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
      .then((res) => {
          this.productItem = res.data[0];
          this.productPic = res.data[0].product_pic.split('@')
      })

    // 获取购物车数量
      var sql = 'select count(*) as number from cart where cart_userId=1';
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
      .then((res) => {
          this.cartNum = parseInt(res.data[0].number);
      })

      // 商品是否存在
        var sql =  'select * from cart where cart_productId = '+this.$route.query.productId;
        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
        .then((res) => {
            // 如果不存在，数量为0
            if(res.data[0]==null){
                this.origNum = 0
            }else{
                // 存在设置原本数量
                this.origNum = parseInt(res.data[0].cart_productNumber)
            }
        })

    //获取喜欢
    sql = "select user_like from `user` where user_id=1"
    axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
    .then((res) => {
        this.likeList =  res.data[0].user_like.split(',')
        for(var i=0;i<this.likeList.length;i++){
            if(this.likeList[i] == this.$route.query.productId){
                this.isLike=true
                this.likeIndex=i
            }
        }
    }) 
  },
  mounted(){
    //  轮播图
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: true,
      loop:true,
      pagination: {
        el: '.swiper-pagination',
        },
    })

    // 导航点击
    $('.detailSection ul li').click(function(){
        $(this).addClass('detail-active').siblings().removeClass('detail-active');
    })

    // 点击加入购物车,显示弹出层
    $('#addCart').click(function(){
        $('.popup').show();
        $('.popContainer').animate({bottom:"0px"});
        $('body').css("overflow", "hidden")
    })
    $('.popClose').click(function(){
        $('.popContainer').animate({bottom:"-500px"});
        $('.popup').hide();
        $('body').css("overflow", "auto")
    })
  },
  methods: {
        goBack(){
          this.$router.go(-1)
        },
        detailSection(index){
        },
        //隐藏弹出层
        closePop(){
        },
        minnumber(){
          this.productNum--;
        },
        addnumber(){
          this.productNum++;
        },
        toCart(){
            this.$router.push({path:'/Cart'})
        },
        // 添加到购物车
        addTocart(){
            // 不存在，直接插入数据
            if(this.origNum  == 0){
                var sql = "insert into cart (cart_userId,cart_productId,cart_productNumber) values("
                            +1+",'"
                            +this.productItem.product_id+"','"
                            +this.productNum+"')"
                axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
                .then((res) => {
                    this.cartNum++;
                    $('.popContainer').animate({bottom:"-500px"});
                    $('.popup').hide();
                    $('body').css("overflow", "auto")
                })
            }else{
                // 存在，修改数据
                var sql = "update cart set cart_productNumber="+(this.origNum+this.productNum)+" where cart_userId = 1 and cart_productId="+this.productItem.product_id
                axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
                .then((res) => {
                    $('.popContainer').animate({bottom:"-500px"});
                    $('.popup').hide();
                    $('body').css("overflow", "auto")
                })
            }
            // 更新数量
            var sql =  'select * from cart where cart_productId = '+this.$route.query.productId;
            axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
            .then((res) => {
                var origin = res.data[0].cart_productNumber
                this.origNum = parseInt(origin)
            })
        },
        // 喜欢
        likeBtn(){
            if(this.isLike){
                // 取消喜欢
                this.isLike=false;
                this.likeList.splice(this.likeIndex,1)
            }else{
                // 加入喜欢
                this.isLike=true;
                this.likeList.push(this.$route.query.productId+'')
                this.likeIndex=this.likeList.length-1
            }
            var sql = "update user set user_like = '"
                +this.likeList.join(',')+"' where user_id = 1"
            axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
        }

    }
}
</script>

<style lang="scss" scoped>
ul{
    list-style: none;
    display: flex;
    justify-content: space-around
}
    header{
        width: 100%;
        padding: 10px;
        position: fixed;
        background-color: #fff;
        top: 0;
        z-index: 200;
        box-shadow: 0 -2px 10px #000;
        .detailSection{
            li{
                width: 30%;
                padding: 5px 5px;
                font-size: 14px;
                i{
                    display: none;
                }
                a{
                    color: #000;
                }
                &.detail-active{
                    color: orangered;
                    & i{
                        display: inline-block;
                    }
                }
            }
        }
    }
    .detailContainer{
        margin-top: 51px;
        .swiper-container{
            padding-top: 10px;
            background-color: #efefef;
            .swiper-wrapper{
                .swiper-slide{
                    img{
                        width: 100%;height: 100%; 
                    }
                }
            }
        }
        .detailInfo{
            padding: 20px;
            text-align: left;
            .detailName{
                font-size: 20px;
                margin-bottom: 5px;
            }
            .detailDesc{
                font-size: 14px;
                color: #666;
                margin-bottom: 5px;
            }
            .detailNum{
                display: flex;
                justify-content: space-between;
                line-height: 30px;
                .detailPrice{
                    font-size: 20px;
                    color: orangered;
                    font-weight: 400;
                }
                .detailStorage{
                    text-align: center;
                }
                .detailSale{
                    text-align: right;
                }
            }
        }
        padding-bottom: 60px;
        .detailMore{
            min-height: 200px;
            .ivu-tabs-nav .ivu-tabs-tab{
                padding: 8px 24px!important;
            }
        }
    }
    .detailOperation{
        position: fixed;
        bottom: 0;
        height: 50px;
        background-color: rgb(254, 251, 249);
        width: 100%;
        z-index: 210;
        i{
            display: block;
            font-size: 20px;
            &.orange{
                color: orangered;
            }
        }
        .ivu-col-span-6{
            padding: 6px;
        }
        .ivu-col-span-12{
            line-height: 40px;
            background-color: orangered;
            color: #fff;
            padding: 5px;
            font-size: 16px;
        }
        #cartIcon{
            position: relative;
            span{
                position: absolute;
                top: 0;
                right: 20%;
            }
        }
    }

    // 遮罩层
    .popup{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 300;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        text-align: left;
        display: none;
        .popContainer{
            position: fixed;
            bottom:-500px;
            // bottom: 0;
            width:100%;
            height: 55%;
            background-color: #fff;
            .popHead{
                padding: 10px;
                width: 100%;
                position: relative;
                .popLeft{
                    width: 100px;
                    height: 100px;
                    margin-top: -40px;
                    border: 1px solid #ccc;
                    img{
                        // display: block;
                        // margin: 10px;
                        width: 100%;
                        height: 100%;
                    } 
                }
                .popRight{
                        text-align: left;
                    .popPrice{
                        font-size: 20px;
                        color: orangered;
                        font-weight: 400;
                    }
                }
                .popClose{
                    font-size: 30px;
                    position: absolute;
                    top: 0px;
                    right: -10px;
                }
            }
            .popBody{
                padding: 0 10px;
                .popInfo{
                    p{
                        font-size: 16px;

                    }
                    .popDesc{
                        text-indent: 2em;
                        margin-bottom: 10px;
                    }
                    .popNum{
                        margin-bottom: 10px;
                    }
                    #counter{
                        text-align: center;
                    }
                }
            }
            .popFoot{
                width: 100%;
                height:50px;
                background-color: orangered;
                color: #fff;
                text-align: center;
                line-height: 50px;
                font-size: 16px;
                position: absolute;
                bottom: 0;
            }
        }
    }
</style>
