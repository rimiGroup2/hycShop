<template>
  <div id="cart">
      <header-bar :headertitle="title" :more="true"></header-bar>
      <div class="cartContainer">
          <div class="nodata" v-if="cartList.length==0">
              <Icon type="ios-cart-outline" />
              <p>购物车中没有东西，去逛逛吧</p>
          </div>
          <cart-item v-for="item,index in cartList" 
           :productItem='item' :key='index.id' 
           @itemselect="itemChecked(index)" @del="del" :index='index'>
          </cart-item>
          <!-- <cart-item></cart-item> -->
      </div>
      <Row class="cartFooter">
        <Col span="6">
        <Checkbox @click.native="selectAll" :checked="checkAll" 
        v-model="checkAll">全选</Checkbox>
        </Col>
        <Col span="12">
        合计：<span class="totPrice">{{totPrice}}</span>
        </Col>
        <Col span="6" class="sum">
        <i-button type="primary" size="large" @click="toOrder">去结算</i-button>
        </Col>
      </Row>
      <Modal
        v-model="delAlert"
        @on-ok="ok"
        @on-cancel="cancel">
        <h3>确认要删除吗？</h3>
      </Modal>


      <!-- order -->
      <transition name="slide">
          <div id="order"  v-show="orderShowflag">
            <header>
                <Row :gutter="6">
                    <Col span="4"  @click.native="orderShowflag=false">
                        <Icon type="ios-arrow-back" size="30"/>
                    </Col>
                    <Col span="16" class="headerTitle">
                        <!-- 页面名称 -->
                        确认订单
                    </Col>
                </Row>   
            </header>
            <!-- 收货地址 -->
            <div class="addressContainer" @click="toShipping">
                <div class="showAddress" v-if="defaultAddress">
                    <Row>
                        <Col span="2">
                            <Icon type="ios-navigate-outline" />
                        </Col>
                        <Col span="20" class="content">
                            <h3 class="name">收货人：{{defaultAddress.address_name}}</h3>
                            <h3 class="phone">联系电话：{{defaultAddress.address_phone}}</h3>
                            <p class="address">收货地址：{{defaultAddress.address_area}}</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {{defaultAddress.address_content}}
                            </p>
                            <p>邮政编码：{{defaultAddress.address_code}}</p>
                        </Col>
                        <Col span="2"><Icon type="ios-arrow-forward" /></Col>
                    </Row>
                </div>
                <div class="addAddress" v-else>
                    添加收货地址<Icon type="ios-arrow-forward" />
                </div>
            </div>
            <img src="http://118.24.87.17/img/bar.png" alt="">

            <!-- 商品列表 -->
            <div class="itemContainer">
                <order-item v-for="item,index in checkedItems" 
                :productItem='item' :key='index.id' 
                @itemselect="itemChecked(index)"></order-item>
            </div>
            <Row class="cartFooter">
                <Col span="6">
                </Col>
                <Col span="12">
                合计：<span class="totPrice">{{totPrice}}</span>
                </Col>
                <Col span="6" class="sum">
                <i-button type="primary" size="large" @click="checkOrder">确认订单</i-button>
                </Col>
            </Row>
          </div>
      </transition>
  </div>
</template>

<script>
import headerbar from '../../components/Headerbar'
import cartitem from './Cartitem'
import orderitem from './Orderitem'

