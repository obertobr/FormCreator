import Fields from "./fields.js"
import Form from "./form.js"

export default class SaveAndLoad {
    constructor(form, fields){
        /**
         * @type {Form}
         */
        this.form = form
        /**
         * @type {Fields}
         */
        this.fields = fields
    }

    export() {
        const json = {
            form: this.form.export(),
            fields: this.fields.exportFields()
        }

        return JSON.stringify(json)
    }

    import(code) {
        const json = JSON.parse(code)

        this.form.import(json.form)
        this.fields.importFields(json.fields)
    }
}