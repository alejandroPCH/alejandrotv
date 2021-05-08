const item=document.querySelector(".container__item")
const text=document.querySelector(".presentation-text__item")


item.addEventListener('mouseover',grow_item)
item.addEventListener('mouseout',remove_item)
item.addEventListener('click', show_item)

function show_item(){

  text.textContent=`Esta escena es una de mis favoritas pues para mi, es como el inicio del camino de un heroe`
}

function grow_item(e){

  console.log(e.target.id)

  
item.classList.add('display')


}

function remove_item(){
  document.querySelector(".container__item").classList.remove('display')
  
}
