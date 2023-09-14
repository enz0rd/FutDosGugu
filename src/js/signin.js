document.addEventListener("DOMContentLoaded", () => {
  const entrarForm = document.getElementById("form-signin");

  entrarForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const email = document.getElementById("email-signin").value;
    const password = document.getElementById("password-signin").value;

    if (email != "") {
      if (password != "") {
        const requestBody = {
          email: `${email}`,
          password: `${password}`
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", form.action, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
          if(xhr.readyState === 4) {
            if(xhr.status === 200) {
              var contentType = xhr.getResponseHeader("Content-Type");
              if(contentType && contentType.includes("application/json")) {
                var jsonResponse = JSON.parse(xhr.responseText);
                if(jsonResponse.message) {
                  alert(jsonResponse.message)
                }
              } else {
                window.location.href = '/';
              }
            } else {
              alert("Ocorreu um erro");
            }
          };
        };
        xhr.send(JSON.stringify(requestBody));
      } else {
        alert("Preencha a sua senha");
      }
    } else {
      alert("Preencha o campo de e-mail!");
    }
  });
});
