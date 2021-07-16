// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/mediaplayer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MediaPlayer =
/** @class */
function () {
  function MediaPlayer(config) {
    //"this." will contain the value in the instance of MediaPLayer,
    //the value of video
    //config.el == video...so
    //this.media == video
    this.media = config.el;
    this.plugins = config.plugins; //_initPlugins will make the plugins start running by calling it's function

    this.initPlugins();
  }

  MediaPlayer.prototype.initPlugins = function () {
    var _this = this; //forEach will iterated in every plugin we added


    this.plugins.forEach(function (plugin) {
      //and "plugin.start" will run the plugin selected by the interation
      //"this" will represent the MediaPlayer
      plugin.start(_this); //in the first iteration the value of "plugin.start(this)" will be...
      //autoplay.start(this)
    });
  };

  MediaPlayer.prototype.muteControl = function () {
    // if is called for the first time, this.media.muted will have a false value, so it's going to be converted to a true value  
    this.media.muted = !this.media.muted; // for tha second time is called, it will bring a true value, so it's going to be converted to a false value, so you can hear now the video
  };

  MediaPlayer.prototype.play = function () {
    this.media.play();
  };

  MediaPlayer.prototype.pause = function () {
    this.media.pause();
  };

  MediaPlayer.prototype.control = function () {
    console.log(this.media.muted);
    if (this.media.muted == false) this.media.paused ? this.play() : this.pause();
  };

  return MediaPlayer;
}();

exports.default = MediaPlayer;
},{}],"src/plugins/autoPlay.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var autoPlay =
/** @class */
function () {
  function autoPlay() {} //this plugin needs to control the player so we need to give it access
  //"player" is the MediaPlayer from the mediaplayer.js file


  autoPlay.prototype.start = function (player) {
    if (!player.media.muted) player.media.muted = true; //revusar esti

    player.play();
  };

  return autoPlay;
}();

exports.default = autoPlay;
},{}],"src/plugins/autoPause.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("../index");

var autoPause =
/** @class */
function () {
  function autoPause(title) {
    this.pauseByVisibility = false;
    this.threshold = 0.30;
    this.handlerIntersection = this.handlerIntersection.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.title = title;
    this.insideThreshold;
    this.pauseByVisibility = false;
  }

  autoPause.prototype.start = function (player) {
    //saving the control of the player in a class instance 
    this.player = player;
    var observer = new IntersectionObserver(this.handlerIntersection, {
      threshold: this.threshold
    }); //observer need an element to observe, that's why "player.media" is sent as parameter  
    // .observe is a native method of IntersectionObserver

    observer.observe(player.media);
    document.addEventListener("visibilitychange", this.handleVisibility);
  };

  autoPause.prototype.handleVisibility = function () {
    var isVisible = document.visibilityState == "visible";

    if (isVisible) {
      this.title[0].innerHTML = "AlejandroTV";

      if (this.insideThreshold && !this.pauseByVisibility) {
        this.player.play(); //by assigning false it will respect the user interaction 

        this.pauseByVisibility = false;
      }
    } else {
      this.title[0].innerHTML = "Hey!";
      this.pauseByVisibility = true;
      this.player.pause();

      if (this.player.media.classList.contains('render')) {
        index_1.presentation__container__appear();
        index_1.playOrPause.remove('Pause');
        index_1.playOrPause.add('Play');
      }
    }
  }; //entries ==all objects observed


  autoPause.prototype.handlerIntersection = function (entries) {
    var entry = entries[0];

    if (entry.intersectionRatio >= this.threshold) {
      this.insideThreshold = true;
      this.player.play();
    } else {
      this.insideThreshold = false;
      this.player.pause();
    }
  };

  return autoPause;
}();

exports.default = autoPause;
},{"../index":"src/index.ts"}],"src/utils/growItem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("../index");

var presentationTextIntro = document.querySelector(".presentation__intro--text");

function removeMainImage() {
  index_1.main_image.classList.add("remove");
}

function grow_item(e) {
  if (index_1.video.classList.contains('render')) return;
  if (index_1.main_image.style.backgroundImage) return;
  index_1.item.classList.add('display'); //this will render once

  var style = e.target.currentStyle || window.getComputedStyle(e.target, null),
      bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
  index_1.main_image.style.backgroundImage = "linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(255,255,255,0) 100%), url(" + bi + ")";
  index_1.main_image.style.animation = 'none';
  index_1.main_image.offsetHeight;
  /* trigger reflow */

  index_1.main_image.style.animation = null;
  index_1.button.classList.add("displayButton");
  setTimeout(function () {
    index_1.video.classList.add('render');
    removeMainImage();
  }, 3000);
  presentationTextIntro.style.display = 'none';
  index_1.presentation__container__appear(true);
}

