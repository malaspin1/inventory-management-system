// Seleção de elementos
const categoria = document.getElementById("categoria");
const marca = document.getElementById("marca");
const marcas = document.querySelectorAll("#marca option");
const peso = document.getElementById("peso");
const produtos = document.getElementsByClassName("produto");
const searchInput = document.getElementById("product-name");
const mensagem = document.getElementById("sem-produtos");

// Atualiza marcas quando a categoria mudar
categoria.addEventListener("change", () => {
  const valorCategoria = categoria.value;

  marcas.forEach(option => {
    option.style.display = "none";
    if (!valorCategoria || option.classList.contains(valorCategoria)) {
      option.style.display = "block";
    }
  });

  marca.value = ""; // reset marca
  filtrarProdutos();
});

// Atualiza produtos ao mudar marca, peso ou pesquisa
marca.addEventListener("change", filtrarProdutos);
peso.addEventListener("change", filtrarProdutos);
searchInput.addEventListener("input", filtrarProdutos);

// Função de filtragem
function filtrarProdutos() {
  const valorCategoria = categoria.value;
  const valorMarca = marca.value;
  const valorPeso = peso.value;
  const termoBusca = searchInput.value.toLowerCase();

  let algumVisivel = false;

  Array.from(produtos).forEach(div => {
    const nomeProduto = div.querySelector(".nome-produto").textContent.toLowerCase();

    const correspondeCategoria = !valorCategoria || div.classList.contains(valorCategoria);
    const correspondeMarca = !valorMarca || div.classList.contains(valorMarca);
    const correspondePeso = !valorPeso || div.classList.contains(valorPeso);
    const correspondeBusca = !termoBusca || nomeProduto.includes(termoBusca);

    if (correspondeCategoria && correspondeMarca && correspondePeso && correspondeBusca) {
      div.style.display = "block";
      algumVisivel = true;
    } else {
      div.style.display = "none";
    }
  });

  // Mensagem se nenhum produto encontrado
  mensagem.style.display = algumVisivel ? "none" : "block";
}

// Mostrar todos produtos inicialmente
filtrarProdutos();
