export default class FormMenu {
    constructor(element) {
        const field = document.createElement("div")
        field.classList.add("cell")

        field.innerHTML = `
            <div class="title">
                <p></p>
            </div>
            <div class="content ${element.getMenuOpen() ? "" : "hide" }">
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

        const title = field.querySelector(".title")
        const content = field.querySelector(".content")
        const name = field.querySelector("p")

        name.innerText = "form"

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

        const input = field.querySelectorAll("input")

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

        return field
    }
}