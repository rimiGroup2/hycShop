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
                   <ul class="list">
                       <li v-for="(item,index) in category" :key="item.id" @click="change(index)">
                           {{item}}
                       </li>
                   </ul>                 
                </Col>
                <Col span="19" class="right">
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
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import data from './data'
export default {
    data() {
        return {
            page:0,
            data:data
        }
    }, 
    created() {     
        this.category=this.$store.state.a.category
        console.log(data.data)
    },
    methods: {
        change(index){
            this.page = index;
        }
    },
}
</script>

<style lang="scss" scoped>
    header{
        padding: 10px;
        .icon-left{
            line-height: 32px;
        }
    }
    #container{
        .left{
            .list{
                list-style: none;
                padding: 0;
                margin: 0;
                li{
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
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