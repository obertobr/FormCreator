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
                <input type="text">
            </div>
            <div>
                <label>Sub Title</label>
                <input type="text">
            </div>
            <div>
                <label>PlaceHolder</label>
                <input type="text">
            </div>
            <div>
                <label>Column Width</label>
                <input type="text">
            </div>
            <div class="">
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
                <input type="color">
            </div>
            <div class="half">
                <label>Min Length</label>
                <input type="text">
            </div>
            <div class="half">
                <label>Max Length</label>
                <input type="text">
            </div>
        `
        super(element, fields, listFields, html)


        const input = this.field.querySelectorAll("input")
        const select = this.field.querySelector("select")


        const listInputs = [
            [input[0], "Title", "input"],
            [input[1], "SubTitle", "input"],
            [input[2], "PlaceHolder", "input"],
            [input[3], "Width", "input"],
            [select, "Aling", "change"],
            [input[4], "FontColor", "input"],
            [input[5], "BgColor", "input"],
            [input[6], "MinLength", "input"],
            [input[7], "MaxLength", "input"],
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
}