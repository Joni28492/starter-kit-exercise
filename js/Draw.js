import { Detail } from "./Detail.js";

export class Draw {

    bodyTag = document.body
    ulContainer = document.querySelector('.js-currencylist');
    inputSearch = document.querySelector('input')
    buttonClear = document.querySelector('.js-clear-btn')

    currenciesTitle = document.querySelector('.js-results-title') 


    favsLink = document.querySelector('.link--favs')
    favsIsActive = false
    favsPage = document.querySelector('.js-favs')

    listItems = []
    filteredListItems = []
    
    
    http = null;
    favs = null;

    //detail sidebar
    currencydetailContainer = document.querySelector('.js-currencydetail')




    //close details
    btnCloseDetails = null

    constructor(http, favs){
        this.http = http;
        this.favs = favs
        
        this.fillUlConcurrencyList()
        this.inputSearch.addEventListener( 'keyup', ()=>{
            if( this.inputSearch.value.length > 2 ){
                this.searchConcurrency(this.inputSearch.value);
            }
        })
        this.buttonClear.addEventListener( 'click', ()=>{
            this.inputSearch.value = '',
            this.fillUlConcurrencyList()
            this.favsIsActive = false;
        })

        this.ulContainer.addEventListener('click', (e)=>{

            if(e.target.className.includes('link')){ //anchor tag name
                this.bodyTag.className ='has-overlay'
                this.currencydetailContainer.className += ' currencydetail--show'
                const code  = e.target.parentElement.previousElementSibling.textContent
                const name = e.target.textContent
                const deatil = new Detail(code, name, this.favs)
                
            }   

            // addFavourites 
            if(e.target.src !== undefined){
                const code = e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent
                const name = e.target.parentElement.parentElement.parentElement.previousElementSibling.children[0].textContent
                const src = e.target.src

                //comprobar si esta como favorito y agregar o borrar
                if(!src.includes('selected')){
                    //check if exists in favs
                    if(!this.favs.existInFavs(code)){ this.favs.addToFavs(code, name) }
                    e.target.src = './img/ico-fav-selected-outline.svg'
                    e.target.alt = "Remove to favs"

                }else if (src.includes('selected')){
                    this.favs.removeTofavs(code, name)
                    e.target.src = './img/ico-fav-outline.svg'
                    e.target.alt = "Add to favs"
                }

            }
        })
        
        this.favsPage.addEventListener('click', ()=>{
            // console.log('Filtrar favoritos')
            if(this.favsPage.children[1].textContent === 'Favs'){
                this.drawOnlyFavs()
                this.favsPage.children[1].textContent = 'All'
            }else {
                this.fillUlConcurrencyList()
                this.favsPage.children[1].textContent = 'Favs'
            }
                
            
        })
        
    }

  

   
 

    drawItem(Props = {code:'Hola', name:'Mundo', fav: false}){


        const {code, name, fav} = Props
    
    
        const liItem = document.createElement('li')
        liItem.className = 'currencylist__item js-currency-item'
        liItem.setAttribute('data-code', code)
    
        const spanCode = document.createElement('span')
        spanCode.className = 'currencylist__item-code'
        spanCode.textContent = code 
    
        liItem.appendChild(spanCode)
    
        const spanName = document.createElement('span')
        spanName.className = 'currencylist__item-name'
        const anchorName = document.createElement('a')
        anchorName.className = 'link'
        anchorName.href="#"
        anchorName.textContent = name
        spanName.appendChild(anchorName)
    
        liItem.appendChild(spanName)
    
        const spanActions = document.createElement('span')
        spanActions.className = 'currencylist__item-actions'
    
        const anchorFav = document.createElement('a')
        anchorFav.className = 'link js-item-fav'
        anchorFav.href="#"
        anchorFav.setAttribute('data-code', code)
    
        const  spanIcon = document.createElement('span')
        spanIcon.className ='icon link__icon'
    
        const svgFav = document.createElement('img')
        svgFav.src = `${(!fav) ? './img/ico-fav-outline.svg' : './img/ico-fav-selected-outline.svg'}`
        svgFav.alt = 'Add to favs'
        spanIcon.appendChild(svgFav)
        anchorFav.appendChild(spanIcon)
        spanActions.appendChild(anchorFav)
        liItem.appendChild(spanActions)
    
        this.ulContainer.appendChild(liItem)
    
    
    }




    async fillUlConcurrencyList(){
           
        const response = await this.http.getAllData().then(
            resp => {
                for (const key in resp) {
                    this.listItems.push({
                        code: key.toUpperCase(),
                        name: resp[key],
                        fav: this.favs.existInFavs(key.toUpperCase())
                    })
                }
            }
        )

        this.currenciesTitle.textContent = `${this.listItems.length} currencies found.`
        this.listItems.forEach(item => this.drawItem(item));
    
    }

    removeUlChilds() {
        while (this.ulContainer.children.length !== 1) {
            this.ulContainer.children[1].remove()
        }
    }

    drawOnlyFavs() {
        const favs = this.favs.favs.map( (item)=> ({
            ...item,
            fav: true
        }))
        this.removeUlChilds()
        favs.forEach(item => this.drawItem(item));
        //modify title
        this.currenciesTitle.textContent = `${favs.length} fav currencies found.`

    }

    searchConcurrency(term = ''){

        this.filteredListItems = this.listItems
        .filter( ({code, name}) => (code.toLowerCase().includes(term)) || (name.toLowerCase().includes(term)))

        this.removeUlChilds()
        // console.log(this.filteredListItems)
        this.currenciesTitle.textContent = `${this.filteredListItems.length} currencies found.`
        this.filteredListItems.forEach(item => this.drawItem(item));

    }
    


}