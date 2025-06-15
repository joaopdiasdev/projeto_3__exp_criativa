let map;
let myQuizBarChartInstance; // Para o gráfico de barras da Pegada do Quiz
let myQuizDoughnutChartInstance; // Para o gráfico de rosca/pizza da Pegada do Quiz
let myPointsChartInstance; // Para o gráfico de Tipos de Pontos

const coords = [
  {
    id: 1,
    nome: "Parque Barigui",
    tipo: "Parque",
    coords: [-25.4149, -49.3113],
  },
  {
    id: 2,
    nome: "Jardim Botânico",
    tipo: "Parque",
    coords: [-25.4394, -49.2401],
  },
  {
    id: 3,
    nome: "Bosque do Papa",
    tipo: "Parque",
    coords: [-25.4309, -49.2765],
  },
  {
    id: 4,
    nome: "Ponto de Coleta Ambiental",
    tipo: "Coleta",
    coords: [-25.4284, -49.2733],
  },
  {
    id: 5,
    nome: "Feira Orgânica Municipal",
    tipo: "Feira",
    coords: [-25.45, -49.27],
  },
  {
    id: 6,
    nome: "Parque Tingui",
    tipo: "Parque",
    coords: [-25.4176, -49.311],
  },
  {
    id: 7,
    nome: "Estação Ambiental CIC",
    tipo: "Educação Ambiental",
    coords: [-25.48, -49.275],
  },
];

//Renderização do mapa
function renderMap() {
  map = L.map("map").setView([-25.4284, -49.2733], 13); // Coordenadas de Curitiba

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  }).addTo(map);

  renderMarkers(coords);

  window.addEventListener("resize", function () {
    if (typeof map !== "undefined") {
      map.invalidateSize();
    }
  });
}

function renderMarkers(pontos) {
  if (!map) return;

  // Limpar todos os marcadores existentes
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Adicionar os marcadores filtrados
  pontos.forEach((coord) => {
    L.marker(coord.coords).addTo(map).bindPopup(`
        <b>${coord.nome}</b> <br>
        Tipo: ${coord.tipo} <br><br>
        <a href="#form-avaliacao-container">
        <button onclick="test(${coord.id})">Avaliar este ponto</button>
        </a>
      `);
  });
}

function filtrarPontos(tipoSelecionado) {
  if (tipoSelecionado === "Todos") {
    renderMarkers(coords);
  } else {
    const pontosFiltrados = coords.filter(
      (coord) => coord.tipo === tipoSelecionado
    );
    renderMarkers(pontosFiltrados);
  }
}

function test(id) {
  const ponto = coords.find((p) => p.id === id);
  if (!ponto) return alert("Ponto não encontrado");

  document.getElementById("nome-ponto").textContent = ponto.nome;
  document.getElementById("form-avaliacao-container").style.display = "block";
  document.getElementById("status-msg").textContent = "";
}

function fecharFormulario() {
  document.getElementById("form-avaliacao-container").style.display = "none";
}

function calcularQuiz() {
  let diasSust = +document.getElementById("diasSustentavel").value;
  let refVeg = +document.getElementById("refVegetariana").value;
  let separaLixoCheckbox = document.getElementById("separaLixo");

  // Garante que os valores de entrada estejam dentro do intervalo (0-7 para dias/refeições)
  diasSust = Math.max(0, Math.min(7, diasSust));
  refVeg = Math.max(0, Math.min(7, refVeg));

  // Calcula a pontuação com base nos valores de entrada
  let score = 0;
  score += diasSust * 2; // Exemplo: 2 pontos por dia de transporte sustentável
  score += refVeg * 1; // Exemplo: 1 ponto por refeição vegetariana
  if (separaLixoCheckbox.checked) {
    score += 5; // Adiciona pontos se a reciclagem for feita
  }

  document.getElementById(
    "resultadoQuiz"
  ).innerText = `Sua pontuação sustentável: ${score} pontos!`;

  // Renderiza os dois gráficos do quiz com a pontuação calculada
  renderQuizBarChart(score);
  renderQuizDoughnutChart(score);
}

