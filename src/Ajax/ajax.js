function Ajax(sql){
   axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
    .then((res)=>{
        return res.data;
    }).catch((err)=>{
        return '接受失败';
    })
    
}
export default(Ajax)
