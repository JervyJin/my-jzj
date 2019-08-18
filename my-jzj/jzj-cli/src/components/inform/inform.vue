<template>
  <section class="inform">
            <div class="header clearfix">
                <span class="back"></span>
                <span class="title">举报</span>
            </div>
            <div class="reason">
                <div class="title">
                    <i></i>
                    <span>举报原因</span>
                </div>
                <ul>
                    <li>
                        <label>薪资不真实</label>
                        <input type="radio" value="薪资不真实" v-model="picked" @change="changeRadio('薪资不真实')">
                    </li>
                    <li>
                        <label>工作经验或学历造假</label>
                        <input type="radio" value="工作经验或学历造假" v-model="picked" @change="changeRadio('工作经验或学历造假')">
                    </li>
                    <li>
                        <label>公司信息不真实</label>
                        <input type="radio" value="公司信息不真实" v-model="picked" @change="changeRadio('公司信息不真实')">
                    </li>
                    <li>
                        <label>其他</label>
                        <input type="radio" value="其他" v-model="picked" @change="changeRadio('其他')">
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <!-- 补充说明 -->
            <div class="add">
                <div class="title">
                    <i></i>
                    <span>补充说明</span>
                </div>
                <textarea v-model="value" placeholder="请在此处输入文字..." @input="changeInput($event)"></textarea>
            </div>
            <div class="line"></div>
            <!-- 上传图片 -->
            <div class="upload">
                <div class="title">
                    <i></i>
                    <span>上传图片</span>
                </div>
                <img v-for="(item,index) in imgcode" :key="index" :src="item" class="imgBox">
                <div class="file-box">
                    <input type="file" class="uploadphoto" @change="uploadphoto($event)" ref="inputer" multiple
                            accept="image/*">+
                </div>
                

                <div class="button">
                    <button type="button" @click="submit('reset')" class="button1">取消</button>
                    <button type="button" @click="submit('success')" class="button2">提交</button>
                </div>
            </div>
        </section>
</template>

<script>
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import axios from "axios";

Vue.use(VueAwesomeSwiper /* { default global options } */);
export default {
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  data() {
    return {
       value: '',
      picked: '',
      // 获取url的数据
      url: {},
      imgcode: []//
    };
  },
 methods: {
    sub() {
      var _this = this
      var url = window.location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      _this.url = theRequest
      console.log(theRequest)
      return theRequest;

    },



    changeRadio($event) {
      //  let picked = $event;
      console.log(this.picked)
    },

    changeInput($event) {
      // this.value = $event.target.value;
      // console.log(this.value)
    },




    // 文件上传
    uploadphoto(e) {
      var list = this.imgcode
      var file = e.target.files[0];
      console.log(file)
      var filesize = file.size;
      var filename = file.name;
      var reader = new FileReader();
      console.log(reader)
      reader.readAsDataURL(file);
      const _this = this;
      reader.onload = function (e) {
        // result属性中将包含所读取文件的原始二进制数据.
        var imgcode = e.target.result;
        console.log(imgcode);
        list.push(imgcode)
        this.imgcode = list
      };
    }
    ,

    submit(value) {




        var _this = this
      var str = ""
      console.log(this.imgcode)
      var list = this.imgcode
      for (var i = 0; i < list.length; i++) {
        // str += list[i] + ","
      }
      console.log(str)
      if (value == 'reset') {
        console.log("取消")
        _this.value ='';
        _this.picked = '';
        _this.imgcode = []
      } else {
        console.log("成功")
        this.http
      .post("http://192.168.0.119:8080/jzj-app/person/insertInform.do", JSON.stringify({
            informer_uuid : _this.url.informer_uuid,//举报人的uuid
            reported_uuid : _this.url.reported_uuid,//被举报人的uuid: that.url.uuid,
            objId :_this.url.objId,
            pid :_this.url.pid,
            cause : _this.picked,// 举报原因
            explain : _this.value,// 举报说明，描述
            files : _this.imgcode// 图片上传
      }))
      .then(res => {
        console.log(res);
        
      });
        
      }
    
     
    }


  },
  created() {
   
    
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  /* font-size: 0.12rem; */
  font-family: "Microsoft YaHei" !important;
}
/* 实现头部定位 */
body {
  background: #ffffff;
}
i {
  font-style: normal;
}
a {
  text-decoration: none;
  color: #333;
}
/*清除浮动*/
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.header{
    text-align: center;
    margin: 0.24rem 0;
}
.header .back{
    float: left;
    width: 0.25rem;
    height: 0.26rem;
    border: 0.02rem solid #000;
    border-top: none;
    border-right: none;
    transform: rotate(45deg);
    margin-top: 0.05rem;
    margin-left: 0.3rem;
}
.header .title{
    font-family: PingFangSC-Regular, sans-serif;
    color: #000;
    font-size: 0.32rem;
}
.reason{padding: 0 0.3rem 0 0;}
.reason .title,.add .title,.upload .title {
    height: 0.9rem;
    line-height: 0.9rem;
    width: 100%;
    /* padding: 0.3rem 0; */
    color: #000;
}
.reason .title i,.add .title i,.upload .title i{
    vertical-align: middle;
    display: inline-block;
    margin-right: 0.2rem;
    width: 0.1rem;
    height: 0.28rem;
    background: #2f82ff;
}
.reason .title span,.add .title span,.upload .title span{
    font-size: 0.28rem;
    vertical-align: middle;
}
.reason ul li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.3rem;
    border-top: 0.01rem solid #f5f8fc;
    line-height: 0.92rem;
    height: 0.92rem;  
}

.reason ul li>label{
    font-size: 0.28rem;
    color: #797979;
}
.reason ul li >img{
    float: right;
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
}
.line{
   width: 100%;
   height: 0.09rem; 
   background: #f5f8fc;
}
.add{height: 3.28rem;}
.add .title i{
    display: inline-block;
    margin-right: 0.2rem;
    width: 0.1rem;
    height: 0.28rem;
    background: #2f82ff;
}
.add .title{border-bottom: 0.01rem solid #f5f8fc;}
.add textarea{
    width: 100%;
    border: none;
    font-family: SourceHanSansCN-Regular;
    border: 0;
    font-size: 0.28rem;
    color: #c6c6c6;
    line-height: 0.45rem;
    text-indent:0.3rem;
}
.upload .title {
    border-bottom: 0.01rem solid #f5f8fc;
}
.upload .button{
    /* margin-top: 1.2rem; */
    text-align: center;
    font-size: 0.32rem;
}
.button .button1{
    /* display: inline-block; */
    color: #797979;
    background: #eeeeee;
    width: 2.2rem;
    height: 0.88rem;
    border-radius: 0.16rem;
    border: none;
}
.button .button2{
    /* display: inline-block; */
    color: #f5f8fc;
    background: #2f82ff;
    width: 2.2rem;
    height: 0.88rem;
    border-radius: 0.16rem;
    border: none;
}
.imgBox{
    position: relative;
    width: 2.15rem;
    height: 2.15rem;
    margin: 0.4rem 0;
}
.file-box{
    position: relative;
    width: 2.15rem;
    height: 2.15rem;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    margin: 0.4rem 0;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 2.15rem;
    text-align: center;
    font-size: 1.2rem;

}
.uploadphoto{
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}

</style>
