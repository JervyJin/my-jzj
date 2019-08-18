<template>
  <section class="home">
    <div class="top">
      <div class="back"></div>
      <span class="title">材料详情</span>
      <div class="share">
        <span href="#">
          <img @click="get()" src="./img/get.png" class="img1" />
        </span>
        <span>
          <img @click="jsSetApp()" src="./img/share.png" class="img2" />
        </span>
      </div>
    </div>
    <div class="header">
      <!-- 轮播 -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in listimg " :key="index">
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
        <img :src="msg.userPhoto" alt />
        <span>{{msg.username}}</span>
      </div>
      <div class="right">
        <img src="./img/inform.png" alt />
        <span>举报</span>
      </div>
    </div>

    <!-- 工作经历 -->
    <div class="experience">
      <div class="jybox">
        <div class="tradeType">
          <p class="title">交易类型：</p>
          <p class="content">{{msg.tradeType}}</p>
        </div>
        <div class="money">
          <p class="title">参考价格：</p>
          <span class="content,money">{{msg.money}}</span>
        </div>
        <div class="type">
          <p class="title">材料类型</p>
          <p class="content">{{msg.materialsName}}</p>
        </div>
      </div>

      <div class="cailiao">
        <p class="pin">材料品牌：</p>
        <p class="pai">{{msg.brand}}</p>
      </div>
      <div class="dizhi">
        <p>联系地址</p>
        <span>{{msg.address}}&nbsp&nbsp{{msg.addressNote}}</span>
      </div>
      <div class="miaoshu">
        <p>产品描述</p>
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
            <p>用户A</p>
            <span class="pl">sssssss</span>
            <span class="del" v-if="isShow">删除</span>
          </div>

          <div class="req">
            <div class="touxiang"></div>
            <p>
              <span>发布者</span> 回复
              <span>用户A</span>
            </p>
            <span class="res">回复</span>
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
      <div class="box clearfix" v-for="(item,index) in dataList " :key="index">
        <div class="box-lf">
          <img :src="item.photo" alt />
          <p>{{item.releasetime}}</p>
        </div>
        <div class="box-rg">
          <div class="type">【{{item.tradeType}}】 {{item.materialsName}}</div>
          <div class="rg-top">
            <span class="add">{{item.address}}</span>
            <span class="price">{{item.money}}</span>
          </div>
          <div class="mid">
            <img :src="item.userPhoto" alt />
            <span>{{item.username}}</span>
          </div>
          <div class="bot">
            <span>浏览：{{item.clicks}}</span>
            <img src="./img/art.png" alt />
            {{item.commentNumber}}
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="touxiang">
        <img :src="msg.userPhoto" />
      </div>
      <a href="javascript:void(0)">
        <p>
          <img src="./img/写评价.png" alt />
        </p>
        <p>评论</p>
      </a>
      <div class="lianxi" @click="chat()">
        <img src="./img/在线沟通.png" alt />
        <span>在线沟通</span>
      </div>
      <div class="zaixian">
        <img src="./img/联系TA.png" alt />
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
      address: "",
      describe: "",
      money: "",
      tradeType: "",
      username: "",
      userPhoto: "",
      listimg: [],
      photo: "",
      brand: "",
      materialsName: "",
      addressmsg: "",
      moneymsg: "",
      msg: {},
      dataList: [],
      comments:[],
      releasetime: "",
      title: "",
      //   图片的便利
      img: [],
      // 获取url的数据
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
      },
      isShow: true
    };
  },
  methods: {
    // 收藏
    get(){
    var that = this;
    this.http
      .post(
        "http://192.168.0.66:8080/jzj-app/person/selectP_RByUuid.do",
        {
          objId:4,
          // materialsId:this.$route.query.materialsId,
          materialsId:this.$route.query.materialsId

        }
      )
      .then(res => {
         console.log(res);
       
      });
    },
    // 分享方法
    jsSetApp() {
      
         
      var jsonObj = JSON.stringify({
          // type:13,
          shareImgUrl: "",
          shareDesc: "分享",
          shareLinkUrl: "http://192.168.0.157:8080/#/materialsDetail?materialsId="+this.$route.query.materialsId + "&uuid=" +this.$route.query.uuid,
          shareTitle: "分享"
        })
        console.log(jsonObj)
        window.location.href = "jzj://shareTrue?json="+ jsonObj
    },

    // 聊天方法
    chat(){
      var jsonObj = JSON.stringify({
        chat_username:this.msg.username,
        nickname:"qqq"
      })
      console.log(jsonObj)
      window.location.href =  "jzj://login?json="+ jsonObj
      // window.location.href = "jzj://chat?json="+ jsonObj 
      console.log(window.location.href)
    }


  },
  created() {
    var that = this;
    // var test = window.location.search;
    // console.log(window.android);
    // console.log(this.$route.query);
    // test = test.substring(1, test.length - 1)
    // console.log(test)
    // this.sub();
    this.http
      .post(
        "http://192.168.0.162:8080/jzj-app/materials/selectMaterialsById.do",
        {
          materialsId: this.$route.query.materialsId,
          uuid: this.$route.query.uuid
        }
      )
      .then(res => {
         console.log(res);
        // console.log(res.result.materialsMessage);
        this.msg = res.result.materialsMessage;
        this.listimg = this.msg.list;
        
        // console.log(this.listimg);

        this.dataList = res.result.dataList;
        this.comments = res.result.comments;
        // console.log(res.result.dataList[0])
      });

    // 评论数据展示
    this.http
      .post("http://192.168.0.162:8080/jzj-app/other/addComment.do", {
        dataId: "8893f1b3194a4521a070e3fb5e43345d", //被评价的信息的 数据Id,
        promulgatorUuid: "uuuuuuuu", //当前用户uuid
        accepterUserUuid: "oooooooo", //被评价的用户的uuid 比如当前 车辆信息 的发布者的uuid
        commentContent: "",  //评论内容
        grade: 0, //如果是评论的信息,则是0,如果是回复的评论,则记录评论的id;是个大于0的数字
        dataUuid: "uuuuuuuu", //当前车辆信息中的uuid,
        objId:1

        // dataId:this.$route.query.dataId,
        // promulgatorUuid:this.$route.query.promulgatorUuid,
        // accepterUserUuid:this.$route.query.accepterUserUuid,
        // commentContent:this.$route.query.commentContent,
        // dataUuid:this.$route.query.dataUuid,
        //  grade: 0,

      })
      .then(res => {
        console.log(res);
        
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
.swiper-slide {
  height: 4.7rem;
  width: 100%;
  /* background: #000; */
}
.swiper-slide img {
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
  /* padding-top: 0.5rem; */
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
  color: #797979;
}
.hope .right img {
  width: 0.44rem;
  height: 0.44rem;
  vertical-align: middle;
  margin-right: 0.3rem;
}

.jybox {
  border-top: 10px solid #f5f8fc;
  width: 100%;
  line-height: 0.55rem;
  display: flex;
  margin: auto;
  justify-content: space-between;
}
.jybox .title {
  font-size: 0.24rem;
  color: #9b9c9c;
}
.jybox .content {
  color: #000;
  font-weight: bold;
}
.tradeType {
  padding-left: 0.3rem;
}
.type {
  padding-right: 0.3rem;
}
.money {
  color: #2f82ff;
}

.cailiao {
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
  font-weight: bold;
}

.icon {
  display: inline-block;
  height: 0.28rem;
  width: 0.05rem;
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
.user .del {
  float: right;
  color: #bd5667;
  font-size: 0.28rem;
}
.req span {
  color: #083e81;
}
.req .res {
  float: right;
  font-size: 0.28rem;
  color: #3e761e;
}
.est .main .req {
  padding-top: 0.3rem;
  padding-left: 0.7rem;
  line-height: 0.5rem;
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
  /* height: 2.9rem; */
   margin-bottom: 50px;
  /* border-bottom: 0.1rem solid #cdd9e9; */
}
.box-lf {
  float: left;
}
.box-lf img {
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
  /* margin-right: 2.15rem; */
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
  bottom: 0;
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
  margin-right: 0.1rem;
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
