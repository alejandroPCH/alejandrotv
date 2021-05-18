
function MediaPlayer(config){

    //config.el == video...so
    //this.media == video
    this.media=config.el
    this.plugins = config.plugins || [];

    this._initPlugins();

  //this will contain the value in the instance of MediaPLayer
  //the value of video
  }

  MediaPlayer.prototype._initPlugins=function(){

    this.plugins.forEach(plugin => {
      
      plugin.start(this)
    
    });

  }
  

  MediaPlayer.prototype.prePlay=function(){
  
    //by using prototpe you can access to the this's value
  
    //excecute when the boton is clicked
      this.media.play()
  }
  
  MediaPlayer.prototype.unmute=function(){
  
    //by using prototpe you can access to the this's value
  
    //excecute when the boton is clicked
      this.media.muted=false
      
  }
  
  MediaPlayer.prototype.control=function(){
    
     
    this.media.paused ? this.media.play() : this.media.pause()

  
  }

  MediaPlayer.prototype.mute=function(){

    this.media.muted=true

  }

  
  export default MediaPlayer