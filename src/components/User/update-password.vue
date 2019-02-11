<template>
    <div id="update" :style="{'height':height}">
        <Header title="账号管理"></Header>
        <div class="user-password">
            <p>输入旧密码：</p>
            <Input type="password" v-model="oldPassword"  :autosize="true" placeholder="请输入旧密码" clearable  />
            <p>输入新密码:</p>
            <Input type="password" v-model="newPassword"  :autosize="true" placeholder="请输入新密码" clearable  />
            <button class="sure" @click="besure">确定</button>

        </div>
    </div>
</template>
<script>
import Header from './user-header.vue'
export default {
    data() {
        return {
            oldPassword:"",
            newPassword:"",
            height:"",
        }
    },
    components:{
        Header             
    },
    mounted() {
         this.height = document.documentElement.clientHeight + 'px'
        window.onresize=()=>{
         this.height = document.documentElement.clientHeight + 'px'
        }
    },
    methods: {
        besure(){
            console.log(1)
        }
    },
}
</script>
<style lang="scss" scoped>
   #update{
       background-color:#f5f5f5;
       width: 100%;
       height: 100%; 
        .user-password{
            margin-top: 30px;
            padding: 20px;
            p{
                font-size: 16px;
                margin: 10px 0px;
            }
        }
        .sure{
            display: inline-block;
            outline: none;
            border: none;
            height: 3.2rem;
            width: 100%;
            background: rgba(246,53,21,.5);
            border-radius:5px;
            color:#fff;
            margin-top:30px;
        }
   }
  
</style>