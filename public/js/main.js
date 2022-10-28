const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const thumbDown = document.querySelectorAll('.fa-thumbs-down')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteQuote)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

Array.from(thumbDown).forEach((element)=>{
    element.addEventListener('click', subLike)
})

async function deleteQuote(){
    const qName = this.parentNode.parentNode.childNodes[1].innerText
    const aName = this.parentNode.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteQuote', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'quoteNameS': qName,
              'authorNameS': aName
            })
          })
        const data = await response.json()
        // console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const qName = this.parentNode.parentNode.childNodes[1].innerText
    const aName = this.parentNode.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'quoteNameS': qName,
              'authorNameS': aName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        // console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function subLike(){
    const qName = this.parentNode.parentNode.childNodes[1].innerText
    const aName = this.parentNode.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('subOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'quoteNameS': qName,
              'authorNameS': aName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        // console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}