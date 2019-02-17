<template>
  <div id="headerbar">
      <header>
        <Row :gutter="6">
            <Col span="4" @click.native="goBack">
                <Icon type="ios-arrow-back" size="30"/>
            </Col>
            <Col span="16" class="headerTitle">
                <!-- 页面名称 -->
                {{headertitle}}
            </Col>
            <Col span="4" v-if='more'>
                <Icon type="ios-more" size="30"/>
            </Col>
        </Row>   
    </header>
  </div>
</template>

<script>
export default {
  name: 'Headerbar',
  props : ['headertitle','more'],
  methods:{
      goBack(){
          this.$router.go(-1);
      }
  }
}
</script>

<style lang="scss" scoped>
header{
    width: 100%;
    padding: 10px;
    position: fixed;
    background-color: #fff;
    top: 0;
    z-index: 2000;
    box-shadow: 0 -2px 10px #000;
    .headerTitle{
        font-size: 20px;
    }
}
</style>
