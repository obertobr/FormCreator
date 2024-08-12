import Heading from "./fields/heading.js";
import Input from "./fields/input.js";
import Submit from "./fields/submit.js";
import FormPage from "./formPage.js";
import ListFields from "./listFields.js";
import Menu from "./menu.js";

export default class Fields {
    fields = {
        "Heading" : Heading,
        "Input" : Input,
        "Submit": Submit
    }

    constructor(formPage, menu){
        /**
        * @type {FormPage}
        */
        this.formPage = formPage
        /**
        * @type {Menu}
        */
        this.menu = menu

        this.listFields = new ListFields()
    }

    getListFields() {
        return this.listFields
    }

    createField(fieldType, json) {
        let quantFields = this.listFields.getList().length + 1
        let element = new fieldType(quantFields, json)
        this.listFields.addField(element)
        this.menu.addMenuField(element, this, this.listFields)

        this.formPage.addField(element.getField())
    }

    reDrawFields() {
        let list = this.listFields.getList()
        this.formPage.clear()
        this.menu.clear()

        this.menu.addMenuField(this.formPage, this, this.listFields)

        list.forEach((field) => {
            this.formPage.addField(field.getField())
            this.menu.addMenuField(field, this, this.listFields)
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
        this.menu.clear()

        this.menu.addMenuField(this.formPage, this, this.listFields)

        listExpotedFields.forEach((field) => {
            this.createField(this.fields[field.type], field.content)
        })
    }
}