<template>
<div id="cartItem" class="slider">
    <div class="content" 
        @touchstart='touchStart'
        @touchmove='touchMove'
        @touchend='touchEnd'
        :style="deleteSlider">
        <div class="itemSelect" >
            <Checkbox v-model="productItem.ischecked" :checked="productItem.ischecked"
            @change.native="$emit('itemselect')"></Checkbox>
        </div>
        <img :src="productItem.product_pic.split('@')[0]" alt="">
        <div class="itemRight">
            <div class="itemInfo">
                <p class="itemName">{{productItem.product_name}}</p>
                <p class="itemDesc">{{productItem.product_desc}}</p>
            </div>
            <div class="itemNum">
                <span class="itemPrice">￥{{productItem.product_price}}</span>
                <counter class="itemQuantity" @minNum="minnumber" 
                @addNum="addnumber" :number="productItem.cart_productNumber"></counter>
            </div>
        </div>
    </div>
        <div class="remove active" ref='remove' @click="delCartItem(index,productItem.cart_id)">
            <Icon type="md-trash" />
        </div>
    </div>
</div>
</template>

<script>
import counter from '../../components/Counter'

export default {
  name: 'cartItem',
  props:['productItem','index'],
  components : {
      counter : counter
  },
  methods : {
      minnumber(){
          this.productItem.cart_productNumber--;
          this.updateNumber();
      },
      addnumber(){
          this.productItem.cart_productNumber++
          this.updateNumber();
      },
      updateNumber(){
          var sql = 'update cart set cart_productNumber = '
                    +this.productItem.cart_productNumber+' where cart_id = '
                    +this.productItem.cart_id
          axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
      },
    //   删除
      delCartItem(index,id){
          this.$emit('del',index,id)
      },
    //   左滑删除
     touchStart(ev){
        ev= ev || event
     //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if(ev.touches.length == 1){
          // 记录开始位置
          this.startX = ev.touches[0].clientX;
        }
      },
     touchMove(ev){
        ev = ev || event;
          //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
        let wd=this.$refs.remove.offsetWidth;
          if(ev.touches.length == 1) {
            // 滑动时距离浏览器左侧实时距离
            this.moveX = ev.touches[0].clientX
        
            //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
            this.disX = this.startX - this.moveX;
            // 如果是向右滑动或者不滑动，不改变滑块的位置
            if(this.disX < 0 || this.disX == 0) {
              this.deleteSlider = "transform:translateX(0px)";
            // 大于0，表示左滑了，此时滑块开始滑动 
            }else if (this.disX > 0) {
               //具体滑动距离我取的是 手指偏移距离*5。
              this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
              
              // 最大也只能等于删除按钮宽度 
              if (this.disX*5 >=wd) {
                this.deleteSlider = "transform:translateX(-" +wd+ "px)";
               
              }
            }
          }
       },
     touchEnd(ev){
       ev = ev || event;
       let wd=this.$refs.remove.offsetWidth;
       if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
           
            this.disX = this.startX - endX;
            //如果距离小于删除按钮一半,强行回到起点
            
            if ((this.disX*5) < (wd/2)) {
             
              this.deleteSlider = "transform:translateX(0px)";
            }else{
              //大于一半 滑动到最大值
               this.deleteSlider = "transform:translateX(-"+wd+ "px)";
            }
          }
        }   
  },
  computed: {
      itemPrice:function(){
          return (this.productItem.num * this.productItem.price).toFixed(2);
      }
  },  
    data(){
        return{
            startX:0,  //触摸位置
            endX:0,   //结束位置
            moveX: 0,  //滑动时的位置
            disX: 0,  //移动距离
            deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
        }
    }

}
</script>

<style lang="scss" scoped>
.slider{
    width: 100%;
    height:120px;
    position: relative;
    //  user-select: none;
    .content{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      padding: 10px;
      justify-content: space-around;
    //   background:green;
      background-color: #fff;
      z-index: 100;
      //  设置过渡动画
      transition: 0.3s;
    }
    .remove{
      position: absolute;
      width:120px;
      height:100%;
      background:orangered;
      right: 0;
      top: 0;
      color:#fff;
      text-align: center;
      font-size: 32px;
      line-height: 120px;
    }
  }
    #cartItem{
        background-color: #fff;
        color: #666;
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
            width: 100px;
        }
        .itemRight{
          .itemInfo{
            text-align: left;
            width: 100%;
            .itemName{
                width: 100%;
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
