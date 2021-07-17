import { main_image,video,item,button,presentation__container__appear } from "../index"

const presentationTextIntro:HTMLElement=document.querySelector(".presentation__intro--text")


function removeMainImage():void {
    main_image.classList.add("remove")
  
  }
  
  

 function grow_item(e){
  
  const gradient='linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(255,255,255,0) 100%)'

  if(video.classList.contains('render'))return
  if(main_image.style.backgroundImage)return
  

  if(e.target.classList.contains("presentation")){

    main_image.style.backgroundImage=`${gradient}, url(${window.getComputedStyle(document.querySelector(".container__item")).backgroundImage.slice(4, -1).replace(/"/g, "")})`
   
  }else{

  
    item.classList.add('display')
  
    //this will render once
  
    let style= e.target.currentStyle || window.getComputedStyle(e.target,null),
    bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    main_image.style.backgroundImage=`${gradient}, url(${bi})`
  
  }   
  
    main_image.style.animation = 'none';
    main_image.offsetHeight; /* trigger reflow */
    main_image.style.animation = null; 
  



    button.classList.add("displayButton")


    setTimeout(()=>{ video.classList.add('render');
                      removeMainImage()} ,3000)
  
      presentationTextIntro.style.display='none'
      presentation__container__appear(true)
      
  }
  export default grow_item