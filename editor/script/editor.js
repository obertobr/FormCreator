import Form from "./components/form.js"
import DragAndDrop from "./components/dragAndDrop.js"

const form = new Form(document.getElementById("form"))
const dragAndDrop = new DragAndDrop(form, document.body);