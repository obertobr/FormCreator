export default class FieldMenu {

    constructor(element, fields, listFields, html) {
        this.field = document.createElement("div")
        this.field.classList.add("cell")

        this.field.innerHTML = `
            <div class="title">
                <div>
                    <span class="up">▲</span>
                    <span class="down">▼</span>
                </div>
                <p></p>
                <p class="delete">x</p>
            </div>
            <div class="content" style="max-height:${element.getMenuOpen() ? this.maxHeight : "0" }px">
                ${html}
            </div>
        `

        const up = this.field.querySelector(".up")
        const down = this.field.querySelector(".down")
        const title = this.field.querySelector(".title")
        const content = this.field.querySelector(".content")
        const name = this.field.querySelector("p")
        const del = this.field.querySelector(".delete")

        name.innerText = element.getName()

        title.addEventListener("click", (e) => {
            if(e.target.closest(".up") || e.target.closest(".down")){
                return
            }
            if(element.getMenuOpen()){
                content.style.maxHeight = `0px`
                title.classList.remove("on")
            } else {
                content.style.maxHeight = `${this.maxHeight}px`
                title.classList.add("on")
            }
            element.setMenuOpen(!element.getMenuOpen());
        })
        del.addEventListener("click", (e)=> {
            listFields.removeField(element)
            this.field.remove()
        })

        up.addEventListener("click", (e) => {
            listFields.moveFieldUp(element)
            fields.reDrawFields()
        })
        down.addEventListener("click", (e) => {
            listFields.moveFieldDown(element)
            fields.reDrawFields()
        })
    }

    getField() {
        return this.field
    }

    setHeight() {
        const content = this.field.querySelector(".content")

        this.maxHeight = content.scrollHeight
    }
}