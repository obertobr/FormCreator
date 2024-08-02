import Submit from "../fields/submit.js";
import FieldMenu from "./fieldMenu.js";

export default class SubmitMenu extends FieldMenu {
        /**
         * @param {Submit} element 
         */
    constructor(element, fields, listFields) {
        const html = `
            <div>
                <label>Name</label>
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
                <label>Btn Color</label>
                <input type="color" value="#ffffff">
            </div>
            <div>
                <label>Bg Color</label>
                <input type="color" value="#ffffff">
            </div>
        `
        const field = super(element, fields, listFields, html)


        const input = field.querySelectorAll("input")
        const select = field.querySelector("select")


        const listInputs = [
            [input[0], "Text", "input"],
            [input[1], "Size", "input"],
            [select, "Aling", "change"],
            [input[2], "FontColor", "input"],
            [input[3], "BtnColor", "input"],
            [input[4], "BgColor", "input"],
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