<template>
  <div id="shipping">
      <header-bar :headertitle="title" :more="false"></header-bar>
      <div class="addressContainer">
          <!-- 地址项 -->
        <div class="addressItem" v-for='item,index in addressList'>
            <div class="top">
                <div>
                  <h3>{{item.address_name}}</h3>
                  <h3>{{item.address_phone}}</h3>
                </div>
                <p class="area">{{item.address_area}}</p>
                <p class="address">{{item.address_content}}</p>
            </div>
            <div class="bottom">
                <Radio name="defaultAdd" v-model="item.address_isdefault==1" @click.native='setDefault(index)'></Radio>
                <div>
                    <span @click="toeditAdd(index)"><Icon type="ios-clipboard-outline" />编辑</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span @click="delAdd(index)"><Icon type="ios-trash-outline" />删除</span>
                </div>
            </div>
        </div>
      </div>
      <p class="addNewaddress" @click="toaddAddress">
          新增收货地址
      </p>
      <Modal
        v-model="delAlert"
        @on-ok="ok">
        <h3>确认要删除吗？</h3>
      </Modal>
      <!-- 添加地址 -->
      <transition name="slide">
          <div class="addAddress" v-show="addAddressflag">
              <header>
                <Row :gutter="6">
                    <Col span="4" @click.native="addAddressflag=false">
                        <Icon type="ios-arrow-back" id="back" size="30"/>
                    </Col>
                    <Col span="16" class="headerTitle">
                        添加地址
                    </Col>
                    <Col span="4" class="save" @click.native='saveAdd'>
                        保存
                    </Col>
                </Row>   
              </header>
              <div class="newAddresscontainer">
                  <Input clearable placeholder="收货人" size="large" v-model="newAdd.address_name"/>
                  <Input clearable placeholder="手机号码" size="large"  v-model="newAdd.address_phone"/>
                  <Input placeholder="所在地区" id="area" size="large" icon="ios-arrow-forward"  v-model="newAdd.address_area"/>
                  <Input clearable placeholder="邮政编码" size="large" v-model="newAdd.address_code"/>
                  <Input type="textarea" :rows="4" v-model="newAdd.address_content" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" size="large"/>
              </div>
              <div class="popup">
                  <div class="popContainer">
                    <Row class="popHeader">
                      <Col span="18" offset="3">所在地区</Col>
                      <Col span="3"><Icon type="ios-close-circle-outline" id="popClose"/></Col>
                    </Row>
                    <div class="picker">
                        <Row>
                            <Col span="8">
                                <Select v-model="address.code" @on-change="City($event)">
                                    <Option v-for="item in Location" :value="item.code" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="8">
                                <Select v-model="address.areaCode" @on-change="Area($event)">
                                    <Option v-for="item in address.allArea" :value="item.code" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="8">
                                <Select v-model="address.regionName" @on-change="Region($event)">
                                    <Option v-for="item in address.region" :value="item" :key="item.id">{{ item }}</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                  </div>
              </div>
          </div>
      </transition>
      
      <!-- 修改地址 -->
      <transition name="slide">
          <div class="editAddress" v-show="editAddressflag">
              <header>
                <Row :gutter="6">
                    <Col span="4"  @click.native="editAddressflag=false">
                        <Icon type="ios-arrow-back" id="back" size="30"/>
                    </Col>
                    <Col span="16" class="headerTitle">
                        修改地址
                    </Col>
                    <Col span="4" class="save" @click.native='saveEditAdd'>
                        保存
                    </Col>
                </Row>   
              </header>
              <div class="newAddresscontainer">
                  <Input clearable placeholder="收货人" size="large" v-model="editAdd.address_name"/>
                  <Input clearable placeholder="手机号码" size="large"  v-model="editAdd.address_phone"/>
                  <Input placeholder="所在地区" id="editarea" size="large" icon="ios-arrow-forward"  v-model="editAdd.address_area"/>
                  <Input clearable placeholder="邮政编码" size="large" v-model="editAdd.address_code"/>
                  <Input type="textarea" :rows="4" clearable v-model="editAdd.address_content" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" size="large"/>
              </div>
              <div class="popup">
                  <div class="popContainer">
                    <Row class="popHeader">
                      <Col span="18" offset="3">所在地区</Col>
                      <Col span="3"><Icon type="ios-close-circle-outline" id="editpopClose"/></Col>
                    </Row>
                    <div class="picker">
                        <Row>
                            <Col span="8">
                                <Select v-model="address.code" @on-change="City($event)">
                                    <Option v-for="item in Location" :value="item.code" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="8">
                                <Select v-model="address.areaCode" @on-change="Area($event)">
                                    <Option v-for="item in address.allArea" :value="item.code" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="8">
                                <Select v-model="address.regionName" @on-change="Region($event)">
                                    <Option v-for="item in address.region" :value="item" :key="item.id">{{ item }}</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                  </div>
              </div>
          </div>
      </transition>

  </div>
