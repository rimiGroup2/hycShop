<template>
    <div id="user">
        <Header title="我的汇一城"></Header>
        <div class="user-info">
            <div class="user">
                <Row>
                    <Col span="5" class="user-portrait">
                        <img src="http://img11.360buyimg.com/jdphoto/s120x122_jfs/t5683/191/7076936752/5123/834e5571/596dd62bN7a8affc5.png" alt="">
                    </Col>
                    <Col span="19" class="user-name">
                        <div>
                            <p>{{username}}</p>
                            <p>用户名</p>
                            <p>{{useremail}}</p>
                        </div>
                    </Col>
                    <div class="user-setting">
                        <router-link to="./profile" tag="p"><Icon type="md-settings" size="20"/>账户管理</router-link>
                    </div>
                </Row>
            </div>
        </div>
        <div class="user-menu">
            <Row>
                <Col span="6" v-for="(item,index) in userMenu" :key="index"><p @click="ToOrder(index)"><Icon :type="item.type"  size="24" class="iconfont" /></p>{{item.context}}</Col>
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
                    <h4>{{ count }}</h4>
                    <router-link to="./footprint">我的足迹</router-link>
                </Col>
            </Row>
        </div>
       <recommend></recommend>
       <nav-buttom></nav-buttom>
    </div>

</template>
<script>
import navButtom from '../navButtom.vue'
import Header from './user-header.vue'
import recommend from '../Recommends/recommend.vue'
export default {
    data() {
        return {
            username: window.sessionStorage.getItem("username"),
            useremail: window.sessionStorage.getItem("useremail"),
            name:'设置昵称',
            count:0,
            userMenu:[
                {type:"md-clipboard",context:"全部订单"},
                {type:"ios-card",context:"代付款"},
                {type:"md-car",context:"待收货"},
                {type:"ios-checkmark-circle-outline",context:"已完成"},
            ]
        }
    },mounted(){
        this.isLogin()
        this.countNum() 
    },
    computed: {
        userName(){
            return this.name;
        },
    },
    components:{
        navButtom,
        Header,
        recommend
    },
    methods: {
       //判断是否登陆
        isLogin(){
            if(!window.sessionStorage.getItem("islogin")){
                this.$router.push('./login') 
            }
        },
        countNum(){
            if(window.sessionStorage.getItem("footData")){
                //获取session中的数据
                let  footListArr = JSON.parse(sessionStorage.getItem('footData'))
                this.count=footListArr.length
            } 
        },
        ToOrder(index){
            this.$router.push({path:"/orderList",query:{tag:index}})
        }
    }
}
</script>
<style lang="scss" scoped>
    #user{
        background-color:#f7f7f7; 
    }
    .user-info{
        margin: 10px 12px;
       background: linear-gradient(90deg,#eb3c3c,#ff7459);
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
                div{
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                    line-height: 20px;
                    font-size: 12px;
                    color: #fff
                }
            }
            .user-setting{
                position: absolute;
                top: -24%;
                right: 1%;
                color: rgba(76,0,0,.7)
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
        a{
            color:black;
            font-size: 14px;
        }
    }
</style>