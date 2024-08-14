jQuery(document).ready(function($){
    const form = $("#forms")
    const submit = $("#forms input[type=submit]")

    function getFieldData() {
        const pages = form.find(".form")
        let listFieldsValues = []

        pages.each(function(index)  {
            $(this).children().each(function() {
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
                    title: title,
                    value: value,
                    type: type,
                    name: name,
                })
            })
            if(index < pages.length-1){
                listFieldsValues.push({
                    title: "",
                    value: "",
                    type: "page break",
                    name: "",
                })
            }
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

    function sendView(){
        $.post({
            url: ajaxScript.url,
            data: {
                action: 'fmcr_newView',
                name: form.attr("formname")
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

    function multiPage() {
        let pages = $(".form")

        if(pages.length > 1) {
            const subMenu = document.createElement("div")
            subMenu.id = "subMenu"
            subMenu.innerHTML = `
                <button>Anterior</button>
                <button>Proximo</button>
            `

            form.append(subMenu)

            let pageIndex = 0

            $("#forms > #subMenu > button").eq(1).on("click", () => {
                if(pageIndex < pages.length-1){
                    pageIndex += 1
    
                    pages.removeClass("visible")
                    pages.eq(pageIndex).addClass("visible")
                }
            })
            $("#forms > #subMenu > button").eq(0).on("click", () => {
                if(pageIndex > 0){
                    pageIndex -= 1
    
                    pages.removeClass("visible")
                    pages.eq(pageIndex).addClass("visible")
                }
            })

            pages.eq(0).addClass("visible")
        }
    }

    multiPage()
    sendView()
})