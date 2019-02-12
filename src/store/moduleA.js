const moduleA = {
    state:{
        category:["手机数码","电脑办公","家用电器","美妆护肤","男装男鞋","女装女鞋","母婴套装","图书音像","户外运动","食品声鲜","酒店饮料","家具家电","箱包手袋","钟表珠宝","玩具乐器"],
        ajaxData:"",
    },
    mutations:{
        getData(state,res){
            state.ajaxData = res;
        }
    },
    actions:{
        Ajax(context,sql){
            axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
             .then((res)=>{
                 context.commit('getData',res.data)
             }).catch((err)=>{
                 return '接受失败';
             })             
        }
    }
}

export default(moduleA)