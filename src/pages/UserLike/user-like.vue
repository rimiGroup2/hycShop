<template>
    <div class="background" :style="{'height':height}">
        <Header title="我关注的商品"></Header>
        <div v-if="product">
           <div v-for="(item,index) in product" :key="index" class="product-item" @click="toDetail(item[0].product_id)">
               <Row>
                   <Col span="6" class-name="product-img">
                      <img :src="item.product_pic" alt="">
                   </Col>
                   <Col span="18" class-name="product-font">
                       <p class="product-name">{{item[0].product_name}}</p>
                       <p class="product-desc">{{item[0].product_desc}}</p>
                       <p class="product-price">￥{{item[0].product_price}}</p>
                   </Col>
               </Row>
              
           </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/user-header.vue'
import Ajax from '@/Ajax/ajax.js'
export default {
    data() {
        return {
            product:"",
            height:"",
        }
    },
    components:{
        Header,
    },
    created() {
        this.getProduct()
    },
    methods: {
        getProduct(){
            var userId = window.sessionStorage.userId
            var sql = `SELECT user_like FROM \`user\` WHERE user_id = 2`
            Ajax(sql).then(res=>{
                var productId = res[0].user_like.split(",")
                return productId
            })
            .then(productId=>{
                var product =[] 
                productId.map(function(item){
                    var p = parseInt(item)
                    var sql = `SELECT * FROM product WHERE product_id = ${p}`
                    Ajax(sql).then(pro=>{
                        pro.product_pic =  pro[0].product_pic.split("@")[0]
                        product.push(pro)
                    })
                })
                return product
            })
            .then(product=>{
                this.product = product
            })
        },
        toDetail(id){
            this.$router.push({path:'/ProductDetail',query:{productId:id}})
        }
    },
    mounted() {
        this.height = (document.documentElement.clientHeight) + 'px'
        window.onresize=()=>{
         this.height = (document.documentElement.clientHeight) + 'px'
        }
    },
}
</script>
<style lang="scss" scoped>
    .background{
        background-color:#eee; 
    }
    .product-item{
        padding: 10px;
        margin: 1px 0 0 0;
        background-color:#fff; 
        box-sizing: border-box;
    }
    .product-item:nth-of-type(1){
        margin: 0px !important; 
    }
    .product-img{
        img{
            width: 100%;
            height: 100%;
        }
    }
    .product-font{
        padding: 0 10px;
        .product-name{
            max-height: 36px;
            margin-top: 10px;
            overflow: hidden;
            color: #000;
        }
        .product-desc{
            font-size: 12px;
            margin-top: 5px;
            color:#999;
        }
        .product-price{
            font-size:12px;
            // line-height: 12px;
            color:#f63515;
        }
    }

</style>