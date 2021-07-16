import MediaPlayer from './mediaplayer' 
import autoPlay from './plugins/autoPlay'
import autoPause from './plugins/autoPause'
import grow_item from './utils/growItem'
import iconsManager from './utils/iconsManager'
export const buttonPlayOrPause:HTMLElement=document.querySelector('.presentation__button--icon')
export const item=document.querySelector(".container__item")
export const main_image:HTMLElement=document.querySelector(".main_image")
export const button:HTMLElement=document.querySelector('.presentation__button')
export const presentationContainer:HTMLElement=document.querySelector(".presentation__container")
export const playOrPause=buttonPlayOrPause.classList;
export const video=document.querySelector('video')

const presentationText:HTMLElement=document.querySelector(".presentation__container--text")
const presentationImage=document.querySelector(".presentation__container--image")





const title:any=document.getElementsByTagName("title");


item.addEventListener('mouseover',grow_item)
item.addEventListener('mouseout',remove_item)
item.addEventListener('click', show_item)



function show_item(){

  video.classList.add('render')
}


export function presentation__container__appear(){

  setTimeout(() =>{presentationContainer.style.display = 'block'},0,  presentationContainer.classList.remove('disappear'))


}





function remove_item(){
  document.querySelector(".container__item").classList.remove('display')
  
}


video.addEventListener('ended',()=>{
  
  player.media.muted =true
  
  playOrPause.remove('Pause')

  presentationImage.classList.remove('disappear')
  presentationText.classList.remove('disappear')

  playOrPause.add('Play')

setTimeout(()=>{ 
                video.classList.remove('disappear')
                video.classList.remove('render')
              
              
              },1000,
                video.classList.add('disappear'),
                main_image.classList.remove('remove')

                )

  }
)

  //el:video contains the original video

 export const player=new MediaPlayer({
    
    //all of these are elements of the MediaPlayer, also they are hosted in mediaplayer.js file

    // objects destructuring 
    el:video,

    //  Here we will pass all the plugins this project has, for example, here we are passing autoplay in pluging's array 
    plugins:[new autoPlay(), new autoPause(title)] 

  })
button.onclick=()=>{



  show_item();

 iconsManager()


 player.media.muted ? player.muteControl() : player.control();




}


// if the navigator uses "Service Worker" then it will use it
if('serviceWorker' in navigator){

  navigator.serviceWorker.register('../sw.js').catch(error=>console.log(error.message))

}