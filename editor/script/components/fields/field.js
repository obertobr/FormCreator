export default class Field {
    menuOpen = false
    outline = false

    constructor(number, json){
        this.name = this.constructor.name + number;
    }

    import(json) {
        Object.entries(json).forEach(([property, value]) => {
            this[property] = value
        })
    }

    remove() {
        this.element.remove();
    }

    getField() {
        return this.element
    }

    setName(name) {
        this.name = name
    }
    getName(){
        return this.name
    }  
    setMenuOpen(bool) {
        this.menuOpen = bool
    }
    getMenuOpen(){
        return this.menuOpen
    }

    setWidth(width) {
        this.width = width
        this.element.style.width = width
    }
    getWidth(){
        return this.width
    }

    setOutline(bool) {
        this.outline = this.outline
        this.element.style.outline = bool ? "2px dashed #ff00006e": ""
    }
    getOutline(){
        return this.outline
    }
}