(function(t){function e(e){for(var n,o,r=e[0],c=e[1],l=e[2],d=0,p=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],n=!0,r=1;r<i.length;r++){var c=i[r];0!==a[c]&&(n=!1)}n&&(s.splice(e--,1),t=o(o.s=i[0]))}return t}var n={},a={app:0},s=[];function o(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=n,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;s.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"050e":function(t,e,i){},1328:function(t,e,i){},"27e2":function(t,e,i){},3369:function(t,e,i){t.exports=i.p+"img/signal.dc6033a2.jpg"},"4dfe":function(t,e,i){},"4fbf":function(t,e,i){"use strict";i("27e2")},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("home")],1)},s=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("div",{staticClass:"control"},[i("div",{staticClass:"row"},[i("aw-button-group",{staticClass:"flex",staticStyle:{width:"33%"}},[i("aw-button",{attrs:{size:"mini"},on:{click:t.uploadImg}},[t._v("上传图片")]),i("aw-button",{attrs:{type:t.genCanBtnStatus?"danger":"success",size:"mini"},on:{click:t.generateCanvas}},[t._v("生成画布")]),i("aw-button",{attrs:{size:"mini"},on:{click:t.downloadImg}},[t._v("下载图片")])],1),i("input",{ref:"upload",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:t.getUploadedImg}}),i("aw-button-group",{staticStyle:{width:"33%","margin-left":"0"}},[i("span",{staticClass:"label"},[t._v("生成图片格式")]),t._l(t.imgType,(function(e){return i("aw-button",{key:e.id,attrs:{id:e.category,disabled:!e.disabled,size:"mini"},on:{click:function(e){return t.changeType(e)}}},[t._v(t._s(e.typeName))])}))],2),i("div",[i("span",{staticClass:"label"},[t._v("连续点")]),t._l(t.continuationType,(function(e){return i("aw-button",{key:e.id,attrs:{id:e.category,disabled:!e.disabled,size:"mini"},on:{click:function(e){return t.changeContinuity(e)}}},[t._v(t._s(e.typeName))])}))],2)],1),i("div",{staticClass:"row"},[i("div",{staticStyle:{width:"33%"}},[i("span",{staticClass:"label"},[t._v("画布尺寸")]),i("aw-input",{attrs:{size:"mini"},model:{value:t.options.width,callback:function(e){t.$set(t.options,"width",e)},expression:"options.width"}}),i("span",{staticClass:"timessign"},[t._v(" * ")]),i("aw-input",{attrs:{size:"mini"},model:{value:t.options.height,callback:function(e){t.$set(t.options,"height",e)},expression:"options.height"}})],1),i("div",{staticStyle:{width:"33%"}},[i("span",{staticClass:"label"},[t._v("图片尺寸")]),i("aw-input",{attrs:{size:"mini"},model:{value:t.options.imgWidth,callback:function(e){t.$set(t.options,"imgWidth",e)},expression:"options.imgWidth"}}),i("span",{staticClass:"timessign"},[t._v(" * ")]),i("aw-input",{attrs:{size:"mini"},model:{value:t.options.imgHeight,callback:function(e){t.$set(t.options,"imgHeight",e)},expression:"options.imgHeight"}})],1),i("div",[i("span",{staticClass:"label"},[t._v("图片位置")]),i("aw-input",{attrs:{size:"mini"},model:{value:t.options.top,callback:function(e){t.$set(t.options,"top",e)},expression:"options.top"}}),i("aw-input",{attrs:{size:"mini"},model:{value:t.options.left,callback:function(e){t.$set(t.options,"left",e)},expression:"options.left"}})],1)]),i("div",{staticClass:"row"},[i("div",{staticStyle:{width:"33%"}},[i("span",{staticClass:"label"},[t._v("圆点半径")]),i("aw-input",{attrs:{size:"mini"},model:{value:t.options.radius,callback:function(e){t.$set(t.options,"radius",e)},expression:"options.radius"}})],1),i("div",{staticStyle:{width:"33%"}},[i("span",{staticClass:"label"},[t._v("圆点填充颜色")]),i("aw-input",{staticClass:"large_input",attrs:{size:"mini"},model:{value:t.options.color,callback:function(e){t.$set(t.options,"color",e)},expression:"options.color"}})],1),i("div",[i("span",{staticClass:"label"},[t._v("圆点边框颜色")]),i("aw-input",{staticClass:"large_input",attrs:{size:"mini"},model:{value:t.options.frameColor,callback:function(e){t.$set(t.options,"frameColor",e)},expression:"options.frameColor"}})],1)]),i("div",{staticClass:"tip"},[t._v("调整属性后需要重新生成画布才能生效，生成画布按钮为红色时需要点击重新生成画布！建议：为了保证生成的图片没有透明区域，请配置图片尺寸与画布尺寸一致。")])]),i("div",{staticClass:"imgarea"},t._l(t.num,(function(e,n){return i("div",{key:n},[i("div",{staticClass:"imgarea_tip"},[t._v("操作区域：")]),i("point",{attrs:{id:"point",width:t.generateOptions.width,height:t.generateOptions.height,imgSrc:t.generateOptions.imgSrc,imgWidth:t.generateOptions.imgWidth,imgHeight:t.generateOptions.imgHeight,top:t.generateOptions.top,left:t.generateOptions.left,radius:t.generateOptions.radius,color:t.generateOptions.color,frameColor:t.generateOptions.frameColor,continuation:t.generateOptions.continuation,imgType:t.generateOptions.imgTypeActive},on:{getGeneratedImg:function(e){return t.getGeneratedImg(e,n)}}}),i("div",{staticClass:"imgarea_tip"},[t._v("生成的图像：")]),i("div",{staticClass:"imgarea_main"},[i("img",{attrs:{src:t.src[n].src,alt:"",title:"点击选择进行下载"}}),i("div",{staticClass:"shade",on:{click:function(e){return t.selectImg(e,n)}}})])],1)})),0)])},r=[],c=(i("159b"),i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),i("99af"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"aw_button",class:[t.type?"aw_button_"+t.type:"",t.size?"aw_button_"+t.size:"",{"is-disabled":t.disabled,"is-loading":t.loading,"is-round":t.round}],attrs:{disabled:t.disabled||t.loading,type:t.nativeType},on:{click:t.handleClick}},[t.loading?i("svg",{staticClass:"icon",attrs:{t:"1622014217552",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4247",width:"15",height:"15"}},[i("path",{attrs:{d:"M533.712538 101.851631c13.248955-7.183654 30.638839-1.148579 38.658739 13.420235l73.095947 132.862338c8.060201 14.558738 3.737918 32.351632-9.511037 39.535285s-30.648914 1.148579-38.658739-13.420234l-73.106023-132.862338c-8.009825-14.558738-3.727843-32.351632 9.521113-39.535286z",fill:"#fff","p-id":"4248"}}),i("path",{attrs:{d:"M700.347117 10.388501c-8.956898-12.090301-27.26363-13.883696-40.673789-4.030101L536.815715 96.350544c-13.410159 9.82337-17.047325 27.727091-8.060201 39.787167s27.273705 13.883696 40.683864 4.030101L692.266766 50.175668c13.410159-9.82337 17.047325-27.727091 8.080351-39.787167zM485.804718 922.148359c-13.248955 7.183654-30.648914 1.148579-38.658739-13.420235l-73.106022-132.862338c-8.009825-14.558738-3.727843-32.351632 9.521112-39.535285s30.648914-1.148579 38.658739 13.420234l73.106023 132.862338c8.009825 14.558738 3.727843 32.351632-9.521113 39.535286z",fill:"#fff","p-id":"4249"}}),i("path",{attrs:{d:"M319.160063 1013.611489c8.966974 12.090301 27.273705 13.883696 40.683865 4.030101l122.857613-89.982069c13.410159-9.82337 17.047325-27.727091 8.060201-39.787167s-27.273705-13.883696-40.683865-4.0301L327.25049 973.824322c-13.410159 9.82337-17.017099 27.727091-8.090427 39.787167z",fill:"#fff","p-id":"4250"}}),i("path",{attrs:{d:"M462.470436 928.485692a32.381857 32.381857 0 0 1-4.0301-0.251882A424.168076 424.168076 0 0 1 195.063194 790.112192a418.878569 418.878569 0 0 1-39.404307-507.520629 423.744915 423.744915 0 0 1 174.825759-152.488927 32.240804 32.240804 0 0 1 27.49536 58.325629 359.333834 359.333834 0 0 0-148.247246 129.305774 354.366735 354.366735 0 0 0 33.389382 429.387056A359.756995 359.756995 0 0 0 466.399784 864.255965a32.240804 32.240804 0 0 1-3.969649 64.229727zM660.852133 902.511694a32.240804 32.240804 0 0 1-12.191054-62.103848 358.678943 358.678943 0 0 0 160.408074-129.164721 354.376811 354.376811 0 0 0-31.29373-440.590735 359.36406 359.36406 0 0 0-229.927308-114.777262 32.243826 32.243826 0 0 1 6.297032-64.17935 423.785216 423.785216 0 0 1 271.135085 135.371075 418.868494 418.868494 0 0 1 36.915721 520.719208A423.029572 423.029572 0 0 1 673.033111 900.103709a32.109826 32.109826 0 0 1-12.180978 2.407985z",fill:"#fff","p-id":"4251"}})]):t._e(),i("span",{class:{text:t.loading}},[t._t("default")],2)])}),l=[],u={name:"awButton",props:{type:String,size:String,loading:Boolean,disabled:{type:Boolean,default:!1},round:{type:Boolean,default:!1},nativeType:{type:String,default:"button"}},data:function(){return{}},created:function(){},methods:{handleClick:function(t){this.$emit("click",t)}}},d=u,p=(i("7aa4"),i("2877")),f=Object(p["a"])(d,c,l,!1,null,null,null),g=f.exports,h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"aw_button_group"},[t._t("default")],2)},m=[],v={name:"awButtonGroup"},b=v,y=(i("4fbf"),Object(p["a"])(b,h,m,!1,null,"8a72585c",null)),w=y.exports,C=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"aw_input",class:[t.size?"aw_input_"+t.size:"",{"is-disabled":t.disabled}],on:{mouseenter:function(e){t.hovering=!0},mouseleave:function(e){t.hovering=!1}}},[i("input",{ref:"input",staticClass:"aw_input_inner",attrs:{autocomplete:"off",placeholder:t.placeholder,disabled:t.disabled,readonly:t.readonly,"aria-label":t.label},on:{compositionstart:t.handleCompositionStart,compositionupdate:t.handleCompositionUpdate,compositionend:t.handleCompositionEnd,input:t.handleInput,focus:t.handleFocus,blur:t.handleBlur,change:t.handleChange}})])},_=[],S=(i("a9e3"),{name:"awInput",inheritAttrs:!1,props:{value:[String,Number],size:String,disabled:Boolean,readonly:Boolean,label:String,placeholder:{type:String,default:"请输入"}},data:function(){return{hovering:!1,focused:!1,isComposing:!1,passwordVisible:!1}},mounted:function(){this.setNativeInputValue()},computed:{nativeInputValue:function(){return null===this.value||void 0===this.value?"":String(this.value)}},watch:{nativeInputValue:function(){this.setNativeInputValue()}},methods:{getInput:function(){return this.$refs.input},focus:function(){this.getInput().focus()},blur:function(){this.getInput().blur()},handleBlur:function(t){this.focused=!1,this.$emit("blur",t)},setNativeInputValue:function(){var t=this.getInput();t&&t.value!==this.nativeInputValue&&(t.value=this.nativeInputValue)},handleFocus:function(t){this.focused=!0,this.$emit("focus",t)},handleCompositionStart:function(){this.isComposing=!0},isKorean:function(t){var e=/([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;return e.test(t)},handleCompositionUpdate:function(t){var e=t.target.value,i=e[e.length-1]||"";this.isComposing=!this.isKorean(i)},handleCompositionEnd:function(t){this.isComposing&&(this.isComposing=!1,this.handleInput(t))},handleInput:function(t){this.isComposing||t.target.value!==this.nativeInputValue&&(this.$emit("input",t.target.value),this.$nextTick(this.setNativeInputValue))},handleChange:function(t){this.$emit("change",t.target.value)}}}),O=S,x=(i("d17a"),Object(p["a"])(O,C,_,!1,null,null,null)),I=x.exports,$=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"point"},[i("canvas",{ref:"canvas",attrs:{width:t.width,height:t.height},on:{click:t.addOrigin}},[t._v("你的浏览器不支持canvas")])])},k=[],z=(i("cb29"),i("ac1f"),i("1276"),i("5cc6"),i("9a8c"),i("a975"),i("735e"),i("c1ac"),i("d139"),i("3a7b"),i("d5d6"),i("82f8"),i("e91f"),i("60bd"),i("5f96"),i("3280"),i("3fcc"),i("ca91"),i("25a1"),i("cd26"),i("3c5d"),i("2954"),i("649e"),i("219c"),i("170b"),i("b39a"),i("72f7"),{name:"point",props:{width:{type:[String,Number],default:"130"},height:{type:[String,Number],default:"170"},imgSrc:String,top:{type:[String,Number],default:"0"},left:{type:[String,Number],default:"0"},imgWidth:{type:[String,Number],default:"130"},imgHeight:{type:[String,Number],default:"170"},radius:{type:[String,Number],default:"5"},color:{type:String,default:"red"},frameColor:{type:String,default:"#f3715c"},continuation:{type:Boolean,default:!1},imgType:{type:String,default:"base64"}},data:function(){return{context:null,img:null}},mounted:function(){this.draw()},methods:{draw:function(){var t=this;if(!this.$refs.canvas.getContext)return console.warn("未获取到canvas");if(this.context=this.$refs.canvas.getContext("2d"),!this.imgSrc)return console.warn("未获取到图片");var e=new Image;e.onload=function(){t.context.drawImage(e,t.left,t.top,t.imgWidth,t.imgHeight)},e.src=this.imgSrc,this.img=e},addOrigin:function(t){var e=this.context;this.continuation||(e.clearRect(0,0,this.width,this.height),e.drawImage(this.img,this.left,this.top,this.imgWidth,this.imgHeight));var i=t.clientX-this.$refs.canvas.getBoundingClientRect().left,n=t.clientY-this.$refs.canvas.getBoundingClientRect().top;e.beginPath();var a={x:i,y:n,r:this.radius};e.arc(a.x,a.y,a.r,0,2*Math.PI,!0),e.strokeStyle=this.frameColor,e.fillStyle=this.color,e.fill(),e.stroke(),this.saveImage()},saveImage:function(){var t=this.$refs.canvas.toDataURL();if("base64"==this.imgType)this.$emit("getGeneratedImg",t);else if("blob"==this.imgType){for(var e=window.atob(t.split(",")[1]),i=new Uint8Array(e.length),n=0;n<e.length;n++)i[n]=e.charCodeAt(n);var a=new Blob([i],{type:"image/png"});this.$emit("getGeneratedImg",a)}},resetCanvas:function(){var t=this;this.context.clearRect(0,0,this.width,this.height),this.context.drawImage(this.img,this.left,this.top,this.imgWidth,this.imgHeight),this.$nextTick((function(){t.img.src=t.imgSrc}))}}}),T=z,N=(i("f99e"),Object(p["a"])(T,$,k,!1,null,"3fbcf876",null)),j=N.exports,B=(i("25f0"),function(t){return t<=9?"0"+t:t}),E=function(){var t=new Date,e=t.getFullYear().toString(),i=B((t.getMonth()+1).toString()),n=B(t.getDate().toString()),a=B(t.getHours().toString()),s=B(t.getMinutes().toString()),o=B(t.getSeconds().toString());return e+i+n+a+s+o},A={components:{awButton:g,awButtonGroup:w,awInput:I,point:j},data:function(){return{imgType:[{id:1,category:"img",typeName:"base64",disabled:!1},{id:2,category:"img",typeName:"blob",disabled:!0}],continuationType:[{id:1,category:"continuation",typeName:"是",disabled:!0},{id:2,category:"continuation",typeName:"否",disabled:!1}],genCanBtnStatus:!1,options:{width:190,height:170,imgSrc:i("3369"),imgWidth:190,imgHeight:170,top:0,left:0,radius:5,color:"red",frameColor:"#f3715c",continuation:!1,imgTypeActive:"base64"},generateOptions:{width:190,height:170,imgSrc:i("3369"),imgWidth:190,imgHeight:170,top:0,left:0,radius:5,color:"red",frameColor:"#f3715c",continuation:!1,imgTypeActive:"base64"},num:[1,2,3,4,5],src:[{src:"",selected:!1,date:""},{src:"",selected:!1,date:""},{src:"",selected:!1,date:""},{src:"",selected:!1,date:""},{src:"",selected:!1,date:""}]}},watch:{options:{handler:function(t){t&&(this.genCanBtnStatus=!0)},deep:!0}},methods:{changeType:function(){var t=this;this.imgType.forEach((function(e){e.disabled=!e.disabled,e.disabled||(t.options.imgTypeActive=e.typeName)}))},changeContinuity:function(){var t=this;this.continuationType.forEach((function(e){e.disabled=!e.disabled,"是"!=e.typeName||e.disabled?"否"!=e.typeName||e.disabled||(t.options.continuation=!1):t.options.continuation=!0}))},getGeneratedImg:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if("base64"==this.generateOptions.imgTypeActive){var i={src:t,selected:!1,date:E()};this.$set(this.src,e,i)}else if("blob"==this.generateOptions.imgTypeActive){var n={src:URL.createObjectURL(t),selected:!1,date:E()};this.$set(this.src,e,n)}},generateCanvas:function(){this.generateOptions=JSON.parse(JSON.stringify(this.options)),this.src=[{src:"",selected:!1,date:""},{src:"",selected:!1,date:""},{src:"",selected:!1,date:""},{src:"",selected:!1,date:""},{src:"",selected:!1,date:""}],document.querySelectorAll(".mantle").forEach((function(t){t.classList.remove("mantle")})),document.querySelectorAll("#point").forEach((function(t){t.__vue__.resetCanvas()})),this.genCanBtnStatus=!1},uploadImg:function(){this.$refs.upload.dispatchEvent(new MouseEvent("click"))},getUploadedImg:function(){var t=this.$refs.upload.files[0];this.options.imgSrc=URL.createObjectURL(t)},selectImg:function(t,e){"shade mantle"==t.target.className?(t.target.classList.remove("mantle"),this.src[e].selected=!1):(t.target.classList.add("mantle"),this.src[e].selected=!0)},downloadImg:function(){var t,e=!1;return this.src.forEach((function(i,n){if(i.src.length&&(e=!0),i.selected)if(t=!0,window.ActiveXObject||"ActiveXObject"in window)window.open(i.src,"_blank");else{var a=document.createElement("a"),s=document.createEvent("MouseEvents");s.initEvent("click",!1,!1),a.href=i.src,a.download="".concat(i.date,"生成的图像").concat(n+1,"-point"),a.dispatchEvent(s)}})),e?t?void 0:alert("请选择图片！"):alert("未生成图片！")}}},M=A,H=(i("ba75"),Object(p["a"])(M,o,r,!1,null,"7dd709fa",null)),L=H.exports,W={name:"App",components:{home:L}},U=W,V=(i("6b31"),Object(p["a"])(U,a,s,!1,null,"b22578e0",null)),P=V.exports;i("8e1f");n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(P)}}).$mount("#app")},"6b31":function(t,e,i){"use strict";i("050e")},"7aa4":function(t,e,i){"use strict";i("f380")},"8e1f":function(t,e,i){},ba75:function(t,e,i){"use strict";i("4dfe")},d17a:function(t,e,i){"use strict";i("1328")},f380:function(t,e,i){},f673:function(t,e,i){},f99e:function(t,e,i){"use strict";i("f673")}});
//# sourceMappingURL=app.fa314155.js.map