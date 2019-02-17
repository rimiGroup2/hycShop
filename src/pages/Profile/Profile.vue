<template>
  <div class="profile">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>账号管理</span>
      <Icon type="ios-more" size="24"/>
    </div>
    <!-- content  -->
    <div class="profile-content">
        <h3 class="profile-title">当前登录账号</h3>
        <div class="profile-item info">
            <img src="//img11.360buyimg.com/jdphoto/s50x50_jfs/t1291/121/695557320/451/826741e1/559cd82bN8edc6bc0.png">
            <div>
                <span class="username">用户：{{username}}</span>
                <span class="email">邮箱：{{useremail}}</span>
            </div>
        </div>
        <router-link tag="div" to="./updatepassword" class="profile-item">
                <span>修改登录密码</span>
               <Icon type="ios-arrow-forward" size="24"/>
        </router-link>
        <router-link tag="div" to="./updateinfo" class="profile-item">
                <span>修改个人信息</span>
               <Icon type="ios-arrow-forward" size="24"/>
        </router-link>
         <router-link tag="div" to="./shipping" class="profile-item">
                <span>收货地址管理</span>
               <Icon type="ios-arrow-forward" size="24"/>
        </router-link>     
    </div>
    <div class="profile-footer">
        <div class="footer-con">
            <div>
                <Icon type="ios-create-outline" size="24"/>
                <span>意见反馈</span>
            </div>
            <div class="client">
                <i>MMall</i>
                <span>客户端</span>
            </div>
            <div class="logout" @click="userLogout">
                <Icon type="ios-person-add" size="22"/>
                <span @click="userLogout">退出登录</span>
            </div>
        </div>
        <p class="mmall">汇一城</p>
    </div>
  </div>
</template>

<script> 
export default {
  data () {
    return {
      username: window.sessionStorage.getItem("username"),
      useremail: window.sessionStorage.getItem("useremail")
    }
  },methods: {
    goBack(){
        this.$router.go(-1)
      },
    userLogout(){
        if(window.sessionStorage.getItem("islogin")){
            if(confirm("你确定要退出登陆吗？")){
                this.$router.push('./login')
                window.sessionStorage.clear();
            }
        }else{
            alert('请先登陆')
        }    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$padding: 10px;
.profile{
    .header{
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
        width: 100%;
        text-align: left;
        .profile-title{
            width: 100%;
            box-sizing: border-box;
            font-weight: 400;
            color: #999;
            border-bottom: 1px solid #f7f7f7;
            padding: 10px 20px;
        }
        .profile-item{
            display: flex;
            height: auto;
            -ms-flex-pack: justify;
            justify-content: space-between;
            color: #999;
            padding: 10px 20px;
            border-bottom: 1px solid #f7f7f7;
            span{
                margin-top: 5px;
            }
            &.info{
                justify-content: left;
                img{
                    width: 15%;
                    height: 15%;
                    border-radius: 50%;                   
                }
                div{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-left: 20px;
                    color: #666;
                    span:last-child{
                        color: #999;
                    }
                }
            }
        }
       
        
    }
    .profile-footer{
        width: 100%;
        margin-top:30%;
        .footer-con{
            display: flex;
            width: 100%; 
            div{
                flex: 1;
                // height: 40px;
                text-align: center;
                // line-height: 34px;
                // font-size: 26px;
                color: rgb(126, 123, 123); 
                &.client{
                    line-height: 25px;
                }
            } 
        }
    .mmall{
        width: 100%;
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: red;
        }
    }
}
</style>