</template>

<script>
import headerbar from '../../components/Headerbar'
import location from '../../../static/location.js'

export default {
  name: 'Shipping',
  data(){
      return {
           title:'收货地址',
           addressList:[],
           addAddressflag:false,
           delAlert:false,
           delIndex:null,
            Location:location,
            address:{
                city:null,
                code:null,
                allArea:null,
                area:null,
                areaCode:null, 
                region:null,
                regionName:null,              
            },
            newAdd : {
                address_name:null,
                address_phone:null,
                address_area:null,
                address_code:null,
                address_content:null
            },
            editAddressflag:false,
            editAddindex:null,
            editAdd : {}
      }
  },
  components : {
      headerBar : headerbar,
  },
  methods:{
    //   设为默认地址
      setDefault(index){
          this.addressList.forEach(function(item){
              item.address_isdefault=0;
          })
          this.addressList[index].address_isdefault=1;

          var sql = 'update address set address_isdefault = 0 where address_userId='+window.sessionStorage.getItem('userId')
          axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
          var sql = 'update address set address_isdefault = 1 where address_id='+this.addressList[index].address_id;
          axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql);
      },
      toaddAddress(){
          this.addAddressflag = !this.addAddressflag
      },
    //   区域选择
        City(e){
            this.address.code = e;
            this.address.city = this.Location[e].name;
        },
        Area(e){
            this.address.areaCode = e;
            this.address.area = this.address.allArea[e].name
        },
        Region(e){
            var Address = `${this.address.city}${this.address.area}${this.address.regionName}`
            this.newAdd.address_area = Address;
            this.editAdd.address_area = Address;
            $('.popContainer').animate({bottom:"-500px"});
            $('.popup').hide();
            $('body').css("overflow", "auto")
        },
        // 保存地址
        saveAdd(){
            if(this.judgeNull()){
                this.$Modal.warning({title: '请将表格填写完整'});
            }else{
                if(!this.judgeName()){
                    this.$Modal.warning({title: '姓名格式不正确，请重新输入'});
                    this.newAdd.name = ''
                }else{
                    if(!this.judgePhone()){
                        this.$Modal.warning({title: '联系电话格式不正确，请重新输入'});
                        this.newAdd.phone = '';
                    }else{
                        var noAdd = this.addressList.length==0?1:0;
                        var sql = "insert into address (address_userId,address_name,address_area,address_code,address_phone,address_content,address_isdefault) values("
                            +window.sessionStorage.getItem('userId') +",'"
                            +this.newAdd.address_name +"','"
                            +this.newAdd.address_area +"','"
                            +this.newAdd.address_code +"','"
                            +this.newAdd.address_phone+"','"
                            +this.newAdd.address_content +"',"
                            +noAdd+")";
                        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
                        .then((res) => {
                        })
                        this.newAdd['address_isdefault']=noAdd;
                        this.addressList.push(this.newAdd)
                        this.newAdd = {
                            address_name:null,
                            address_phone:null,
                            address_area:null,
                            address_code:null,
                            address_content:null
                        }
                        this.addAddressflag = false;
                    }
                }
            }
        },
        judgeNull(){
            var flag =  true;
            for(var key in this.newAdd){
                this.newAdd[key]==null||this.newAdd[key]==''?flag=true:flag=false;
            }
            return flag
        },
        judgeName(){
            return /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.newAdd.address_name)
        },
        judgePhone(){
            return /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.newAdd.address_phone);
        },
        // 刷新地址列表
        updateAddress(){

        },
        // 编辑地址
        toeditAdd(index){
            this.editAddindex = index;
            this.editAdd = {
                address_name:this.addressList[index].address_name,
                address_phone:this.addressList[index].address_phone,
                address_area:this.addressList[index].address_area,
                address_code:this.addressList[index].address_code,
                address_content:this.addressList[index].address_content,
                address_isdefault:this.addressList[index].address_isdefault
            }
            this.addressList[this.editAddindex] = this.editAdd;
            this.editAddressflag = true;
        },
        // 保存修改地址
        saveEditAdd(){
            var sql = "update address set address_name='"+this.editAdd.address_name
                    +"', address_area='"+this.editAdd.address_area
                    +"', address_code='"+this.editAdd.address_code
                    +"', address_phone='"+this.editAdd.address_phone
                    +"', address_isdefault="+0
                    +" ,address_content='"+this.editAdd.address_content
                    +"' where address_id ="+this.addressList[this.editAddindex].address_id;
            axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
            .then((res) => {
                this.editAddressflag = false;

            })
        },
        // 删除地址
        delAdd(index){
            this.delIndex=index
            this.delAlert=true
        },
        ok(){
            var sql = 'delete from address where address_id='+this.addressList[this.delIndex].address_id;
            axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
            .then((res)=>{
                this.addressList.splice(this.delIndex,1)
            }).catch((err)=>{
                console.log('error'+err)
            })
        }
  },created (){
       var sql = 'select * from address where address_userId = '+sessionStorage.getItem('userId');
        axios.get('http://118.24.87.17/getMysql.php?sendsql='+sql)
        .then((res)=>{
            this.addressList = res.data;
        }).catch((err)=>{
            console.log('error'+err)
        })
  },
  mounted(){
      $('#area').click(function(){
        $('.popup').show();
        $('.popContainer').animate({bottom:"0px"});
        $('body').css("overflow", "hidden")
     })
     $('#popClose').click(function(){
        $('.popContainer').animate({bottom:"-500px"});
        $('.popup').hide();
        $('body').css("overflow", "auto")
     })

     $('#editarea').click(function(){
        $('.popup').show();
        $('.popContainer').animate({bottom:"0px"});
        $('body').css("overflow", "hidden")
     })
     $('#editpopClose').click(function(){
        $('.popContainer').animate({bottom:"-500px"});
        $('.popup').hide();
        $('body').css("overflow", "auto")
     })

  },
    watch: {
       "address.city":{
            handler(city){
                if(city!=null){
                    this.address.allArea = this.Location[this.address.code].cities
                }
            },
            deep:true,
            immediate:true,
        },
        "address.areaCode":{
            handler(code){
                if(code!=null){
                    this.address.region = this.address.allArea[this.address.areaCode].districts;
                }
            }
        }
       
    }
}
</script>

