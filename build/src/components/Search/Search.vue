<template>
  <div class="search">
    <!-- 头部 -->
    <header class="header-box">
      <Row :gutter="6">
          <Col span="3">
            <Icon type="ios-arrow-back" size="24" @click="goBack()"/>
          </Col>
          <Col span="17">
            <Input v-model="searchInput" prefix="ios-search" placeholder="双十一狂欢" width="76%;"/>
          </Col>
          <Col span="4">
            <Button type="error" @click="searchData()">搜索</Button>
          </Col>
      </Row>    
    </header>
    <div class="search-content">
      <!-- 最近搜索 -->
      <div class="history-list">
        <p>最近搜索
          <Icon type="md-trash" size="20" @click="modal = true"/>
          <!-- 模态弹框 -->
          <Modal v-model="modal" @on-ok="ok"  title="操作：删除">你确定要删除这些记录吗？</Modal>
        </p>
        <div class="top-data" style="text-align:left;">
          <span v-for="obj in topData" :key="obj.id">{{obj}}</span>
        </div>
      </div> 
      <!-- 热门搜索 -->
      <div class="hot-list">
        <p>热门搜索</p>
        <span v-for="(obj,index) in hotList" :key="obj.id" @click="hotData(index)">{{obj}}</span>
      </div>
    </div>   
  </div>
</template>

<script>
export default {
  data(){
    return{
      modal: false,
      searchInput:"",
      topData:JSON.parse(sessionStorage.getItem('searchData')),
      hotList:['手机','笔记本','玩具','家电','鼠标','生鲜','水果','键盘']
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    //点击登陆按钮跳转
    searchData(){
      if(this.searchInput==""){
        alert('请输入内容')
      }else{
        this.getHistoryList();
        this.$router.push('product-list?'+this.searchInput)
        //清空输入框
        this.searchInput="";  
      }
    },
    //最近搜索
    getHistoryList(){
      if(this.searchInput){
        var searchArr = []
        searchArr.unshift(this.searchInput)
        if (JSON.parse(sessionStorage.getItem('searchData'))) {
          searchArr = searchArr.concat(JSON.parse(sessionStorage.getItem('searchData')))
        }
        sessionStorage.setItem('searchData', JSON.stringify(searchArr))           
      }        
    },
    ok () {
      this.topData=[];
      sessionStorage.removeItem("searchData");
    },
    hotData(index){
      this.searchInput=this.hotList[index]
    }
  },mounted(){
  $('.hot-list span:nth-child(3n+2)').css({
      'color':'red'
    })
  } 
}
</script>
<style lang="scss">
.search{
    .header-box{
      padding:10px;
      justify-content: space-between;
      width: 95%;
      // height: 1.2rem;
      // padding: .2rem .4rem .2rem .266667rem;
      box-sizing: border-box;
      position: relative
    }
    .search-content{
      width: 100%;
      height: 300px;
      padding:10px 20px;
      // 最近搜索
      .history-list,hot-list{
        p{
          display: flex;
          justify-content: space-between;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
          width: 100%;
        }
        .top-data{
          width: 100%;
          height:auto;              
          span{
            border-radius: 5px;
            background-color: #f0f2f5;
            color: #686868;
            padding: 5px;
            text-align: left;
            margin: 10px 5px 5px 0;
            display: inline-block;
          }
        }
      }
      .hot-list{
        margin-top: 15px;
        text-align: left;
        p{ 
          font-weight: 600;
          font-size: 14px;
          width: 80%;    
        }
        span{
          border-radius: 5px;
          background-color: #f0f2f5;
          color: #686868;
          padding: 5px;
          margin: 10px 5px 5px 0;
          display: inline-block;
        }
        .hot{
          color:red;
        }
      }    
    }
  }
</style>
