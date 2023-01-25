// import { fetchMethods } from "../api/fetch.js";

// let ulContainer = document.querySelector('.js-currencylist');
// let inputSearch = document.querySelector('input')

// export const drawItem = (Props = {code:'Hola', name:'Mundo', fav: false}) => {


//     const {code, name, fav} = Props


//     const liItem = document.createElement('li')
//     liItem.className = 'currencylist__item js-currency-item'
//     liItem.setAttribute('data-code', code)

//     const spanCode = document.createElement('span')
//     spanCode.className = 'currencylist__item-code'
//     spanCode.textContent = code 

//     liItem.appendChild(spanCode)

//     const spanName = document.createElement('span')
//     spanName.className = 'currencylist__item-name'
//     const anchorName = document.createElement('a')
//     anchorName.className = 'link'
//     anchorName.href="#"
//     anchorName.textContent = name
//     spanName.appendChild(anchorName)

//     liItem.appendChild(spanName)

//     const spanActions = document.createElement('span')
//     spanActions.className = 'currencylist__item-actions'

//     const anchorFav = document.createElement('a')
//     anchorFav.className = 'link js-item-fav'
//     anchorFav.href="#"
//     anchorFav.setAttribute('data-code', code)

//     const  spanIcon = document.createElement('span')
//     spanIcon.className ='icon link__icon'

//     const svgFav = document.createElement('img')
//     svgFav.src = `${(!fav) ? './img/ico-fav-outline.svg' : './img/ico-fav-selected-outline.svg'}`
//     svgFav.alt = 'Add to favs'
//     spanIcon.appendChild(svgFav)
//     anchorFav.appendChild(spanIcon)
//     spanActions.appendChild(anchorFav)
//     liItem.appendChild(spanActions)

//     ulContainer.appendChild(liItem)


// }


// export const fillUlConcurrencyList = async() => {

//     const httpRequests = new fetchMethods()
//     const listItems = []

//     const response = await httpRequests.getAllData().then(
//         resp => {
//             for (const key in resp) {
//                 listItems.push({
//                     code: key,
//                     name: resp[key],
//                     fav: false
//                 })
//             }
//         }
//     )

//     // console.log(listItems)
//     listItems.forEach(drawItem);//(item => drawItem(item))

// }


// export const searchConcurrency = (term = '') => {

  

  

// }