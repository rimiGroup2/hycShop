<template>
  <div class="search">
    <!-- 头部 -->
    <header>
      <Row :gutter="6">
          <Col span="3">
            <Icon type="ios-arrow-back" size="24" />
          </Col>
          <Col span="17">
            <Input v-model="searchInput" prefix="ios-search" placeholder="双十一狂欢" />
          </Col>
          <Col span="4">
            <Button type="error">搜索</Button>
          </Col>
      </Row>    
    </header>
    <div class="search-content">
      <!-- 最近搜索 -->
        <div class="content-history">
          <div class="history-top">
              <p>最近搜索</p>
              <Icon type="md-trash" size="20"/>
          </div>
           
        </div>
    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      searchInput:""
    }
  },methods:{
     
  }
}
</script>
<style lang="scss">
.search{
    header{
      padding:10px;
    }
    .search-content{
      // 最近搜索
        .content-history{
            width: 100%;
            height: 300px;
            padding:10px 20px;
            .history-top{
              display: flex;
              p{
                text-align: left;
                font-weight: 600;
                font-size: 14px;
                width: 90%;
              }
            }
            
        }
    }
  }
</style>
