export class Favs {

    favs = localStorage.getItem('favs') 
            ?  JSON.parse(localStorage.getItem('favs')) 
            : localStorage.setItem('favs', JSON.stringify([]))


    constructor () {

    }

    existInFavs(code='AAVE'){
        return this.favs.map( item => item.code ).includes(code)
    }


}