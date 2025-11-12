const input = document.getElementById("Pesquisar");
const linhas = document.querySelectorAll("table tr");

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") { // quando apertar Enter
    event.preventDefault(); // evita comportamento padrão

    const termo = input.value.toLowerCase().trim();
    let encontrado = false; // controla se o livro foi achado

    for (const linha of linhas) {
      const textoLinha = linha.textContent.toLowerCase();

      if (textoLinha.includes(termo) && termo !== "") {
        linha.scrollIntoView({ behavior: "smooth", block: "center" }); // rola até a linha
        linha.style.backgroundColor = "#b5babbff"; // destaca a linha
        setTimeout(() => linha.style.backgroundColor = "", 2000); // remove destaque depois de 2s
        encontrado = true;
        break; // para o loop após encontrar
      }
    }

    // se não encontrar nenhum livro correspondente
    if (!encontrado && termo !== "") {
      Swal.fire({
        icon: "error",
        title: "Livro não encontrado",
        text: "Verifique o nome e tente novamente.",
        confirmButtonColor: "#d33",
        background: "#fefefe",
        color: "#333",
      });
    }
  }
});
