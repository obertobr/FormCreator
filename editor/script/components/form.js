export default class Form {
    translateX = 0;
    translateY = 0;

    constructor(form) {
        /**
        * @type {HTMLElement}
        */
        this.form = form
    }

    setTranslate(x, y) {
        this.translateX = x;
        this.translateY = y;

        this.form.style.translate = `${x}px ${y}px`
    }
    getTranslate(){
        return [this.translateX, this.translateY]
    }
}