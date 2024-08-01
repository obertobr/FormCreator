import Form from "./components/form.js"
import DragAndDrop from "./components/dragAndDrop.js"
import Fields from "./components/fields.js";
import Menu from "./components/menu.js";
import ListFields from "./components/listFields.js";

const form = new Form(document.getElementById("form"))
const dragAndDrop = new DragAndDrop(form, document.body)
const listFields = new ListFields()
const menu = new Menu(document.getElementById("menu"), listFields)
const fields = new Fields(form, menu, listFields, document.getElementById("heading"))

menu.setFields(fields)