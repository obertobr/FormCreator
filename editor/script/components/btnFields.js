import Heading from "./fields/heading.js"
import Input from "./fields/input.js"
import Submit from "./fields/submit.js"
import FormPage from "./formPage.js"

export default class BtnFields {
    btnFields = [
        {
            fieldType: Heading,
            button: document.getElementById("addHeading")
        },{
            fieldType: Input,
            button: document.getElementById("addInput")
        },{
            fieldType: Submit,
            button: document.getElementById("addSubmit")
        }
    ]

    constructor(){
        this.config()
    }

    config() {
        this.btnFields.forEach(({fieldType, button}) => {
            button.addEventListener("click", () => {
                this.formPage.getFields().createField(fieldType)
            })
        })
    }

    setFormPage(formPage) {
        this.formPage = formPage
    }
}