<template>
    <div class="nav">
        <ul>
          <router-link to="/Home" tag="li" exact>
            <Icon type="ios-home"  size="24"/>
            <p>首页</p>
          </router-link>
          <router-link to="/category" tag="li">
              <Icon type="ios-list"  size="24" />
              <p>分类</p>
          </router-link>
          <router-link to="/shopcart" tag="li">
              <Icon type="ios-cart" size="24"/>
              <p>购物车</p>
          </router-link>
          <router-link to="/user" tag="li">
             <Icon type="ios-person" size="24"/>
            <p>我的</p>
          </router-link>
        </ul>
    </div>
</template>
<script>
export default {
   data(){
    return{
    }
  }
}
</script>

<style lang="scss" scoped="">
 .nav{
    width: 100%;
    height: 65px;
    background-color: white;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
    ul{
      li{
        list-style: none;
        float: left;
        width: 25%;
        height: 100%;
        text-align: center;
        padding: 13px;
        color:gray;
        &.router-link-active{
          color:red;
        }
      }
    }
  }
</style>
