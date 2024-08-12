import Fields from "./fields.js"
import Form from "./form.js"
import FormPage from "./formPage.js"

export default class SaveAndLoad {
    constructor(form){
        /**
         * @type {Form}
         */
        this.form = form
    }

    export() {
        /**
         * @type {FormPage[]}
         */
        const listPages = this.form.getListPages()

        const json = []

        listPages.forEach((page) => {
            json.push({
                id: page.getPosition(),
                content: page.export()
            })
        })

        return JSON.stringify(json)
    }

    import(code) {
        const json = JSON.parse(code)
        
        this.form.clear()
        
        json.forEach(page => {
            this.form.makeForm(page)
        })
    }
}