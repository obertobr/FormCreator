jQuery(document).ready(function($){
    const $entries = $("#fmcr-entries tbody")
    const $entry = $("#fmcr-entry")

    async function getEntries(){
        entries = undefined

        await $.post({
            url: ajaxScript.url,
            data: {
                action: 'fmcr_getEntries',
            },
            success: function(data) {
                entries = data
            },
            error: function(xhr, status, error) {
                console.error(`Error on fetch entries: ${status} ${error}`)
            }
        })

        return entries
    }

    async function getEntry(id){
        entry = undefined

        await $.post({
            url: ajaxScript.url,
            data: {
                action: 'fmcr_getEntry',
                id: id
            },
            success: function(data) {
                entry = data
            },
            error: function(xhr, status, error) {
                console.error(`Error on fetch entry: ${status} ${error}`)
            }
        })

        return entry
    }

    function makeLine(entry, func){
        const tr = document.createElement("tr")

        tr.setAttribute("formid", entry.id)

        tr.innerHTML = 
            `<td>${entry.id}</td>
            <td>${entry.formName}</td>
            <td>${entry.data}</td>`

        tr.addEventListener("click", func)

        return tr
    }

    function entrySelected(event) {
        /**
        * @type {HTMLElement}
        */
        const element = event.target.closest("tr")

        $entries.find("tr").removeClass("fmcr-selected");
        element.classList.add("fmcr-selected")

        getEntry(element.getAttribute("formid")).then(showEntry)
    }

    async function showEntries(){
        const entries = await getEntries()
        if(entries == 0){return}

        entries.forEach(entry => {
            const line = makeLine(entry,entrySelected)

            $entries.append(line)
        });

        getEntry(entries.at(0).id).then(showEntry)
    }

    function showEntry(entry) {
        console.log(entry)
        $entry.find("h1").text(entry.formName)

        $("#fmcr-entry-heading").html(`
            <span>#${entry.id}</span>
            <span>${entry.data}</span>
            <span>Referer: <a href="#">${entry.referer}</a></span>
            <span>IP: ${entry.ip}</span>    
        `);

        const body = $("#fmcr-entry-body")
        body.empty()

        entry.fields.forEach(field => {
            let cell = document.createElement("div")
            if(field.type === "input"){
                cell.classList.add("fmcr-entry-cell")
                cell.innerHTML =
                    `
                    <h2>${field.title}</h2>
                    <span>${field.value}</span>
                    `
            } else if(field.type === "heading"){
                cell.classList.add("fmcr-entry-cell-heading")
                cell.innerHTML =
                    `
                    <span>${field.value}</span>
                    `
            } else if(field.type === "page break"){
                cell = document.createElement("hr")
            }
            body.append(cell)
        })
    }

    showEntries()
})