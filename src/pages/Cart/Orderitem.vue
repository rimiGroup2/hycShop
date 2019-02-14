<template>
  <div id="orderItem">
      <img :src="productItem.product_pic.split('@')[0]" alt="">
      <div class="itemInfo">
          <p class="itemName">{{productItem.product_name}}</p>
          <p class="itemDesc">{{productItem.product_desc}}</p>
          <div class="itemNum">
              <span class="itemPrice">￥{{productItem.product_price}}</span>
              <span class="itemQuantity"><Icon type="md-close" />{{productItem.cart_productNumber}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'orderItem',
  props:['productItem'],
  components : {
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
    #orderItem{
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
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
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
                line-height: 35px;
            }
        }
    }
</style>