// Função para renderizar o gráfico de BARRAS da pegada de carbono (Quiz)
function renderQuizBarChart(score) {
  const ctx = document.getElementById("myQuizBarChart").getContext("2d");

  // Destrói a instância anterior do gráfico se existir
  if (myQuizBarChartInstance) {
    myQuizBarChartInstance.destroy();
  }

  // Define a pontuação máxima possível para contexto no gráfico
  const maxScore = 7 * 2 + 7 * 1 + 5; // 7 dias transporte (máx 14) + 7 refeições (máx 7) + reciclagem (máx 5) = 26

  myQuizBarChartInstance = new Chart(ctx, {
    type: "bar", // Tipo de gráfico de barras
    data: {
      labels: ["Sua Pegada de Carbono"], // Apenas uma label para a barra principal
      datasets: [
        {
          label: "Sua Pontuação",
          data: [score], // A sua pontuação
          backgroundColor: "rgba(75, 192, 192, 0.8)", // Cor para a sua pontuação
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          stack: "pegadaStack", // Permite que as barras sejam empilhadas
        },
        {
          label: "Falta para o Máximo",
          data: [maxScore - score], // O que falta para atingir o máximo
          backgroundColor: "rgba(255, 99, 132, 0.8)", // Cor para o que falta
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          stack: "pegadaStack", // Mesma pilha para as barras
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true, // Habilita o empilhamento no eixo X
        },
        y: {
          beginAtZero: true,
          max: maxScore, // Define o valor máximo do eixo Y
          ticks: {
            stepSize: 5, // Ajusta o passo dos ticks
          },
          title: {
            display: true,
            text: "Pontuação",
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + " pontos";
              }
              return label;
            },
          },
        },
        title: {
          display: true,
          text: "Comparativo da sua Pegada de Carbono",
        },
      },
    },
  });

  // Atualiza a barra de progresso também
  const barraResultado = document.getElementById("barraResultado");
  const percentage = (score / maxScore) * 100;
  barraResultado.style.width = `${percentage}%`;
  barraResultado.style.backgroundColor = getProgressBarColor(percentage);
}

// Função para renderizar o gráfico de ROSCA/PIZZA da pegada de carbono (Quiz)
function renderQuizDoughnutChart(score) {
  const ctx = document.getElementById("myQuizDoughnutChart").getContext("2d");

  if (myQuizDoughnutChartInstance) {
    myQuizDoughnutChartInstance.destroy();
  }

  const maxScore = 7 * 2 + 7 * 1 + 5; // Mesma pontuação máxima
  const remainingScore = maxScore - score;

  myQuizDoughnutChartInstance = new Chart(ctx, {
    type: "doughnut", // Tipo de gráfico de rosca (ou 'pie' para pizza)
    data: {
      labels: ["Sua Pontuação", "Falta para o Máximo"],
      datasets: [
        {
          data: [score, remainingScore],
          backgroundColor: [
            "rgba(75, 192, 192, 0.8)", // Cor para sua pontuação
            "rgba(255, 99, 132, 0.8)", // Cor para o que falta
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Proporção da sua Pegada de Carbono",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label += context.parsed + " pontos";
              }
              return label;
            },
          },
        },
      },
    },
  });
}

// Função para renderizar o gráfico de tipos de pontos (mapa)
function renderPointsTypesChart() {
  const ctx = document.getElementById("grafico").getContext("2d");

  // Destrói a instância anterior do gráfico se existir
  if (myPointsChartInstance) {
    myPointsChartInstance.destroy();
  }

  const tipos = {};
  coords.forEach((coord) => {
    tipos[coord.tipo] = (tipos[coord.tipo] || 0) + 1;
  });

  const labels = Object.keys(tipos);
  const data = Object.values(tipos);

  myPointsChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Quantidade de Pontos por Tipo",
          data: data,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 205, 86, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(201, 203, 207, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 205, 86, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(201, 203, 207, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
          title: {
            display: true,
            text: "Número de Pontos",
          },
        },
        x: {
          title: {
            display: true,
            text: "Tipo de Ponto Sustentável",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Distribuição dos Pontos Sustentáveis no Mapa",
        },
      },
    },
  });
}

// Função auxiliar para definir a cor da barra de progresso com base na pontuação (opcional)
function getProgressBarColor(percentage) {
  if (percentage >= 80) return "#4CAF50"; // Verde para excelente
  if (percentage >= 50) return "#FFC107"; // Amarelo para bom
  return "#F44336"; // Vermelho para precisa melhorar
}

renderMap(); // Renderiza o mapa ao carregar
renderPointsTypesChart(); // Renderiza o gráfico de tipos de pontos ao carregar
