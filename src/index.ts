import MediaPlayer from './mediaplayer' 
import autoPlay from './plugins/autoPlay'
import autoPause from './plugins/autoPause'
const item=document.querySelector(".container__item")
const presentationContainerText=document.querySelector(".presentation__container--text")
const presentationContainerImage=document.querySelector(".presentation__container--image")

const presentation__container:HTMLElement=document.querySelector(".presentation__container")

const main_image:HTMLElement=document.querySelector(".main_image")
const button:HTMLElement=document.querySelector('.presentation__button')
const buttonPlayOrPause:HTMLElement=document.querySelector('.presentation__button--icon')
const playOrPause=buttonPlayOrPause.classList;

const presentationButtonIcon:HTMLElement=document.querySelector('.presentation__button--icon.State')

const video=document.querySelector('video')

const title:any=document.getElementsByTagName("title");


item.addEventListener('mouseover',grow_item)
item.addEventListener('mouseout',remove_item)
item.addEventListener('click', show_item)



function show_item(){

  video.classList.add('render')
}

function presentation__container__disappear(){

  setTimeout(() =>{presentation__container.style.display = 'none'},500,presentation__container.classList.add('disappear'))

}

function presentation__container__appear(){

  setTimeout(() =>{presentation__container.style.display = 'block'},0,  presentation__container.classList.remove('disappear'))


}



function removeMainImage():void {
  main_image.classList.add("remove")

}

 function grow_item(e){

  
  if(video.classList.contains('render'))return
  if(main_image.style.backgroundImage)return

  item.classList.add('display')

  
  
  let style= e.target.currentStyle || window.getComputedStyle(e.target,null),
  bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
  
   main_image.style.backgroundImage=`url(${bi})`
   
  main_image.style.animation = 'none';
  main_image.offsetHeight; /* trigger reflow */
  main_image.style.animation = null; 

  button.classList.add("displayButton")
  setTimeout(()=>{
  
    video.classList.add('render');
    removeMainImage()} ,3000)

  presentation__container__appear()
    
    

}

function remove_item(){
  document.querySelector(".container__item").classList.remove('display')
  
}


video.addEventListener('ended',()=>{
  
  player.media.muted =true
  
  playOrPause.remove('Pause')

  presentationContainerImage.classList.remove('disappear')
  presentationContainerText.classList.remove('disappear')

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

  const player=new MediaPlayer({
    
    //all of these are elements of the MediaPlayer, also they are hosted in mediaplayer.js file

    // objects destructuring 
    el:video,

    //  Here we will pass all the plugins this project has, for example, here we are passing autoplay in pluging's array 
    plugins:[new autoPlay(), new autoPause(title)] 

  })
  console.log(presentationButtonIcon)               
button.onclick=()=>{



  show_item();

  if(video.classList.contains('render') && player.media.muted===true){
  
    
    
    presentation__container__disappear()
      
  
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

      
    }else{
   
      playOrPause.remove('Pause')
      playOrPause.add('Play')
 
      presentation__container__appear()
      
    
      console.log("dsadsadsadsa")
    }


 player.media.muted ? player.muteControl() : player.control();




}



// if the navigator uses "Service Worker" then it will use it
if('serviceWorker' in navigator){

  navigator.serviceWorker.register('../sw.js').catch(error=>console.log(error.message))

}