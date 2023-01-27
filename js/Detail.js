import { fetchMethods } from "./api/fetch.js"


export class Detail {


    code = null
    name = null
    http = new fetchMethods()    
    


    closeBtn = document.querySelector('.js-currencydetail-close')
    body = document.querySelector('body')
    detailedSidebar = document.querySelector('.js-currencydetail')

    title = document.querySelector('.currencydetail__title')
    detailedList = document.querySelector('.js-currencydetail-list')
    listData = null

    favsButton = document.querySelector('.currencydetail__addfav') //usar childrens
    dateInput = document.querySelector('.js-currencydetail-date')

    static instancia;


    constructor(code, name, favs){

        //singleton para evitar multiples instancias
        if(!!Detail.instancia){
            
            this.code = code
            this.name = name
            // console.log('sin instancia',{code, name})
            this.closeBtn = document.querySelector('.js-currencydetail-close')
            this.body = document.querySelector('body')
            this.detailedSidebar = document.querySelector('.js-currencydetail')
        
            this.title = document.querySelector('.currencydetail__title')
            this.detailedList = document.querySelector('.js-currencydetail-list')
            this.listData = null
        
            this.favs = favs
            this.favsButton = document.querySelector('.currencydetail__addfav') //usar childrens
            this.dateInput = document.querySelector('.js-currencydetail-date')
            this.drawDetailedList(this.code.toLowerCase())
      


            return Detail.instancia
        }

       


        this.code = code
        this.name = name
        this.favs = favs
        
        this.drawDetailedList(this.code.toLowerCase())
        // console.log('con instancia',{code, name})

        // console.log(this.existInFavs(this.code))
        //favs en el detail
        this.favsButton.children[1].textContent = 
            `${this.favs.existInFavs(this.code) ? 'Remove to favs' : 'Add to favs'}`
        this.favsButton.children[0].children[0].alt = 
            `${this.favs.existInFavs(this.code) ? 'Remove to favs' : 'Add to favs'}`
        this.favsButton.children[0].children[0].src = 
            `${this.favs.existInFavs(this.code) ? 'img/ico-fav-selected-outline.svg' : 'img/ico-fav-outline.svg'}`

        this.closeBtn.addEventListener('click', ()=>{
            this.body.className = ''
            this.detailedSidebar.className = 'currencydetail js-currencydetail'
            //remove listener de favs
            this.favsButton.removeEventListener('click',()=> this.favsListener(), false)
        })

        
        this.favsButton.addEventListener('click',()=> {this.favsListener()})
        
        Detail.instancia = this
       
    }


    


    favsListener(){
        const img = this.favsButton.children[0].children[0] 
        const span = this.favsButton.children[1]

        const currentCode = document.querySelector('.js-currencydetail-code').textContent
        const currentName = document.querySelector('.js-currencydetail-name').textContent
        
        this.name = currentName
        this.code = currentCode


        if(!span.textContent.includes('Add')){
            this.favs.removeTofavs(this.code, this.name)
    
        }
        
        if(span.textContent.includes('Add')){
            this.favs.addToFavs(this.code, this.name)
   
        }
        
        
        span.textContent = 
            `${(span.textContent ==='Add to favs') ? 'Remove to favs' : 'Add to favs'}`
        img.alt = 
            `${(img.alt === 'Add to favs') ? 'Remove to favs' : 'Add to favs'}`
        // //todo fix cambio de svg no quiere modificar el icono

        // //img/ico-fav-selected-outline.svg seleccionado
        // //img/ico-fav-outline.svg no seleccionado
        img.src = `${(!this.favs.existInFavs(code, name)) 
                ? 'img/ico-fav-selected-outline.svg' 
                : 'img/ico-fav-outline.svg'}`
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


}