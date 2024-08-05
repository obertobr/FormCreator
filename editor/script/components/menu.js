import Fields from "./fields.js";
import Field from "./fields/field.js";
import FormMenu from "./fieldsMenus/formMenu.js";
import HeadingMenu from "./fieldsMenus/headingMenu.js";
import InputMenu from "./fieldsMenus/inputMenu.js";
import SubmitMenu from "./fieldsMenus/submitMenu.js";
import ListFields from "./listFields.js";

export default class Menu {
    fieldMenus = {
        "Form" : FormMenu,
        "Heading" : HeadingMenu,
        "Input" : InputMenu,
        "Submit": SubmitMenu 
    }

    constructor(menu, listFields){
        /**
        * @type {HTMLElement}
        */
        this.menu = menu
        /**
        * @type {ListFields}
        */
        this.listFields = listFields
    }

    clear() {
        this.menu.innerHTML = ""
    }

    setFields(fields) {
        /**
         * @type {Fields}
         */
        this.fields = fields
    }

    /**
    * @param {Field} element
    */
    addMenuField(element) {
        const [,menuField] = Object.entries(this.fieldMenus).find(([key,]) => key == element.constructor.name)
        const menuCell = new menuField(element, this.fields, this.listFields)

        this.menu.appendChild(menuCell)
    }
}