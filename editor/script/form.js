jQuery(document).ready(function($){
    const submit = $("#form input[type=submit]")
    const listFields = Array.from($(".field"))

    function getFieldData() {
        let listFieldsValues = []
        listFields.forEach((field) => {
            let name = field.getAttribute("fieldname")
            let value = field.value

            listFieldsValues.push({
                name: name,
                value: value
            })
        })
        return listFieldsValues
    }

    function sendFieldData(data){
        $.post({
            url: formScriptAjax.url,
            data: {
                action: 'fmcr_saveFormData',
                data: data
            },
            success: function(res) {
                console.log(res)
            }
        })
    }

    submit.on("click", (e) => {
        e.preventDefault()
        sendFieldData(JSON.stringify(getFieldData()))
    })
})