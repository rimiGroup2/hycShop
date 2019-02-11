<template>
    <div>
        <Header title="账号管理"></Header>
        <div class="setting-item">
            <h3 class="profile-title">当前登录账户</h3>
        </div>
        <div class="current-user">
              <Row>
                <Col span="4"><img src="http://img11.360buyimg.com/jdphoto/s50x50_jfs/t1291/121/695557320/451/826741e1/559cd82bN8edc6bc0.png" alt=""></Col>
                <Col span="20">
                    <p class="user-name">你的名字</p>
                    <p class="user-email">邮箱:</p>
                </Col>
            </Row>    
        </div>
        <div class="setting-item">
            <router-link to="/update-password" tag="p">
                <Row>
                    <Col span="22">修改登录密码</Col>
                    <Col span="2"><Icon type="ios-arrow-forward" size="20"/></Col>
                </Row>
            </router-link>      
        </div>
        <div class="setting-item">
            <router-link to="/update-information" tag="p">
                <Row>
                    <Col span="22">修改个人信息</Col>
                    <Col span="2"><Icon type="ios-arrow-forward" size="20"/></Col>
                </Row>
            </router-link>    
        </div>
        <div class="setting-item">
            <router-link to="/shipping" tag="p">
                <Row>
                    <Col span="22">收货地址管理</Col>
                    <Col span="2"><Icon type="ios-arrow-forward" size="20"/></Col>
                </Row> 
            </router-link>   
        </div>
        
    </div>
</template>
<script>
import Header from './user-header.vue'
export default {
    components:{
        Header
    }
}
</script>

<style lang="scss" scoped>
    header{
        text-align: center;
        height:52px;
        line-height: 52px;
        font-size:16px;
        border-bottom: 1px solid #dcdcdc;
        background-color:white; 
    }
    .setting-item{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        font-weight: 400;
        color:#999;
        border-bottom: 1px solid #f7f7f7;
        line-height: 1rem;
        .profile-title{
            font-size: 14px;
            font-weight: 400;
        }
        span{
            text-align: left;
        }
    }
    .current-user{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #f7f7f7;
        color:#999;
        img{
            border-radius: 50%;
        }
        .user-name{
            margin-bottom: 10px;
            font-size: 14px;
        }
        .user-email{
            font-size:14px;
        }
    }      
</style>