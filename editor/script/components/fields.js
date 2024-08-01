import Heading from "./fields/heading.js";
import Input from "./fields/input.js";
import Form from "./form.js";
import ListFields from "./listFields.js";
import Menu from "./menu.js";

export default class Fields {
    fields = {
        "Heading" : Heading,
        "Input" : Input
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
    }

    config() {
        Object.entries(this.btnFields).map(([fieldName, button]) => {
            button.addEventListener("click", (e) => {
                this.createField(fieldName)
            })
        })
    }

    createField(fieldName) {
        let quantFields = this.listFields.getList().length + 1
        let element = new this.fields[fieldName](fieldName+quantFields)
        this.listFields.addField(element)
        this.menu.addMenuField(element)

        this.form.addField(element.getField())
    }

    reDrawFields() {
        let list = this.listFields.getList()
        this.form.clear()
        this.menu.clear()
        list.map((e) => {
            this.form.addField(e.getField())
            this.menu.addMenuField(e)
        })
    }
}