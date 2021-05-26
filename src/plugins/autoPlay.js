
class autoPlay{

//this plugin needs to control the player so we need to give it access
//"player" is the MediaPlayer from the mediaplayer.js file
start(player){
    
    if(!player.muted)player.muted=true

    
    player.play()
}
}

export default autoPlay