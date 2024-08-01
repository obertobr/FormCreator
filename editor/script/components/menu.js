import Fields from "./fields.js";
import Heading from "./fields/heading.js";
import ListFields from "./listFields.js";

export default class Menu {

    constructor(menu, listFields){
        /**
        * @type {HTMLElement}
        */
        this.menu = menu
        /**
        * @type {ListFields}
        */
        this.listFields = listFields
    }

    clear() {
        this.menu.innerHTML = ""
    }

    setFields(fields) {
        /**
         * @type {Fields}
         */
        this.fields = fields
    }

    /**
    * @param {Heading} element
    */
    addMenuField(element) {
        const field = document.createElement("div")
        field.classList.add("cell")
        console.log(element.getMenuOpen())
        field.innerHTML = `
            <div class="cell">
                <div class="title">
                    <div>
                        <span class="up">▲</span>
                        <span class="down" >▼</span>
                    </div>
                    <p></p>
                    <p class="delete">x</p>
                </div>
                <div class="content ${element.getMenuOpen() ? "" : "hide" }">
                    <div>
                        <label>nome</label>
                        <input type="text" value="name">
                    </div>
                    <div class="half">
                        <label>Size</label>
                        <input type="text" value="2em">
                    </div>
                    <div class="half">
                        <label>Align</label>
                        <select>
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                    <div class="half">
                        <label>Font Color</label>
                        <input type="color">
                    </div>
                    <div class="half">
                        <label>Bg Color</label>
                        <input type="color" value="#ffffff">
                    </div>
                </div>
            </div>
        `

        const up = field.querySelector(".up")
        const down = field.querySelector(".down")
        const title = field.querySelector(".title")
        const content = field.querySelector(".content")
        const name = field.querySelector("p")
        const del = field.querySelector(".delete")
        const input = field.querySelectorAll("input")
        const select = field.querySelector("select")

        name.innerText = element.getText()
        input[0].value = element.getText()
        input[1].value = element.getSize()
        select.value = element.getAling()
        input[2].value = element.getFontColor()
        input[3].value = element.getBgColor()

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
            this.listFields.removeField(element)
            field.remove()
        })

        up.addEventListener("click", (e) => {
            this.listFields.moveFieldUp(element)
            this.fields.reDrawFields()
        })
        down.addEventListener("click", (e) => {
            this.listFields.moveFieldDown(element)
            this.fields.reDrawFields()
        })

        input[0].addEventListener("input", (e) => {
            let text = e.target.value
            name.innerText = text
            element.setText(text)
        })
        input[1].addEventListener("input", (e) => {
            let text = e.target.value
            element.setSize(text)
        })
        select.addEventListener("change", (e) => {
            let text = e.target.value
            element.setAlign(text)
        })
        input[2].addEventListener("input", (e) => {
            let text = e.target.value
            element.setFontColor(text)
        })
        input[3].addEventListener("input", (e) => {
            let text = e.target.value
            element.setBgColor(text)
        })

        this.menu.appendChild(field)
    }
}