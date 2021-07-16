"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MediaPlayer = /** @class */ (function () {
    function MediaPlayer(config) {
        //"this." will contain the value in the instance of MediaPLayer,
        //the value of video
        //config.el == video...so
        //this.media == video
        this.media = config.el;
        this.plugins = config.plugins;
        //_initPlugins will make the plugins start running by calling it's function
        this.initPlugins();
    }
    MediaPlayer.prototype.initPlugins = function () {
        var _this = this;
        //forEach will iterated in every plugin we added
        this.plugins.forEach(function (plugin) {
            //and "plugin.start" will run the plugin selected by the interation
            //"this" will represent the MediaPlayer
            plugin.start(_this);
            //in the first iteration the value of "plugin.start(this)" will be...
            //autoplay.start(this)
        });
    };
    MediaPlayer.prototype.muteControl = function () {
        // if is called for the first time, this.media.muted will have a false value, so it's going to be converted to a true value  
        this.media.muted = !this.media.muted;
        // for tha second time is called, it will bring a true value, so it's going to be converted to a false value, so you can hear now the video
    };
    MediaPlayer.prototype.play = function () {
        this.media.play();
    };
    MediaPlayer.prototype.pause = function () {
        this.media.pause();
    };
    MediaPlayer.prototype.control = function () {
        this.media.paused ? this.play() : this.pause();
    };
    return MediaPlayer;
}());
exports.default = MediaPlayer;
//# sourceMappingURL=mediaplayer.js.map