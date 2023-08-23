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
        query: queryValue,
      };

      var urlParams = new URLSearchParams(window.location.search);
      urlParams.set("dropdown", dropdownValue);
      var newURL = window.location.pathname + "?" + urlParams.toString();
      window.history.replaceState({}, "", newURL);

      // Aqui você precisaria usar uma função para enviar os dados para o servidor
      // Por exemplo, usando a API fetch() ou XMLHttpRequest()

      // Exemplo usando a API fetch()
      fetch(window.location.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Aqui você pode lidar com a resposta do servidor
          var data_view = document.getElementById("data");
          data_view.innerHTML = "";
          if (data[0].message) {
            var paragraph = document.createElement("p");
            paragraph.textContent = data[0].message;
            data_view.appendChild(paragraph);
          } else {
            if (dropdownValue == "cidade") {
              listarUser(data, "cidade");
            } else if (dropdownValue == "estado") {
              listarUser(data , "estado");
            } else if (dropdownValue == "equipe") {
              listarUser(data, "equipe");
            } else if (dropdownValue == "posicao") {
              listarUser(data, "posicao");
            }
          }

        })
        .catch((error) => {
          console.error("Ocorreu um erro:", error);
        });
    } else {
      alert("Por favor, preencha o campo de consulta.");
    }
  } else {
    alert("Por favor, preencha o campo de tipo de consulta.");
  }
}

function listarUser(data, filtro) {
  var data_view = document.getElementById("data");
  data_view.innerHTML = ""; // Limpar o conteúdo antes de começar

  data[0].forEach(function (dado, indice) {
    var link = document.createElement("a")
    var div = document.createElement("div");
    var paragraph = document.createElement("p");

    link.setAttribute('href', `/usuario/${dado.id}`)

    var nome = document.createElement("h3");

    nome.textContent = "Nome: " + dado.nome;
    paragraph.textContent = "Dados Usuário #" + (indice + 1) + ": ";
    
    div.setAttribute("class", "user_card");

    div.appendChild(paragraph);
    div.appendChild(nome);

    switch(filtro) {
      case "cidade": {
        var posicao = document.createElement("h4");
        posicao.textContent = "Posição: " + dado.nome_posicao;
        div.appendChild(posicao);
        break
      }
      case "estado": {
        var cidade = document.createElement("h4")
        var posicao = document.createElement("h4");
        posicao.textContent = "Posição: " + dado.nome_posicao;
        cidade.textContent = "Cidade: " + dado.nome_cidade;
        div.appendChild(cidade);
        div.appendChild(posicao);
        break
      }
      case "posicao": {
        var origem = document.createElement("h4")
        origem.textContent = "Origem: " + dado.nome_cidade + ", " + dado.nome_estado;
        div.appendChild(origem);
        break
      }
      case "equipe": {
        var origem = document.createElement("h4")
        var posicao = document.createElement("h4");
        origem.textContent = "Origem: " + dado.nome_cidade + ", " + dado.nome_estado;
        posicao.textContent = "Posição: " + dado.nome_posicao;
        div.appendChild(posicao);
        div.appendChild(origem);
        break
      }
    }  

    link.appendChild(div);
    data_view.appendChild(link);
  });
}
