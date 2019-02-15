<template>
  <div class="update-password" :style="{'height':height}">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>账号管理</span>
      <Icon type="ios-more" size="24"/>
    </div>
    <!-- content  -->
    <div class="profile-content">
      <div class="update-form">         
        <div class="password-item">
          <span>输入旧密码</span>
          <div class="password-text"  @mouseenter="focusText"  @mouseleave="blurText">
            <input type="password" placeholder="请输入旧密码" class="old-password" v-model="oldPassword"  />
            <div>
              <Icon type="ios-close" size="24" v-show="oldClose" data-close="oldPassword" @click="clearText"/>
            </div>
          </div>
        </div>
        <div class="password-item">
          <span>设置新的登录密码</span>
          <div class="password-text" @mouseenter="focusText"  @mouseleave="blurText">
            <input type="password"  ref="passwordText" placeholder="6-15位数字 / 字母 / 字符组合" class="new-password" v-model="newPassword" />
            <div>
              <Icon type="ios-close" size="24"  data-close="newPassword"  v-show="newClose" @click="clearText"/>
              <Icon type="ios-eye-off-outline" size="24" @click="changeType" v-if="passwordType"/>
              <Icon type="ios-eye-outline" size="24"  @click="changeType" v-else />
            </div>
          </div>
        </div>
      </div> 
      <p class="errText">{{errText}}</p>
      <button class="update-password-button" :class="{'active' : removeSpace(oldPassword,newPassword)}" @click="registerSubmit">确认</button>    
    </div>
  </div>
</template>
<script> 
export default {
  data () {
    return {
      oldPassword:"",
      newPassword:"",
      errText:"",
      username: window.sessionStorage.getItem("username"),
      oldClose: false,
      newClose: false,
      passwordType:true,
      height:"",
    }
  },mounted() {
    this.height = document.documentElement.clientHeight + 'px'
    window.onresize=()=>{
      this.height = document.documentElement.clientHeight + 'px'
    }
  },methods: {
    goBack(){
        this.$router.go(-1)
      },
      focusText(e){
      this.judgeText(e,true)
    },blurText(e){
      this.judgeText(e,false)
      this.checkNewWords()
    },judgeText(event,boolean){
      let $className = event.target.firstElementChild.className
      switch($className){
        case 'old-password':
            this.oldClose = boolean
            break
        case 'new-password':
            this.newClose = boolean
            break
      }
    },clearText(e){
      let $close = e.currentTarget.getAttribute('data-close')    
      this[$close] = ''
    },changeType(){
      this.passwordType===true ? this.passwordType=false:this.passwordType=true;
      this.passwordType===false ? this.$refs.passwordText.type='text':this.$refs.passwordText.type='password'
    },
    //新密码验证
    checkNewWords(){
      if(this.newPassword.length<6 | this.newPassword.length>15){
        this.errText="请输入6-15位数字 / 字母 / 字符组合"
        return
      }
     this.errText=''
    },
    removeSpace(val1,val2){
      if(val1!=""&val2!=""){
        return true
      }
    },
    registerSubmit(){
      if(this.oldPassword!= window.sessionStorage.getItem("userpassword")){
        alert('原密码输入错误，请重新输入')
        this.newPassword=''
        this.oldPassword=''
      }else{
        let sql="update `user` set user_password='"+this.newPassword+"' where user_name='"+this.username+"'"
        if(confirm("你确定要修改密码吗？")){
          axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{        
            this.$router.push('./login')
            window.sessionStorage.clear();                  
          })
        }   
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$padding: 10px;
.update-password{
    background-color: #f5f5f5;
    .header{
        background-color: white;
        padding:$padding; 
        width: 100%;
        height: 40px;
        text-align:center;
        font-size: 14px;
        position: relative;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f7f7f7;
    }
    .profile-content{
      .update-form{
          width: 100%;
          height:200px;
          margin-top: 20px;
          padding: $padding;
          .password-item{
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            span{
              text-align:left;
              padding-left: $padding;
              margin-bottom: 10px;
            }
            .password-text{
              width: 95%;
              padding:10px 0;
              background: #fff;
              margin: 0 auto;
              display: flex;
              justify-content: space-around;
              input{
                  width: 80%;
                  height: 25px;
                  line-height: 25px;
                  font-size: 12px;
                  outline: none;
                  border:none;
              }
              div{      
                  color: #ccc
              }
            }
          }
      }
      .errText{
        width: 100%;
        height: 20px;
        line-height: 20px;
        color: red;    
      }
      .update-password-button{
        width: 88%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        background: rgba(246,53,21,.5);
        border-radius: 30px;     
        margin: 20px 0;
        border: none;
        outline: none;
        &.active{
          background: rgb(246,53,21)
        }
      }
    }
}
</style>
