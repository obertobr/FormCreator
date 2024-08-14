import Form from "./form.js"
import FormPage from "./formPage.js"
import Header from "./header.js"

export default class SaveAndLoad {
    constructor(form, header){
        /**
         * @type {Form}
         */
        this.form = form
        /**
         * @type {Header}
         */
        this.header = header

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

    exportSettings(){
        const settings = {
            email: this.header.getEmailSettings()
        }

        return JSON.stringify(settings)
    }

    async save() {
        const json = this.export()

        const response = await this.ajaxFetch({
            action: "fmcr_saveForm",
            data: json,
            html: this.form.generatePage(),
            settings: this.exportSettings()
        })
        
        console.log(response)
    }

    async load() {
        const response = await this.ajaxFetch({
            action: "fmcr_getForm"
        })

        this.import(response)
        
        this.header.setEmailSettings({
            senderName: response.senderName,
            senderEmail: response.senderEmail,
            sendEmailTo: response.sendEmailTo
        })
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