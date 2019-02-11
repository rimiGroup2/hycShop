<template>
    <div>
        <div v-if="state" :style="styles">
            <Header title="收货地址"></Header>
            <div v-if="shipping.length==0">您还没有添加地址</div>
            <ul v-else>
                <li>我是地址</li>
            </ul>
            <button class="add-shipping" @click="addShipping">新增收货地址</button>
            
        </div>
        <div v-else>
            <header>
                <Row>
                    <Col span="3">
                        <div @click="goBack">
                            <Icon type="ios-arrow-back" size="30"/>
                        </div>
                    </Col>
                    <Col span="17">
                        <p>添加新地址</p>
                    </Col>
                    <Col span="4" >
                        <p @click="save">保存</p>
                    </Col>
                </Row>
             </header>
             <div class="new-shipping receiver">
                 <Row>
                     <Col span="6"><span>收货人</span></Col>
                     <Col span="18">
                        <Input v-model="newShipping.receiver" placeholder="请填写收货人" />
                     </Col>                     
                 </Row>
                 <Row>
                     <Col span="6"><span>联系电话</span></Col>
                     <Col span="18">
                        <Input v-model="newShipping.phone" placeholder="请填写联系电话" />
                     </Col>                     
                 </Row>
                 <Row>
                     <Col span="6"><span>所在地区</span></Col>
                     <Col span="18"><span @click="SelectArea">请选择所在地区</span></Col>
                 </Row>    
                 <Row>
                     <Col span="6"><span>邮编</span></Col>
                     <Col span="18">
                         <Input v-model="newShipping.postcode" placeholder="请填写邮编" />
                     </Col>                     
                 </Row>               
             </div>
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
</template>
<script>
import Header from './user-header.vue'
import location from './location.js'
export default {
    data() {
        return {
            styles:{
                height:'',
                background:"#eee",
            },
            shipping:[],
            state:true,
            newShipping:{
                receiver:'',
                phone:'',
                postcode:'',
            },
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
        }
    },
    created() {
        Address:{
            return this.address;
        }
    },
    methods: {
        addShipping(){
            this.state = false;
        },
        save(){
            console.log(2)
        },
        goBack(){
            this.state = true;
        },
        SelectArea(){
           
        },
        City(e){
            this.address.code = e;
            this.address.city = this.Location[e].name;  
        },
        Area(e){
            this.address.areaCode = e;
            // this.address.area = this.address.allArea[e].name;
            this.address.area = this.address.allArea[e].name
        },
        Region(e){
            var Address = `${this.address.city}${this.address.area}${this.address.regionName}`
            console.log(Address)
        }
    },
    components:{
        Header
    },
    mounted() {
         this.styles.height = document.documentElement.clientHeight + 'px'
        window.onresize=()=>{
         this.styles.height = document.documentElement.clientHeight + 'px'
        }
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
                    console.log(this.address.region)
                }
            }
        }
       
    },
}
</script>
<style lang="scss" scoped>
    header{
        text-align: center;
        p{
            font-size:15px;
        }
        height:52px;
        line-height: 52px;
        background-color:#fff; 

    }
    .add-shipping{
        width:100%;
        height:57px;
        font-size: 14px;
        font-weight: 400;
        position: fixed;
        bottom: 0px;
        color:white;
        background-color:#f63515;
        outline: none;
        border: none; 
    }
    .picker{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.5);
        z-index: 999;
        left:0;
        bottom: 0;
    }
</style>