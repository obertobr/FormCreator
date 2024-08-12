import Form from "./components/form.js"
import DragAndDrop from "./components/dragAndDrop.js"
import Fields from "./components/fields.js";
import Menu from "./components/menu.js";
import ListFields from "./components/listFields.js";
import Header from "./components/header.js";
import SaveAndLoad from "./components/saveAndLoad.js";
import FormPage from "./components/formPage.js";
import BtnFields from "./components/btnFields.js";

const btnFields = {
    "Heading" : document.getElementById("addHeading"),
    "Input": document.getElementById("addInput"),
    "Submit": document.getElementById("addSubmit")
}

const btns = new BtnFields()
const menu = new Menu(document.getElementById("menuContent"))
const form = new Form(menu, btns, document.getElementById("forms"), document.getElementById("selectPage"))
const dragAndDrop = new DragAndDrop(form, document.body, document.getElementById("magnifier"))

const header = new Header(document.getElementById("navbar"), document.getElementById("view"))
const saveAndLoad = new SaveAndLoad(form)

document.getElementById("exportHTML").addEventListener("click", (e) => {
    console.log(formPage.exportForm())
})

document.getElementById("export").addEventListener("click", (e) => {
    console.log(saveAndLoad.export())
})

document.getElementById("import").addEventListener("click", (e) => {
    let json = prompt("Cole o codigo")
    saveAndLoad.import(json)
})

document.getElementById("plus").addEventListener("click", (e) => {
    form.makeForm()
})