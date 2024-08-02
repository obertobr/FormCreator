import Field from "./field.js";

export default class Input extends Field {
    title = "Name"
    subTitle = "Complete Name"
    align = "center"
    fontColor = "#000000"
    bgColor = ""

    constructor(name) {
        super(name)
        this.element = document.createElement("div")
        this.element.innerHTML = `
            <div>
                <span class="title">Name</span>
                <span class="subTitle">Complete Name</span>
            </div>
            <input type="text">
        `

        this.element.classList.add("input")
        this.titleField = this.element.querySelector(".title")
        this.subTitleField = this.element.querySelector(".subTitle")

        this.titleField.innerText = this.title
        this.subTitleField.innerText = this.subTitle
        this.element.style.textAlign = this.align
        this.element.style.color = this.fontColor
        this.element.style.backgroundColor = this.bgColor
    }

    setTitle(title) {
        this.title = title
        this.titleField.innerText = title
    }
    getTitle(){
        return this.title
    }

    setSubTitle(subTitle) {
        this.subTitle = subTitle
        this.subTitleField.innerText = subTitle
    }
    getSubTitle() {
        return this.subTitle
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