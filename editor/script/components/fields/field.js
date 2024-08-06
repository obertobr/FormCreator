export default class Field {
    menuOpen = false

    constructor(name, json){
        this.name = name;
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
}