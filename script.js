// Dados dos carros
const carros = [
  {
    id: 1,
    marca: "Chevrolet",
    modelo: "onix",
    ano: 2024,
    preco: 89900,
    km: 15000,
    combustivel: "Flex",
    cor: "Vermelho",
    imagem: "img/chevrolet-onix-vermelho-carmin-min.png",
    descricao: "Sedan executivo com excelente economia de combustível e tecnologia avançada.",
  },
  {
    id: 2,
    marca: "Hyundai",
    modelo: "HB20",
    ano: 2023,
    preco: 95000,
    km: 22000,
    combustivel: "Flex",
    cor: "Prata",
    imagem: "img/comprar-platinum-safety-1-0-tgdi-automatico_bdd8dc1f81.png",
    descricao: "Sedan esportivo com design moderno e performance excepcional.",
  },
  {
    id: 3,
    marca: "Ford",
    modelo: "EcoSport",
    ano: 2022,
    preco: 67000,
    km: 35000,
    combustivel: "Flex",
    cor: "Azul",
    imagem: "img/16832000776a3fddfc63cad7fd7a79e8.jpg",
    descricao: "SUV compacto ideal para cidade e aventuras, com ótimo custo-benefício.",
  },
  {
    id: 4,
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2024,
    preco: 58900,
    km: 8000,
    combustivel: "Flex",
    cor: "Branco",
    imagem: "img/68347a7d07073022971269.png",
    descricao: "Hatchback moderno e econômico, perfeito para o dia a dia urbano.",
  },
  {
    id: 5,
    marca: "Volkswagen",
    modelo: "T-Cross",
    ano: 2023,
    preco: 78500,
    km: 18000,
    combustivel: "Flex",
    cor: "Branco",
    imagem: "img/toyota-corolla-cross-3.jpg",
    descricao: "SUV compacto com design alemão e tecnologia de ponta.",
  },
  {
    id: 6,
    marca: "Honda",
    modelo: "HR-V",
    ano: 2022,
    preco: 82000,
    km: 28000,
    combustivel: "Flex",
    cor: "Preto",
    imagem: "img/hrv.png",
    descricao: "SUV versátil com amplo espaço interno e excelente dirigibilidade.",
  },
   {
    id: 7,
    marca: "Honda",
    modelo: "Civic",
    ano: 2023,
    preco: 120000,
    km: 10000,
    combustivel: "Híbrido",
    cor: "Preto",
    imagem: "img/honda-civic.jpg",
    descricao: "SUV compacto com design moderno e tecnologia híbrida.",
  },
{
   id: 8,
   marca: "Honda",
   modelo: "CR-V",
   ano: 2021,
   preco:15000,
   km: 50000,
   combustivel: "Híbrido",
   cor: "Azul",
   imagem:"img/hrv.png",
   descricao:"SUV compacto com design moderno e tecnologia híbrida."
},
{
   id: 9,
   marca: "Honda",
   modelo: "Fit",
   ano: 2021,
   preco: 60000,
   km: 30000,
   combustivel: "Flex",
   cor: "Branco",
   imagem: "img/suv.jpg",
   descricao: "Hatchback versátil e econômico, ideal para o dia a dia."
}
]

let carrosFiltrados = [...carros]

