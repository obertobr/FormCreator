import Field from "./field.js";

export default class Input extends Field {
    title = "Name"
    subTitle = "Complete Name"
    placeHolder = ""
    width = "100%"
    align = "center"
    fontColor = "#000000"
    bgColor = ""
    minLength = ""
    maxLength = ""

    constructor(name, json) {
        super(name)
        if(json){this.import(json)}

        this.element = document.createElement("div")
        this.element.innerHTML = `
            <div>
                <span class="title">Name</span>
                <span class="subTitle">Complete Name</span>
            </div>
            <input type="text" class="field">
        `

        this.element.classList.add("input")
        this.element.setAttribute("fieldname", this.name)
        this.element.setAttribute("fieldtitle", this.title)
        this.titleField = this.element.querySelector(".title")
        this.subTitleField = this.element.querySelector(".subTitle")
        this.input = this.element.querySelector("input")

        this.titleField.innerText = this.title
        this.subTitleField.innerText = this.subTitle
        this.input.placholder = this.placeHolder
        this.element.style.width = this.width
        this.element.style.textAlign = this.align
        this.element.style.color = this.fontColor
        this.element.style.backgroundColor = this.bgColor
        this.input.minlength = this.minLength
        this.input.maxlength = this.maxLength
    }

    export(){
        let data = {
            name: this.name,
            title: this.title,
            subTitle: this.subTitle,
            placeHolder: this.placeHolder,
            width: this.width,
            align: this.align,
            fontColor: this.fontColor,
            bgColor: this.bgColor,
            minLength: this.minLength,
            maxLength: this.maxLength
        }
        
        return data
    }

    setTitle(title) {
        this.title = title
        this.titleField.innerText = title
        this.element.setAttribute("fieldtitle", title)
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

    setPlaceHolder(placeHolder) {
        this.placeHolder = placeHolder
        this.input.placeholder = placeHolder
    }
    getPlaceHolder() {
        return this.placeHolder
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

    setMinLength(minLength) {
        this.minLength = minLength
        this.input.setAttribute("minlength", minLength)
    }
    getMinLength(){
        return this.minLength
    }

    setMaxLength(maxLength) {
        this.maxLength = maxLength
        console.log("test")
        this.input.setAttribute("maxlength", maxLength)
    }
    getMaxLength(){
        return this.maxLength
    }
}