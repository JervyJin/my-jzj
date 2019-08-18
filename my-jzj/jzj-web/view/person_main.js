// 定义组件
var Person = Vue.extend({
    template: '#tpl_person',
    data: function () {
        return {
            // 获取url的数据
            url: {},
            msg: 0
        }
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

   

    },

    created() {
        var that = this;

    },
})











var data = {
    view: 'person',

}
var app = new Vue({
    el: '#app',
    data: data,
    // 注册组件
    components: {
        person: Person,

    },
    methods: {


    }

})