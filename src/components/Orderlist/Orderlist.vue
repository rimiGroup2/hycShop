<template>
    <div>
        <Header title="订单列表"></Header>
        <div class="search">
            <Input search placeholder="搜索订单号" />
        </div>
        <div class="order-tab">
            <Row>
                <Col span="6" v-for="(item,index) in orderTag" :key="item.id"><p @click="tab(index)" :class="{tabFont:tag==index}">{{item}}</p></Col>                         
            </Row>
        </div>
        <OrderChoose :index="tag"></OrderChoose>
    </div>
</template>

<script>
import Header from '../User/user-header.vue'
import OrderChoose from './Order-choose.vue'
export default {
    data(){
        return {
            orderTag:["全部订单","待付款","待收货","已完成"],
            tag:0,
            goods:null,
        }
    },
    components:{
        Header,
        OrderChoose,
    },
    methods:{        
        tab(index){
            this.tag = index
        }
    }
}
</script> 

<style lang="scss" scoped>
    .search{
        padding: 5px 10px;
    }
    .order-tab{
        text-align: center;
        font-size:14px;
        background-color:#fff;
        padding-top: 10px;
        p{
            padding-bottom: 10px;
            box-sizing: border-box;
        }
    }
    .tabFont{
        color:red !important;
        background: white !important;
        border-bottom:1px solid red; 
    }
</style>