jQuery(document).ready(function($){
    const formCell = $("#fmcr-cell-form")
    const newFormBtn = $("#fmcr-newForm")

    newFormBtn.on("click", async (e)=> {
        let id = await createNewForm()

        const url = new URLSearchParams(window.location.search);
        url.set('id', id);
        window.location.search = url;
    })
    
    async function getForms(){
        forms = undefined

        await $.post({
            url: ajaxScript.url,
            data: {
                action: 'fmcr_getForms',
            },
            success: function(response) {
                forms = response
            },
            error: function(xhr, status, error) {
                console.error(`Error on fetch forms: ${status} ${error}`)
            }
        })

        return forms
    }

    async function createNewForm(){
        id = undefined

        await $.post({
            url: ajaxScript.url,
            data: {
                action: 'fmcr_createForm',
            },
            success: function(response) {
                id = response.data.id
            },
            error: function(xhr, status, error) {
                console.error(`Error on create form: ${status} ${error}`)
            }
        })

        return id
    }

    async function deleteForm(id){
        await $.post({
            url: ajaxScript.url,
            data: {
                action: 'fmcr_deleteForm',
                id: id
            },
            success: function(response) {
                console.log(response)
            },
            error: function(xhr, status, error) {
                console.error(`Error on create form: ${status} ${error}`)
            }
        })
    }

    function makeLine(form){
        const tr = document.createElement("tr")

        tr.innerHTML = 
            `<td>${form.id}</td>
            <td>${form.formName}</td>
            <td>${form.lastEditDate}</td>
            <td class="delete">✖</td>`
        
        tr.addEventListener("click", (e) => {
            console.log(e.target)
            if(!e.target.classList.contains("delete")){
                const url = new URLSearchParams(window.location.search);
                url.set('id', form.id);
                window.location.search = url;
            }
        })

        const delBtn = tr.querySelector(".delete")

        delBtn.addEventListener("click", async (e) => {
            await deleteForm(form.id)
            showForms()
        })

        return tr
    }

    async function showForms(){
        const forms = await getForms()

        formCell.empty()

        forms.forEach(form => {
            formCell.append(makeLine(form))
        });
    }

    showForms()
})