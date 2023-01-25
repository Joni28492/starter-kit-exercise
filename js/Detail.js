import { fetchMethods } from "./api/fetch.js"


export class Detail {



    //todo refactor con abstrac class
    favs = localStorage.getItem('favs') 
            ?  JSON.parse(localStorage.getItem('favs')) 
            : localStorage.setItem('favs', JSON.stringify([]))
 
    //obtenemos en el constructor
    code = null
    name = null
    http = null


    closeBtn = document.querySelector('.js-currencydetail-close')
    body = document.querySelector('body')
    detailedSidebar = document.querySelector('.js-currencydetail')

    title = document.querySelector('.currencydetail__title')
    detailedList = document.querySelector('.js-currencydetail-list')
    listData = null

    favsButton = document.querySelector('.currencydetail__addfav') //usar childrens
    dateInput = document.querySelector('.js-currencydetail-date')

    constructor(code, name){
        this.code = code
        this.name = name
        this.http = new fetchMethods()    
        this.drawDetailedList(this.code.toLowerCase())
        // console.log(this.existInFavs(this.code))
        
        //favs en el detail
        this.favsButton.children[1].textContent = 
            `${this.existInFavs(this.code) ? 'Remove to favs' : 'Add to favs'}`
        this.favsButton.children[0].children[0].alt = 
            `${this.existInFavs(this.code) ? 'Remove to favs' : 'Add to favs'}`
        this.favsButton.children[0].children[0].src = 
            `${this.existInFavs(this.code) ? 'img/ico-fav-selected-outline.svg' : 'img/ico-fav-outline.svg'}`

        this.closeBtn.addEventListener('click', ()=>{
            this.body.className = ''
            this.detailedSidebar.className = 'currencydetail js-currencydetail'
            //remove listener de favs
            this.favsButton.removeEventListener('click',()=> this.favsListener(), false)
        })

        
        this.favsButton.addEventListener('click',()=> this.favsListener())
        
        
       
    }

    favsListener(){
        const img = this.favsButton.children[0].children[0] 
        const span = this.favsButton.children[1]

        //todo fix logs duplicados, por culpa de la instancia
        if(!span.textContent.includes('Add')){
            this.removeTofavs()
        }
        
        if(span.textContent.includes('Add')){
            this.addToFavs()
        }
        
        
        span.textContent = 
            `${(span.textContent ==='Add to favs') ? 'Remove to favs' : 'Add to favs'}`
        img.alt = 
            `${(img.alt === 'Add to favs') ? 'Remove to favs' : 'Add to favs'}`
        //todo fix cambio
        img.src = `${( img.src === 'img/ico-fav-outline.svg') 
                ? 'img/ico-fav-selected-outline.svg' 
                : 'img/ico-fav-outline.svg'}`
    }


    //abstract favs
    existInFavs(code='AAVE'){
        return this.favs.map( item => item.code ).includes(code)
    }

    drawItemDetailed(Props={code: 'ADA', detail: 1.2444}){

        const {code, detail} = Props;

        
        const div = document.createElement('div')
        div.className = 'currencydetail__datasheet-row'

        const h3 = document.createElement('h3')
        h3.className = 'currencydetail__datasheet-label'
        h3.textContent = code.toUpperCase()
        div.append(h3)

        const p = document.createElement('p')
        p.className = 'currencydetail__datasheet-data'
        p.textContent = detail
        div.append(p)

       
        this.detailedList.append(div)

    }
    

    //uso code como arg por si hay que utlizar esta func en otro sitio fuera de la clase
    async drawDetailedList(code='eur'){


        await this.http.getByCurrencyCode(code).then( ({date, ...rest}) => {
            this.listData = {
                date,
                rest,
            }
        })

        // console.table(this.listData)
        

        const {date, rest} = this.listData

        //setTitle
        this.setTitle(this.code, this.name)
        //modificar input de fecha
        this.dateInput.value = date


        //dibujar todos los elementos
        let allDetails = []

        for (const key in rest[code]) {
            allDetails.push({
                code: key,
                detail: rest[code][key]
            })
        }

        allDetails.forEach( (Props) => {
            this.drawItemDetailed(Props)
        });

        
    }
    setTitle(){

        this.title.children[0].textContent = this.code.toUpperCase()
        this.title.children[1].textContent = this.name
        

    }


    addToFavs(){
        console.log('Add to favs')
    }
    removeTofavs(){
        console.log('Remove to favs')
    }
}