webpackJsonp([4],{100:function(t,e,r){var n=r(79)("iterator"),o=!1;try{var a=[7][n]();a.return=function(){o=!0},Array.from(a,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var r=!1;try{var a=[7],i=a[n]();i.next=function(){return{done:r=!0}},a[n]=function(){return i},t(a)}catch(t){}return r}},101:function(t,e,r){var n=r(80),o=r(88).set,a=n.MutationObserver||n.WebKitMutationObserver,i=n.process,s=n.Promise,c="process"==r(86)(i);t.exports=function(){var t,e,r,u=function(){var n,o;for(c&&(n=i.domain)&&n.exit();t;){o=t.fn,t=t.next;try{o()}catch(n){throw t?r():e=void 0,n}}e=void 0,n&&n.enter()};if(c)r=function(){i.nextTick(u)};else if(a){var l=!0,d=document.createTextNode("");new a(u).observe(d,{characterData:!0}),r=function(){d.data=l=!l}}else if(s&&s.resolve){var f=s.resolve();r=function(){f.then(u)}}else r=function(){o.call(n,u)};return function(n){var o={fn:n,next:void 0};e&&(e.next=o),t||(t=o,r()),e=o}}},102:function(t,e,r){var n=r(107);t.exports=function(t,e,r){for(var o in e)r&&t[o]?t[o]=e[o]:n(t,o,e[o]);return t}},103:function(t,e,r){"use strict";var n=r(80),o=r(2),a=r(92),i=r(93),s=r(79)("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:n[t];i&&e&&!e[s]&&a.f(e,s,{configurable:!0,get:function(){return this}})}},104:function(t,e,r){var n=r(85),o=r(89),a=r(79)("species");t.exports=function(t,e){var r,i=n(t).constructor;return void 0===i||void 0==(r=n(i)[a])?e:o(r)}},105:function(t,e,r){var n=r(87),o=r(79)("iterator"),a=r(90);t.exports=r(2).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||a[n(t)]}},106:function(t,e,r){"use strict";var n,o,a,i=r(115),s=r(80),c=r(84),u=r(87),l=r(19),d=r(114),f=r(89),p=r(95),m=r(96),h=r(104),v=r(88).set,g=r(101)(),b="Promise",x=s.TypeError,y=s.process,_=s[b],w="process"==u(y=s.process),C=function(){},F=!!function(){try{var t=_.resolve(1),e=(t.constructor={})[r(79)("species")]=function(t){t(C,C)};return(w||"function"==typeof PromiseRejectionEvent)&&t.then(C)instanceof e}catch(t){}}(),I=function(t,e){return t===e||t===_&&e===a},k=function(t){var e;return!(!d(t)||"function"!=typeof(e=t.then))&&e},j=function(t){return I(_,t)?new T(t):new o(t)},T=o=function(t){var e,r;this.promise=new t(function(t,n){if(void 0!==e||void 0!==r)throw x("Bad Promise constructor");e=t,r=n}),this.resolve=f(e),this.reject=f(r)},L=function(t){try{t()}catch(t){return{error:t}}},D=function(t,e){if(!t._n){t._n=!0;var r=t._c;g(function(){for(var n=t._v,o=1==t._s,a=0,i=function(e){var r,a,i=o?e.ok:e.fail,s=e.resolve,c=e.reject,u=e.domain;try{i?(o||(2==t._h&&S(t),t._h=1),!0===i?r=n:(u&&u.enter(),r=i(n),u&&u.exit()),r===e.promise?c(x("Promise-chain cycle")):(a=k(r))?a.call(r,s,c):s(r)):c(n)}catch(t){c(t)}};r.length>a;)i(r[a++]);t._c=[],t._n=!1,e&&!t._h&&N(t)})}},N=function(t){v.call(s,function(){var e,r,n,o=t._v;if(M(t)&&(e=L(function(){w?y.emit("unhandledRejection",o,t):(r=s.onunhandledrejection)?r({promise:t,reason:o}):(n=s.console)&&n.error&&n.error("Unhandled promise rejection",o)}),t._h=w||M(t)?2:1),t._a=void 0,e)throw e.error})},M=function(t){if(1==t._h)return!1;for(var e,r=t._a||t._c,n=0;r.length>n;)if((e=r[n++]).fail||!M(e.promise))return!1;return!0},S=function(t){v.call(s,function(){var e;w?y.emit("rejectionHandled",t):(e=s.onrejectionhandled)&&e({promise:t,reason:t._v})})},P=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),D(e,!0))},U=function(t){var e,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw x("Promise can't be resolved itself");(e=k(t))?g(function(){var n={_w:r,_d:!1};try{e.call(t,c(U,n,1),c(P,n,1))}catch(t){P.call(n,t)}}):(r._v=t,r._s=1,D(r,!1))}catch(t){P.call({_w:r,_d:!1},t)}}};F||(_=function(t){p(this,_,b,"_h"),f(t),n.call(this);try{t(c(U,this,1),c(P,this,1))}catch(t){P.call(this,t)}},(n=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=r(102)(_.prototype,{then:function(t,e){var r=j(h(this,_));return r.ok="function"!=typeof t||t,r.fail="function"==typeof e&&e,r.domain=w?y.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&D(this,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),T=function(){var t=new n;this.promise=t,this.resolve=c(U,t,1),this.reject=c(P,t,1)}),l(l.G+l.W+l.F*!F,{Promise:_}),r(116)(_,b),r(103)(b),a=r(2)[b],l(l.S+l.F*!F,b,{reject:function(t){var e=j(this);return(0,e.reject)(t),e.promise}}),l(l.S+l.F*(i||!F),b,{resolve:function(t){if(t instanceof _&&I(t.constructor,this))return t;var e=j(this);return(0,e.resolve)(t),e.promise}}),l(l.S+l.F*!(F&&r(100)(function(t){_.all(t).catch(C)})),b,{all:function(t){var e=this,r=j(e),n=r.resolve,o=r.reject,a=L(function(){var r=[],a=0,i=1;m(t,!1,function(t){var s=a++,c=!1;r.push(void 0),i++,e.resolve(t).then(function(t){c||(c=!0,r[s]=t,--i||n(r))},o)}),--i||n(r)});return a&&o(a.error),r.promise},race:function(t){var e=this,r=j(e),n=r.reject,o=L(function(){m(t,!1,function(t){e.resolve(t).then(r.resolve,n)})});return o&&n(o.error),r.promise}})},107:function(t,e,r){t.exports=r(0)(10)},108:function(t,e,r){t.exports=r(0)(119)},109:function(t,e,r){t.exports=r(0)(130)},110:function(t,e,r){t.exports=r(0)(143)},111:function(t,e,r){t.exports=r(0)(146)},112:function(t,e,r){t.exports=r(0)(147)},113:function(t,e,r){t.exports=r(0)(151)},114:function(t,e,r){t.exports=r(0)(19)},115:function(t,e,r){t.exports=r(0)(28)},116:function(t,e,r){t.exports=r(0)(30)},117:function(t,e,r){t.exports=r(0)(55)},118:function(t,e,r){t.exports=r(0)(74)},119:function(t,e,r){"use strict";var n=function(t){return("0"+t).slice(-2)},o=function t(e){this.d=e instanceof t?function(t){return new Date(t.getTime())}(e.d):e?new Date(e):new Date};o.prototype={addMonths:function(t){var e=this.d;return this.d.setMonth(e.getMonth()+t),this},addDate:function(t){var e=this.d;return this.d.setDate(e.getDate()+t),this},format:function(t){t||(t="YYYY-MM-DD");var e=this.d;return t.replace("YYYY",e.getFullYear()).replace("MM",n(e.getMonth()+1)).replace("DD",n(e.getDate())).replace("d",e.getDay()).replace("HH",n(e.getHours())).replace("mm",n(e.getMinutes())).replace("ss",n(e.getSeconds()))},formats:function(t){t||(t="YYYY-MM-DD HH:mm:ss");var e=this.d;return t.replace("YYYY",e.getFullYear()).replace("MM",n(e.getMonth()+1)).replace("DD",n(e.getDate())).replace("d",e.getDay()).replace("HH",n(e.getHours())).replace("mm",n(e.getMinutes())).replace("ss",n(e.getSeconds()))},year:function(t){return t?(this.d.setYear(t),this):this.d.getFullYear()},month:function(t){return t?(this.d.setMonth(t),this):this.d.getMonth()},date:function(t){return t?(this.d.setDate(t),this):this.d.getDate()},day:function(){return this.d.getDay()}},e.a=function(t){return new o(t)}},120:function(t,e,r){t.exports={default:r(122),__esModule:!0}},121:function(t,e,r){var n=r(18)(r(128),r(131),function(t){r(130)},"data-v-791f223a",null);t.exports=n.exports},122:function(t,e,r){var n=r(2),o=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},123:function(t,e,r){var n=r(18)(r(124),r(127),function(t){r(126)},null,null);t.exports=n.exports},124:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},created:function(){},computed:{},methods:{}}},125:function(t,e,r){(t.exports=r(41)(!1)).push([t.i,".header_container{background-color:#eff2f7;height:60px;display:flex;justify-content:space-between;align-items:center;padding-left:20px}.avator{border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},126:function(t,e,r){var n=r(125);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(42)("ddadc514",n,!0)},127:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"header_container"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[t._v("首页")]),t._v(" "),t._l(t.$route.meta,function(e,n){return r("el-breadcrumb-item",{key:"index"},[t._v(t._s(e))])})],2)],1)},staticRenderFns:[]}},128:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["loadingShow"],data:function(){return{}},created:function(){},methods:{}}},129:function(t,e,r){(t.exports=r(41)(!1)).push([t.i,'.logo_loading[data-v-791f223a]{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2000;background-color:rgba(0,0,0,.8)}.logo_loading .bg[data-v-791f223a]{width:120px;height:120px;zoom:.5;border-radius:10px;margin:0 auto;top:35%;position:relative;background-color:#fff}.logo_loading .circle[data-v-791f223a]{position:absolute;width:100px;height:100px;left:8px;top:8px;right:0;background:url("http://static.apitops.com/openimages/princessbay/images/loading-circle.png") 50% no-repeat;background-size:100%;z-index:98;-webkit-animation:load-data-v-791f223a 1.4s infinite linear;animation:load-data-v-791f223a 1.4s infinite linear}@-webkit-keyframes load{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes load-data-v-791f223a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}',""])},130:function(t,e,r){var n=r(129);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(42)("1cb42750",n,!0)},131:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return this.loadingShow?e("div",{staticClass:"logo_loading",attrs:{id:"loading"}},[this._m(0)]):this._e()},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bg"},[e("div",{staticClass:"circle"})])}]}},136:function(t,e,r){"use strict";var n=r(83),o=r.n(n),a=r(81),i=(r(82),r(82)),s=a.a.nethost;e.a={getTypeList:function(){var t=s+"operation-goods/goods/getTypeList";return r.i(i.a)(t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},getStatusList:function(){var t=s+"operation-goods/goods/getStatusList";return r.i(i.a)(t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},getClassifyList:function(){var t=s+"operation-goods/goods/getClassifyList";return r.i(i.a)(t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},getTableList:function(t){var e=s+"operation-goods/goods/getGoodsList";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},getGoodsDetail:function(t){var e=s+"operation-goods/goods/getGoodsDetail?id="+t;return r.i(i.a)(e).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},addGoods:function(t){var e=s+"operation-goods/goods/addGoods";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},updateGoods:function(t){var e=s+"operation-goods/goods/updateGoods";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},updateStatus:function(t){var e=s+"operation-goods/goods/updateStatus";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},getBrandNameList:function(){var t=s+"voucher/voucherTemplateQuery/getBrandNameList";return r.i(i.b)(t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},getTemplateList:function(t){var e=s+"voucher/voucherTemplateQuery/queryVoucherTemplateList?brandName="+t;return r.i(i.a)(e).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})}}},137:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"UE",data:function(){return{editor:null}},props:{defaultMsg:{type:String},config:{type:Object},id:{type:String}},mounted:function(){var t=this;this.editor=UE.getEditor(this.id,this.config),this.editor.addListener("ready",function(){t.editor.setContent(t.defaultMsg)}),console.log("上传这堆错误不用理会，上传接口需自行开发配置")},methods:{getUEContent:function(){return this.editor.getContent()},getUEContentTxt:function(){return this.editor.getContentTxt()}},destroyed:function(){this.editor.destroy()}}},141:function(t,e,r){var n=r(18)(r(137),r(142),null,null,null);t.exports=n.exports},142:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("script",{attrs:{id:this.id,type:"text/plain"}})])},staticRenderFns:[]}},181:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(120),o=r.n(n),a=r(136),i=r(81),s=(r(119),r(121)),c=r.n(s),u=r(123),l=(r.n(u),r(141)),d=r.n(l);e.default={data:function(){return{loadingShow:!1,ue1:"ue1",tags:[],tableData:[],goodsList:[{typeId:"",typeName:""}],typeList:[{classifyId:1,classifyName:"商品1"}],shopName:"",remainCount:0,number:0,couponAmount:"",ruleForm:{classify:"",label:"",thirdId:"",thirdUrl:"",name:"",type:"",originalPrice:"",discountPrice:"",pictUrl:"",description:"",remainCount:"",returnCouponAmount:"",smallImages:[]},headers:{UserToken:""},uploadimgUrl:i.a.netImg+"prefer/api/fileUploadOne",merchantList:[],rules:{name:[{required:!0,message:"请输入商品名字",trigger:"blur"},{min:1,max:30,message:"长度在 1 到 10 个字符",trigger:"blur"}],type:[{required:!0,message:"请输入商品类型",trigger:"change"}],description:[{required:!0,message:"请输入描述内容",trigger:"blur"}],remainCount:[{required:!0,message:"请输入库存",trigger:"blur"}],originalPrice:[{required:!0,message:"请输入商品原价",trigger:"blur"}],discountPrice:[{required:!0,message:"请输入商品折扣价",trigger:"blur"}],smallImages:[{required:!0,message:"商品封面图片组合"}],pictUrl:[{required:!0,message:"商品封面图片"}]}}},created:function(){},components:{AppLoading:c.a,UE:d.a},methods:{getTypeList:function(){var t=this;a.a.getTypeList().then(function(e){t.goodsList=e.data},function(t){console.log(t.Message||"服务器连接失败！3")})},getClassifyList:function(){var t=this;a.a.getClassifyList().then(function(e){console.log(e.data),t.typeList=JSON.parse(o()(e.data))},function(t){console.log(t.Message||"服务器连接失败！3")})},handleDelete:function(t){var e=this;this.$confirm("是否删除图片?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.ruleForm.smallImages.splice(t,1)}).catch(function(){e.$message({type:"info",message:"已撤销"})})},handleCoverDelete:function(){var t=this;this.$confirm("是否删除图片?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.ruleForm.pictUrl=""}).catch(function(){t.$message({type:"info",message:"已撤销"})})},handleClose:function(t){this.tags.splice(this.tags.indexOf(t),1),this.remainCount=0,this.number=0},handleAddShop:function(t,e,r,n){var o=this,a=!0;if(console.log(this.tags),this.tags.forEach(function(e){e.templateId==t&&(a=!1,o.number=e.remainCount)}),a&&(this.number=0),e>0&&this.number<e){this.remainCount=e-1,this.number=this.number+1;var i={templateId:t,voucherName:r,remainCount:this.number,templateType:n};a?(this.number=1,i={templateId:t,voucherName:r,remainCount:this.number,templateType:n},this.tags.push(i)):this.tags.forEach(function(e){e.templateId==t&&(e.remainCount=o.number)})}},handleShop:function(){this.number=0,this.getTemplateList()},submitForm:function(t){var e=this;console.log(23112313123),this.ruleForm.description=this.editor.txt.html(),this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;var r=JSON.parse(o()(e.ruleForm));r.templateList=[],e.tags.forEach(function(t){var n={templateId:t.templateId,amount:t.remainCount,templateType:t.templateType,couponAmount:e.couponAmount};r.templateList.push(n)}),a.a.addGoods(r).then(function(t){e.$message({message:"保存成功",type:"success"});e.$router.push("./goodsList")},function(t){e.$message.error(t.sub_msg||"连接服务器失败!")})})},initEditor:function(){var t=new(0,window.wangEditor)("#editor");this.editor=t,this.editor.customConfig.uploadImgServer=i.a.netImg+"prefer/api/fileUploadOne",this.editor.customConfig.withCredentials=!0,this.editor.customConfig.uploadFileName="file",this.editor.customConfig.uploadImgParams={},this.editor.customConfig.linkImgCallback=function(e){console.log(result);result.data;t.cmd.do("insertHTML",'<img src="http://'+result.data+'" style="max-width:100%;"/>')},this.editor.customConfig.uploadImgHooks={before:function(t,e,r){var n=r[0].size/1024/1024<10,o=r[0].type.indexOf("image")>-1;return o||this.$message.error("只能上传图片!"),n||this.$message.error("上传文件不能超过 10MB!"),n&&o},success:function(t,e,r){r.data;e.cmd.do("insertHTML",'<img src="http://'+r.data+'" style="max-width:100%;"/>')},fail:function(t,e,r){},error:function(t,e){},timeout:function(t,e){},customInsert:function(t,e,r){}},t.create()},handleAvatarSuccess:function(t,e){var r="http://"+t.data;this.ruleForm.smallImages.push(r)},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type||"image/jpg",r=t.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&r},handleCoverSuccess:function(t,e){this.ruleForm.pictUrl="http://"+t.data},getBrandNameList:function(){var t=this;a.a.getBrandNameList().then(function(e){t.merchantList=e.data},function(e){t.$message.error("请求服务器连接失败!")})},getTemplateList:function(){var t=this;a.a.getTemplateList(this.shopName).then(function(e){t.tableData=e.data},function(e){t.$message.error("请求服务器连接失败!")})}},mounted:function(){var t=this;this.$nextTick(function(){t.initEditor()}),this.getTypeList(),this.getBrandNameList(),this.getClassifyList()},computed:{},watch:{loadingShow:function(t){return t}}}},243:function(t,e,r){(t.exports=r(41)(!1)).push([t.i,".avatar-uploader-icon{font-size:28px;color:#8c939d;width:120px;height:120px;line-height:120px;text-align:center}.avatar{width:120px;height:120px;display:block;margin:10px 10px 0 0}.header-banner{position:relative}.deletImg{position:absolute;width:100%;height:100%;left:0;top:0;cursor:default;text-align:center;color:#fff;opacity:0;font-size:20px;background-color:rgba(0,0,0,.5);transition:opacity .3s}.deletImg:hover{opacity:1}.deletImg2{position:absolute;top:40%;left:45%}",""])},244:function(t,e,r){(t.exports=r(41)(!1)).push([t.i,'.bgcolor[data-v-73707860]{color:#999!important}#editor[data-v-73707860]{width:800px}.comm-dis[data-v-73707860]{display:flex}.add-goods .quan[data-v-73707860]{margin:-10px 0 0 120px;line-height:32px;color:#595e66}.add-goods .quan[data-v-73707860]:after{content:" ";display:block;height:0;clear:both}.add-goods .tips[data-v-73707860]{margin:0 0 10px 200px;color:#f56c6c;font-size:12px}.add-goods .commodityList[data-v-73707860]{width:500px;margin:0 0 20px 200px}.add-goods .table[data-v-73707860]{margin:20px 30px 10px 0;width:500px}.add-goods .detail-content[data-v-73707860]{cursor:pointer;color:#20a0ff}',""])},307:function(t,e,r){var n=r(243);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(42)("2671cf7a",n,!0)},308:function(t,e,r){var n=r(244);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(42)("334f0e54",n,!0)},365:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"add-goods"},[r("div",{staticClass:"pl20px pt30 pr20"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"200px"}},[r("el-form-item",{attrs:{label:"商品名称",prop:"name"}},[r("el-input",{staticClass:"w200",attrs:{placeholder:"商品名称",maxlength:30},model:{value:t.ruleForm.name,callback:function(e){t.$set(t.ruleForm,"name",e)},expression:"ruleForm.name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"商品描述:",required:"",prop:"description"}},[r("div",{staticClass:"components-container"},[r("div",{staticClass:"editor-container"},[r("div",{attrs:{id:"editor"}})])])]),t._v(" "),r("el-form-item",{attrs:{label:"商品详情列表图",required:"",prop:"smallImages"}},[r("div",{staticClass:"comm-dis"},[t._l(t.ruleForm.smallImages,function(e,n){return r("div",{key:n,staticClass:"header-banner"},[e?r("img",{staticClass:"avatar",attrs:{src:e}}):t._e(),t._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:t.ruleForm.smallImages,expression:"ruleForm.smallImages"}],staticClass:"deletImg"},[r("span",{staticClass:"deletImg2",on:{click:function(e){t.handleDelete(n)}}},[r("i",{staticClass:"el-icon-delete"})])])])}),t._v(" "),r("div",[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadimgUrl,"show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],2)]),t._v(" "),r("el-form-item",{attrs:{label:"商品封面图片",required:"",prop:"pictUrl"}},[r("div",{staticClass:"comm-dis"},[r("div",{staticClass:"header-banner"},[t.ruleForm.pictUrl?r("img",{staticClass:"avatar",attrs:{src:t.ruleForm.pictUrl}}):t._e(),t._v(" "),r("span",{staticClass:"deletImg"},[r("span",{staticClass:"deletImg2",on:{click:t.handleCoverDelete}},[r("i",{staticClass:"el-icon-delete"})])])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.ruleForm.pictUrl,expression:"!ruleForm.pictUrl"}]},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadimgUrl,"show-file-list":!1,"on-success":t.handleCoverSuccess,"before-upload":t.beforeAvatarUpload}},[r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)])]),t._v(" "),r("el-form-item",{attrs:{label:"商品类型",required:"",prop:"type"}},[r("el-select",{staticClass:"w200",attrs:{clearable:"",filterable:"",placeholder:"组合券"},model:{value:t.ruleForm.type,callback:function(e){t.$set(t.ruleForm,"type",e)},expression:"ruleForm.type"}},t._l(t.goodsList,function(t){return r("el-option",{key:t.typeId,attrs:{label:t.typeName,value:t.typeId}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"商品标签"}},[r("el-input",{staticClass:"w200",attrs:{placeholder:"商品标签"},model:{value:t.ruleForm.label,callback:function(e){t.$set(t.ruleForm,"label",e)},expression:"ruleForm.label"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"商品分类"}},[r("el-select",{staticClass:"w200",attrs:{clearable:"",filterable:"",placeholder:"商品分类"},model:{value:t.ruleForm.classify,callback:function(e){t.$set(t.ruleForm,"classify",e)},expression:"ruleForm.classify"}},t._l(t.typeList,function(t){return r("el-option",{key:t.classifyId,attrs:{label:t.classifyName,value:t.classifyId}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"商品原价",prop:"originalPrice"}},[r("el-input",{staticClass:"w200",attrs:{type:"number",placeholder:"商品价格"},model:{value:t.ruleForm.originalPrice,callback:function(e){t.$set(t.ruleForm,"originalPrice",e)},expression:"ruleForm.originalPrice"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"商品折扣价",prop:"discountPrice"}},[r("el-input",{staticClass:"w200",attrs:{type:"number",placeholder:"商品价格"},model:{value:t.ruleForm.discountPrice,callback:function(e){t.$set(t.ruleForm,"discountPrice",e)},expression:"ruleForm.discountPrice"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"商品库存",prop:"remainCount"}},[r("el-input",{staticClass:"w200",attrs:{type:"number",placeholder:"商品库存"},model:{value:t.ruleForm.remainCount,callback:function(e){t.$set(t.ruleForm,"remainCount",e)},expression:"ruleForm.remainCount"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"外部商品ID"}},[r("el-input",{staticClass:"w200",attrs:{placeholder:"外部商品ID"},model:{value:t.ruleForm.thirdId,callback:function(e){t.$set(t.ruleForm,"thirdId",e)},expression:"ruleForm.thirdId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"外部商品链接"}},[r("el-input",{staticClass:"w200",attrs:{placeholder:"外部商品链接"},model:{value:t.ruleForm.thirdUrl,callback:function(e){t.$set(t.ruleForm,"thirdUrl",e)},expression:"ruleForm.thirdUrl"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"商户名称"}},[r("el-select",{staticClass:"w200",attrs:{filterable:"",placeholder:"请选择商户名称"},on:{change:t.handleShop},model:{value:t.shopName,callback:function(e){t.shopName=e},expression:"shopName"}},t._l(t.merchantList,function(t,e){return r("el-option",{key:e,attrs:{label:t,value:t}})})),t._v(" "),r("el-table",{staticClass:"table mt10",attrs:{data:t.tableData}},[r("el-table-column",{attrs:{prop:"templateId",label:"优惠券id","min-width":"50",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"voucherName",label:"优惠券名称","min-width":"80",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"remainCount",label:"数量","min-width":"50",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{label:"操作","min-width":"50",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){t.handleAddShop(e.row.templateId,e.row.remainCount,e.row.voucherName,e.row.templateType)}}},[t._v("添加")])]}}])})],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"商品组合"}},t._l(t.tags,function(e,n){return r("el-tag",{key:e.name,staticClass:"mr10 mb10",attrs:{closable:""},on:{close:function(r){t.handleClose(e)}}},[r("span",[t._v(t._s(e.voucherName))]),t._v(" "),r("span",[t._v("*"+t._s(e.remainCount))])])})),t._v(" "),r("el-form-item",{attrs:{label:"红包面额"}},[r("el-input",{staticClass:"w200",attrs:{type:"number",placeholder:"红包面额"},model:{value:t.couponAmount,callback:function(e){t.couponAmount=e},expression:"couponAmount"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"返红包金额(单位分)"}},[r("el-input",{staticClass:"w200",attrs:{type:"number",placeholder:"返红包金额"},model:{value:t.ruleForm.returnCouponAmount,callback:function(e){t.$set(t.ruleForm,"returnCouponAmount",e)},expression:"ruleForm.returnCouponAmount"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("立即创建")])],1)],1)],1),t._v(" "),r("app-loading",{attrs:{loadingShow:t.loadingShow}})],1)},staticRenderFns:[]}},72:function(t,e,r){var n=r(18)(r(181),r(365),function(t){r(307),r(308)},"data-v-73707860",null);t.exports=n.exports},79:function(t,e,r){t.exports=r(0)(12)},80:function(t,e,r){t.exports=r(0)(5)},81:function(t,e,r){"use strict";var n={};n.netImg="http://operation.allcitygo.com/",n.nethost="https://bmapi.allcitygo.com:13002/op/",e.a=n},82:function(t,e,r){"use strict";r.d(e,"b",function(){return p}),r.d(e,"a",function(){return m});var n=r(108),o=r.n(n),a=r(83),i=r.n(a),s=r(118),c=r.n(s),u=(r(81),r(3));r.n(u),r(91),window.sessionStorage.getItem("ak")||window.localStorage.getItem("ak");window.Promise||(window.Promise=i.a);var l=function(t){var e=t.data;return e.code,0===e.code?e:2e4==e.code?e:302!==e.code&&(5===e.code&&u.Message.error("系统维护中，请稍后再试。"),i.a.reject(t.data,t))},d=function(t){return i.a.reject(t.response.data||{},t.response)},f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.data,r=void 0===e?{}:e,n=t.params,a=void 0===n?{}:n,i=t.method,s=void 0===i?"":i,u=t.url,f=void 0===u?"":u,p=t.headers,m=void 0===p?{}:p,h={method:s,url:f,data:r,params:a,responseType:"json",withCredentials:!0};return h.headers={"Content-Type":"application/json; charset=UTF-8",access_token:function(){for(var t=(document.cookie||"x-access-token=5C832D5723B675A760DB5B7A6B901229").split("; "),e=0;e<t.length;e++){var r=t[e].split("=");if("x-access-token"==r[0])return r[1]}}()},o()(h.headers,m),o()(h.params,{_:(new Date).getTime()}),c()(h).then(l,d)},p=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return f({url:t,method:"GET",params:e,headers:r})},m=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return f({url:t,method:"POST",data:e,headers:r})}},83:function(t,e,r){t.exports={default:r(94),__esModule:!0}},84:function(t,e,r){t.exports=r(0)(128)},85:function(t,e,r){t.exports=r(0)(17)},86:function(t,e,r){t.exports=r(0)(54)},87:function(t,e,r){var n=r(86),o=r(79)("toStringTag"),a="Arguments"==n(function(){return arguments}());t.exports=function(t){var e,r,i;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?r:a?n(e):"Object"==(i=n(e))&&"function"==typeof e.callee?"Arguments":i}},88:function(t,e,r){var n,o,a,i=r(84),s=r(97),c=r(109),u=r(117),l=r(80),d=l.process,f=l.setImmediate,p=l.clearImmediate,m=l.MessageChannel,h=0,v={},g="onreadystatechange",b=function(){var t=+this;if(v.hasOwnProperty(t)){var e=v[t];delete v[t],e()}},x=function(t){b.call(t.data)};f&&p||(f=function(t){for(var e=[],r=1;arguments.length>r;)e.push(arguments[r++]);return v[++h]=function(){s("function"==typeof t?t:Function(t),e)},n(h),h},p=function(t){delete v[t]},"process"==r(86)(d)?n=function(t){d.nextTick(i(b,t,1))}:m?(a=(o=new m).port2,o.port1.onmessage=x,n=i(a.postMessage,a,1)):l.addEventListener&&"function"==typeof postMessage&&!l.importScripts?(n=function(t){l.postMessage(t+"","*")},l.addEventListener("message",x,!1)):n=g in u("script")?function(t){c.appendChild(u("script"))[g]=function(){c.removeChild(this),b.call(t)}}:function(t){setTimeout(i(b,t,1),0)}),t.exports={set:f,clear:p}},89:function(t,e,r){t.exports=r(0)(125)},90:function(t,e,r){t.exports=r(0)(27)},91:function(t,e,r){"use strict";var n=r(83),o=r.n(n),a=r(81),i=(r(82),r(82)),s=a.a.nethost;e.a={getDetail:function(t){var e=s+"prefer/icons/manage";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t.data||t)},function(t){return o.a.reject(t.data||t)})},getFavorites:function(){var t=s+"prefer/tbk/getFavorites";return r.i(i.a)(t).then(function(t){return o.a.resolve(t.data||t)},function(t){return o.a.reject(t.data||t)})},updateDetail:function(t){var e=s+"prefer/icons/manage/update";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t.data||t)},function(t){return o.a.reject(t.data||t)})},getBaseDetail:function(){var t=s+"prefer/hzCard/icons";return r.i(i.a)(t).then(function(t){return o.a.resolve(t.data||t)},function(t){return o.a.reject(t.data||t)})},upBaseDateDetail:function(t){var e=s+"prefer/hzCard/update";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t.data||t)},function(t){return o.a.reject(t.data||t)})},deleteDetail:function(t){var e=s+"prefer/secondIcon/delete?secondIconId="+t;return r.i(i.a)(e).then(function(t){return o.a.resolve(t.data||t)},function(t){return o.a.reject(t.data||t)})},getSecondeInfor:function(t){var e=s+"prefer/secondIcon/get?parentIconId="+t;return r.i(i.a)(e).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t.data||t)})},addNotice:function(t){var e=s+"prefer/notice/addNotice";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},deleteNotice:function(t){var e=s+"prefer/notice/deleteNotice?noticeId="+t;return r.i(i.a)(e).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},getNoticeByParam:function(t){var e=s+"prefer/notice/getNoticeByParam";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},updateNotice:function(t){var e=s+"prefer/notice/addNotice";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},addBus:function(t){var e=s+"prefer/icon/addNew";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},deleteBus:function(t){var e=s+"prefer/icon/delete?iconId="+t;return r.i(i.a)(e).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},getByParamBus:function(t){var e=s+"prefer/icon/getByParam";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})},updateBus:function(t){var e=s+"prefer/icon/update";return r.i(i.a)(e,t).then(function(t){return o.a.resolve(t)},function(t){return o.a.reject(t)})}}},92:function(t,e,r){t.exports=r(0)(11)},93:function(t,e,r){t.exports=r(0)(9)},94:function(t,e,r){r(111),r(112),r(113),r(106),t.exports=r(2).Promise},95:function(t,e){t.exports=function(t,e,r,n){if(!(t instanceof e)||void 0!==n&&n in t)throw TypeError(r+": incorrect invocation!");return t}},96:function(t,e,r){var n=r(84),o=r(99),a=r(98),i=r(85),s=r(110),c=r(105),u={},l={};(e=t.exports=function(t,e,r,d,f){var p,m,h,v,g=f?function(){return t}:c(t),b=n(r,d,e?2:1),x=0;if("function"!=typeof g)throw TypeError(t+" is not iterable!");if(a(g)){for(p=s(t.length);p>x;x++)if((v=e?b(i(m=t[x])[0],m[1]):b(t[x]))===u||v===l)return v}else for(h=g.call(t);!(m=h.next()).done;)if((v=o(h,b,m.value,e))===u||v===l)return v}).BREAK=u,e.RETURN=l},97:function(t,e){t.exports=function(t,e,r){var n=void 0===r;switch(e.length){case 0:return n?t():t.call(r);case 1:return n?t(e[0]):t.call(r,e[0]);case 2:return n?t(e[0],e[1]):t.call(r,e[0],e[1]);case 3:return n?t(e[0],e[1],e[2]):t.call(r,e[0],e[1],e[2]);case 4:return n?t(e[0],e[1],e[2],e[3]):t.call(r,e[0],e[1],e[2],e[3])}return t.apply(r,e)}},98:function(t,e,r){var n=r(90),o=r(79)("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(n.Array===t||a[o]===t)}},99:function(t,e,r){var n=r(85);t.exports=function(t,e,r,o){try{return o?e(n(r)[0],r[1]):e(r)}catch(e){var a=t.return;throw void 0!==a&&n(a.call(t)),e}}}});