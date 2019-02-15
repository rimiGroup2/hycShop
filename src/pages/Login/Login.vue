<template>
  <div class="login">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>MMall登录</span>
    </div>
    <!-- content  -->
    <div class="page">
      <div class="login-wrap">
        <div class="login-text" @mouseenter="focusText"  @mouseleave="blurText">
          <input v-model="username" class="login-username" placeholder="用户名/邮箱/已验证手机" />
          <Icon type="ios-close" size="24" v-show="usernameClose" data-close="username" style="margin-top:2%;" @click="clearText" />
        </div>
        <div class="login-text"  @mouseenter="focusText"  @mouseleave="blurText">
          <input v-model="password"  ref="passwordText" class="login-password" type="password" placeholder="请输入密码" style="width:60%;" />
          <div class="text-box">
              <Icon type="ios-close" size="24"  data-close="password" @click="clearText" v-show="passwordClose" />
              <Icon type="ios-eye-off-outline" size="24" @click="changeType"  v-if="passwordType"/>
              <Icon type="ios-eye-outline" size="24"  @click="changeType" v-else />
               <span>|</span>
              <span><router-link  to="./forgetpassword">忘记密码</router-link></span>
          </div>
        </div>
      </div>
      <button class="login-button" :class="{'active' : removeSpace(username,password)}" @click="loginSubmit">登  录</button>
      <div class="quick-nav">
          <router-link to="./register"><span>快速注册</span></router-link>
      </div>
      <div class="other-login">
        <div class="other-head"> 
          <hr/>
          <span>其他方式</span>
          <hr/>
        </div>
        <div class="other-icon">
          <div class="login-icon">
              <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3571958081,331892154&fm=27&gp=0.jpg">
              <span>QQ</span>
          </div>
          <div class="login-icon">
            <img src="http://img5.imgtn.bdimg.com/it/u=2797697731,3642388436&fm=26&gp=0.jpg">
              <span>QQ</span>
          </div>
        </div>
        <span style="color: #999">登录即代表您已同意</span>
        <a>MMall隐私政策</a>
      </div>
    </div>
  </div>
</template>

<script> 
export default {
  data () {
    return {
      username:"",
      password:"",
      usernameClose:false,
      passwordClose:false,
      passwordType:true
    }
  },methods: {
    goBack(){
        this.$router.go(-2)
      },
    focusText(e){
      let $className = e.target.firstElementChild.className
      $className === 'login-username' ? this.usernameClose= true:this.passwordClose = true
    },
    blurText(e){
      let $className = e.target.firstElementChild.className
      $className ==='login-username' ? this.usernameClose = false:this.passwordClose = false
    },
    clearText(e){
      let $close = e.currentTarget.getAttribute('data-close')    
      this[$close] = ''
    },
    changeType(){
      this.passwordType===true ? this.passwordType=false:this.passwordType=true;
      this.passwordType===false ? this.$refs.passwordText.type='text':this.$refs.passwordText.type='password'
    },
    removeSpace(val1,val2){
      if(val1!=""&val2!=""){
        return true
      }
    },
    loginSubmit(){
       //密码验证
      let sql="SELECT * FROM `user` WHERE user_name='"+this.username+"'"
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{
        if(res.data!=""){
          if(this.password!=res.data[0].user_password){
            alert('密码错误，请重新输入')
            this.password=''
          }else{
            alert('登陆成功')
            this.isLogin()
            this.sessionStorage(res.data[0])
            this.$router.push('./user')
          }   
        }else{
          alert('该用户名不存在，请先注册')
            this.username=''
            this.password=''
        } 
      })
    },isLogin(){
      //登陆状态
      let islogin=1;
      window.sessionStorage.setItem("islogin",islogin);
    },
    //提交session
    sessionStorage(arr){
      let userName=arr.user_name
      let userPassword=arr.user_password
      let userEmail=arr.user_email
      let userPhone=arr.user_phone
      let userId=arr.user_id
      window.sessionStorage.setItem("username",userName);
      window.sessionStorage.setItem("userpassword",userPassword);
      window.sessionStorage.setItem("useremail",userEmail);
      window.sessionStorage.setItem("userphone",userPhone);
      window.sessionStorage.setItem("userId",userId);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$padding: 10px;
.login{
  padding:$padding; 
  .header{
    width: 100%;
    height: 40px;
    line-height:40px;
    text-align:center;
    font-size: 16px;
    position: relative;
    .icon-left{
      position: absolute;
      top: 6px;
      left:0;
    }
  }
  .page{
      width: 100%;
      margin-top:10px; 
      padding:$padding; 
      .login-wrap{
        width: 100%;  
        margin-bottom:40px;
        .login-text{
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 30px;;
          margin-bottom: 25px;
          border-bottom: .5px solid #dcdcdc;
          input{
            width: 90%;
            height: 80%;
            margin-top: 5px;
            color: #222; 
            border: none;
            outline: none;
          }
          .text-box{
            margin-top: 5px;
            span{
              margin-right: 3px;
              a{
                color: #222; 
              }
            }
          }
        }
      }
      .login-button{
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
      .quick-nav{
        padding: 10px 0;
        width: 100%;
        text-align: right;
        a{
          span{
            color: #999
          }
        } 
      }
      .other-login{
        width: 100%;
        margin-top: 20px;
        .other-head{
            display: flex;
            justify-content: space-between;
            width: 100%;
          hr{
            border:none;
            width: 39%;
            border-top:1px solid #e9eaeb;
            display: inline-block;
            margin-top: 10px;
            outline: none;
          }
          span{
            flex: 1;
            font-size: 13px;
            text-align: center;
            color: #dcdcdc
          }
        }
        .other-icon{
          display: flex;
          width: 50%;
          height: 100px;
          padding: 10px 0;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          .login-icon{
            display: flex;
            justify-content: center;
            -ms-flex-direction: column;
            flex-direction: column;
            width: 40%;
            margin: 5px;
            text-align: center;
            img{
              width: 60%;
              height: 60%;
              border-radius: 50%;
              margin-left: 20%;
            }
            span{
              color: #999
            }
          }
        }
      }
    }
}
</style>
