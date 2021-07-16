"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var presentationButtonIcon = document.querySelector('.presentation__button--icon.State');
function presentation__container__disappear() {
    if (index_1.presentationContainer.classList.contains('disappear') != true || index_1.presentationContainer.style.display != 'none') {
        setTimeout(function () { index_1.presentationContainer.style.display = 'none'; }, 500, index_1.presentationContainer.classList.add('disappear'));
    }
}
function iconsManager() {
    if (index_1.video.classList.contains('render') && index_1.player.media.muted === true) {
        presentation__container__disappear();
        if (index_1.player.media.paused)
            index_1.player.media.play();
        presentationButtonIcon.classList.remove('Mute');
        presentationButtonIcon.classList.add('unMute');
        index_1.playOrPause.remove('Play');
        index_1.playOrPause.add('Pause');
        index_1.player.media.muted = false;
        return;
    }
    if (index_1.playOrPause.contains('Play')) {
        index_1.playOrPause.remove('Play');
        index_1.playOrPause.add('Pause');
        presentation__container__disappear();
    }
    else if (index_1.playOrPause.contains('Pause')) {
        index_1.playOrPause.remove('Pause');
        index_1.playOrPause.add('Play');
        index_1.presentation__container__appear();
    }
}
exports.default = iconsManager;
//# sourceMappingURL=iconsManager.js.map