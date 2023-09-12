document.addEventListener("DOMContentLoaded", () => {
  const cadastroButton = document.getElementById("cadastrobtn");
  const entrarButton = document.getElementById("entrarbtn");
  entrarButton.addEventListener("click", performLogin);
  entrarButton.addEventListener("click", performSignup);
});

function performLogin() {
  const email = document.getElementById("email-signin").value;
  const password = document.getElementById("password-signin").value;

  if (email != "") {
    if (password != "") {
        const requestBody = {
            email: email,
            password: password
        };

        // Enviar os dados para a rota /entrar via POST
        fetch('/entrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        // CONTINUE AQUI
        // CONTINUE AQUI
        // CONTINUE AQUI    descubra o pq não redireciona com a rota post
        // CONTINUE AQUI
        // CONTINUE AQUI

        .then(response => {
            if (response.status === 200) {
                // O login foi bem-sucedido, você pode redirecionar o usuário ou executar outras ações aqui
                console.log('Login bem-sucedido');
            } else {
                // O login falhou, você pode exibir uma mensagem de erro aqui
                alert('Falha no login');
            }
        })
        .catch(error => {
            alert('Erro ao fazer o login:', error);
        });
    } else {
      alert("Preencha a sua senha");
    }
  } else {
    alert("Preencha o campo de e-mail!");
  }
}
