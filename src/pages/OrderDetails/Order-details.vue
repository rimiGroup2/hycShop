<template>
    <div class="background" :style="{'height':height}">
        <Header title="订单详情"></Header>      
        <div class="order-info">
            <p>订单状态:
                <span v-if="order_state && order_state == 0" style="color:red">未支付</span>
                <span v-if="order_state && order_state == 1">
                    待发货
                    <Button type="error"  class="confirm-button" @click="confirm = true">确认收货</button>
                    <Modal v-model="confirm" title="Title" :loading="loading" @on-ok="toConfirm">
                    <p>确认收货吗</p>
                    </Modal>
                </span>
                <span v-if="order_state && order_state == 2">已取消</span>
                <span v-if="order_state && order_state == 3">已完成</span>
            </p>
            <p>订单编号:<span> {{order_number}}</span></p>
            <div v-if="order_state && order_state == 0 && order[0].order_payPrice">
                <Button type="error" long class="pay-button" @click="topay = true">去支付</button>
                <Modal v-model="topay" title="Title" :loading="loading" @on-ok="toPay">
                 <p>订单一共<span style="color:#ed4014">￥{{order[0].order_payPrice}}</span>,确认支付吗？</p>
                </Modal>
                <Button long class="cancel-button" @click="cancel = true">取消订单</button>
                <Modal v-model="cancel" title="Title" :loading="loading" @on-ok="toCancel">
                 <p>您确定要取消订单吗</p>
                </Modal>
            </div>
        </div>
        <div class="user-address" v-if="order && address && order[0].order_payPrice">
            <p >订单金额:￥{{order[0].order_payPrice}}</p>          
            <p >收货地址:{{address.address_area}}{{address.address_content}}</p>
            <p >收货人:{{address.address_name}}</p>
            <p > 联系电话:{{address.address_phone}}</p>
            <p >配送方式:普通快递</p>
        </div>
        <div class="product" v-if="product">
                <ul>
                    <li v-for="(item,index) in product" :key="index">
                        <Row>
                            <Col span="5">
                                <img :src="item.product_pic" alt="">
                            </Col>
                            <Col span="15" class-name="product-font">
                                <div>
                                    <p class="product-font-name">{{item.product_name}}</p>
                                    <p class="product-font-price">￥{{item.product_price}}</p>
                                </div>
                            </Col>
                            <Col span="4" class-name="product-num">
                                <p>数量:{{item.product_num}}</p>   
                            </Col>
                        </Row>                        
                    </li>
                </ul>
        </div>
    </div>
</template>
<script>
import Header from '@/components/user-header.vue'
import Ajax from '@/Ajax/ajax.js' 
export default {
    data(){
        return{
            order_number:"",
            product:"",
            address:"",
            order:"",
            order_state:"",
            user_id:"",
            cancel:false,
            topay:false,
            confirm:false,
            loading:true,
            height:"",
        }
    },
    created:function(){
        //获取订单号和用户id
        this.getNumber()
        //获取订单下的商品信息
        this.getProduct()
        //获取用户地址信息
        this.getAdress()
        //获取订单的状态
        this.getOrder()          
    },
    methods:{
        //获取订单号和用户id
        getNumber(){
            if(this.$route.query.orderNumber){
                this.order_number = this.$route.query.orderNumber
            }else{
                alert('出现未知错误，返回上一页')
                window.history.go(-1)
            }
            this.user_id = window.sessionStorage.userId
        },
        //获取订单下的商品信息
        getProduct(){
            var number = this.order_number
            var sql =`SELECT * FROM product JOIN (SELECT * FROM order_product WHERE order_number ='${number}') AS o ON product.product_id = o.product_id`
            Ajax(sql).then(res=>{
                res.map(function(item){
                    item.product_pic = item.product_pic.split("@")[0]
                })
                this.product = res;
            })
        },
        //获取用户地址信息
        getAdress(){
            var userId = this.user_id
            console.log(this.user_id)
            var sql = `SELECT * FROM address WHERE address_userid = ${this.user_id} AND address_isdefault = 1`
            console.log(sql)
            Ajax(sql).then(res=>{                
                this.address = res[0]
                // console.log(this.user_id)
            })
        },
        //获取订单的状态
        getOrder(){
            var number = this.order_number
            var sql =`SELECT * FROM \`order\` WHERE order_number ='${number}' `
            this.user_id =  window.sessionStorage.userId
            Ajax(sql).then(res=>{
                this.order = res;
                this.order_state = res[0].order_state
            })
        },
        //支付更改状态为待收货
        toPay(){
            let sql = `update \`order\` set order_state=1 where order_number= '${this.order_number}'`        
            Ajax(sql).then(res=>{
                if(res){
                  return   
                }            
            })
            .then(()=>{
                setTimeout(() => {
                  this.topay = false;
                  this.$router.go(0)
                }, 2000);
            })
        },
        //取消订单，状态更改为已取消
        toCancel(){
            let sql = `update \`order\` set order_state=2 where order_number= '${this.order_number}'`        
             Ajax(sql).then(res=>{
                if(res){
                  return   
                }            
            })
            .then(()=>{
                setTimeout(() => {
                  this.cancel = false;
                  this.$router.go(0)
                }, 2000);
            })
        },
        //确认收货，状态更改为已完成
        toConfirm(){
            let sql = `update \`order\` set order_state=3 where order_number= '${this.order_number}'`        
             Ajax(sql).then(res=>{
                if(res){
                  return   
                }            
            })
            .then(()=>{
                setTimeout(() => {
                  this.confirm = false;
                  this.$router.go(0)
                }, 2000);
            })
        }


    },
    components:{
        Header:Header,
    },
    //获取html的高度
    mounted(){
         this.height = (document.documentElement.screenHeight-126) + 'px'
         console.log()
        window.onresize=()=>{
         this.height = (document.documentElement.screenHeight-126) + 'px'
        }
    }
}
</script>
<style lang="scss" scoped>
    .background{
        background-color:#eee; 
    }
    .order-info{
        padding: 15px;
        font-size:15px;
        font-weight: 400;
        background-color:white; 
        p{  
            color:#999;
            span{
                color:#464c5b;
            }
            margin: 5px 0px;
        }
        button{
            height:50px;
            margin: 7px 0px;
            font-size:15px;
        }
        .confirm-button{
            height: 100%;
            float: right;
        }
    }

    .user-address{
        margin: 10px 0;
        padding: 15px;
        font-size: 15px;
        background-color:white; 
    }

    .product{
        padding: 15px;
        position: relative;
        background-color:white; 
        ul{
            list-style: none;
        }
        img{
            width: 100%;
            height: 100%;
        }
        .product-font{
            padding: 0 10px;
            box-sizing: border-box;
            div{
                width: 100%;
                height: 100%;
                position: relative;
                .product-font-price{
                    font-weight: 400;
                    color:red;
                }
                .product-font-name{
                    font-size:14px;
                }
                p{
                    width: 100%;
                    overflow: hidden;
                }
            }          
        }
    }
</style>