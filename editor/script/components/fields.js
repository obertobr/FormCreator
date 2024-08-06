import Heading from "./fields/heading.js";
import Input from "./fields/input.js";
import Submit from "./fields/submit.js";
import Form from "./form.js";
import ListFields from "./listFields.js";
import Menu from "./menu.js";

export default class Fields {
    fields = {
        "Heading" : Heading,
        "Input" : Input,
        "Submit": Submit
    }

    constructor(form, menu, listFields, btnFields){
        /**
        * @type {Form}
        */
        this.form = form
        /**
        * @type {Menu}
        */
        this.menu = menu
        /**
        * @type {ListFields}
        */
        this.listFields = listFields
        /**
        * @type {HTMLElement[]}
        */
        this.btnFields = btnFields

        this.config();

        this.menu.addMenuField(form)
    }

    config() {
        Object.entries(this.btnFields).map(([fieldName, button]) => {
            button.addEventListener("click", (e) => {
                this.createField(fieldName)
            })
        })
    }

    createField(fieldName, json) {
        let quantFields = this.listFields.getList().length + 1
        let element = new this.fields[fieldName](fieldName+quantFields, json)
        this.listFields.addField(element)
        this.menu.addMenuField(element)

        this.form.addField(element.getField())
    }

    reDrawFields() {
        let list = this.listFields.getList()
        this.form.clear()
        this.menu.clear()

        this.menu.addMenuField(this.form)

        list.forEach((field) => {
            this.form.addField(field.getField())
            this.menu.addMenuField(field)
        })
    }

    exportFields() {
        let list = this.listFields.getList()

        let listExportFields = []

        list.forEach((field) => {
            listExportFields.push({
                type: field.constructor.name,
                content: field.export()
            })
        })

        return listExportFields
    }

    importFields(listExpotedFields) {
        this.form.clear()
        this.menu.clear()

        this.menu.addMenuField(this.form)

        listExpotedFields.forEach((field) => {
            this.createField(field.type, field.content)
        })
    }
}