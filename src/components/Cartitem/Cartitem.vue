<template>
  <div id="cartItem">
      <div class="itemSelect">
        <!-- <Icon type="ios-checkmark-circle" class="selected"/> -->
        <Checkbox v-model="productItem.ischecked" :checked="productItem.ischecked"
            @change.native="$emit('itemselect')"></Checkbox>
        <!-- <Icon type="ios-radio-button-off" /> -->
      </div>
      <img :src="productItem.pic" alt="">
      <div class="itemInfo">
          <p class="itemName">{{productItem.name}}</p>
          <p class="itemDesc">{{productItem.desc}}</p>
          <div class="itemNum">
              <span class="itemPrice">￥{{itemPrice}}</span>
              <counter class="itemQuantity" @minNum="minnumber" 
                @addNum="addnumber" :number="productItem.num"></counter>
          </div>
      </div>
  </div>
</template>

<script>
import counter from '../../components/Counter'

export default {
  name: 'cartItem',
  props:['productItem'],
  components : {
      counter : counter
  },
  methods : {
      minnumber(){
          this.productItem.num--;
          console.log(this.productItem)
      },
      addnumber(){
          this.productItem.num++
          console.log(this.productItem)

      }
  },
  computed: {
      itemPrice:function(){
          return (this.productItem.num * this.productItem.price).toFixed(2);
      }
  }
}
</script>

<style lang="scss" scoped>
    #cartItem{
        background-color: #fff;
        padding: 10px;
        color: #666;
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        .itemSelect{
            font-size: 25px;
            height: 100px;
            line-height: 90px;
            .selected{
                color: orangered;
            }
        }
        img{
            height: 100px;
        }
        .itemInfo{
            width: 60%;
            text-align: left;
            .itemName{
                font-size: 14px;
                min-height: 40px;
                color: #000;
                margin-bottom: 5px;
            }
        }
        .itemNum{
            height: 35px;
            display: flex;
            justify-content: space-between;
            .itemPrice{
                color: orangered;
                font-size: 18px;
                line-height: 35px;
            }
            .itemQuantity{
                text-align: center;
            }
        }
    }
</style>
