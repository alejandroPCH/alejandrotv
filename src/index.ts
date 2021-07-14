import MediaPlayer from './mediaplayer' 
import autoPlay from './plugins/autoPlay'
import autoPause from './plugins/autoPause'
const item=document.querySelector(".carousel__container")
const text=document.querySelector(".presentation-text__item")
const main_image:HTMLElement=document.querySelector(".main_image")
const button:HTMLElement=document.querySelector('.movie__button')
const video=document.querySelector('video')


const title:any=document.getElementsByTagName("title");


item.addEventListener('mouseover',grow_item)
item.addEventListener('mouseout',remove_item)
item.addEventListener('click', show_item)







  //el:video contains the original video

  const player=new MediaPlayer({
    
    //all of these are elements of the MediaPlayer, also they are hosted in mediaplayer.js file

    // objects destructuring 
    el:video,

    //  Here we will pass all the plugins this project has, for example, here we are passing autoplay in pluging's array 
    plugins:[new autoPlay(), new autoPause(title)] 

  })

button.onclick=()=>{


 player.media.muted ? player.muteControl() : player.control();
}




 function show_item(){

  video.classList.add('render')
}

function setTimeOut(time){

  return new Promise(()=>setTimeout(()=>video.classList.add('render'),time))

}
function removeMainImage():void {
  main_image.classList.add("remove")

  setTimeout(()=>main_image.style.backgroundImage=null,1000)
}

function hola(){
  console.log("das")
}
 function grow_item(e){


  
item.classList.add('display')


  // main_image.style.backgroundImage=e.target.id
  // .setAttribute("style", "background-image: url("
  
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
  // text.textContent=`Esta escena es una de mis favoritas pues para mi, es como el inicio del camino de un heroe`


}

function remove_item(){
  document.querySelector(".container__item").classList.remove('display')
  
}



// if the navigator uses "Service Worker" then it will use it
if('serviceWorker' in navigator){

  navigator.serviceWorker.register('../sw.js').catch(error=>console.log(error.message))

}