export default class Form {
    menuOpen = false

    size = "500px"
    bgColor = "#ffffff"

    translateX = 0
    translateY = 0

    constructor(form) {
        /**
        * @type {HTMLElement}
        */
        this.form = form

        this.setTranslate(0, -200)
    }

    setTranslate(x, y) {
        this.translateX = x
        this.translateY = y

        this.form.style.translate = `${x}px calc(${y}px + 50%)`
    }
    getTranslate(){
        return [this.translateX, this.translateY]
    }

    setZoom(zoom) {
        this.form.style.zoom = zoom
    }

    /**
    * @param {HTMLElement} field
    */
    addField(field){
        this.form.appendChild(field)
    }

    clear() {
        this.form.innerText = ""
    }

    exportForm() {
        this.form.style = ""

        const html = this.form.outerHTML

        const [x, y] = this.getTranslate()
        this.setTranslate(x, y)

        return html
    }

    setMenuOpen(bool) {
        this.menuOpen = bool
    }
    getMenuOpen(){
        return this.menuOpen
    }

    setSize(size) {
        this.size = size
        this.form.style.width = size
    }
    getSize(){
        return this.size
    }

    setBgColor(bgColor) {
        this.bgColor = bgColor
        this.form.style.backgroundColor = bgColor
    }
    getBgColor(){
        return this.bgColor
    }
}