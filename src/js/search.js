const searchButton = document.getElementById("post");
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("query");

searchButton.addEventListener("click", performSearch);
queryInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita o comportamento padrão de enviar o formulário
        performSearch();
    }
});

function performSearch() {
    const dropdownValue = document.getElementById("dropdown").value;
    const queryValue = queryInput.value;
    if (dropdownValue != "") {
        if (queryValue) {
            var formData = {
                dropdown: dropdownValue,
                query: queryValue
            };

            var urlParams = new URLSearchParams(window.location.search)
            urlParams.set('dropdown', dropdownValue);
            var newURL = window.location.pathname + '?' + urlParams.toString();
            window.history.replaceState({}, '', newURL);

            // Aqui você precisaria usar uma função para enviar os dados para o servidor
            // Por exemplo, usando a API fetch() ou XMLHttpRequest()

            // Exemplo usando a API fetch()
            fetch(window.location.href, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    // Aqui você pode lidar com a resposta do servidor
                    var data_view = document.getElementById('data');
                    data_view.innerHTML = "";
                    if (data[0].message) {
                        var paragraph = document.createElement('p');
                        paragraph.textContent = data[0].message
                        data_view.appendChild(paragraph);
                    }

                    if (dropdownValue == 'user') {
                        listarUsers(data);
                    } else if (dropdownValue == 'cidade') {
                        listarCidades(data)
                    } else if (dropdownValue == 'estado') {
                        listarEstados(data)
                    } else if (dropdownValue == 'equipe') {
                        listarEquipes(data)
                    }

                })
                .catch(error => {
                    console.error("Ocorreu um erro:", error);
                });
        } else {
            alert("Por favor, preencha o campo de consulta.");
        }
    } else {
        alert("Por favor, preencha o campo de tipo de consulta.");
    }
};

function listarUsers(data) {
    var data_view = document.getElementById('data');
    data_view.innerHTML = ""; // Limpar o conteúdo antes de começar

    data[0].forEach(function (dado, indice) {
        var div = document.createElement('div');
        var paragraph = document.createElement('p');

        var nome = document.createElement('h3');
        var posicao = document.createElement('h4');
        var cidade = document.createElement('h4');

        paragraph.textContent = "Dados Usuário #" + (indice + 1) + ": ";
        nome.textContent = "Nome: " + dado.nome;
        posicao.textContent = "Posição: " + dado.nome_posicao;
        cidade.textContent = "Origem: " + dado.nome_cidade + ", " + dado.nome_estado;

        div.setAttribute('class', 'user_card')

        div.appendChild(paragraph);
        div.appendChild(nome);
        div.appendChild(posicao);
        div.appendChild(cidade);

        data_view.appendChild(div);
    });
}

function listarCidades(data) {
    var data_view = document.getElementById('data');
    data_view.innerHTML = ""; // Limpar o conteúdo antes de começar

    data[0].forEach(function (dado, indice) {
        var link = document.createElement('a');
        
        link.setAttribute('href', `/cidade/${dado.id}`)

        var div = document.createElement('div');
        var paragraph = document.createElement('p');

        var nome = document.createElement('h3');
        var estado = document.createElement('h4');

        paragraph.textContent = "Dados cidade #" + (indice + 1) + ": ";
        nome.textContent = dado.nome_cidade;
        estado.textContent = dado.nome_estado;

        div.setAttribute('class', 'city_card')

        div.appendChild(paragraph);
        div.appendChild(nome);
        div.appendChild(estado);

        link.appendChild(div);
        data_view.appendChild(link);
    });
}

