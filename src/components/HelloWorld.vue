<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <i-input icon="ios-clock-outline" placeholder="请输入..." style="width: 200px"></i-input>

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" style="background:red">slider1</div>
            <div class="swiper-slide" style="background:green">slider2</div>
            <div class="swiper-slide" style="background:blue">slider3</div>
        </div>
      </div>
  </div>
</template>

<script>
// 导入Swiper
import Swiper from 'swiperjs' 
import 'swipercss' 

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: []
    }
  },
  created () {
  },
  mounted () {
    $('.hello h1').click(function(){
      $(this).toggleClass('red');
    })
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: true,
      loop:true
    })
    console.log(this.$store.state.test);
    this.$store.dispatch('loadList');
    this.list = this.$store.state.testList
    console.log(this.list)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  .red{
    color: red;
  }
  .swiper-slide{
    height: 200px;
  }
}
</style>
