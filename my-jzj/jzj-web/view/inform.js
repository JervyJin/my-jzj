


//定义求职详情页组件
var Inform = Vue.extend({
  template: '#tpl_inform',
  data: function () {
    return {
      value: '',
      picked: '',
      // 获取url的数据
      url: {},
      imgcode: []//
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



    changeRadio($event) {
      //  let picked = $event;
      console.log(this.picked)
    },

    changeInput($event) {
      // this.value = $event.target.value;
      // console.log(this.value)
    },





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
        $.ajax({
          type: "post",
          dataType: "json",
          contentType :'application/x-www-form-urlencoded; charset=UTF-8',
          url: "http://192.168.0.119:8080/jzj-app/person/insertInform.do",
          data: JSON.stringify({
            informer_uuid : _this.url.informer_uuid,//举报人的uuid
            reported_uuid : _this.url.reported_uuid,//被举报人的uuid: that.url.uuid,
            objId :_this.url.objId,
            pid :_this.url.pid,
            cause : _this.picked,// 举报原因
            explain : _this.value,// 举报说明，描述
            files : _this.imgcode// 图片上传

          }),






          // {
          //   informer_uuid: _this.url.informer_uuid,//举报人的uuid
          //   reported_uuid: _this.url.reported_uuid,//被举报人的uuid: that.url.uuid,
          //   cause: _this.picked,// 举报原因
          //   explain: _this.value,// 举报说明，描述
          //   files: _this.imgcode // 图片上传


          // }
          success: function (res) {
            console.log(res)
            // console.log('data')
          }

        })
      }
    }


  },
  created() {
    var that = this;
    this.sub()

  },
})











var data = {
  view: 'inform',

}
var app = new Vue({
  el: '#app',
  data: data,
  // 注册组件
  components: {
    inform: Inform,

  },
  methods: {


  }

})