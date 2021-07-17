import {video,player,playOrPause,presentationContainer,presentation__container__appear,removeMainImage} from '../index'

const presentationButtonIcon:HTMLElement=document.querySelector('.presentation__button--icon.State')


function presentation__container__disappear(){

 
//this just is going to render the animation in the right time
  if(presentationContainer.classList.contains('disappear')!=true || presentationContainer.style.display != 'none'){
  setTimeout(() =>{presentationContainer.style.display = 'none'},500,
              /*this will excute instantly when -> */  presentationContainer.classList.add('disappear'))
  }
}
  
function iconsManager(){

  //this will just run once 
    if(video.classList.contains('render') && player.media.muted===true){
        presentation__container__disappear()
        removeMainImage()
        
        presentationButtonIcon.classList.remove('Mute')
        presentationButtonIcon.classList.add('unMute')
        playOrPause.remove('Play')
        playOrPause.add('Pause')

        

        return
  }

  if(player.media.muted===true){
     presentationButtonIcon.classList.add('Mute') 
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