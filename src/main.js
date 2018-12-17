// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fastClick from 'fastclick'
import './assets/styles/reset.css'
import './assets/styles/border.css'
// import vConsole from '@/assets/js/vconsole.js'
import common from '@/assets/js/common.js'
import router from './router'
import request from '@/assets/js/request.js'
import Vuelazyload from 'vue-lazyload'

Vue.use(request)
Vue.use(Vuelazyload, {
  loading: 'https://static.dzkandian.com/images/loadwap.png'
})
Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.prototype.common = common

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



//全局  加载进度条方法
Vue.prototype.loadingDialog= function(methods,messageName) {

  switch (methods) {

    case 'show':

      //自动插入提示dom结构
      if(!document.getElementById("loadingDialog")) {
        //创建最外层div
        var div = document.createElement("div");
        div.className="js_dialog";
        div.id="loadingDialog";
        //创建mask层
        var mask=document.createElement("div");
        mask.className="weui-mask_transparent";
        mask.style.zIndex="1000";
        //创建body层
        var dialog=document.createElement("div");
        dialog.className="weui-toast";
        dialog.style.zIndex="1001";
        var loadingi=document.createElement("i");
        loadingi.className="weui-loading weui-icon_toast";
        var loadingp=document.createElement("p");
        loadingp.className="toast__content";

        if(messageName){
          loadingp.innerHTML=messageName;
        }else{
          loadingp.innerHTML="正在加载";
        }
        dialog.appendChild(loadingi);
        dialog.appendChild(loadingp);
        div.appendChild(mask);
        div.appendChild(dialog);
        document.body.appendChild(div);


        // console.log(div);

        /*   <div id="toastDialog" style="opacity: 0; display: none;"><div class="weui-mask_transparent"></div> <div class="weui-toast"><i class="weui-loading weui-icon_toast"></i> <p id="toastMessage" class="weui-toast__content">正在加载</p></div></div>*/

      }else{

        document.getElementById("loadingDialog").style.opacity="1";
        document.getElementById("loadingDialog").style.display="block";

      }

      break;

    case 'hide':



      if(document.getElementById("loadingDialog")) {
        window.setTimeout(function(){
          document.getElementById("loadingDialog").style.opacity="0";
          document.getElementById("loadingDialog").style.display="none";
        },300);
      }


      break;

  }



}
