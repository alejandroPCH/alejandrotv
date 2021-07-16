"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var autoPlay = /** @class */ (function () {
    function autoPlay() {
    }
    //this plugin needs to control the player so we need to give it access
    //"player" is the MediaPlayer from the mediaplayer.js file
    autoPlay.prototype.start = function (player) {
        if (!player.media.muted)
            player.media.muted = true;
        //revusar esti
        player.play();
    };
    return autoPlay;
}());
exports.default = autoPlay;
//# sourceMappingURL=autoPlay.js.map