import Fields from "./fields.js"
import Form from "./form.js"
import FormPage from "./formPage.js"

export default class SaveAndLoad {
    constructor(form){
        /**
         * @type {Form}
         */
        this.form = form

        this.load()
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

        return JSON.stringify({
            name: this.form.getFormName(),
            pages: json
        })
    }

    import(json) {    
        if(json.fields != null){
            this.form.clear()

            json.fields.forEach(page => {
                this.form.makeForm(page)
            })
        }
        
        this.form.setFormName(json.formName)
    }

    async save() {
        const json = this.export()

        const response = await this.ajaxFetch({
            action: "fmcr_saveForm",
            data: json,
            html: this.form.generatePage()
        })
        
        console.log(response)
    }

    async load() {
        const response = await this.ajaxFetch({
            action: "fmcr_getForm"
        })

        this.import(response)
    }

    async ajaxFetch(content) {
        const urlParams = new URLSearchParams(window.location.search);

        return await fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                ...content,
                id: urlParams.get("id")
            })
        }).then(response => {
            return response.json()
        })
    }
}