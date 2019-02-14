<template>
  <div class="update-info">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>忘记密码</span>
      <span></span>
    </div>
    <!-- content  -->
    <div class="page">
        <div class="username" v-show="usernameShow">
           <input type="text" placeholder="请输入用户名" v-model="username">
           <button :class="{'active' : removeSpace(username)}" @click="usernameNext">下一步</button>
        </div>
        <div class="userpassword" v-show="userpasswordShow">
           <input type="text" placeholder="请输入新的密码" v-model="userpassword">
           <button :class="{'active' : removeSpace(userpassword)}"  @click="userpasswordNext">重置</button>
        </div>
    </div>
  </div>
</template>

<script> 
export default {
  data () {
    return {
        username:"",
        userpassword:"",
        usernameShow:true,
        userpasswordShow:false
    }
  },methods: {
    goBack(){
        this.$router.go(-1)
    },removeSpace(val1,val2){
        if(val1!=""){
            return true
        }
    },usernameNext(){
        let sql="SELECT * FROM `user` WHERE user_name='"+this.username+"'";
        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{
        if(res.data!=""){
          this.usernameShow=false;
          this.userpasswordShow=true
        }else{
          alert('该用户名不存在')
            this.username=''
        } 
      })
    },
    userpasswordNext(){
        let sql="update `user` set user_password='"+this.userpassword+"' where user_name='"+this.username+"'";
        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{
            if(confirm("你确定要重置吗？")){
               this.$router.push('./login')
            } 
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$padding: 10px;
.update-info{
    .header{
        background-color: white;
        padding:$padding; 
        width: 100%;
        height: 40px;
        text-align:center;
        font-size: 14px;
        position: relative;
        display: flex;
        justify-content:space-between;
    }
    .page{ 
        width: 100%;
        .username{    
            padding:$padding;         
            width: 100%;
            padding: 15px ;             
            color: #333333;
            font-size: 14px;
        }  
        .userpassword{    
            padding:$padding;         
            width: 100%;
            padding: 15px ;             
            color: #333333;
            font-size: 14px;
        }       
        input{
            width: 100%;
            height: 40px;
            line-height: 40px;
            outline: none;
            margin:30px 0 40px 0; 
        } 
        button{
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            font-size: 16px;
            background: rgba(246,53,21,.5);
            border-radius: 30px;     
            margin-bottom: 10px;
            border: none;
            outline: none;
                &.active{
                background: rgb(246,53,21)
                }
        }
    }
}
</style>