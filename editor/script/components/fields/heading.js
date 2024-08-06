import Field from "./field.js"

export default class Heading extends Field {
    text = "Some Title"
    width = "100%"
    size = "2em"
    align = "center"
    fontColor = "#000000"
    bgColor = ""

    constructor(name, json) {
        super(name);
        if(json){this.import(json)}

        this.element = document.createElement("h1")
        this.element.classList.add("heading")
        this.element.setAttribute("fieldname", this.name)
        this.element.setAttribute("fieldtitle", this.text)
        this.element.innerText = this.text
        this.element.style.width = this.width
        this.element.innerText = this.text
        this.element.style.fontSize = this.size
        this.element.style.textAlign = this.align
        this.element.style.color = this.fontColor
        this.element.style.backgroundColor = this.bgColor
    }

    export(){
        let data = {
            name: this.name,
            text: this.text,
            width: this.width,
            size: this.size,
            align: this.align,
            fontColor: this.fontColor,
            bgColor: this.bgColor
        }
        
        return data
    }

    setText(text) {
        this.text = text
        this.element.innerText = text
        this.element.setAttribute("fieldtitle", text)
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

    setAling(align) {
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