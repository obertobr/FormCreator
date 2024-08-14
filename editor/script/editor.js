import Form from "./components/form.js"
import DragAndDrop from "./components/dragAndDrop.js"
import Menu from "./components/menu.js";
import Header from "./components/header.js";
import SaveAndLoad from "./components/saveAndLoad.js";
import BtnFields from "./components/btnFields.js";

const btnFields = {
    "Heading" : document.getElementById("addHeading"),
    "Input": document.getElementById("addInput"),
    "Submit": document.getElementById("addSubmit")
}

const btns = new BtnFields()
const menu = new Menu(document.getElementById("menuContent"))
const form = new Form(menu, btns, document.getElementById("forms"), document.getElementById("selectPage"), document.getElementById("formName"))
const dragAndDrop = new DragAndDrop(form, document.body, document.getElementById("magnifier"))
const header = new Header(document.getElementById("navbar"), document.getElementById("view"), document.getElementById("content"))
const saveAndLoad = new SaveAndLoad(form, header)

document.getElementById("save").addEventListener("click", (e) => {
    saveAndLoad.save()
})

document.getElementById("plus").addEventListener("click", (e) => {
    form.makeForm()
})