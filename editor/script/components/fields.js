import Heading from "./fields/heading.js";
import Form from "./form.js";
import ListFields from "./listFields.js";
import Menu from "./menu.js";

export default class Fields {

    constructor(form, menu, listFields, heading){
        /**
        * @type {HTMLElement}
        */
        this.heading = heading
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

        this.config();
    }

    config() {
        this.heading.addEventListener("click", (e) => {
            this.addHeading()
        })
    }

    addHeading() {
        let element = new Heading()
        this.listFields.addField(element)
        this.menu.addMenuField(element)

        this.form.addField(element.getHeading())
    }

    reDrawFields() {
        let list = this.listFields.getList()
        this.form.clear()
        this.menu.clear()
        list.map((e) => {
            this.form.addField(e.getHeading())
            this.menu.addMenuField(e)
        })
    }
}