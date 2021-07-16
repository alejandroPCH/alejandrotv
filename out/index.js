"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.player = exports.presentation__container__appear = exports.video = exports.playOrPause = exports.presentationContainer = exports.button = exports.main_image = exports.item = exports.buttonPlayOrPause = void 0;
var mediaplayer_1 = require("./mediaplayer");
var autoPlay_1 = require("./plugins/autoPlay");
var autoPause_1 = require("./plugins/autoPause");
var growItem_1 = require("./utils/growItem");
var iconsManager_1 = require("./utils/iconsManager");
exports.buttonPlayOrPause = document.querySelector('.presentation__button--icon');
exports.item = document.querySelector(".container__item");
exports.main_image = document.querySelector(".main_image");
exports.button = document.querySelector('.presentation__button');
exports.presentationContainer = document.querySelector(".presentation__container");
exports.playOrPause = exports.buttonPlayOrPause.classList;
exports.video = document.querySelector('video');
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
    if (firstTime === void 0) { firstTime = false; }
    if (firstTime) {
        exports.presentationContainer.style.display = 'block';
    }
    if (exports.presentationContainer.classList.contains('disappear') || exports.presentationContainer.style.display === 'none') {
        setTimeout(function () { exports.presentationContainer.style.display = 'block'; }, 0, exports.presentationContainer.classList.remove('disappear'));
    }
}
exports.presentation__container__appear = presentation__container__appear;
function remove_item() {
    document.querySelector(".container__item").classList.remove('display');
}
exports.video.addEventListener('ended', function () {
    exports.player.media.muted = true;
    exports.playOrPause.remove('Pause');
    presentationImage.classList.remove('disappear');
    presentationText.classList.remove('disappear');
    exports.playOrPause.add('Play');
    setTimeout(function () {
        exports.video.classList.remove('disappear');
        exports.video.classList.remove('render');
    }, 1000, exports.video.classList.add('disappear'), exports.main_image.classList.remove('remove'));
});
//el:video contains the original video
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
};
// if the navigator uses "Service Worker" then it will use it
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js').catch(function (error) { return console.log(error.message); });
}
//# sourceMappingURL=index.js.map