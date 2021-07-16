import {video,player,playOrPause,presentationContainer,presentation__container__appear} from '../index'


const presentationButtonIcon:HTMLElement=document.querySelector('.presentation__button--icon.State')


function presentation__container__disappear(){

 

  if(presentationContainer.classList.contains('disappear')!=true || presentationContainer.style.display != 'none'){
  setTimeout(() =>{presentationContainer.style.display = 'none'},500,presentationContainer.classList.add('disappear'))
console.log("PUASEEEE")  
}
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
   
     

      presentation__container__disappear()

      
    }else if(playOrPause.contains('Pause')){
      playOrPause.remove('Pause')
      playOrPause.add('Play')
 
      presentation__container__appear()
      
    
    }
}
export default iconsManager