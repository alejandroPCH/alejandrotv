parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"EYgT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){this.media=t.el,this.plugins=t.plugins,this.initPlugins()}return t.prototype.initPlugins=function(){var t=this;this.plugins.forEach(function(i){i.start(t)})},t.prototype.muteControl=function(){this.media.muted=!this.media.muted},t.prototype.play=function(){this.media.play()},t.prototype.pause=function(){this.media.pause()},t.prototype.control=function(){console.log(this.media.muted),0==this.media.muted&&(this.media.paused?this.play():this.pause())},t}();exports.default=t;
},{}],"geE4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(){}return e.prototype.start=function(e){e.media.muted||(e.media.muted=!0),e.play()},e}();exports.default=e;
},{}],"Fick":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var i=require("../index"),e=function(){function e(i){this.pauseByVisibility=!1,this.threshold=.3,this.handlerIntersection=this.handlerIntersection.bind(this),this.handleVisibility=this.handleVisibility.bind(this),this.title=i,this.insideThreshold,this.pauseByVisibility=!1}return e.prototype.start=function(i){this.player=i,new IntersectionObserver(this.handlerIntersection,{threshold:this.threshold}).observe(i.media),document.addEventListener("visibilitychange",this.handleVisibility)},e.prototype.handleVisibility=function(){"visible"==document.visibilityState?(this.title[0].innerHTML="AlejandroTV",this.insideThreshold&&!this.pauseByVisibility&&(this.player.play(),this.pauseByVisibility=!1)):(this.title[0].innerHTML="Hey!",this.pauseByVisibility=!0,this.player.pause(),this.player.media.classList.contains("render")&&(i.presentation__container__appear(),i.playOrPause.remove("Pause"),i.playOrPause.add("Play")))},e.prototype.handlerIntersection=function(i){i[0].intersectionRatio>=this.threshold?(this.insideThreshold=!0,this.player.play()):(this.insideThreshold=!1,this.player.pause())},e}();exports.default=e;
},{"../index":"B6dB"}],"APBn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../index"),t=document.querySelector(".presentation__intro--text");function a(){e.main_image.classList.add("remove")}function i(i){if(!e.video.classList.contains("render")&&!e.main_image.style.backgroundImage){e.item.classList.add("display");var n=(i.target.currentStyle||window.getComputedStyle(i.target,null)).backgroundImage.slice(4,-1).replace(/"/g,"");e.main_image.style.backgroundImage="linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(255,255,255,0) 100%), url("+n+")",e.main_image.style.animation="none",e.main_image.offsetHeight,e.main_image.style.animation=null,e.button.classList.add("displayButton"),setTimeout(function(){e.video.classList.add("render"),a()},3e3),t.style.display="none",e.presentation__container__appear(!0)}}exports.default=i;
},{"../index":"B6dB"}],"SlKU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../index"),a=document.querySelector(".presentation__button--icon.State");function t(){1==e.presentationContainer.classList.contains("disappear")&&"none"==e.presentationContainer.style.display||setTimeout(function(){e.presentationContainer.style.display="none"},500,e.presentationContainer.classList.add("disappear"))}function s(){if(e.video.classList.contains("render")&&!0===e.player.media.muted)return t(),a.classList.remove("Mute"),a.classList.add("unMute"),e.playOrPause.remove("Play"),void e.playOrPause.add("Pause");e.playOrPause.contains("Play")?(e.playOrPause.remove("Play"),e.playOrPause.add("Pause"),t()):e.playOrPause.contains("Pause")&&(e.playOrPause.remove("Pause"),e.playOrPause.add("Play"),e.presentation__container__appear())}exports.default=s;
},{"../index":"B6dB"}],"B6dB":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.player=exports.presentation__container__appear=exports.firstTimeVideoRender=exports.video=exports.playOrPause=exports.presentationContainer=exports.button=exports.main_image=exports.item=exports.buttonPlayOrPause=void 0;var t=e(require("./mediaplayer")),r=e(require("./plugins/autoPlay")),o=e(require("./plugins/autoPause")),s=e(require("./utils/growItem")),n=e(require("./utils/iconsManager"));exports.buttonPlayOrPause=document.querySelector(".presentation__button--icon"),exports.item=document.querySelector(".container__item"),exports.main_image=document.querySelector(".main_image"),exports.button=document.querySelector(".presentation__button"),exports.presentationContainer=document.querySelector(".presentation__container"),exports.playOrPause=exports.buttonPlayOrPause.classList,exports.video=document.querySelector("video"),exports.firstTimeVideoRender=!1;var i=document.getElementsByTagName("title");function a(){exports.video.classList.add("render")}function p(e){void 0===e&&(e=!1),e&&(exports.presentationContainer.style.display="block"),(exports.presentationContainer.classList.contains("disappear")||"none"===exports.presentationContainer.style.display)&&setTimeout(function(){exports.presentationContainer.style.display="block"},0,exports.presentationContainer.classList.remove("disappear"))}function u(){document.querySelector(".container__item").classList.remove("display")}exports.item.addEventListener("mouseover",s.default),exports.item.addEventListener("mouseout",u),exports.item.addEventListener("click",a),exports.presentation__container__appear=p,exports.video.addEventListener("ended",function(){exports.player.media.muted=!0,exports.playOrPause.remove("Pause"),p(),exports.playOrPause.add("Play"),setTimeout(function(){exports.video.classList.remove("disappear"),exports.video.classList.remove("render")},1e3,exports.video.classList.add("disappear"),exports.main_image.classList.remove("remove"))}),exports.player=new t.default({el:exports.video,plugins:[new r.default,new o.default(i)]}),exports.button.onclick=function(){a(),n.default(),exports.player.media.muted?exports.player.muteControl():exports.player.control()},"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js").catch(function(e){return console.log(e.message)});
},{"./mediaplayer":"EYgT","./plugins/autoPlay":"geE4","./plugins/autoPause":"Fick","./utils/growItem":"APBn","./utils/iconsManager":"SlKU","./../sw.js":[["sw.js","NqYy"],"sw.js.map","NqYy"]}]},{},["B6dB"], null)
//# sourceMappingURL=src.67323532.js.map