
function autoplay(){}

autoplay.prototype.start=function(player){
    player.mute()

    player.prePlay()
}


export default autoplay