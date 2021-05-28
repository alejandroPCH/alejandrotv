const VERSION="v1"


//this will bring a call-back 
//'event' will recive it 
self.addEventListener('install',event=>{

    //pre-cache
    
    event.waitUntil(precache())

})

//every time a petition happen... it will try to find all elements in the local cache
self.addEventListener('fetch',event=>{

    const request=event.request
    //only with "get" petitions, other petitions are not needed

    if(request.method!='GET')return


    // look for elements in local cache 
    event.respondWith(cachedResponse(request)) 

    // but the cache needs to be updated
    event.waitUntil(updateCache(request))
})

async function precache(){

    
    const cache=await caches.open(VERSION)
      //adding all elements in the local cache
    return cache.addAll([


        // './',
        // '/index.html',
        // './src/index.js',
        // './src/mediaplayer.js',
        // './src/plugins/autoPlay.js',
        // './src/plugins/autoPause.js',
        // './src/style.css',
        // './src/videos/ig-11.mp4',
     

    ])
}


async function cachedResponse(request){

    const cache = await caches.open(VERSION)

    // the copy of cache is equals to the request? 
    const response=await cache.match(request)

    //if is undefined, we will continue using internet as normal 
    return response || fetch(request)
}


async function updateCache(request){

    const cache = await caches.open(VERSION)

    //response will have the most updated version of the project
    const response=await fetch(request)

    //save the value of response in cache

    //the video is partially load, and "cache.put" does not support partial requests, so if not is 
  return response.status===200? cache.put(request,response) : new Promise((resolve,reject)=>resolve('Video loaded'))
  
}