export default class Header {
    senderName= ""
    senderEmail = ""

    sendEmailTo = ""

    constructor(navbar, view, content){
        /**
         * @type {HTMLElement}
         */
        this.navbar = navbar
        /**
         * @type {HTMLElement}
         */
        this.view = view
        /**
         * @type {HTMLElement}
         */
        this.content = content

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
        this.content.innerHTML = `
            <h2>Email Setup</h2>
            <hr>
            <input type="text" placeholder="Sender name" value="${this.senderName}"/>
            <input type="text" placeholder="Sender email" value="${this.senderEmail}"/>
            <br>
            <h2>Email Notifications</h2>
            <hr>
            <label>Send Email To</label>
            <input type="text" placeholder="email@email.com" value="${this.sendEmailTo}"/>
        `
        const inputs = this.content.querySelectorAll("input")

        inputs[0].addEventListener("input", (e) =>{
            this.senderName = e.target.value
        })
        inputs[1].addEventListener("input", (e) =>{
            this.senderEmail = e.target.value
        })

        inputs[2].addEventListener("input", (e) =>{
            this.sendEmailTo = e.target.value
        })

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

    getEmailSettings() {
        return {
            senderName: this.senderName,
            senderEmail: this.senderEmail,
            sendEmailTo: this.sendEmailTo
        }
    }

    setEmailSettings({senderName, senderEmail, sendEmailTo}) {
        this.senderName = senderName
        this.senderEmail = senderEmail
        this.sendEmailTo = sendEmailTo
        console.log(this)
    }
}