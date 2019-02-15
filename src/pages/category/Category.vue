<template>
    <div>
       <header>
          <Row :gutter="6">
              <Col span="3" class="icon-left">
                <Icon type="ios-arrow-back" size="24"/>
              </Col>
              <Col span="19">
                <Input search  :autoture="true" class="head-serach" @on-search="search($event)"/>
              </Col>
              <Col span="2" class="icon-right">
                <Icon type="ios-more" size="30"/>
              </Col>
          </Row>    
      </header>
        <div id="container">
            <Row>
                <Col span="5" class="left">
                   <Scroll  :height="fullHeight">
                        <ul class="list" :style="{'height':fullHeight+'px'}">
                            <li v-for="(item,index) in category" :key="item.id" @click="change(index)" :class="{tabFont:page==index}" :style="{'line-height':listHeight}">
                                {{item}}
                            </li>
                        </ul>
                   </Scroll>                 
                </Col>
                <Col span="19" class="right">
                    <Scroll :height="fullHeight">
                        <div class="right-imgBox" v-if="categoryData.data[page].mainImgUrl" >
                            <img :src="categoryData.data[page].mainImgUrl" alt="">
                        </div>
                        <div class="category-list" v-for="items in categoryData.data[page].list" :key="items.id" @click="ToDetail">
                            <p class="list-title">{{items.title}}</p>                                   
                            <Row>
                                <Col v-for="a in items.productList" :key="a.id" span="8">
                                    <img :src="a.imgUrl" alt="">
                                    <p>{{a.title}}</p>
                                </Col>
                            </Row>
                        </div>
                    </Scroll>
                </Col>
            </Row>
        </div>
        <nav-buttom></nav-buttom>
    </div>
</template>

<script>
import data from './data'
import navButtom from '@/components/navButtom.vue'
export default {
    data() {
        return {
            page:0,
            categoryData:data,
            fullHeight:0,
            category:"",
            listHeight:"",
        }
    }, 
    components:{
        navButtom,
    },
    created() {     
        this.category=this.$store.state.a.category
    },
    methods: {
        change(index){
            this.page = index;
        },
        ToDetail(){
            var product_kind = this.page + 1
            this.$router.push({path:'/productlist',query:{kind:product_kind}})
        },
        search(e){
            this.$router.push({path:'/productlist',query:{search:e}})
        }
    },
    mounted() {
      const that = this
      window.fullHeight = document.documentElement.clientHeight
      this.fullHeight = window.fullHeight - 120
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          this.fullHeight = window.fullHeight
        })()
      } 
      this.listHeight = (this.fullHeight / this.category.length)+"px"
        window.onresize = () => {
        return (() => {
            console.log(this.listHeight)
            window.fullHeight = document.documentElement.clientHeight
            this.fullHeight = window.fullHeight
            this.listHeight = (this.fullHeight / this.category.length)+"px"
        })()
      } 
    },
     watch: {
      fullHeight (val) {
        if(!this.timer) {
          this.fullHeight = val
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    }

}
</script> 

<style lang="scss" scoped>
    header{
        padding: 10px;
        .icon-left{
            line-height: 32px;
        }
    }
    .tabFont{
        color:red !important;
        background: white !important;
    }
    #container{
        .left{
            .list{
                background-color:#f8f8f8; 
                list-style: none;
                padding: 0;
                margin: 0;
                position: relative;
                left: 0;
                top: 0;
                display: flex;
                flex-direction: column;
                li{
                    width: 100%;
                    line-height: 60px;
                    text-align: center;
                    background: #F7F7F7;
                    color:black;
                    font-weight: 400;
                }
            }
        }
        .right{
            .right-imgBox{
                width:100%;
                img{
                    width: 100%;
                }
            }
            .category-list{
                .list-title{
                    font-size:18px;
                    font-weight: bold;
                    padding: 40px 10px;
                }
                .ivu-row{
                    .ivu-col{
                        img{
                            width: 100%;    
                        }
                        p{
                            text-align: center;
                            font-weight: 400;
                        }
                    }
                }
            }
        }
    }

</style>