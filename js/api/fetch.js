export class fetchMethods {

    // https://github.com/fawazahmed0/currency-api#free-currency-rates-api
    url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest'

    // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json
    async getAllData(minified=true){   
        const resp = await fetch(`${this.url}/currencies${(minified) && '.min'}.json`);
        return  await resp.json()

    }

    // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.min.json
    //todo more options
    async getByCurrencyCode(code="eur", minified=true) {
        const resp = await fetch(`${this.url}/currencies/${code}${(minified) && '.min'}.json`);
        return  await resp.json()
    }


    // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json
    async getJPYByCode (code ="eur") {
        const resp = await fetch(`${this.url}/currencies/${code}/jpy.json`);
        return  await resp.json()
    }




}