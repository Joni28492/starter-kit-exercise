export class Favs {

    favs = localStorage.getItem('favs') 
            ?  JSON.parse(localStorage.getItem('favs')) 
            : localStorage.setItem('favs', JSON.stringify([]))



    constructor () {
        // console.log(this.favs)
    }

    existInFavs(code='AAVE'){
        return this.favs.map( item => item.code ).includes(code)
    }

    addToFavs(code, name){
        console.log(this.favs)
        // console.log('Add to favs')
        //agregar a favs
        this.favs.push({code, name})
        // console.log(this.favs)
        //agregar al localStorage
        localStorage.setItem('favs', JSON.stringify(this.favs))
    }
    removeTofavs(code, name){
        this.favs.splice( {name, code} ,1 )
        console.log(this.favs)

        localStorage.setItem('favs', JSON.stringify(this.favs))
    }


}