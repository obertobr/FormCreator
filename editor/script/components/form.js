import BtnFields from "./btnFields.js"
import FormPage from "./formPage.js"
import Menu from "./menu.js"

export default class Form {
    translateX = 0
    translateY = 0

    listPages = []

    constructor(menu, btnFields, form, selectPage){
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

        this.config()

        this.makeForm()
    }

    config() {
        this.selectPage.addEventListener("change", (e) => {
            const value = e.target.value
            const formPage = this.listPages.find(page => page.getPosition() == value)
            
            this.setPage(formPage)
        })
    }

    clear() {
        this.form.innerHTML = ""
        this.selectPage.innerHTML = ""
        this.listPages = []
        this.selectedPage = null
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

        console.log(clone.outerHTML)
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