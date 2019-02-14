<template>
    <div>
        <Header title="订单详情"></Header>      
        <div class="order-info">
            <p>订单状态:
                <span v-if="order_state && order_state == 0" style="color:red">未支付</span>
                <span v-if="order_state && order_state == 1">待发货</span>
                <span v-if="order_state && order_state == 2">已取消</span>
                <span v-if="order_state && order_state == 3">已完成</span>
            </p>
            <p>订单编号:<span> {{order_number}}</span></p>
            <div v-if="order_state && order_state == 0">
                <Button type="error" long class="pay-button" @click="toPay">去支付</button>
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
import Header from '../User/user-header.vue'
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
            loading:true,
        }
    },
    created:function(){
        this.getNumber()
        this.getProduct()
        this.getAdress()
        this.getOrder()          
    },
    methods:{
        getNumber(){
            if(this.$route.query.orderNumber){
                this.order_number = this.$route.query.orderNumber
            }else{
                alert('出现未知错误，返回上一页')
                window.history.go(-1)
            }
            this.user_id = window.sessionStorage.userId
        },
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
        getOrder(){
            var number = this.order_number
            var sql =`SELECT * FROM \`order\` WHERE order_number ='${number}' `
            this.user_id =  window.sessionStorage.userId
            Ajax(sql).then(res=>{
                this.order = res;
                this.order_state = res[0].order_state
            })
        },
        toPay(){
            console.log(123)
        },
        toCancel(){
            let sql = `update \`order\` set order_state=2 where order_number= '${this.order_number}'`
            
            Ajax(sql).then(res=>{
                if(res){
                  this.cancel = false;
                  alert('取消成功!')
                  this.$router.go(0)
                }
                
            })
        }


    },
    components:{
        Header:Header,
    }
}
</script>
<style lang="scss" scoped>
    .order-info{
        padding: 15px;
        font-size:15px;
        font-weight: 400;
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
    }

    .user-address{
        margin: 10px 0;
        padding: 15px;
        font-size: 15px;
    }

    .product{
        padding: 15px;
        position: relative;
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