import Form from "./components/form.js"
import DragAndDrop from "./components/dragAndDrop.js"
import Fields from "./components/fields.js";
import Menu from "./components/menu.js";
import ListFields from "./components/listFields.js";
import Header from "./components/header.js";
import SaveAndLoad from "./components/saveAndLoad.js";

const btnFields = {
    "Heading" : document.getElementById("addHeading"),
    "Input": document.getElementById("addInput"),
    "Submit": document.getElementById("addSubmit")
}

const form = new Form(document.getElementById("form"))
const dragAndDrop = new DragAndDrop(form, document.body, document.getElementById("magnifier"))
const listFields = new ListFields()
const menu = new Menu(document.getElementById("menu"), listFields)
const fields = new Fields(form, menu, listFields, btnFields)
menu.setFields(fields)

const header = new Header(document.getElementById("navbar"), document.getElementById("view"))
const saveAndLoad = new SaveAndLoad(form, fields)

document.getElementById("exportHTML").addEventListener("click", (e) => {
    console.log(form.exportForm())
})

document.getElementById("export").addEventListener("click", (e) => {
    console.log(saveAndLoad.export())
})

document.getElementById("import").addEventListener("click", (e) => {
    let json = prompt("Cole o codigo")
    saveAndLoad.import(json)
})