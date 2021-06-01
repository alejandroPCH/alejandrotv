import MediaPlayer from "../mediaplayer"

class autoPlay{

//this plugin needs to control the player so we need to give it access
//"player" is the MediaPlayer from the mediaplayer.js file

start(player:MediaPlayer){
    
    if(!player.media.muted)player.media.muted=true

//revusar esti
   if(window.getComputedStyle(document.querySelector(".main_image")).backgroundImage!="none"){
   player.play()
        }
    }
}

export default autoPlay