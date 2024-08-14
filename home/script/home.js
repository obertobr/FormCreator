jQuery(document).ready(function($){
    const formCell = $("#fmcr-cell-form")
    const newFormBtn = $("#fmcr-newForm")

    newFormBtn.on("click", async (e)=> {
        let id = await createNewForm()

        const url = new URLSearchParams(window.location.search);
        url.set('id', id);
        window.location.search = url;
    })

    function getStartAndEndDates(period) {
        let startDate, endDate;
        const today = new Date();
    
        switch (period) {
            case 'week':
                // Início da semana (segunda-feira)
                startDate = new Date(today);
                startDate.setDate(today.getDate() - today.getDay() + 1);
                // Fim da semana (domingo)
                endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6);
                break;
    
            case 'month':
                // Início do mês
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                // Fim do mês
                endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
    
            case 'year':
                // Início do ano
                startDate = new Date(today.getFullYear(), 0, 1);
                // Fim do ano
                endDate = new Date(today.getFullYear(), 11, 31);
                break;
    
            default:
                // Caso personalizado
                startDate = new Date(period.start_date);
                endDate = new Date(period.end_date);
                break;
        }
    
        return {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
        };
    }
    
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

    const ctx = document.getElementById('acquisitions').getContext('2d');
    const meuGrafico = new Chart(ctx, {
        type: 'line', // Tipo de gráfico (ex: 'bar', 'line', 'pie', etc.)
        data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'], // Labels do eixo X
        datasets: [{
            label: 'Vendas', // Nome do conjunto de dados
            data: [12, 19, 3, 5, 2, 3], // Dados correspondentes aos labels
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo das linhas ou barras
            borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda
            borderWidth: 1 // Espessura da borda
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true // Inicia o eixo Y no zero
            }
        }
        }
    });
})