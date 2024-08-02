import Input from "../fields/input.js"
import FieldMenu from "./fieldMenu.js"

export default class InputMenu extends FieldMenu {
    /**
     * @param {Input} element 
     */
    constructor(element, fields, listFields) {
        const html = `
            <div>
                <label>Title</label>
                <input type="text" value="name">
            </div>
            <div>
                <label>Sub Title</label>
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
        `
        const field = super(element, fields, listFields, html)


        const input = field.querySelectorAll("input")
        const select = field.querySelector("select")


        const listInputs = [
            [input[0], "Title", "input"],
            [input[1], "SubTitle", "input"],
            [input[2], "Size", "input"],
            [select, "Aling", "change"],
            [input[3], "FontColor", "input"],
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