export default {
  name: 'Cart',
  data(){
      return {
           title:'购物车',
           cartList : [],
           tot: 0,
           checkAll: false,
           checkCounter:0,
           delAlert:false,
           delCartid:null,
           delIndex:null,
           checkedItems:[],
           orderNum:null,
           orderShowflag:false,
        // 默认收货地址
           defaultAddress:false,
      }     
  },
  components : {
      headerBar : headerbar,
      cartItem : cartitem,
      orderItem:orderitem
  },
  methods : {
        //全选
        selectAll(){
            this.checkAll = !this.checkAll;
            for(var i = 0;i < this.cartList.length;i++){
                this.cartList[i].ischecked = this.checkAll;
            }
        },
        //选中项目   
        itemChecked(index){
            this.checkCounter=this.cartList[index].ischecked?this.checkCounter+1:this.checkCounter-1;
            this.checkAll = (this.checkCounter==this.cartList.length)?true:false;
        },
        // 去结算
        toOrder(){
            // 过滤已选中的项目
            this.checkedItems = this.cartList.filter(function(item){
                return item.ischecked
            })
            // console.log(this.checkedItems)
            if(this.checkedItems.length == 0){
                this.$Modal.info({
                    title: '你还未选中商品'
                });
            }else{
                this.orderShowflag=true;
                
            }
        },
        //点击刪除   
        del(index,id){
            this.delAlert = true;
            this.delCartid=id,
            this.delIndex=index
        },
        ok(){
            var sql='delete from cart where cart_id='+this.delCartid;
            axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
            .then((res) => {
                this.cartList.splice(this.delIndex,1);
                this.delIndex=null
                this.delCartid=null
            })
        },
        cancel(){
            this.delIndex=null
            this.delCartid=null
        },
        //收货地址 
        toShipping(){
            this.$router.push({path:'/Shipping'})
        },
        // 确认订单
        checkOrder(){
            // 生成订单
            var sql = "insert into `order` (order_number,order_uid,order_payPrice,order_state) values("
                        +"CONCAT('HYC',DATE_FORMAT(now(), '%y%m%d%H%i%s'),lpad(round(round(rand(),2)*1000),2,'0')),"
                        +"1,"
                        +this.totPrice+",0)"
            axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
            .then(() => {
                sql = "SELECT * FROM `order` GROUP BY order_number DESC LIMIT 1"
                axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
                .then((res)=>{
                    this.orderNum = res.data[0].order_number;
                })
                // 加入订单商品表
                .then(()=>{
                    // console.log(this.orderNum)
                    // console.log(this.checkedItems)
                    var data ='';
                    for(var i=0;i<this.checkedItems.length;i++){
                        data+="('"
                            +this.orderNum+"',"
                            +this.checkedItems[i].cart_productId+","
                            +this.checkedItems[i].cart_productNumber+","
                            +this.checkedItems[i].product_price+")"
                        i==this.checkedItems.length-1?data+=';':data+=',';
                    }
                    sql = 'insert into order_product (order_number,product_id,product_num,product_price) values';
                    axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql+data)
                })
            })

            // 删除购物车项目
            sql = "delete from cart where "
            for(var i=0;i<this.checkedItems.length;i++){
                sql+="cart_id = "+this.checkedItems[i].cart_id
                i==this.checkedItems.length-1?sql+=';':sql+=' or ';
            }
            axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
        }
  },
  computed: {
      totPrice:function(){
            var tot = 0;
            this.cartList.forEach(function(item){
                if(item.ischecked)
                tot += parseFloat(item.product_price * item.cart_productNumber)
            })
            return tot.toFixed(2);
        }
  },
  created (){
    //   获取购物车列表
      var sql = 'select * from product as p join cart as c on c.cart_productId=p.product_id where c.cart_userId=1';
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
      .then((res) => {
          res.data.forEach(function(item){
              item.ischecked=false
          })
          this.cartList = res.data;
      })

    //   获取默认地址
      sql = "select * from address where address_isdefault = 1 and address_userId = "
          + "1";
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
      .then((res) => {
          this.defaultAddress = res.data[0]
      })
  }
}
</script>

<style lang="scss" scoped>
    header{
        width: 100%;
        padding: 10px;
        position: fixed;
        background-color: #fff;
        top: 0;
        z-index: 200;
        box-shadow: 0 -2px 10px #000;
        .headerTitle{
            font-size: 20px;
        }
    }
    #cart{
        .cartContainer{
            min-height: 888px;
            padding-top: 55px;
            background-color: #efefef;
            padding-bottom: 50px;
            .nodata{
                width: 300px;
                height: 300px;
                display: block;
                position: absolute;
                // background-color: #fff;
                top: 50%;
                left: 50%;
                margin-top: -150px;
                margin-left: -150px;
                color: orangered;
                font-size: 100px;
                p{
                    font-size: 16px;
                }
            }
        }
        .cartFooter{
            width: 100%;
            // height: 50px;
            padding: 10px;
            position: fixed;
            bottom: 0;
            background-color: #fff;
            line-height: 30px;
            z-index: 200;
            .ivu-col-span-6,
            .ivu-col-span-12{
                margin-top: 4px;
                &.sum{
                    margin-top: 0;
                }
            }
            .ivu-col-span-12{
                text-align: right;
                margin-top: -1px;
            }
        }
        .totPrice{
            color: orangered;
            font-size: 20px;   
            line-height: 35px;
            padding-right: 10px;
        }
    }

    #order{
        position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #eee;
            z-index: 1000;
        .addressContainer{
            text-align: left;
            background-color: #fff;
            .showAddress{
                margin-top: 50px;
                padding:20px 30px;
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


    // 进入动画
        .slide-enter-active,.slide-leave-active{
            transition: all 0.5s;
        }
        .slide-enter,.slide-leave-to{
            transform: translate3d(100%,0,0);
        }
</style>
