// Configuração do Firebase, onde o código faz contato com o database
 const firebaseConfig = {

  apiKey: "AIzaSyDkCJrjqrAPPJaHxe5VTwvKBoFpmvbcZCg",

  authDomain: "curitiba-mais-sustentavel.firebaseapp.com",

  projectId: "curitiba-mais-sustentavel",

  storageBucket: "curitiba-mais-sustentavel.firebasestorage.app",

  messagingSenderId: "232811567474",

  appId: "1:232811567474:web:b3d6da1d50888a02c6e5eb",

  measurementId: "G-X18K8SSYG1"

};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Seleciona o container das avaliações
const avaliacoesDiv = document.getElementById("lista-avaliacoes");

// Carrega avaliações existentes na inicialização
db.collection("avaliations")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      adicionarAvaliacaoNaTela(doc.data());
    });
  });

// Adiciona a avaliação na tela
function adicionarAvaliacaoNaTela(dados) {
  const div = document.createElement("div");
  div.style.marginBottom = "20px";
  div.style.background = "#e0e0e0";
  div.style.padding = "10px";
  div.style.borderRadius = "6px";
  div.innerHTML = `
    <h3>${dados.local}</h3>
    <p> ${dados.nome}</p>
    <p>${dados.comentario}</p>
    <p><strong>Nota:</strong> ${dados.nota}</p>
    <hr />
  `;
  avaliacoesDiv.appendChild(div);
}

// Captura o envio do formulário
document
  .getElementById("avaliacao-form")
  .addEventListener("submit", submitForm);

// Função para processar o envio do formulário
function submitForm(event) {
  event.preventDefault();

  const dadosAvaliacao = {
    nome: document.getElementById("nome").value,
    comentario: document.getElementById("comentario").value,
    nota: parseInt(document.getElementById("nota").value),
    local: document.getElementById("nome-ponto").innerText,
  };

  enviarAvaliacao(dadosAvaliacao);

  document.getElementById("avaliacao-form").reset();
  document.getElementById("form-avaliacao-container").style.display = "none";
}

// Função para enviar a avaliação ao Firestore
function enviarAvaliacao(dados) {
  db.collection("avaliations")
    .add(dados)
    .then(function (docRef) {
      console.log("Avaliação salva com ID: ", docRef.id);
      adicionarAvaliacaoNaTela(dados);
      mostrarToast("Avaliação enviada com sucesso!");
    })
    .catch(function (error) {
      console.error("Erro ao salvar avaliação: ", error);
      alert("Erro ao enviar avaliação.");
    });
}
//Funcção reutilizável do "Avaliação feita com sucesso"
function mostrarToast(mensagem) {
  var toast = document.getElementById("toast");
  toast.innerText = mensagem;
  toast.classList.add("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  setTimeout(function () {
    toast.classList.remove("show");
    // Aguarda o tempo da transição para esconder de vez
    setTimeout(function () {
      toast.style.display = "none";
    }, 500); // 500ms é o tempo da transição
  }, 3000); // Exibe por 3 segundos

  toast.style.display = "block";
}