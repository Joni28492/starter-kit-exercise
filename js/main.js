
// import { HTMLElements } from "./HTMLElemnts.js";

import { fetchMethods } from "./api/fetch.js";
import { Draw } from "./Draw.js";
import { Favs } from "./Favs.js";

console.log('Your code starts here 🙂');

/*
* Reminder. To show/hide currency detail modal:
*
* 1) Add/remove class "has-overlay" to the body tag.
* 2) Add/remove class "currencydetail--show" to tag article with class "currencydetail".
*
*/


const favs = new Favs()
const http = new fetchMethods()
const drawInstance = new Draw(http, favs)



