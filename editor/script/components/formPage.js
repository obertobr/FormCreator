import Fields from "./fields.js"
import Form from "./form.js"

export default class FormPage {
    menuOpen = false
    
    size = "500px"
    bgColor = "#ffffff"

    constructor(position, formElement, form, menu, option) {
        this.position = position
        
        /**
        * @type {HTMLElement}
        */
        this.formElement = formElement
        /**
         * @type {Form}
         */
        this.form = form
        /**
        * @type {HTMLElement}
        */
        this.option = option
        
        this.fields = new Fields(this, menu)

        this.setName(`Page${position}`)
        this.clear()
    }

    export(){
        let data = {
            name: this.name,
            size: this.size,
            bgColor: this.bgColor,
            fields: this.fields.exportFields()
        }
        
        return data
    }

    import(json){
        this.setName(json.content.name)
        this.setSize(json.content.size)
        this.setBgColor(json.content.bgColor)
        this.fields.importFields(json.content.fields)
    }

    addField(field){
        this.formElement.appendChild(field)
    }

    makePagination() {
        const div = document.createElement("div")
        div.classList.add("pagination")
        div.innerHTML = `
            <div>
                <span>${this.position}</span>
            </div>
            <input type="text" value="${this.name}" />
        `

        const input = div.querySelector("input")
        this.btn = div.querySelector("div")

        input.addEventListener("input", (e) => {
            this.setName(e.target.value)
        })

        this.btn.addEventListener("click", (e) => {
            this.form.setPage(this)
            this.select()
        })

        return div
    }
    
    select() {
        this.btn.classList.add("selected")
    }

    deselect() {
        this.btn.classList.remove("selected")
    }

    clear() {
        this.formElement.innerText = ""
        this.formElement.appendChild(this.makePagination())
    }
    

    getPosition() {
        return this.position
    }

    setName(name) {
        this.name = name
        this.option.innerText = name
    }
    getName() {
        return this.name
    }

    getFields() {
        return this.fields
    }

    setMenuOpen(bool) {
        this.menuOpen = bool
    }
    getMenuOpen(){
        return this.menuOpen
    }

    setSize(size) {
        this.size = size
        this.formElement.style.width = size
    }
    getSize(){
        return this.size
    }

    setBgColor(bgColor) {
        this.bgColor = bgColor
        this.formElement.style.backgroundColor = bgColor
    }
    getBgColor(){
        return this.bgColor
    }
}