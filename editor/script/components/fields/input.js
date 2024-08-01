import Field from "./field.js";

export default class Input extends Field {
    text = "Some Title"
    size = "2em"
    align = "center"
    fontColor = "#000000"
    bgColor = ""

    constructor(name) {
        super(name)
        this.element = document.createElement("input")
        this.element.innerText = this.text
        this.element.style.fontSize = this.size
        this.element.style.textAlign = this.align
        this.element.style.color = this.fontColor
        this.element.style.backgroundColor = this.bgColor
    }

    setText(text) {
        this.text = text
        this.element.innerText = text
    }
    getText(){
        return this.text
    }

    setSize(size) {
        this.size = size
        this.element.style.fontSize = size
    }
    getSize(){
        return this.size
    }

    setAlign(align) {
        this.align = align
        this.element.style.textAlign = align
    }
    getAling(){
        return this.align
    }

    setFontColor(fontColor) {
        this.fontColor = fontColor
        this.element.style.color = fontColor
    }
    getFontColor(){
        return this.fontColor
    }

    setBgColor(bgColor) {
        this.bgColor = bgColor
        this.element.style.backgroundColor = bgColor
    }
    getBgColor(){
        return this.bgColor
    }
}