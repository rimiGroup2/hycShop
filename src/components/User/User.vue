<template>
    <div id="user">
        <Header title="我的汇一城"></Header>
        <div class="user-info">
            <div class="user">
                <Row>
                    <Col span="5" class="user-portrait">
                        <img src="http://cdn.duitang.com/uploads/item/201407/24/20140724190906_MCkXs.thumb.700_0.jpeg" alt="">
                    </Col>
                    <Col span="19" class="user-name">
                        <h3>{{userName}}</h3>
                    </Col>
                    <div class="user-setting">
                         <router-link to="setting" tag="p"><Icon type="md-settings" size="20"/>账户管理</router-link>
                    </div>
                </Row>
            </div>
        </div>
        <div class="user-menu">
            <Row>
                <Col span="6"><p class="iconfont icon-dengdaizhifu"></p>代付款</Col>
                <Col span="6"><p class="iconfont icon-daishouhuo"></p>待收货</Col>
                <Col span="6"><p class="iconfont icon-iconfontzhizuobiaozhun0261"></p>已完成</Col>
                <Col span="6"><p class="iconfont icon-quanbudingdan"></p>全部订单</Col>
            </Row>
        </div>
        <div class="user-favorite">
            <Row>
                <Col span="8">
                    <h4>0</h4>
                    <p>关注的商品</p>
                </Col>
                <Col span="8">
                    <h4>0</h4>
                   <p>关注的店铺</p>
                </Col>
                <Col span="8">
                    <h4>0</h4>
                    <p>我的足迹</p>
                </Col>
            </Row>
        </div>
       <nav-buttom></nav-buttom>
    </div>

</template>
<script>
import navButtom from '../navButtom/navButtom.vue'
import '@static/user-icon/iconfont.css'
import Header from './user-header.vue'
export default {
    data() {
        return {
            name:'设置昵称'
        }
    },
    computed: {
        userName(){
            return this.name;
        }
    },
    components:{
        navButtom,
        Header,
    },
    methods: {

    },
}
</script>
<style lang="scss" scoped>
    #user{
        background-color:#f7f7f7; 
    }
   
    .user-info{
        margin: 10px 12px;
        background-color:red;
        border-radius:0.5rem;
        height: 8rem;
        width: 94%;  
        .user{
            position: relative;
            top: 10%;
            padding: 15px;
            .user-portrait{
                text-align: left;
                img{
                    width: 66px;
                    height: 66px;
                    border-radius:50%; 
                }
            }
            .user-name{
                text-align: left;
                line-height: 1rem;
                h3{
                    color: #fff;
                    font-size: 16px;
                    margin-top: 10px;
                    padding-left:15px;
                }
            }
            .user-setting{
                position: absolute;
                top: -26%;
                right: 1%;
            }
        }
    }
    .user-menu{
        margin-top:20px; 
        height: 75px;
        background-color: white;
        text-align: center;
        font-size: 14px;
        .iconfont{
            margin-top: 10px;
            font-size: 26px;
            color: #f63515;
        }
    }
    .user-favorite{
        margin-top:20px; 
        height: 65px;
        background-color:white; 
        text-align: center;
        h4{
            font-size: 18px;
            font-weight: bolder;
            margin-top: 15px;
        }
        p{
            font-size: 14px;
        }
    }
</style>