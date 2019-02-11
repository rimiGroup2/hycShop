<template>
    <div>
        <header>
            <Row>
                <Col span="3">
                    <div @click="goBack">
                        <Icon type="ios-arrow-back" size="24"/>
                    </div>
                 </Col>
                <Col span="19">
                    <p>{{title}}</p>
                </Col>
                <Col span="2">
                    <Icon type="ios-more" size="30"/>
                </Col>
            </Row>
        </header>
    </div>
</template>
<script>
export default {
    props:['title'],
    methods: {
        goBack(){
            window.history.go(-1)
        }
    },

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
</style>