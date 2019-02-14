<template>
    <div>
        <div class="order-item" :style="{'height':height}">
            <div v-if="orderList.length == 0" class="no-order" :style="{'line-height':height}">您暂时还没有订单！</div>
            <div v-else>
                <ul>
                    <li v-for="(item,index) in orderList" :key="item.id" class="border-list">
                        <div class="item-top">
                             <p>订单号:{{item.order_number}}</p>                            
                        </div>
                        <div class="item-container">
                            <div>状态:
                                <span v-if="item.order_state == 0">
                                    未支付
                                    <Button type="error" ghost class="payButtom" @click="ToPay(item.order_number)">去支付</Button>
                                </span>
                                <span v-else-if="item.order_state == 1">待收货</span>
                                <span v-else-if="item.order_state == 2">已取消</span>
                                <span v-else-if="item.order_state == 3">已完成</span>
                                <p>总价:￥{{item.order_payPrice}}</p>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div v-for="goods in order[index]" :key="goods.index">
                                <Row>                             
                                        <Col span="6" >
                                            <img :src="goods.product_pic" alt="" class="product_pic">
                                        </Col>
                                        <Col span="16" push="2">
                                            <p class="product-name">{{goods.product_name}}</p>
                                            <p class="product-num">x{{goods.product_num}}</p>
                                        </Col>                                    
                                </Row>
                            </div> 
                        </div>                       
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Ajax from '@/Ajax/ajax.js'
export default {
    props:['index'],
    data(){
        return {
            tag:"",
            orderList:[],
            order:[],
            height:"",
            user_id:""
        }
    },
    created:function(){
        this.getUserId()
        this.getData()
    },
    methods:{
      getData(){
        this.tag = parseInt(this.index)
        var userId = this.user_id;
        var sql;
        //根据传来的index改变sql语句
        switch(this.tag){
            case 0:
                sql = `SELECT * FROM \`order\` WHERE order_uid =${userId}`
                break;
            case 1:
                sql = `SELECT * FROM \`order\` WHERE order_uid = ${userId} AND order_state = 0`
                break;
            case 2:
                sql =`SELECT * FROM \`order\` WHERE order_uid = ${userId} AND order_state = 1`
                break;
            case 3:
                sql =`SELECT * FROM \`order\` WHERE order_uid = ${userId} AND order_state = 3`
                break;  
        }
        //获取这个用户的订单号
        new Promise((resolve,reject)=>{
            // var sql =`SELECT * FROM \`order\` WHERE order_uid =3`
            Ajax(sql)
            .then(resolve=>{
                this.orderList = resolve
                return resolve
            })
            //获取这个订单号下面的商品
            .then(res=>{
                var c = [];
                res.map(function(item){
                   var a = item.order_number
                   var sql1 = `SELECT * FROM (SELECT * FROM order_product WHERE order_number = '${a}') AS o JOIN product ON o.product_id = product.product_id`
                   var b = $.ajax({url:'http://118.24.87.17/getMysql.php?sendsql='+sql1,async:false}).responseJSON
                   b.map(function(item){
                       item.product_pic=item.product_pic.split("@")[0]
                   })   
                   c.push(b)                          
                })
              
                this.order = c          
            })
        })     
      },
      ToPay(number){
          this.$router.push({path:'/orderDetails',query:{orderNumber:number}})
      },
      getUserId(){
          this.user_id =  window.sessionStorage.userId
      }

    },
    watch:{
        index(val){
            this.tag = this.index
            this.getData()
        }
    },
    mounted() {
         this.height = (document.documentElement.clientHeight-126) + 'px'
        window.onresize=()=>{
         this.height = (document.documentElement.clientHeight-126) + 'px'
        }
    },
}
</script>
<style lang="scss" scoped>
    .order-item{
        background-color:#eee; 
        .no-order{
            width: 100%;
            height: 100%;
            vertical-align: middle;
            text-align: center;
            font-size: 20px;
            color:black;   
        }
        .border-list{
            padding: 15px;
            background-color:white;
            box-sizing: border-box;
            margin-top: 20px;
        }
        .item-top{
            font-size:14px;
            color:#000;
            font-weight: 400;
            border-bottom: 1px solid #dcdcdc;
            box-sizing: border-box;
            padding: 10px 0; 
        }
        .item-container{
            line-height: 23px;
            position: relative;
            font-size:14px;
            font-weight: 400;
            color:#000;
            box-sizing: border-box;
            padding: 10px 0; 
            span{
                color:#f63515;
            }
            button{
                position: absolute;
                right: 0px;
                width: 85px;
                height: 35px;
                top:20%;
            }
            border-bottom: 1px solid #dcdcdc;
        }
        .item-bottom{
            font-size:14px;
            font-weight: 400;
            .product_pic{
                width:100%;
                height: 100%;
            }
            .product-name{
                box-sizing: border-box;
                padding-top: 5px;
                color:#000;

            }
            .product-num{
                color:#999;
            }
        }

    }
</style>