import {video,player,playOrPause,presentationContainer,presentation__container__appear} from '../index'


const presentationButtonIcon:HTMLElement=document.querySelector('.presentation__button--icon.State')


function presentation__container__disappear(){

    setTimeout(() =>{presentationContainer.style.display = 'none'},500,presentationContainer.classList.add('disappear'))
  
  }
  
function iconsManager(){

    if(video.classList.contains('render') && player.media.muted===true){
  
        presentation__container__disappear()
        if(player.media.paused)player.media.play()
    
        presentationButtonIcon.classList.remove('Mute')
        presentationButtonIcon.classList.add('unMute')
        playOrPause.remove('Play')
        playOrPause.add('Pause')

        

        player.media.muted=false
        return
  }

  if(playOrPause.contains('Play')){
     
      playOrPause.remove('Play')
      playOrPause.add('Pause')
      console.log("deberia desaparecer")
   
     

      presentation__container__disappear()

      
    }else{
      playOrPause.remove('Pause')
      playOrPause.add('Play')
 
      presentation__container__appear()
      
    
    }
}
export default iconsManager