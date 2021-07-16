"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var presentationTextIntro = document.querySelector(".presentation__intro--text");
function removeMainImage() {
    index_1.main_image.classList.add("remove");
}
function grow_item(e) {
    if (index_1.video.classList.contains('render'))
        return;
    if (index_1.main_image.style.backgroundImage)
        return;
    index_1.item.classList.add('display');
    //this will render once
    var style = e.target.currentStyle || window.getComputedStyle(e.target, null), bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    index_1.main_image.style.backgroundImage = "linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(255,255,255,0) 100%), url(" + bi + ")";
    index_1.main_image.style.animation = 'none';
    index_1.main_image.offsetHeight; /* trigger reflow */
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
//# sourceMappingURL=growItem.js.map