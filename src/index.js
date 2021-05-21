import MediaPlayer from './mediaplayer.js' 
import autoplay from './plugins/autoplay.js'

const item=document.querySelector(".carousel__container")
const text=document.querySelector(".presentation-text__item")
const main_image=document.querySelector(".main_image")
const button=document.querySelector('button')
const video=document.querySelector('video')






item.addEventListener('mouseover',grow_item)
item.addEventListener('mouseout',remove_item)
item.addEventListener('click', show_item)






//el:video contains the original video

const player=new MediaPlayer({
  
  //all of these are elements of the MediaPlayer, also they are hosted in mediaplayer.js file

  // objects destructuring 
  el:video,

  //  Here we will pass all the plugins this project has, for example, here we are passing autoplay in pluging's array 
  plugins:[new autoplay()] 

})

button.onclick=()=> player.media.muted ? player.muteControl() : player.control();






function show_item(e){
  // main_image.style.backgroundImage=e.target.id
  // .setAttribute("style", "background-image: url("
  
  let style = e.target.currentStyle || window.getComputedStyle(e.target, false),
  bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
  
   main_image.style.backgroundImage=`url(${bi})`
   
  main_image.style.animation = 'none';
  main_image.offsetHeight; /* trigger reflow */
  main_image.style.animation = null; 



  // text.textContent=`Esta escena es una de mis favoritas pues para mi, es como el inicio del camino de un heroe`

  
}

function grow_item(e){


  
item.classList.add('display')


}

function remove_item(){
  document.querySelector(".container__item").classList.remove('display')
  
}
