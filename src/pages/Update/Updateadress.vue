<template>
  <div class="update-info">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>个人信息</span>
      <span></span>
    </div>
    <!-- content  -->
    <div class="user-info">
      <div class="user-item">
          <span>昵称：</span>
          <span>23</span>
      </div>
      <div class="user-item">
          <span>邮箱：</span>
          <span>23</span>
      </div>
      <div class="user-item">
          <span>手机号：</span>
          <span>23</span>
      </div>
    </div>
  </div>
</template>

<script> 
export default {
  data () {
    return {
      
    }
  },methods: {
    goBack(){
        this.$router.go(-1)
      },
      userLogout(){

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
        border-bottom: 1px solid #f7f7f7;
    }
    .user-info{
            width: 100%;
            .user-item{             
                width: 100%;
                padding: 15px ;             
                color: #333333;
                font-size: 14px;
                text-align: left;
                border-bottom: .5px solid #e8e8e8; 
                display: flex;
                justify-content: space-between;              
            }
    }
}
</style>