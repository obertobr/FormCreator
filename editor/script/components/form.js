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

    export(){
        let data = {
            size: this.size,
            bgColor: this.bgColor
        }
        
        return data
    }
    import(json) {
        Object.entries(json).forEach(([property, value]) => {
            this[property] = value
        })
        
        this.draw()
    }

    draw() {
        this.form.style.width = this.size
        this.form.style.backgroundColor = this.bgColor
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