<template>
    <div id="pay">
        <header>
          <Row :gutter="6">
              <Col span="3" @click.native="goHome">
                <Icon type="ios-arrow-back" size="30"/>
              </Col>
              <Col span="17" class="headerTitle">
                在线支付
              </Col>
              <Col span="4">
                <Icon type="ios-more" size="30"/>
              </Col>
          </Row>
      </header>
      <div class="payContainer">
            <div class="top">
                <Icon type="md-checkmark-circle-outline" />
                <h2>订单提交成功，请尽快支付！</h2>
                <p>订单号：{{orderNum}}</p>
            </div>
      </div>
      <recommend></recommend>
    </div>
</template>
<script>
import recommend from '../Recommends/recommend'
export default {
    name : 'Pay',
    data(){
        return {
            title : '在线支付',
            orderNum:null
        }
    },
    components:{
        recommend:recommend
    },
    created(){
        this.orderNum = this.$route.query.orderNum;
    },
    methods:{
        goHome(){
            this.$router.push('/home');
        }
    }
}
</script>
<style lang="scss" scoped>
    #pay{
        header{
            width: 100%;
            padding: 10px;
            position: fixed;
            background-color: #fff;
            top: 0;
            z-index: 200;
            box-shadow: 0 -2px 10px #000;
            .headerTitle{
                font-size: 20px;
            }
        }
        .payContainer{
            margin-top: 50px;
            .top{
                color: orangered;
                padding: 50px 0;
                i{
                    font-size: 100px;
                }
                p{
                    color: #666;
                    font-size: 14px;
                }
            }
        }
    }
</style>

