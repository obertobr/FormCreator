export default class FormMenu {
    constructor(element) {
        this.field = document.createElement("div")
        this.field.classList.add("cell")

        this.field.innerHTML = `
            <div class="title">
                <p></p>
            </div>
            <div class="content" style="max-height:${element.getMenuOpen() ? this.maxHeight : "0" }px">
                <div>
                    <label>Width</label>
                    <input type="text" value="500px">
                </div>
                <div>
                    <label>Bg Color</label>
                    <input type="color" value="#ffffff">
                </div>
            </div>
        `

        const title = this.field.querySelector(".title")
        const content = this.field.querySelector(".content")
        const name = this.field.querySelector("p")

        name.innerText = "form"

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

        const input = this.field.querySelectorAll("input")

        const listInputs = [
            [input[0], "Size", "input"],
            [input[1], "BgColor", "input"],
        ]

        listInputs.forEach(([inputElement, name, typeInput]) => {
            const get = `get${name}`
            const set = `set${name}`

            inputElement.value = element[get]()

            inputElement.addEventListener(typeInput, (e) => {
                let value = e.target.value
                element[set](value)
            })
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