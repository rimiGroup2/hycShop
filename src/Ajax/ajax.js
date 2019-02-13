function Ajax(sql){ 
    return new Promise((resolve,reject)=>{
        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
        .then((res)=>{
           resolve(res.data)
        }).catch((err)=>{
           reject(err)
        })
    }) 
    
 }
export default(Ajax)
