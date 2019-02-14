<template>
  <div class="register">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>MMall注册</span>
    </div>
    <!-- content  -->
    <div class="page">
        <div class="register-wrap">
            <div class="register-text"  @mouseenter="focusText" @mouseleave="blurText">
                <input v-model="username" placeholder="请输入6-15位用户名"  class="register-username"    />
                <Icon type="ios-close" size="24"  data-close="username" v-show="usernameClose"  style="margin-top:2%;" @click="clearText" />
            </div>
            <div class="register-text"  @mouseenter="focusText" @mouseleave="blurText">
                <input v-model="password" placeholder="请输入8-15位密码" type="password" class="register-password" />
                <Icon type="ios-close" size="24" data-close="password" v-show="passwordClose"  style="margin-top:2%;" @click="clearText"/>
            </div>
            <div class="register-text"  @mouseenter="focusText" @mouseleave="blurText">
                <input v-model="email" placeholder="请输入邮箱" class="register-email" />
                <Icon type="ios-close" size="24" data-close="email" v-show="emailClose"  style="margin-top:2%;" @click="clearText"/>
            </div>
            <div class="register-text"  @mouseenter="focusText" @mouseleave="blurText">
                <input v-model="phone" placeholder="请输入11位手机号" class="register-phone" />
                <Icon type="ios-close" size="24" data-close="phone" v-show="phoneClose" style="margin-top:2%;" @click="clearText"/>
            </div>
        </div>
        <p class="erroText">{{erroText}}</p>
        <button class="register-button" :class="{'active' : removeSpace(username,password,email,phone)}" @click="registerSubmit">注册</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username:'',
      password:"",
      email:'',
      phone:'',
      erroText:"",
      usernameClose:false,
      passwordClose:false,
      emailClose:false,
      phoneClose:false
    }
  },methods: {
    goBack(){
        this.$router.go(-1)
      },
    focusText(e){
      this.judgeText(e,true)
    },
    blurText(e){
      this.Checktext()
      this.judgeText(e,false)   
    },
    //验证
    Checktext(){
      //用户名验证
      if(this.username.length<6|this.username.length>12){
          this.erroText="请输入6到12位（字母，数字，下划线，减号）"
          return
      }
      //用户名重复注册验证
      let sql="SELECT * FROM `user` WHERE user_name='"+this.username+"'"
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{
        if(res.data!=""){
          alert('用户名已经被注册')
        }
      })
      //密码验证
      if(this.password.length<8 | this.password.length>15){
        this.erroText="密码不能含有非法字符，长度在8-15位之间"
        return
      }
      //邮箱验证
      if(this.email.indexOf('@')==-1||this.email.indexOf('.')==-1){
        this.erroText="Email格式不正确，例如web@sohu.com"
        return
      }
      //手机号验证
      if(this.phone.length!=11){
        this.erroText="请输入11位手机号"
        return
      }
      this.erroText =""
    },
    judgeText(event,boolean){
      let $className = event.target.firstElementChild.className
      switch($className){
        case 'register-username':
          this.usernameClose = boolean
          break
        case 'register-password':
          this.passwordClose = boolean
          break
        case 'register-email':
          this.emailClose = boolean
          break
        case 'register-phone':
          this.phoneClose = boolean
          break
        case 'register-question':
          this.questionClose = boolean
          break
        case 'register-answer':
          this.answerClose = boolean
          break
      }
    },
    removeSpace(val1,val2,val3,val4){
      if(val1!=""&val2!=""&val3!=""&val4!=""){
        return true
      }
    },
    //清除文本框内容
    clearText(e){
      let $close = e.currentTarget.getAttribute('data-close')    
      this[$close] = ''
    },
    registerSubmit(){
     let sql="INSERT INTO `user` (user_name,user_password,user_email,user_phone) VALUES('"+this.username+"','"+this.password+"','"+this.email+"','"+this.phone+"')"
      axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{
        alert('注册成功') 
          this.$router.push('./login')
      })
    },
  },
   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$padding: 10px;
.register{
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
       padding:$padding; 
      .register-wrap{
        width: 100%;
        .register-text{
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 30px;
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
        }
      }
      .erroText{
        width: 100%;
        height: 20px;
        line-height: 20px;
        color: red;
        margin-bottom: 20px;
      }
      .register-button{
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
