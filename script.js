// ========================
// BASE DE PRODUTOS
// ========================
const produtosData = [
  { nome:"Special Dog Adultos (kg)", categoria:"racao-cao", marca:"specialdog", peso:"kg", codigo:11101, valor:7.99 },
  { nome:"Special Dog Junior (kg)", categoria:"racao-cao", marca:"specialdog", peso:"kg", codigo:11102, valor:12.9 },
  { nome:"Special Dog Raças Pequenas (kg)", categoria:"racao-cao", marca:"specialdog", peso:"kg", codigo:11103, valor:10.9 },
  { nome:"Special Dog Vegetais (kg)", categoria:"racao-cao", marca:"specialdog", peso:"kg", codigo:11104, valor:10.9 },
  { nome:"Special Dog Gold Performance (kg)", categoria:"racao-cao", marca:"specialdog", peso:"kg", codigo:11105, valor:12 },
  { nome:"Special Dog Adultos (15kg)", categoria:"racao-cao", marca:"specialdog", peso:"15", codigo:11301, valor:99.9 },
  { nome:"Special Dog Junior (15kg)", categoria:"racao-cao", marca:"specialdog", peso:"15", codigo:11302, valor:169.9 },
  { nome:"Special Dog Raças Pequenas (15kg)", categoria:"racao-cao", marca:"specialdog", peso:"15", codigo:11303, valor:124.9 },
  { nome:"Special Dog Vegetais (15kg)", categoria:"racao-cao", marca:"specialdog", peso:"15", codigo:11304, valor:144.9 },
  { nome:"Special Dog Gold Performance (15kg)", categoria:"racao-cao", marca:"specialdog", peso:"15", codigo:11305, valor:159.9 }
];

// ========================
// ELEMENTOS
// ========================
const categoria = document.getElementById("categoria");
const marca = document.getElementById("marca");
const marcas = document.querySelectorAll("#marca option");
const peso = document.getElementById("peso");
const searchInput = document.getElementById("product-name");
const mensagem = document.getElementById("sem-produtos");
const valorFinalEl = document.querySelector("#products h2");
const btnLimpar = document.querySelector("#addvenda button");

// ========================
// TOTAL
// ========================
function atualizarTotal() {
  const produtos = document.querySelectorAll(".produto-adicionado");
  let total = 0;

  produtos.forEach(p => {
    const codigo = p.dataset.codigo;
    const qtd = parseInt(p.querySelector(".numinfo").value);

    const prodData = produtosData.find(pr => pr.codigo == codigo);
    if (prodData) total += prodData.valor * qtd;
  });

  valorFinalEl.textContent =
    "Valor Final: R$ " + total.toFixed(2).replace(".", ",");
}

// ========================
// RENDERIZA PRODUTOS
// ========================
function renderizarProdutos() {
  const container = document.getElementById("lista-produtos");
  container.innerHTML = "";

  produtosData.forEach(prod => {

    const div = document.createElement("div");
    div.className = `produto ${prod.categoria} ${prod.marca} ${prod.peso}`;
    div.dataset.codigo = prod.codigo;

    const nome = document.createElement("h4");
    nome.className = "nome-produto";
    nome.textContent = prod.nome;

    const img = document.createElement("img");
    img.className = "foto-produto";
    img.src = `src/${prod.codigo}.jpg`;

    div.append(nome,img);

    div.addEventListener("click", () => adicionarProduto(prod));

    container.appendChild(div);
  });
}

// ========================
// FILTRO
// ========================
categoria.addEventListener("change", () => {
  const valorCategoria = categoria.value;

  marcas.forEach(option => {
    option.style.display = "none";
    if (!valorCategoria || option.classList.contains(valorCategoria)) {
      option.style.display = "block";
    }
  });

  marca.value = "";
  filtrarProdutos();
});

marca.addEventListener("change", filtrarProdutos);
peso.addEventListener("change", filtrarProdutos);
searchInput.addEventListener("input", filtrarProdutos);

function filtrarProdutos() {
  const produtos = document.querySelectorAll("#lista-produtos .produto");

  const valorCategoria = categoria.value;
  const valorMarca = marca.value;
  const valorPeso = peso.value;
  const termoBusca = searchInput.value.toLowerCase();

  let algumVisivel = false;

  produtos.forEach(div => {
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

  mensagem.style.display = algumVisivel ? "none" : "block";
}

// ========================
// CARRINHO
// ========================
function adicionarProduto(produto) {
  const container = document.getElementById("products");

  const existente = Array.from(container.querySelectorAll(".produto-adicionado"))
    .find(p => p.dataset.codigo == produto.codigo);

  if (existente) {
    const input = existente.querySelector(".numinfo");
    input.value = String(parseInt(input.value)+1).padStart(2,'0');
    atualizarTotal();
    return;
  }

  const produtoDiv = document.createElement("div");
  produtoDiv.className = "produto-adicionado";
  produtoDiv.dataset.codigo = produto.codigo;

  const img = document.createElement("img");
  img.className = "foto-produto";
  img.src = `src/${produto.codigo}.jpg`;

  const info = document.createElement("div");
  info.className = "info-produtos";

  const nome = document.createElement("h4");
  nome.textContent = produto.nome;

  const valor = document.createElement("h4");
  valor.textContent = `Valor: R$ ${produto.valor.toFixed(2)}`;

  const qtdLabel = document.createElement("h4");
  qtdLabel.textContent = "Quantidade:";

  const up = document.createElement("button");
  up.innerHTML = "+";

  const input = document.createElement("input");
  input.className = "numinfo";
  input.value = "01";

  const down = document.createElement("button");
  down.innerHTML = "-";

  const remove = document.createElement("button");
  remove.textContent = "Remover";

  up.onclick = () => {
    input.value = String(parseInt(input.value)+1).padStart(2,'0');
    atualizarTotal();
  };

  down.onclick = () => {
    let v = parseInt(input.value);
    if(v>1) v--;
    input.value = String(v).padStart(2,'0');
    atualizarTotal();
  };

  remove.onclick = () => {
    produtoDiv.remove();
    atualizarTotal();
  };

  info.append(nome,valor,qtdLabel,up,input,down,remove);
  produtoDiv.append(img,info);

  container.appendChild(produtoDiv);
  atualizarTotal();
}

// ========================
// LIMPAR
// ========================
btnLimpar.onclick = () => {
  document.querySelectorAll(".produto-adicionado").forEach(p => p.remove());
  atualizarTotal();
};

// ========================
renderizarProdutos();
filtrarProdutos();
