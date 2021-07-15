import MediaPlayer from './mediaplayer' 
import autoPlay from './plugins/autoPlay'
import autoPause from './plugins/autoPause'
const item=document.querySelector(".container__item")
const presentation__text=document.querySelector(".presentation__text")
const presentation__image=document.querySelector(".presentation__image")

const presentation__container:HTMLElement=document.querySelector(".presentation__container")

const main_image:HTMLElement=document.querySelector(".main_image")
const button:HTMLElement=document.querySelector('.movie__button')
const buttonPlayOrPause:HTMLElement=document.querySelector('.Icon')
const playOrPause=buttonPlayOrPause.classList;

const icon:HTMLElement=document.querySelector('.Icon.State')

const video=document.querySelector('video')

const title:any=document.getElementsByTagName("title");


item.addEventListener('mouseover',grow_item)
item.addEventListener('mouseout',remove_item)
item.addEventListener('click', show_item)




video.addEventListener('ended',()=>{
  
  player.media.muted =true
  
  playOrPause.remove('Pause')

  presentation__image.classList.remove('disappear')
  presentation__text.classList.remove('disappear')

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
  console.log(icon)               
button.onclick=()=>{



  show_item();

  if(video.classList.contains('render') && player.media.muted===true){
  
    
    setTimeout(() =>{presentation__container.style.display = 'none'},1000,presentation__container.classList.add('disappear'))
  
  
    icon.classList.remove('Mute')
    icon.classList.add('unMute')
    playOrPause.remove('Play')
    playOrPause.add('Pause')


    player.media.muted=false
    return
  }

  if(playOrPause.contains('Play')){
     
      playOrPause.remove('Play')
      playOrPause.add('Pause')
   
     

      setTimeout(() =>{presentation__container.style.display = 'none'},1000,presentation__container.classList.add('disappear'))

      
    }else{
   
      playOrPause.remove('Pause')
      playOrPause.add('Play')
 

      presentation__container.style.display = 'block'
      presentation__container.classList.remove('disappear')
      
    }


 player.media.muted ? player.muteControl() : player.control();




}

 function show_item(){

  video.classList.add('render')


 

  main_image.classList.add('remove')
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


}

function remove_item(){
  document.querySelector(".container__item").classList.remove('display')
  
}



// if the navigator uses "Service Worker" then it will use it
if('serviceWorker' in navigator){

  navigator.serviceWorker.register('../sw.js').catch(error=>console.log(error.message))

}