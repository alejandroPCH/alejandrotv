

 function show_item(e){
    // main_image.style.backgroundImage=e.target.id
    // .setAttribute("style", "background-image: url("
    
    //encuentra la manera que el parametro acepte valores booleanos
    let style= e.target.currentStyle || window.getComputedStyle(e.target,false),
    bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    
     main_image.style.backgroundImage=`url(${bi})`
     
    main_image.style.animation = 'none';
    main_image.offsetHeight; /* trigger reflow */
    main_image.style.animation = null; 
  
  
  
    // text.textContent=`Esta escena es una de mis favoritas pues para mi, es como el inicio del camino de un heroe`
  
    
  }