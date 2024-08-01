export default class Field {
    menuOpen = false

    constructor(name){
        this.name = name;
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