<template>
  <div id="counter">
      <a v-if="number == 1">
        <i-button  size="small" @click='minNum' disabled>-</i-button>
      </a>
      <a v-else>
        <i-button size="small" @click='minNum'>-</i-button>
      </a>
      <span id="number">{{number}}</span>
    <i-button size="small" @click="addNum">+</i-button>
  </div>
</template>

<script>
export default {
  name: 'Counter', 
  props : ['number'],
  data(){
      return {
           title:'购物车'
      }     
  },
  methods : {
      minNum(){
        //   this.number--;
        // console.log('min')
        this.$emit('minNum');
      },
      addNum(){
        //   this.number++
        this.$emit('addNum');
      }

  }
}
</script>

<style lang="scss" scoped>
    #counter{
        padding-top: 5px;
        width: 120px;
        height: 100%;
        float: left;
        span{
            display: inline-block;
            font-size: 13px;
            width: 30px;
            // line-height: 24px;
            // border: 1px solid rgb(220,222,226);
        }
    }
</style>
