<template>
    <div>
        <Header title="订单详情"></Header>
        <div class="order-info">
            <p>订单状态:
                <span v-if="order_state == 0">未支付</span>
                <span v-if="order_state == 1">待发货</span>
                <span v-if="order_state == 2">已取消</span>
                <span v-if="order_state == 3">已完成</span>
            </p>
            <p>订单编号:{{order_number}}</p>
            <div v-if="order[0].order_state == 0">
                <button>去支付</button>
                <button>取消订单</button>
            </div>
        </div>
        <div class="user-address">
            <p>商品金额:￥{{order[0].order_payPrice}}</p>
            <!-- <p>收货地址{{adress.address_area}}{{address.address_content}}</p> -->
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
            goods:"",
            adress:"",
            order:"",
            order_state:"",
        }
    },
    created:function(){
        this.getNumber()
        this.getGoods()
        this.getAdress()
        this.getOrder()          
    },
    methods:{
        getNumber(){
            if(this.$route.params.orderNumber){
                this.order_number = this.$route.params.orderNumber
            }else{
                alert('出现未知错误，返回上一页')
                window.history.go(-1)
            }
        },
        getGoods(){
            var number = this.order_number
            var sql =`SELECT * FROM product JOIN (SELECT * FROM order_product WHERE order_number =${number}) AS o ON product.product_id = o.product_id`
            Ajax(sql).then(res=>{
                this.goods = res;
            })
        },
        getAdress(){
            var sql = `SELECT * FROM address WHERE address_userid = 1 AND address_isdefault = 1`
            Ajax(sql).then(res=>{                
                this.adress = res
            })
        },
        getOrder(){
            var number = this.order_number
            var sql =`SELECT * FROM \`order\` WHERE order_number =${number} `
            Ajax(sql).then(res=>{
                this.order = res;
                this.order_state = res[0].order_state
                console.log(this.order)
            })
        }
    },
    components:{
        Header:Header,
    }
}
</script>
<style lang="scss" scoped>
    
</style>