import Form from "./form.js";

export default class DragAndDrop {
    draged = false;
    initalMouseTranslate = [];
    initalFormTranslate = [];
    sensibility = 1;
    zoom = 1;

    constructor(form, body, magnifier){
        /**
        * @type {Form}
        */
        this.form = form
        /**
        * @type {HTMLElement}
        */
        this.body = body
        /**
        * @type {HTMLElement}
        */
        this.magnifier = magnifier

        this.initialConfig()
    }

    initialConfig() {
        this.body.addEventListener("mousedown", (e) => {
            if(e.target.classList.contains("fmcr")){
                e.preventDefault()
                this.setDraged(true);
                this.setInitialMouseTranslate(e.pageX, e.pageY);
                this.setInitialFormTranslate(this.form.getTranslate());
            }
        })

        this.body.addEventListener("mouseup", (e) => {
            this.setDraged(false);
        })

        this.body.addEventListener("mousemove", (e) => {
            if(this.getDraged()) {
                let actualX = e.pageX;
                let actualY = e.pageY;
                let [initalMouseX, initialMouseY] = this.getInitialMouseTranslate();
                let [initalFormX, initalFormY] = this.getInitalFormTranslate();

                let newFormX = initalFormX + ((actualX - initalMouseX) * this.getSensibility())
                let newFormY = initalFormY + ((actualY - initialMouseY) * this.getSensibility())

                this.form.setTranslate(newFormX, newFormY);
            }
        })

        this.body.addEventListener("wheel", (e) => {
            if(e.target.closest("#menu") || e.target.closest("#header")){
                return;
            }
            
            if(e.deltaY < 0) {
                this.zoom += 0.1
                this.setSensibility(this.getSensibility() / 1.065)
            } else {
                if(this.zoom > 0.2){
                    this.zoom -= 0.1
                    this.setSensibility(this.getSensibility() * 1.065)
                }
            }
            this.form.setZoom(this.zoom)
        })

        this.magnifier.addEventListener("click", (e) => {
            this.zoom = 1
            this.form.setZoom(this.zoom)
            this.setSensibility(1)
        })
    }

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

    setSensibility(sensibility) {
        this.sensibility = sensibility;
    }
    getSensibility() {
        return this.sensibility;
    }
}