export default class Header {
    constructor(navbar, view){
        /**
         * @type {HTMLElement}
         */
        this.navbar = navbar
        /**
         * @type {HTMLElement}
         */
        this.view = view

        this.getClickOut = this.getClickOut.bind(this);

        this.config()
    }

    config() {
        const buttons = this.navbar.querySelectorAll("button")

        buttons[0].addEventListener("click", (e) => {
            this.showSettings()
        })
    }

    showSettings() {
        //this.view.innerHTML = `
        //    tste
        //`
        this.showView()
    }

    showView() {
        this.view.style.display = "flex"
        document.body.addEventListener("click", this.getClickOut)
    }

    hideView() {
        this.view.style.display = "none"
        document.body.removeEventListener("click", this.getClickOut)
    }

    getClickOut(e) {
        if(!e.target.closest("#header")){
            this.hideView()
        }
    }
}