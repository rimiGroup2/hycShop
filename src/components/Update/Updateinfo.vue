<template>
  <div class="update-info">
    <!-- header -->
    <div class="header">
      <Icon type="ios-arrow-back" size="24" @click="goBack()" class="icon-left"/>
      <span>个人信息</span>
      <Icon type="ios-more" size="24"/>
    </div>
    <!-- content  -->
    <div class="user-info">
      <div class="user-item">
          <span>昵称：</span>
          <span>{{username}}</span>
      </div>
      <div class="user-item">
          <span>邮箱：</span>
          <span>{{useremail}}
            <Icon type="ios-arrow-forward"  size="24" @click="modal1 = true"/>
            <Modal v-model="modal1"
              @on-ok="ok(1)"
              @on-cancel="cancel(1)">
              你新的邮箱地址为：
              <input type="text" v-model="newEmail">
            </Modal>
          </span>
      </div>
      <div class="user-item">
          <span>手机号：</span>
          <span>{{userphone}}
            <Icon type="ios-arrow-forward"  size="24" @click="modal2 = true"/>
            <Modal v-model="modal2"
              @on-ok="ok(2)"
              @on-cancel="cancel(2)">
              你新的手机号为：
              <input type="text" v-model="newPhone">
            </Modal>
          </span>
      </div>
    </div>
  </div>
</template>

<script> 
export default {
  data () {
    return {
      username: window.sessionStorage.getItem("username"),
      useremail: window.sessionStorage.getItem("useremail"),
      userphone: window.sessionStorage.getItem("userphone"),
      modal1: false,
      modal2: false,
      newEmail:"",
      newPhone:''
    }
  },methods: {
    goBack(){
        this.$router.go(-1)
      },
    ok (num) {
      if(num==1){
        let sql="update `user` set user_email='"+this.newEmail+"' where user_name='"+this.username+"'"
        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{
          this.useremail=this.newEmail;
          window.sessionStorage.setItem("useremail",this.newEmail)

        })
      }else{
        let sql="update `user` set user_phone='"+this.newPhone+"' where user_name='"+this.username+"'"
        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{
          this.userphone=this.newPhone
          window.sessionStorage.setItem("userphone",this.newPhone)
        })
      }
    },
    cancel (num1) {
      if(num1==1){
        this.$Message.info('邮箱地址未修改');
      } 
      else{
        this.$Message.info('手机号未修改');
      }
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
        justify-content: space-between;
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