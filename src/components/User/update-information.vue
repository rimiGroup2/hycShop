<template>
    <div>
        <div v-if="state">
            <Header title="个人信息"></Header>
            <div class="update-info">
                <Row>
                    <Col span="4">
                        昵称：
                    </Col>
                    <Col span="17">123213123</Col>
                    <Col span="3"></Col>
                </Row>
            </div>
            <div class="update-info" v-for="(item,index) in Function" :key="item.id" @click="showWrap(item)">
                <Row>
                    <Col span="4">
                        {{item.name}}
                    </Col>
                    <Col span="17">{{item.data}}</Col>
                    <Col span="3"><Icon type="ios-arrow-forward" size="30"/></Col>
                </Row>
            </div>
        </div>
         <div v-else  :style="styles">
             <header>
                <Row>
                    <Col span="3">
                        <div @click="goBack">
                            <Icon type="ios-arrow-back" size="30"/>
                        </div>
                    </Col>
                    <Col span="17">
                        <p>修改{{current.name}}</p>
                    </Col>
                    <Col span="4" >
                        <p @click="complete">完成</p>
                    </Col>
                </Row>
             </header>
             <div v-if="current.name=='邮箱'">
                 <p class="prompt" ref="prompt">请输入正确的邮箱号</p>
                  <Input v-model="current.data" placeholder="请输入你的邮箱号" clearable  @on-blur="checkEmail"/>
             </div>
             <div v-if="current.name=='手机号'">
                 <p class="prompt" ref="prompt">请输入正确的手机号</p>
                 <Input v-model="current.data" placeholder="请输入你的手机号" clearable  @on-blur="checkPhone"/>
             </div>
        </div>
    </div>
   
</template>
<script>
import Header from './user-header.vue'
export default {
    data() {
        return {
            Function:[
                {name:"邮箱",data:"未设置"},
                {name:"手机号",data:'未设置'}
                ],
            state:true,
            current:'',
            styles:{
                height:'',
                background:"#eee",
            }      
        }
    },
    components:{
        Header
    },
    methods: {
        showWrap(item){
            this.state = false;
            this.current = item;
        },
        goBack(){
            this.state=true;
        },
        checkEmail(){
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(reg.test(this.current.data)){
                this.$refs.prompt.style.visibility="hidden"
            }else{
                this.$refs.prompt.style.visibility="visible"
            }
        },
        checkPhone(){
            var reg = new RegExp('^1[3|4|5|8][0-9]\d{4,8}$');
            if(reg.test(this.current.data)){
                this.$refs.prompt.style.visibility="hidden"
            }else{
                this.$refs.prompt.style.visibility="visible"
            }
        },
        complete(){
            console.log(this.$refs.prompt.style.visibility!="visible")
        }
    },
    mounted() {
         this.styles.height = document.documentElement.clientHeight + 'px'
        window.onresize=()=>{
         this.styles.height = document.documentElement.clientHeight + 'px'
        }
    },
    
}
</script>
<style lang="scss" scoped>
    header{
        text-align: center;
        p{
            font-size:15px;
        }
        height:52px;
        line-height: 52px;
        background-color:#fff; 

    }
    .update-info{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        color:#333;
        font-size:14px;
        border-bottom: 1px solid #e8e8e8;
    }
    .prompt{
        visibility: hidden;
        line-height: 40px;
        color:red;
        font-size:16px;
        i{
            line-height: 1px;
        }
    }
</style>