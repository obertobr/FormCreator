jQuery(document).ready(function($){
    const form = $("#form")
    const submit = $("#form input[type=submit]")
    const listFields = $(".field")

    function getFieldData() {
        let listFieldsValues = []
        form.children().each(function() {
            if($(this).hasClass("submit")) { return }

            let title = $(this).attr("fieldtitle")
            let name = $(this).attr("fieldname")
            let type = $(this).attr("class")
            let value

            if($(this).is("h1")){
                value = $(this).text()
            } else {
                value = $(this).find("input").val()
            }

            listFieldsValues.push({
                title, title,
                value: value,
                type, type,
                name: name,
            })
        })
        return listFieldsValues
    }

    function sendFormData(data){
        data = {
            name: form.attr("formname"),
            fields: data
        }

        jsonData = JSON.stringify(data)

        $.post({
            url: ajaxScript.url,
            data: {
                action: 'fmcr_saveFormData',
                data: jsonData
            },
            success: function(res) {
                console.log(res)
            }
        })
    }

    submit.on("click", (e) => {
        e.preventDefault()
        sendFormData(getFieldData())
    })
})