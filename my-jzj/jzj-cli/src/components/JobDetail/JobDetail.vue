<template>
  <section class="home">
    <div class="top">
      <div class="back"></div>
      <span class="title">求职详11情</span>
      <div class="share">
        <span href="#">
          <img src="./img/get.png" class="img1" />
        </span>
        <span>
          <img @click="jsSetApp()" src="./img/share.png" class="img2" />
        </span>
      </div>
    </div>
    <div class="header">
      <img :src="photo" alt />
      <p class="name">{{uname}} {{rests}}</p>
      <p class="jdtype">{{type}}</p>
      <p class="age">
        <i>
          <img src="./img/time.png" alt />
          {{work_age}}
        </i>
        <i>
          <img src="./img/age.png" alt />
          {{age}}
        </i>
        <i>
          <img src="./img/edu.png" alt />
          {{education}}
        </i>
      </p>
    </div>
    <div
      class="line"
      style="width: 90%;height: 0.01rem; margin:auto;background:#eff3ff;margin-top:0.5rem;"
    ></div>
    <!-- 求职期望 -->
    <div class="hope clearfix">
      <div>
        <span class="icon"></span>
        <span class="title">求职期望</span>
      </div>
      <div class="left">
        <ul>
          <li>{{type}}</li>
          <li>{{address}}</li>
        </ul>
        <div class="pay">{{expected_salary}}</div>
      </div>
    </div>
    <div
      class="line"
      style="width: 90%;height: 0.01rem; margin:auto;background:#eff3ff;margin-bottom:0.5rem;"
    ></div>
    <!-- 工作经历 -->
    <div class="experience">
      <div>
        <span class="icon"></span>
        <span class="title">工作经历</span>
      </div>
      <div class="main">{{job_description}}</div>
    </div>
    <!-- 证明说明 -->
    <div class="prove">
      <div>
        <span class="icon"></span>
        <span class="title">证件说明</span>
      </div>
      <div class="main">{{certificate}}</div>
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
            <span class="pl">aaaa</span>
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
      <div class="list" v-for="(item,index) in items" :key="index">
        <div class="job">
          <b>【求职】 {{item.type}}</b>
          <span>{{item.expected_salary}}/月</span>
        </div>
        <div class="address">
          <span>{{item.address}}</span>
          <span>{{item.work_age}}</span>
        </div>
        <div class="user">
          <div class="userinfo">
            <img :src="photo" alt />
            <span>{{item.uname}}</span>
          </div>
          <div class="time clearfix">
            <span>{{item.distance}}</span>
            <div class="click">
              <span>浏览 {{item.browseNum}}</span>
              <i>
                <img src="./img/评论.png" alt />
                {{item.commentNum}}
              </i>
            </div>
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
          <img src="./img/写评价.png" alt />
        </p>
        <p>评论</p>
      </a>
      <div class="lianxi">
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
  data() {
    return {
      photo: "",
      rests: "",
      type: "",
      work_age: "",
      age: "",
      education: "",
      address: "",
      expected_salary: "",
      job_description: "",
      certificate: "",
      uname: "",
      items: [],
      distance: "",
      browseNum: "",
      //    expected:'',
      // 获取url的数据
      url: {}
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
    // 发送请求
    // $.ajax({
    //     type: "post",
    //     url: "http://192.168.0.66:8080/jzj-app/person/selectP_RByUuid.do?",
    //     data: {
    //         // switchover: that.url.switchover,
    //         // pid: that.url.pid,
    //         // uuid: that.url.uuid,
    //         // users_uuid: that.url.users_uuid,//用户本身的uuid

    //         switchover: 0,
    //         pid: "215f253aa0ba4ea4b042ff4da9269586",
    //         uuid: "4cb796b5ae0145e9b6c6ef105a08d993",
    //         users_uuid: 22223333,//用户本身的uuid

    //     },

    //     dataType: "json",
    //     success: function (res) {
    //         console.log(res);
    //         var base = res.result.base[0];
    //         that.uname = base.uname;
    //         that.rests = base.rests;
    //         that.photo = base.photo;
    //         that.type = base.type;
    //         that.work_age = base.work_age;
    //         that.age = base.age;
    //         that.education = base.education;
    //         that.address = base.address;
    //         that.expected_salary = base.expected_salary;
    //         that.job_description = base.job_description;
    //         that.certificate = base.certificate;

    //         that.items = res.result.recommend
    //         console.log(that.items)

    //     }

    // })

    this.http
      .post("http://192.168.0.66:8080/jzj-app/person/selectP_RByUuid.do?", {
        // switchover: 0,
        // pid: "215f253aa0ba4ea4b042ff4da9269586",
        // uuid: "4cb796b5ae0145e9b6c6ef105a08d993",
        // users_uuid: 22223333 //用户本身的uuid

        switchover: this.$route.query.switchover,
        pid: this.$route.query.pid,
        uuid: this.$route.query.uuid,
        users_uuid: this.$route.query.users_uuid,//用户本身的uuid
      })
      .then(res => {
        console.log(res);
        var base = res.result.base[0];
        that.uname = base.uname;
        that.rests = base.rests;
        that.photo = base.photo;
        that.type = base.type;
        that.work_age = base.work_age;
        that.age = base.age;
        that.education = base.education;
        that.address = base.address;
        that.expected_salary = base.expected_salary;
        that.job_description = base.job_description;
        that.certificate = base.certificate;

        that.items = res.result.recommend;
        console.log(that.items);
      });

    // 评论数据展示
    this.http
      .post("http://192.168.0.162:8080/jzj-app/other/addComment.do", {
        dataId: "515750804a8b489d866069f508dd4a80", //被评价的信息的 数据Id,
        promulgatorUuid: "uuuuuuuu", //当前用户uuid
        accepterUserUuid: "oooooooo", //被评价的用户的uuid 比如当前 车辆信息 的发布者的uuid
        commentContent: "", //评论内容
        grade: "", //如果是评论的信息,则是0,如果是回复的评论,则记录评论的id;是个大于0的数字
        dataUuid: "" //当前车辆信息中的uuid
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
  font-size: 0.12rem;
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
}

.header img {
  width: 1.2rem;
  height: 1.2rem;
  display: inline-block;
  border-radius: 50%;
  margin-top: 0.6rem;
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
  padding: 0.5rem 0.8rem 0.4rem 0;
}
.hope .title,
.experience .title,
.prove .title,
.est .title {
  font-size: 0.3rem;
  vertical-align: middle;
  margin-left: 0.2rem;
}
.hope .icon,
.experience .icon,
.prove .icon,
.est .icon {
  display: inline-block;
  vertical-align: middle;
  height: 0.28rem;
  width: 0.06rem;
  background: #2a84ff;
}
.hope .left {
  margin-left: 0.8rem;
}
.hope .left ul {
  float: left;
}
.hope .left ul li {
  line-height: 24px;
  font-size: 0.28rem;
}
.hope .left ul li:first-child {
  margin-top: 0.24rem;
  margin-bottom: 0.2rem;
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
.about-list .title {
  padding-left: 0.3rem;
  font-size: 0.34rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.6rem;
}
.about-list .list {
  padding: 0 0.3rem;
}
.about-list .list .job {
  display: flex;
  justify-content: space-between;
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
