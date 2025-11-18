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
// parte dos botões de adicionar, editar e excluir
const tabela = document.querySelector("table tbody");
const btnAdd = document.getElementById("btnAdd");

// ➤ ADICIONAR LIVRO
btnAdd.addEventListener("click", () => {
  Swal.fire({
    title: "Adicionar Livro",
    html: `
      <input id="livro" class="swal2-input" placeholder="Nome do livro">
      <input id="editora" class="swal2-input" placeholder="Editora">
      <input id="autor" class="swal2-input" placeholder="Autor">
    `,
    confirmButtonText: "Adicionar",
    preConfirm: () => {
      return {
        livro: document.getElementById("livro").value,
        editora: document.getElementById("editora").value,
        autor: document.getElementById("autor").value
      };
    }
  }).then(result => {
    if (result.value) {
      const { livro, editora, autor } = result.value;

      const novaLinha = document.createElement("tr");
      novaLinha.innerHTML = `
        <td>${livro}</td>
        <td>${editora}</td>
        <td>${autor}</td>
        <td>
          <button class="edit">Editar</button>
          <br><br>
          <button class="delete">Excluir</button>
        </td>
      `;
      
      tabela.appendChild(novaLinha);
    }
  });
});

//EDITAR / EXCLUIR
tabela.addEventListener("click", function(e) {
  const botao = e.target;
  const linha = botao.closest("tr");

  // Excluir
  if (botao.classList.contains("delete")) {
    Swal.fire({
      title: "Deseja excluir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Excluir",
      confirmButtonColor: "#d33"
    }).then(result => {
      if (result.isConfirmed) linha.remove();
    });
  }

  // Editar
  if (botao.classList.contains("edit")) {
    const livro = linha.children[0].textContent;
    const editora = linha.children[1].textContent;
    const autor = linha.children[2].textContent;

    Swal.fire({
      title: "Editar Livro",
      html: `
        <input id="livro" class="swal2-input" value="${livro}">
        <input id="editora" class="swal2-input" value="${editora}">
        <input id="autor" class="swal2-input" value="${autor}">
      `,
      confirmButtonText: "Salvar"
    }).then(result => {
      if (result.isConfirmed) {
        linha.children[0].textContent = document.getElementById("livro").value;
        linha.children[1].textContent = document.getElementById("editora").value;
        linha.children[2].textContent = document.getElementById("autor").value;
      }
    });
  }
});
