import { main_image,video,item,button,presentation__container__appear } from "../index"

const presentationTextIntro:HTMLElement=document.querySelector(".presentation__intro--text")


function removeMainImage():void {
    main_image.classList.add("remove")
  
  }
  
  

 function grow_item(e){

  
    if(video.classList.contains('render'))return
    if(main_image.style.backgroundImage)return
  
    item.classList.add('display')
  
    //this will render once
  
    let style= e.target.currentStyle || window.getComputedStyle(e.target,null),
    bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    
     main_image.style.backgroundImage=`url(${bi})`
     
    main_image.style.animation = 'none';
    main_image.offsetHeight; /* trigger reflow */
    main_image.style.animation = null; 
  



    button.classList.add("displayButton")


    setTimeout(()=>{ video.classList.add('render');
                      removeMainImage()} ,3000)
  
      presentationTextIntro.style.display='none'
      presentation__container__appear()
      
  }
  export default grow_item