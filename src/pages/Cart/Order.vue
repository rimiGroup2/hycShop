<template>
  <div id="order">
      <header-bar :headertitle="title" :more="false"></header-bar>
      <!-- 收货地址 -->
      <div class="addressContainer">
          <div class="showAddress" v-if="defaultAddress">
              <Row>
                  <Col span="2">
                    <Icon type="ios-navigate-outline" />
                  </Col>
                  <Col span="20" class="content">
                    <h3 class="name">收货人：姓名</h3>
                    <h3 class="phone">联系电话：13800138000</h3>
                    <p class="address">收货地址：收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址</p>
                  </Col>
                  <Col span="2"><Icon type="ios-arrow-forward" /></Col>
              </Row>
              
          </div>
          <div class="addAddress" v-else>
              添加收货地址<Icon type="ios-arrow-forward" />
          </div>
      </div>
      <img src="data:image/png;base64,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" alt="">

      <!-- 商品列表 -->
      <div class="itemContainer">
          <order-item v-for="item,index in testData" 
           :productItem='item' :key='index.id' 
           @itemselect="itemChecked(index)"></order-item>
      </div>
      
  </div>
</template>

<script>
import headerbar from '../../components/Headerbar'
import orderitem from './Orderitem'

export default {
  name: 'Order',
  data(){
      return {
        title :'提交订单',
        // 有无默认收货地址
        defaultAddress:false,
        testData : [
                    {
                        name:'一部手机一部手机一部手机一部手机一部手机一部手机一部手机',
                        desc:'就是一部手机',
                        pic:'http://img.happymmall.com/4d573267-fb73-46dd-8744-b209fa525855.jpg',
                        num:1,
                        price:1989.89,
                        ischecked:false
                    },
                    {
                        name:'小龙虾小龙虾小龙虾小龙虾小龙虾小龙虾小龙虾小龙虾',
                        desc:'就是小龙虾',
                        pic : 'http://img.happymmall.com/dbf30c59-2178-4257-a22c-a03704c32863.png',
                        num:2,
                        price:1989.98,
                        ischecked:false
                    }
                ]
        }
  },
  components: {
      orderItem:orderitem,
      headerBar:headerbar
  }
}
</script>

<style lang="scss" scoped>
    #order{
        .addressContainer{
            text-align: left;
            .showAddress{
                margin-top: 50px;
                padding:20px 30px 10px;
                .content{
                    .name{
                        float: left;
                    }
                    .phone{
                        // text-align: right;
                        float: right;
                    }
                    .address{
                        margin-top: 25px;
                        font-size: 12px;
                    }
                }
                i{
                    line-height: 70px;
                    font-size: 20px;
                }
            }
            .addAddress{
                margin-top: 50px;
                padding: 15px 20px 10px;
                font-size: 16px;
            }
        }
        img{
            padding: 0;margin: 0;
            font-size: 0;
            width: 100%;
            height:8px;
        }
        .itemContainer{
            padding-top: 10px;
            background-color: #efefef;
        } 
    }
</style>
