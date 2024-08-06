import Field from "./field.js";

export default class Submit extends Field {
    text = "Submit Form"
    size = "1.5em"
    align = "center"
    fontColor = "#ffffff"
    btnColor = "#5d7aff"
    bgColor = ""

    constructor(name, json) {
        super(name)
        if(json){this.import(json)}

        this.element = document.createElement("div")
        this.element.innerHTML = `
            <input type="submit">
        `

        this.element.classList.add("submit")
        this.inputField = this.element.querySelector("input")

        this.inputField.value = this.text
        this.inputField.style.fontSize = this.size
        this.element.style.justifyContent = this.align
        this.inputField.style.color = this.fontColor
        this.inputField.style.backgroundColor = this.btnColor
        this.element.style.backgroundColor = this.bgColor
    }

    export(){
        let data = {
            name: this.name,
            text: this.text,
            size: this.size,
            align: this.align,
            btnColor: this.btnColor,
            bgColor: this.bgColor
        }
        
        return data
    }

    setText(text) {
        this.text = text
        this.inputField.value = text
    }
    getText(){
        return this.text
    }

    setSize(size) {
        this.size = size
        this.inputField.style.fontSize = size
    }
    getSize(){
        return this.size
    }

    setAling(align) {
        this.align = align
        this.element.style.justifyContent = align
    }
    getAling(){
        return this.align
    }

    setFontColor(fontColor) {
        this.fontColor = fontColor
        this.inputField.style.color = fontColor
    }
    getFontColor(){
        return this.fontColor
    }

    setBtnColor(btnColor) {
        this.btnColor = btnColor
        this.inputField.style.backgroundColor = btnColor
    }
    getBtnColor(){
        return this.btnColor
    }

    setBgColor(bgColor) {
        this.bgColor = bgColor
        this.element.style.backgroundColor = bgColor
    }
    getBgColor(){
        return this.bgColor
    }
}