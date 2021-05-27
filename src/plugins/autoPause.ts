import MediaPlayer from '../mediaplayer'

class autoPause{
    
    private threshold:number
    private insideThreshold: boolean
    private pauseByVisibility=false

    player:MediaPlayer
    title: string

    constructor(title: string){
        
        this.threshold = 0.30
        this.handlerIntersection = this.handlerIntersection.bind(this)
        this.handleVisibility = this.handleVisibility.bind(this)
        this.title=title
        this.insideThreshold
        this.pauseByVisibility=false

    }

    start(player: MediaPlayer){
        
        //saving the control of the player in a class instance 
        this.player=player

        const observer= new IntersectionObserver(this.handlerIntersection, { threshold:this.threshold } )
        
        //observer need an element to observe, that's why "player.media" is sent as parameter  
        // .observe is a native method of IntersectionObserver
        observer.observe(player.media)

        document.addEventListener("visibilitychange",this.handleVisibility)

    }

    private handleVisibility(){

       const isVisible=document.visibilityState=="visible"


       if(isVisible){

        
        this.title="AlejandroTV"

        //quieres que cuando el usario de al boton de pause se respete su decision
        
      

        if(this.insideThreshold && !this.pauseByVisibility ){
            console.log("solo")

            this.player.play()
            //by assigning false it will respect the user interaction 
            this.pauseByVisibility=false
            }
        }
       else{

        this.title="Hey!"
       
        this.pauseByVisibility=true
        this.player.pause() 
       
        }

        
    }

    
    //entries ==all objects observed
   private handlerIntersection(entries:IntersectionObserverEntry[]){
     
        const entry=entries[0]
        
        if(entry.intersectionRatio>=this.threshold){
        this.insideThreshold=true    
        this.player.play()
        
        }
        else{
            
            this.insideThreshold=false
            this.player.pause()

    }
    }
}


export default autoPause