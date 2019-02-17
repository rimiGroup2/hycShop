<template>
  <div class="recommendInfo">
        <p class="recommend-title">—— 为你推荐 ——</p>
        <div class="recommend-list">
            <recommend-info :prop="listInfo"></recommend-info>
        </div>
  </div>
</template>

<script> 
import recommendInfo from '../../components/recommendInfo'
export default {
    data () {
        return {
            listInfo:""
        }
    },created(){
        let sql="SELECT * FROM product WHERE product_id >= (SELECT floor(RAND() * (SELECT MAX(product_id) FROM product))) ORDER BY product_id LIMIT 6;"
        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql).then((res)=>{
        this.listInfo = res.data;
        })
    },methods: {
        goBack(){
            this.$router.go(-1)
        }
    },components : {
        recommendInfo : recommendInfo
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$padding: 10px;
.recommendInfo{
    width:100%;
    height: auto;
    .recommend-title{
        width: 100%;
        height: 40px;
        text-align: left;
        padding-left:10px;
        line-height: 40px;
        background: #fff;
        box-sizing: border-box;
        font-size: 14px;
        margin-top: 18px;
        text-align: center
    }
    .recommend-list{     
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        width: 100%;
        // margin: 18px 0;
        padding-bottom: 10px;
        box-sizing: border-box;
        background: #fff;
        border-top: 1px solid #ccc;
    }
}
</style>