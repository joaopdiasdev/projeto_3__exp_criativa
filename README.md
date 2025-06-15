🌱 Curitiba + Sustentável

Este é um projeto web interativo que promove ações de sustentabilidade na cidade de Curitiba, permitindo que os usuários:

    Visualizem um mapa com pontos sustentáveis (parques, feiras orgânicas, pontos de coleta, etc.)

    Realizem e visualizem avaliações desses pontos

    Respondam a um quiz para calcular sua pegada de carbono

    Acompanhem seus resultados por meio de gráficos interativos

🚀 Funcionalidades
🗺️ Mapa Sustentável

    Exibe pontos verdes de Curitiba usando a biblioteca Leaflet.js

    Cada ponto possui:

        Nome

        Tipo (Parque, Feira, Coleta, etc.)

        Opção para avaliar

💬 Avaliações de Pontos

    Usuários podem avaliar qualquer ponto do mapa

    As avaliações são salvas no Firebase Firestore

    As avaliações anteriores são carregadas automaticamente na página

🌍 Quiz da Pegada de Carbono

    Perguntas simples sobre hábitos sustentáveis

    Cálculo da pontuação total baseado nas respostas

    Visualização com dois gráficos interativos usando Chart.js:

        Gráfico de barras empilhadas

        Gráfico de rosca (doughnut)

📊 Estatísticas dos Pontos no Mapa

    Um gráfico de barras exibe a quantidade de pontos por tipo (Parque, Feira, etc.)

🛠️ Tecnologias Utilizadas

    HTML5, CSS3, JavaScript ES6+

    Leaflet.js – para renderização de mapas

    Firebase Firestore – banco de dados em tempo real

    Chart.js – visualização de dados com gráficos

    Google Fonts – estilização tipográfica

    OpenStreetMap – tiles para o mapa

🔧 Estrutura do Projeto

/
├── index.html            # Página principal
├── style.css             # Estilos
├── script.js             # Lógica do frontend
├── firebase.js           # Configuração e integração com Firebase
└── README.md             # Este arquivo

📦 Como Rodar o Projeto

    Clone o repositório:

git clone https://github.com/seu-usuario/curitiba-mais-sustentavel.git
cd curitiba-mais-sustentavel

    Abra o arquivo index.html diretamente no navegador.

    Certifique-se de que seu projeto no Firebase está ativo e que as regras do Firestore estão liberadas para leitura/escrita (somente para testes! Em produção, use regras seguras).

🔐 Segurança

    ⚠️ Atenção: Nunca deixe as chaves de API do Firebase públicas em um ambiente de produção sem regras de segurança adequadas!

📸 Capturas de Tela
Mapa e Avaliações

Quiz de Pegada de Carbono

👩‍🔬 Guia de projeto extensionista : biologa Alzira Schmidt