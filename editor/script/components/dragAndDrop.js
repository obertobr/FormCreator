import Form from "./form.js";

export default class DragAndDrop {
    draged = false;
    initalMouseTranslate = [];
    initalFormTranslate = [];

    constructor(form, body){
        /**
        * @type {Form}
        */
        this.form = form
        /**
        * @type {HTMLElement}
        */
        this.body = body

        this.initialConfig()
    }

    initialConfig() {
        this.body.addEventListener("mousedown", (e) => {
            this.setDraged(true);
            this.setInitialMouseTranslate(e.pageX, e.pageY);
            this.setInitialFormTranslate(this.form.getTranslate());
        })

        this.body.addEventListener("mouseup", (e) => {
            this.setDraged(false);
        })

        this.body.addEventListener("mousemove", (e) => {
            if(this.getDraged()) {
                console.log(this.getInitalFormTranslate())
                let actualX = e.pageX;
                let actualY = e.pageY;
                let [initalMouseX, initialMouseY] = this.getInitialMouseTranslate();
                let [initalFormX, initalFormY] = this.getInitalFormTranslate();

                this.form.setTranslate(initalFormX + actualX - initalMouseX, initalFormY + actualY - initialMouseY);
            }
        })
    }

    /**
    * @param {boolean} bool
    */
    setDraged(bool){
        this.draged = bool
    }
    getDraged(){
        return this.draged
    }

    setInitialMouseTranslate(x, y){
        this.initalMouseTranslate = [x, y]
    }
    getInitialMouseTranslate() {
        return this.initalMouseTranslate
    }

    setInitialFormTranslate(formTranslate) {
        this.initalFormTranslate = formTranslate
    }
    getInitalFormTranslate() {
        return this.initalFormTranslate
    }
}