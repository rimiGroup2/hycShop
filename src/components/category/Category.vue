<template>
    <div>
       <header>
          <Row :gutter="6">
              <Col span="3" class="icon-left">
                <Icon type="ios-arrow-back" size="24"/>
              </Col>
              <Col span="19">
                <Input prefix="ios-search"  :autoture="true" class="head-serach"/>
              </Col>
              <Col span="2" class="icon-right">
                <Icon type="ios-more" size="30"/>
              </Col>
          </Row>    
      </header>
        <div id="container">
            <Row>
                <Col span="5" class="left">
                   <Scroll  :height="height">
                        <ul class="list">
                            <li v-for="(item,index) in category" :key="item.id" @click="change(index)" :class="{tabFont:page==index}">
                                {{item}}
                            </li>
                        </ul>
                   </Scroll>                 
                </Col>
                <Col span="19" class="right">
                    <Scroll :height="height">
                        <div class="right-imgBox" v-if="data.data[page].mainImgUrl" >
                            <img :src="data.data[page].mainImgUrl" alt="">
                        </div>
                        <div class="category-list" v-for="items in data.data[page].list" :key="items.id">
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
import navButtom from '../navButtom.vue'
export default {
    data() {
        return {
            page:0,
            data:data,
            fullHeight:0,
        }
    }, 
    computed: {
        height(){
          this.fullHeight-=(52+68)
          return this.fullHeight
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
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          this.fullHeight = window.fullHeight
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
                li{
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
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