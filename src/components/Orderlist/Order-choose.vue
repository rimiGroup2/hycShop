<template>
    <div>
        <div class="order-item" v-if="tag == 0">
            <p v-if="order.length == 0">您暂时还没有订单！</p>
            <div v-else>
                <ul>
                    <li v-for="item in goods" :key="item.id">
                        <div class="item-top"  @click="demo()">
                             <p>订单号:{{item.number}}</p>                            
                        </div>
                        <div class="item-container">
                            <p>状态:{{item.state}}</p>
                        </div>
                        <div class="item-bottom">
                            <p>总价:{{item.total}}</p>
                        </div>                       
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Ajax from '@/Ajax/ajax.js'
export default {
    props:['index'],
    data(){
        return {
            tag:"",
            order:null,
            order_is_Pay:[],//未支付 0是未支付，1是已支付，2是已取消
            order_is_Receipt:[],//未完成  0是未完成，1是已完成
            order_is_Ship:[],//未发货 0是未发货，1是已发货
        }
    },
    created:function(){
        this.tag = this.index
        var sql =`select opp.*,p.product_name,p.product_desc,p.product_pic from 
                (select o.order_number,order_uid,op.product_id,op.product_num,op.product_price,order_payPrice,order_isPay,order_is_ship,order_isReceipt from 
                (select * from \`order\` where order_uid = 3 ) as o join order_product as op ON o.order_number = op.order_number) as opp join product as p on opp.product_id=p.product_id`       
        // this.$store.a.actions.Ajax(sql)
        this.$store.dispatch("Ajax", sql)
        var res = this.$store.state.a.ajaxData
        this.order = res 
         console.log(this.order)

    },
    methods:{
      
    },
    watch:{
        index(val){
            this.tag = this.index
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>