<style lang="scss" scoped>
    #shipping{
        background-color: #eee;
        min-height:700px;
        margin-bottom: 50px;
        .addressContainer{
            padding-top: 50px;
            .addressItem{
                background-color: #fff;
                width: 95%;
                margin: 0 auto;
                border-radius: 10px;
                margin-top: 10px;
                .top{
                    padding: 15px 15px 5px;
                    text-align: left;
                    border-bottom: 1px solid #ccc;
                    div{
                        margin-bottom: 5px;
                        display: flex;
                        justify-content: space-between;
                        h3:nth-child(1){
                            color: orangered;
                        }
                    }
                    .area,.address{
                        margin-bottom:5px;
                        font-size: 14px;
                    }
                }
                .bottom{
                    padding:10px 15px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                }
            }
        }
        .addNewaddress{
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            width: 100%;
            background-color: orangered;
            color: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
        }
        
        // 添加地址
        .addAddress,.editAddress{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #eee;
            z-index: 1000;
            header{
                width: 100%;
                padding: 10px;
                position: fixed;
                background-color: #efefef;
                top: 0;
                z-index: 200;
                box-shadow: 0 -2px 10px #000;
                .headerTitle{
                    font-size: 20px;
                }
                .save{
                    font-size: 14px;
                    margin-top: 4px;
                }
            }
            .newAddresscontainer{
                padding-top: 55px;
                
            }.popup{
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 300;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.4);
                    text-align: left;
                    display: none;
                    .popContainer{
                        position: fixed;
                        bottom:-500px;
                        // bottom: 0;
                        width:100%;
                        height: 55%;
                        background-color: #fff;
                        .popHeader{
                            text-align: center;
                            padding: 10px 0;
                            font-size: 20px;
                            margin-bottom: 10px;
                        }
                    }
                }
        }

        // 进入动画
        .slide-enter-active,.slide-leave-active{
            transition: all 0.5s;
        }
        .slide-enter,.slide-leave-to{
            transform: translate3d(100%,0,0);
        }
    }
</style>