exports.default = grow_item;
},{"../index":"src/index.ts"}],"src/utils/iconsManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("../index");

var presentationButtonIcon = document.querySelector('.presentation__button--icon.State');

function presentation__container__disappear() {
  if (index_1.presentationContainer.classList.contains('disappear') != true || index_1.presentationContainer.style.display != 'none') {
    setTimeout(function () {
      index_1.presentationContainer.style.display = 'none';
    }, 500, index_1.presentationContainer.classList.add('disappear'));
  }
}

function iconsManager() {
  if (index_1.video.classList.contains('render') && index_1.player.media.muted === true) {
    presentation__container__disappear();
    presentationButtonIcon.classList.remove('Mute');
    presentationButtonIcon.classList.add('unMute');
    index_1.playOrPause.remove('Play');
    index_1.playOrPause.add('Pause');
    return;
  }

  if (index_1.playOrPause.contains('Play')) {
    index_1.playOrPause.remove('Play');
    index_1.playOrPause.add('Pause');
    presentation__container__disappear();
  } else if (index_1.playOrPause.contains('Pause')) {
    index_1.playOrPause.remove('Pause');
    index_1.playOrPause.add('Play');
    index_1.presentation__container__appear();
  }
}

exports.default = iconsManager;
},{"../index":"src/index.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.player = exports.presentation__container__appear = exports.firstTimeVideoRender = exports.video = exports.playOrPause = exports.presentationContainer = exports.button = exports.main_image = exports.item = exports.buttonPlayOrPause = void 0;

var mediaplayer_1 = __importDefault(require("./mediaplayer"));

var autoPlay_1 = __importDefault(require("./plugins/autoPlay"));

var autoPause_1 = __importDefault(require("./plugins/autoPause"));

var growItem_1 = __importDefault(require("./utils/growItem"));

var iconsManager_1 = __importDefault(require("./utils/iconsManager"));

exports.buttonPlayOrPause = document.querySelector('.presentation__button--icon');
exports.item = document.querySelector(".container__item");
exports.main_image = document.querySelector(".main_image");
exports.button = document.querySelector('.presentation__button');
exports.presentationContainer = document.querySelector(".presentation__container");
exports.playOrPause = exports.buttonPlayOrPause.classList;
exports.video = document.querySelector('video');
exports.firstTimeVideoRender = false;
var presentationText = document.querySelector(".presentation__container--text");
var presentationImage = document.querySelector(".presentation__container--image");
var title = document.getElementsByTagName("title");
exports.item.addEventListener('mouseover', growItem_1.default);
exports.item.addEventListener('mouseout', remove_item);
exports.item.addEventListener('click', show_item);

function show_item() {
  exports.video.classList.add('render');
}

function presentation__container__appear(firstTime) {
  if (firstTime === void 0) {
    firstTime = false;
  }

  if (firstTime) {
    exports.presentationContainer.style.display = 'block';
  }

  if (exports.presentationContainer.classList.contains('disappear') || exports.presentationContainer.style.display === 'none') {
    setTimeout(function () {
      exports.presentationContainer.style.display = 'block';
    }, 0, exports.presentationContainer.classList.remove('disappear'));
  }
}

exports.presentation__container__appear = presentation__container__appear;

function remove_item() {
  document.querySelector(".container__item").classList.remove('display');
}

exports.video.addEventListener('ended', function () {
  exports.player.media.muted = true;
  exports.playOrPause.remove('Pause');
  presentation__container__appear();
  exports.playOrPause.add('Play');
  setTimeout(function () {
    exports.video.classList.remove('disappear');
    exports.video.classList.remove('render');
  }, 1000, exports.video.classList.add('disappear'), exports.main_image.classList.remove('remove'));
}); //el:video contains the original video

exports.player = new mediaplayer_1.default({
  //all of these are elements of the MediaPlayer, also they are hosted in mediaplayer.js file
  // objects destructuring 
  el: exports.video,
  //  Here we will pass all the plugins this project has, for example, here we are passing autoplay in pluging's array 
  plugins: [new autoPlay_1.default(), new autoPause_1.default(title)]
});

exports.button.onclick = function () {
  show_item();
  iconsManager_1.default();
  exports.player.media.muted ? exports.player.muteControl() : exports.player.control();
}; // if the navigator uses "Service Worker" then it will use it


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(function (error) {
    return console.log(error.message);
  });
}
},{"./mediaplayer":"src/mediaplayer.ts","./plugins/autoPlay":"src/plugins/autoPlay.ts","./plugins/autoPause":"src/plugins/autoPause.ts","./utils/growItem":"src/utils/growItem.ts","./utils/iconsManager":"src/utils/iconsManager.ts","./../sw.js":[["sw.js","sw.js"],"sw.js.map","sw.js"]}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39737" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map