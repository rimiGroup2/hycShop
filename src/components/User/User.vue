<template>
    <div>
        <header>
            <Row>
                <Col span="3">
                    <Icon type="ios-arrow-back" size="24"/>
                 </Col>
                <Col span="19">
                    <p>我的汇一城</p>
                </Col>
                <Col span="2">
                    <Icon type="ios-more" size="30"/>
                </Col>
            </Row>
        </header>
        <div class="user-info">
            <div class="user">
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </div>
        </div>
       <nav-buttom></nav-buttom>
    </div>

</template>
<script>
import navButtom from '../navButtom/navButtom.vue'
export default {
    components:{
        navButtom,
    }
}
</script>
<style lang="scss">
    header{
        text-align: center;
        height:52px;
        line-height: 52px;
        font-size:16px;
        border-bottom: 1px solid #dcdcdc;
        background-color:#F7F7F9; 
    }
    .user-info{
        margin: 10px 12px;
        background-color:red;
        border-radius:0.5rem;
        height: 6rem;
        width: 94%;  
    }
</style>