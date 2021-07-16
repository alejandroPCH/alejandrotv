"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var autoPause = /** @class */ (function () {
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
        var observer = new IntersectionObserver(this.handlerIntersection, { threshold: this.threshold });
        //observer need an element to observe, that's why "player.media" is sent as parameter  
        // .observe is a native method of IntersectionObserver
        observer.observe(player.media);
        document.addEventListener("visibilitychange", this.handleVisibility);
    };
    autoPause.prototype.handleVisibility = function () {
        var isVisible = document.visibilityState == "visible";
        if (isVisible) {
            this.title[0].innerHTML = "AlejandroTV";
            if (this.insideThreshold && !this.pauseByVisibility) {
                this.player.play();
                //by assigning false it will respect the user interaction 
                this.pauseByVisibility = false;
            }
        }
        else {
            this.title[0].innerHTML = "Hey!";
            this.pauseByVisibility = true;
            this.player.pause();
            if (this.player.media.classList.contains('render')) {
                index_1.presentation__container__appear();
                index_1.playOrPause.remove('Pause');
                index_1.playOrPause.add('Play');
            }
        }
    };
    //entries ==all objects observed
    autoPause.prototype.handlerIntersection = function (entries) {
        var entry = entries[0];
        if (entry.intersectionRatio >= this.threshold) {
            this.insideThreshold = true;
            this.player.play();
        }
        else {
            this.insideThreshold = false;
            this.player.pause();
        }
    };
    return autoPause;
}());
exports.default = autoPause;
//# sourceMappingURL=autoPause.js.map