// Função para renderizar carros
function renderCarros(carrosParaRender = carrosFiltrados) {
  const container = document.getElementById("carsContainer")

  if (carrosParaRender.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #666;">Nenhum carro encontrado com os filtros selecionados.</p>'
    return
  }

  container.innerHTML = carrosParaRender
    .map(
      (carro) => `
        <div class="car-card">
            <img src="${carro.imagem}" alt="${carro.marca} ${carro.modelo}" class="car-image">
            <div class="car-info">
                <h3>${carro.marca} ${carro.modelo}</h3>
                <div class="car-details">
                    <p><strong>Ano:</strong> ${carro.ano}</p>
                    <p><strong>KM:</strong> ${carro.km.toLocaleString()}</p>
                    <p><strong>Combustível:</strong> ${carro.combustivel}</p>
                    <p><strong>Cor:</strong> ${carro.cor}</p>
                </div>
                <div class="car-price">R$ ${carro.preco.toLocaleString()}</div>
                <div class="car-buttons">
                    <button class="btn-primary" onclick="openModal(${carro.id})">Ver Detalhes</button>
                    <button class="btn-secondary" onclick="agendarTestDrive(${carro.id})">Test Drive</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Função para filtrar carros
function filterCars() {
  const marcaFilter = document.getElementById("marcaFilter").value
  const anoFilter = document.getElementById("anoFilter").value
  const precoFilter = document.getElementById("precoFilter").value

  carrosFiltrados = carros.filter((carro) => {
    const marcaMatch = !marcaFilter || carro.marca === marcaFilter
    const anoMatch = !anoFilter || carro.ano.toString() === anoFilter

    let precoMatch = true
    if (precoFilter) {
      const [min, max] = precoFilter.split("-").map(Number)
      precoMatch = carro.preco >= min && carro.preco <= max
    }

    return marcaMatch && anoMatch && precoMatch
  })

  renderCarros()
}

// Função para limpar filtros
function clearFilters() {
  document.getElementById("marcaFilter").value = ""
  document.getElementById("anoFilter").value = ""
  document.getElementById("precoFilter").value = ""
  carrosFiltrados = [...carros]
  renderCarros()
}

// Função para abrir modal
function openModal(carroId) {
  const carro = carros.find((c) => c.id === carroId)
  const modal = document.getElementById("carModal")
  const modalContent = document.getElementById("modalContent")

  modalContent.innerHTML = `
        <div style="text-align: center;">
            <img src="${carro.imagem}" alt="${carro.marca} ${carro.modelo}" style="width: 100%; max-width: 400px; border-radius: 10px; margin-bottom: 1rem;">
            <h2>${carro.marca} ${carro.modelo} ${carro.ano}</h2>
            <p style="color: #666; margin-bottom: 1rem;">${carro.descricao}</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0; text-align: left;">
                <div><strong>Ano:</strong> ${carro.ano}</div>
                <div><strong>KM:</strong> ${carro.km.toLocaleString()}</div>
                <div><strong>Combustível:</strong> ${carro.combustivel}</div>
                <div><strong>Cor:</strong> ${carro.cor}</div>
            </div>
            
            <div style="font-size: 2rem; font-weight: bold; color: #ff6b35; margin: 1rem 0;">
                R$ ${carro.preco.toLocaleString()}
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="btn-primary" onclick="agendarTestDrive(${carro.id})">Agendar Test Drive</button>
                <button class="btn-secondary" onclick="entrarContato(${carro.id})">Entrar em Contato</button>
            </div>
        </div>
    `

  modal.style.display = "block"
}

// Função para fechar modal
function closeModal() {
  document.getElementById("carModal").style.display = "none"
}

// Função para agendar test drive
function agendarTestDrive(carroId) {
  const carro = carros.find((c) => c.id === carroId)
  alert(
    `Test drive agendado para o ${carro.marca} ${carro.modelo}!\n\nEntraremos em contato em breve para confirmar data e horário.`,
  )
  closeModal()
}

// Função para entrar em contato
function entrarContato(carroId) {
  const carro = carros.find((c) => c.id === carroId)
  alert(`Interesse registrado no ${carro.marca} ${carro.modelo}!\n\nNossa equipe entrará em contato em breve.`)
  closeModal()
}

// Função para scroll suave
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  })
}

// Função para toggle do menu mobile
function toggleMenu() {
  const nav = document.querySelector(".nav")
  nav.style.display = nav.style.display === "flex" ? "none" : "flex"
}

// Função para enviar formulário
function submitForm(event) {
  event.preventDefault()

  const nome = document.getElementById("nome").value
  const email = document.getElementById("email").value
  const telefone = document.getElementById("telefone").value
  const mensagem = document.getElementById("mensagem").value

  alert(
    `Mensagem enviada com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\n\nEntraremos em contato em breve!`,
  )

  // Limpar formulário
  document.getElementById("nome").value = ""
  document.getElementById("email").value = ""
  document.getElementById("telefone").value = ""
  document.getElementById("mensagem").value = ""
}

// Fechar modal ao clicar fora
window.onclick = (event) => {
  const modal = document.getElementById("carModal")
  if (event.target === modal) {
    closeModal()
  }
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  renderCarros()
})
