
function autoplay(){}

//this plugin needs to control the player so we need to give it access
//"player" is the MediaPlayer from the mediaplayer.js file
autoplay.prototype.start=function(player){
    
    if(!player.muted)player.muted=true

    
    player.play()
}


export default autoplay