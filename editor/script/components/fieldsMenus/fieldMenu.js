export default class FieldMenu {
    constructor(element, fields, listFields, html) {
        const field = document.createElement("div")
        field.classList.add("cell")

        field.innerHTML = `
            <div class="title">
                <div>
                    <span class="up">▲</span>
                    <span class="down">▼</span>
                </div>
                <p></p>
                <p class="delete">x</p>
            </div>
            <div class="content ${element.getMenuOpen() ? "" : "hide" }">
                ${html}
            </div>
        `

        const up = field.querySelector(".up")
        const down = field.querySelector(".down")
        const title = field.querySelector(".title")
        const content = field.querySelector(".content")
        const name = field.querySelector("p")
        const del = field.querySelector(".delete")

        name.innerText = element.getName()

        title.addEventListener("click", (e) => {
            if(e.target.closest(".up") || e.target.closest(".down")){
                return
            }
            if(content.classList.contains("hide")){
                content.classList.remove("hide")
                title.classList.add("on")
            } else {
                content.classList.add("hide")
                title.classList.remove("on")
            }
            element.setMenuOpen(!element.getMenuOpen());
        })
        del.addEventListener("click", (e)=> {
            listFields.removeField(element)
            field.remove()
        })

        up.addEventListener("click", (e) => {
            listFields.moveFieldUp(element)
            fields.reDrawFields()
        })
        down.addEventListener("click", (e) => {
            listFields.moveFieldDown(element)
            fields.reDrawFields()
        })

        return field
    }
}