


//定义求职详情页组件
var Home = Vue.extend({
    template: '#tpl_home',
    data: function () {
        return {
            photo: '',
            rests: '',
            type: '',
            work_age: '',
            age: '',
            education: '',
            address: '',
            expected_salary: '',
            job_description: '',
            certificate: '',
            uname: '',
            items: [],
            distance: '',
            browseNum: '',
            //    expected:'',
            // 获取url的数据
            url: {}
        }
    },
    methods: {
        // 分享方法
        jsSetApp() {
               console.log() 
            webCallLocal.jsSetApp(JSON.stringify({ type: 13, shareDesc: 121, shareLinkUrl: 555555, shareTitle: 151515 }));
            // webCallLocal.back();
            // this.back()

        },
        // 截取url
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

            // var Request = new Object();
            // Request = GetRequest()
        },

    
    },

    created() {
        var that = this;
        // var test = window.location.search;
        console.log((window.android))
        // test = test.substring(1, test.length - 1)
        // console.log(test)
        this.sub()
        // 发送请求
        $.ajax({
            type: "post",
            url: "http://192.168.0.66:8080/jzj-app/person/selectP_RByUuid.do?",
            data: {
                // switchover: that.url.switchover,
                // pid: that.url.pid,
                // uuid: that.url.uuid,
                // users_uuid: that.url.users_uuid,//用户本身的uuid

                switchover: 0,
                pid: "215f253aa0ba4ea4b042ff4da9269586",
                uuid: "4cb796b5ae0145e9b6c6ef105a08d993",

            },

            dataType: "json",
            success: function (res) {
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

                that.items = res.result.recommend
                console.log(that.items)
            }

        })

    },
})











var data = {
    view: 'home',

}
var app = new Vue({
    el: '#app',
    data: data,
    // 注册组件
    components: {
        home: Home,

    },
    methods: {


    }

})