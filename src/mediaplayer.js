
function MediaPlayer(config){

    //config.el == video...so
    //this.media == video
    this.media=config.el
    this.plugins=config.plugins || []
  
  //this will contain the value in the instance of MediaPLayer
  //the value of video
  }
  
  
  MediaPlayer.prototype.go=function(){
  
    //by using prototpe you can access to the this's value
  
    //excecute when the boton is clicked
      
      this.media.play()
  
  }
  
  MediaPlayer.prototype.pause=function(){
  
      this.media.pause()
  
  }

  MediaPlayer.prototype.muted=function(){

    this.media.mute=true

  }


  export default MediaPlayer