import Fields from "./fields.js";
import Field from "./fields/field.js";
import FieldMenu from "./fieldsMenus/fieldMenu.js";
import FormPageMenu from "./fieldsMenus/formPageMenu.js";
import HeadingMenu from "./fieldsMenus/headingMenu.js";
import InputMenu from "./fieldsMenus/inputMenu.js";
import SubmitMenu from "./fieldsMenus/submitMenu.js";
import FormPage from "./formPage.js";
import ListFields from "./listFields.js";

export default class Menu {
    fieldMenus = {
        "FormPage" : FormPageMenu,
        "Heading" : HeadingMenu,
        "Input" : InputMenu,
        "Submit": SubmitMenu
    }

    constructor(menu){
        /**
        * @type {HTMLElement}
        */
        this.menu = menu
    }

    clear() {
        this.menu.innerHTML = ""
    }

    /**
     * 
     * @param {FormPage} formPage
     * @param {Fields} fields 
     * @param {ListFields} listFields 
     */
    setPage(formPage) {
        const fields = formPage.getFields()
        const listFields = fields.getListFields()

        this.clear()
        
        this.addMenuField(formPage, fields, listFields)

        listFields.getList().forEach((field) => {
            this.addMenuField(field, fields, listFields)
        })
    }

    /**
    * @param {Field} field
    */
    addMenuField(field, fields, listFields) {
        const [,menuField] = Object.entries(this.fieldMenus).find(([key,]) => key == field.constructor.name)
        /**
         * @type {FieldMenu}
         */
        const menuCell = new menuField(field, fields, listFields)

        this.menu.appendChild(menuCell.getField())
        menuCell.setHeight()
    }
}