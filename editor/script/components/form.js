import BtnFields from "./btnFields.js"
import FormPage from "./formPage.js"
import Menu from "./menu.js"

export default class Form {
    translateX = 0
    translateY = 0

    listPages = []

    constructor(menu, btnFields, form, selectPage, formName){
        /**
         * @type {Menu}
         */
        this.menu = menu
        /**
         * @type {BtnFields}
         */
        this.btnFields = btnFields
        /**
         * @type {HTMLElement}
         */
        this.form = form
        /**
         * @type {HTMLElement}
         */
        this.selectPage = selectPage
        /**
         * @type {HTMLElement}
         */
        this.formName = formName

        this.config()

        this.makeForm()
        this.setTranslate(0, -200)
    }

    config() {
        this.selectPage.addEventListener("change", (e) => {
            const value = e.target.value
            const formPage = this.listPages.find(page => page.getPosition() == value)
            
            this.setPage(formPage)
        })

        this.formName.addEventListener("input", (e) => {
            this.setFormName(e.target.value)
        })
    }

    clear() {
        this.form.innerHTML = "<button id=\"plus\">+</button>"
        this.selectPage.innerHTML = ""
        this.listPages = []
        this.selectedPage = null

        document.getElementById("plus").addEventListener("click", (e) => {
            this.makeForm()
        })
    }

    setPage(formPage) {
        this.listPages.forEach(page => {
            page.deselect()
        })

        this.selectedPage = formPage
        this.btnFields.setFormPage(formPage)
        this.menu.setPage(formPage)
        this.selectPage.value = formPage.getPosition()
        formPage.select()
    }

    makeForm(json) {
        const form = document.createElement("div")
        form.classList.add("form")

        this.form.appendChild(form)

        const option = document.createElement("option")
        option.value = this.listPages.length+1

        const formPage = new FormPage(this.listPages.length+1 ,form, this, this.menu, option)

        this.selectPage.appendChild(option)

        this.listPages.push(formPage)
        this.setPage(formPage)

        if(json){
            formPage.import(json)
        }
    }

    generatePage() {
        /**
         * @type {HTMLElement}
         */
        const clone = this.form.cloneNode(true)

        Array.from(clone.querySelectorAll(".pagination")).forEach((e) => {
            e.remove()
        })

        clone.querySelector("#plus").remove()

        clone.removeAttribute("style")

        return clone.outerHTML
    }

    setFormName(name) {
        this.name = name
        this.form.setAttribute("formname", name)
        this.formName.value = name
    }

    getFormName() {
        return this.name
    }

    getListPages() {
        return this.listPages
    }
        
    setTranslate(x, y) {
        this.translateX = x
        this.translateY = y

        this.form.style.translate = `${x}px calc(${y}px + 50%)`
    }
    getTranslate(){
        return [this.translateX, this.translateY]
    }

    setZoom(zoom) {
        this.form.style.zoom = zoom
    }
}