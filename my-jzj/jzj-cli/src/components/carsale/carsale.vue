<template>
  <section class="home">
    <div class="top">
      <div class="back"></div>
      <span class="title">车辆出售详情</span>
      <div class="share">
        <span href="#">
          <img src="../../assets/img/get.png" class="img1" />
        </span>
        <span>
          <img @click="jsSetApp()" src="../../assets/img/share.png" class="img2" />
        </span>
      </div>
    </div>
    <div class="header">
      <!-- 轮播 -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in list " :key="index">
          <img :src="item" />
        </swiper-slide>
        
      </swiper>
      <!--以下看需要添加-->
      <!-- <div class="swiper-scrollbar"></div> //滚动条
            <div class="swiper-button-next"></div> //下一项
      <div class="swiper-button-prev"></div> //上一项-->
      <!-- <span class="swiper-pagination">1/5</span> -->
    </div>
    <!-- 求职期望 -->
    <div class="hope clearfix">
      <div class="left">
        <img src="../../assets/img/av.png" alt />
        <span>{{msg.username}}</span>
      </div>
      <div class="right">
        <img src="../../assets/img/inform.png" alt />
        <span>举报</span>
      </div>
    </div>
    <!-- <div class="line" style="width: 90%;height: 0.01rem; margin:auto;background:#eff3ff;margin-bottom:0.5rem;"></div> -->
    <!-- 工作经历 -->
    <div class="experience">
      <div class="jybox">
        <ul>
          <li class="leixing">交易类型：</li>
          <li class="infor">{{msg.tradeType}}</li>
          <li class="leixing">车辆类型：</li>
          <li class="infor">{{msg.carName}}</li>
        </ul>
        <ul>
          <li class="leixing">参考价格：</li>
          <li class="infor">{{msg.money}}/月</li>
          <li class="leixing">出厂时间:</li>
          <li class="infor">{{msg.productionTime}}</li>
        </ul>
        <ul>
          <li class="leixing">核载量：</li>
          <li class="infor">{{msg.audit}} {{msg.capacity}}</li>
          <li class="leixing">排放标准：</li>
          <li class="infor">{{msg.standard}}</li>
        </ul>
      </div>
      <!-- <div class="cailiao">
                <p class="pin">材料品牌：</p>
                <p class="pai">是地地道道d's'd's</p>
      </div>-->
      <div class="dizhi">
        <p>运营范围</p>
        <span>{{msg.address}} {{msg.addressNote}}</span>
      </div>
      <div class="miaoshu">
        <p>车辆描述</p>
        <span>{{msg.describe}}</span>
      </div>
    </div>

    <!-- 评价 -->
    <div class="est">
      <div>
        <span class="icon"></span>
        <span class="title">评价</span>
      </div>
      <div class="wrp">
        <div class="main" v-for="(item ,index) in 4" :key="index">
          <div class="touxiang"></div>
          <div class="user">
            <p>{{uname}}</p>
            <span class="pl">ddd</span>
            <span style="float: right;color: #bd5667;font-size:0.28rem;">删除</span>
          </div>

          <div class="req">
            <div class="touxiang"></div>
            <p>
              <span>发布者</span> 回复
              <span>用户A</span>
            </p>
            <span style="float: right;font-size:0.28rem;color: #3e761e">回复</span>
            <span class="pl">sddddddddddddddd</span>
          </div>
          <div class="line"></div>
        </div>
        <!-- <div class="line"></div> -->
      </div>
    </div>
    <!-- 相关信息 -->
    <div class="about-list">
      <p class="title">相关信息</p>
      <div class="box clearfix" v-for="(item ,index) in dataList" :key="index">
        <div class="box-lf">
          <div class="img"></div>
          <p>{{item.updatetime}}</p>
        </div>
        <div class="box-rg">
          <div class="type">【{{item.tradeType}}】{{item.carName}}</div>
          <div class="rg-top">
            <span class="add">{{item.address}}</span>
            <span class="price">{{item.money}}</span>
          </div>
          <div class="mid">
            <img :src="item.userPhoto" alt="">
            <span>{{item.username}}</span>
          </div>
          <div class="bot">
            <span>浏览：{{item.clicks}}</span>
            <img src="../../assets/img/art.png" alt /> {{item.commentNumber}}
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="touxiang">
        <img :src="photo" />
      </div>
      <a href="javascript:void(0)">
        <p>
          <img src="../../assets/img/写评价.png" alt />
        </p>
        <p>评论</p>
      </a>
      <div class="lianxi">
        <img src="../../assets/img/在线沟通.png" alt />
        <span>在线沟通</span>
      </div>
      <div class="zaixian">
        <img src="../../assets/img/联系TA.png" alt />
        <span>联系TA</span>
      </div>
    </div>

    <!-- <div class="dialog" v-show="isShow">

    </div>-->
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
      msg:{},
      list:[],
      dataList:[],
      url: {},
      swiperOption: {
        autoplay: 3000,
        speed: 1000
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        //type: 'fraction',
        //type : 'progressbar',
        //type : 'custom',
        progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
        bulletElement: "span", //设定分页器指示器（小点）的HTML标签。
        dynamicBullets: true, //动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
        dynamicMainBullets: 2, //动态分页器的主指示点的数量
        hideOnClick: true, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
        clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
      }
    };
  },
  methods: {
    // 分享方法
    jsSetApp() {
      //    console.log()
      webCallLocal.jsSetApp(
        JSON.stringify({
          type: 13,
          shareDesc: 121,
          shareLinkUrl: 555555,
          shareTitle: 151515
        })
      );
      // webCallLocal.back();
      // this.back()
    },
    // 截取url
    sub() {
      var _this = this;
      var url = window.location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      _this.url = theRequest;
      console.log(theRequest);
      return theRequest;

      // var Request = new Object();
      // Request = GetRequest()
    }
  },
  created() {
    var that = this;
    // var test = window.location.search;
    console.log(window.android);
    // test = test.substring(1, test.length - 1)
    // console.log(test)
    this.sub();
    this.http
      .post("http://192.168.0.162:8080/jzj-app/car/selCarById.do", {
        // carId: that.url.carId,
        // uuid: that.url.uuid
        carId: "ee55e0d730d7431bb05cd81843b9a7b3",
        uuid: "uuuuuuuu"
      })
      .then(res => {
        console.log(res);
        this.msg = res.result.carMessage;
          this.list = this.msg.list;
        this.dataList = res.result.dataList
      });
    
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

.Product-details {
  width: 100%;
  height: 5.66rem;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  font-size: 0.12rem;
  left: 80%;
  bottom: 10%;
  width: 0.65rem;
  height: 0.31rem;
  background: #7f7f7f;
  filter: Alpha(opacity=70);
  color: white;
  line-height: 0.31rem;
  border-radius: 25px;
}
.swiper-slide{
    height: 4.7rem;
    width: 100%;
    /* background: #000; */
}
.swiper-slide img{
    width: 100%;
    height: 100%;
}
.swiper-pagination {
  width: 0.84rem;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #bfb7ac;
  right: 10px;
  text-align: center;
  -webkit-transition: 300ms;
  transition: 300ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  z-index: 10;
  margin-top: -28px;
}

.top {
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 2px 4px 6px #f5f9fd;
  position: absolute;
  top: 0;
  width: 100%;
  height: 1.42rem;
  position: fixed;
  z-index: 111;
  padding-top: 0.4rem;
}
.top .back {
  width: 0.16rem;
  height: 0.16rem;
  border: 2px solid #000;
  border-top: none;
  border-right: none;
  transform: rotate(45deg);
  margin-left: 0.3rem;
}
.top .title {
  font-size: 0.32rem;
  color: #000;
}
.top .share {
  float: right;
  margin-right: 0.3rem;
  line-height: 0.3rem;
}
.top .share span img {
  float: left;
  width: 0.44rem;
  height: 0.44rem;
}
.top .share .img1 {
  margin-right: 0.46rem;
}
.header {
  margin-top: 1.6rem;
  text-align: center;
  height: 4.7rem;
}


.header .name {
  color: #797979;
  font-size: 0.28rem;
  padding-top: 0.28rem;
}
.header .jdtype {
  color: #000;
  font-size: 0.42rem;
  margin-top: 0.3rem;
  margin-bottom: 0.6rem;
}
.header .age i {
  font-size: 0.29rem;
  color: #797979;
  margin-right: 0.3rem;
}
.header .age i > img {
  vertical-align: middle;
  width: 0.24rem;
  height: 0.24rem;
}

.hope {
  height: 1.24rem;
  line-height: 1.26rem;
  /* border-bottom: 10px solid #f5f8fc; */
}
.hope .left {
  float: left;
  margin-left: 0.3rem;
}
.hope .left span {
  font-size: 0.32rem;
  margin-left: 0.2rem;
}
.hope .left img {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
}
.hope .right {
  float: right;
  margin-right: 0.3rem;
}
.hope .right span {
  vertical-align: middle;
  font-size: 0.26rem;
  color: #9b9c9c;
}
.hope .right img {
  width: 0.44rem;
  height: 0.44rem;
  vertical-align: middle;
  margin-right: 0.3rem;
}

.jybox {
  border-top: 10px solid #f5f8fc;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.3rem;
}
.jybox ul li {
  line-height: 0.6rem;
}
.leixing {
  font-size: 0.24rem !important;
  color: #9b9c9c;
}
.infor {
  font-size: 0.28rem;
  font-weight: bold;
}

.pin,
.pai {
  margin-left: 0.3rem;
}
.pin {
  margin-top: 0.6rem;
  font-size: 0.24rem;
  color: #9b9c9c;
}
.pai {
  font-size: 0.28rem;
  color: #000;
  margin-top: 0.3rem;
}

.icon {
  display: inline-block;
  height: 0.28rem;
  width: 0.06rem;
  background: #2a84ff;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.title {
  vertical-align: middle;
}

.dizhi,
.miaoshu {
  height: 1.9rem;
  font-size: 0.24rem;
  color: #9b9c9c;
  border-top: 10px solid #f5f8fc;
  border-bottom: 10px solid #f5f8fc;
}
.dizhi p,
.dizhi span {
  margin-left: 0.3rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.dizhi span,
.miaoshu span {
  font-size: 0.28rem;
  color: #000;
}
.miaoshu p,
.miaoshu span {
  margin-left: 0.3rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}

.miaoshu {
  border-top: none;
}
.cailiao {
  padding-bottom: 0.3rem;
}

.pay {
  float: right;
  padding-top: 0.5rem;
  font-size: 0.28rem;
  color: #2f82ff;
  font-family: MicrosoftYaHei;
}
.experience .main,
.prove .main {
  width: 80%;
  line-height: 0.36rem;
  margin: 0.4rem auto;
  padding: 0.3rem;
  color: #797979;
  font-size: 0.26rem;
  box-shadow: 0 0 10px #e5e7ec;
  border-radius: 0.1rem;
}

.est .main {
  width: 90%;
  margin: 0 auto;
  margin-top: 0.4rem;
}
.est .main .line {
  width: 90%;
  height: 0.01rem;
  margin: auto;
  background: #eff3ff;
  margin-bottom: 0.5rem;
}
.est .main .touxiang {
  float: left;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.1rem;
  border: 1px solid #333;
  border-radius: 50%;
  vertical-align: middle;
}
.est .main .user {
  margin-top: 0.4rem;
  line-height: 0.37rem;
}
.est .main .user .pl,
.est .main .req .pl {
  color: #797979;
  font-size: 0.28rem;
}
.est .main .user p {
  font-size: 0.28rem;
  color: #083e81;
}

.est .main .req {
  padding-top: 0.3rem;
  padding-left: 0.7rem;
  line-height: 0.5rem;
}
.est .main .req span {
  color: #083e81;
  font-size: 0.28rem;
}
.about-list {
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
.about-list .title {
  /* padding-left: 0.3rem; */
  font-size: 0.34rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.6rem;
}
.about-list .box {
  height: 2.73rem;
  border-bottom: 0.01rem solid #cdd9e9;
}
.about-list：last-child{
  margin-bottom: 50px;
}
.box-lf {
  float: left;
}
.box-lf .img {
  width: 2.3rem;
  height: 1.75rem;
  background: #97a8bf;
  border-radius: 0.05rem;
}
.box-lf p {
  font-size: 0.22rem;
  color: #797979;
  margin-top: 0.32rem;
}
.box-rg {
  /* float: left; */
  margin-left: 0.3rem;
}
.box-rg .type {
  font-size: 0.28rem;
  font-weight: bold;
}
.rg-top {
  margin-top: 0.2rem;
  margin-bottom: 0.56rem;
  font-size: 0.26rem;
}
.rg-top .add {
  font-size: 0.26rem;
  color: #797979;
}
.rg-top .price {
  color: #2f82ff;
  size: 0.28rem;
  float: right;
}
.mid img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.15rem;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #333;
}
.mid span {
  vertical-align: middle;
}
.bot {
  margin-top: 0.32rem;
  float: right;
  color: #797979;
}
.bot img {
  width: 0.28rem;
  height: 0.26rem;
  margin-left: 1.4rem;
  margin-right: 0.1rem;
}

.about-list .list .job span {
  color: #2f82ff;
  font-size: 0.28rem;
}
.about-list .list b {
  font-weight: normal;
  font-size: 0.3rem;
  color: #000;
}

.about-list .list .address {
  margin: 0.3rem 0 0.3rem 0.3rem;
}
.about-list .list .address span {
  padding: 0.1rem 0.2rem;
  font-size: 0.28rem;
  color: #797979;
  background: #f5f8fc;
  border-radius: 0.08rem;
  margin-right: 0.3rem;
}
.about-list .list .user {
  height: 0.97rem;
  margin: 0 0.3rem 0.3rem 0.3rem;
}
.about-list .list .user .userinfo {
  font-size: 0.22rem;
}
.about-list .list .user .userinfo img {
  display: inline-block;
  vertical-align: middle;
  width: 0.45rem;
  height: 0.45rem;
  /* background: #888; */
  border-radius: 50%;
  margin-right: 0.14rem;
}
.about-list .list .user .time {
  color: #797979;
  font-size: 0.22rem;
  padding-top: 0.3rem;
}
.about-list .list .user .time .click {
  float: right;
}
.about-list .list .user .time .click span {
  padding-right: 1.1rem;
}
.about-list .list .user .time .click img {
  width: 0.28rem;
  height: 0.26rem;
  vertical-align: middle;
  display: inline-block;
}
.bottom {
  height: 0.99rem;
  width: 100%;
  z-index: 111;
  background: #ffffff;
  position: fixed;
  bottom: 0;
}
.bottom .touxiang img {
  float: left;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin: 0 0.3rem 0 0.3rem;
}
.bottom a {
  float: left;
  margin-left: 0.4rem;
  text-align: center;
}
.bottom a img {
  width: 0.44rem;
  height: 0.44rem;
}
.zaixian,
.lianxi {
  color: #fff;
  float: right;
  width: 2.1rem;
  height: 0.98rem;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.98rem;
}
.zaixian img,
.lianxi img {
  width: 0.3rem;
  height: 0.3rem;
  vertical-align: middle;
}
.zaixian {
  background: #2f82ff;
  color: #fff;
}
.zaixian span,
.lianxi span {
  font-size: 0.32rem;
}
.lianxi {
  background: #ffa800;
}
</style>
