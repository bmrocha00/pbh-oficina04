// script.js

const entradaTarefa = document.getElementById("entradaTarefa");
const botaoAdicionarTarefa = document.getElementById("botaoAdicionarTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const botaoLimparTudo = document.getElementById("limparTudo");

// Carrega tarefas do localStorage
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach(criarElementoTarefa);
}

// Cria elemento de tarefa
function criarElementoTarefa(tarefa) {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;
    if (tarefa.concluida) li.classList.add("concluida");

    li.onclick = () => {
        tarefa.concluida = !tarefa.concluida;
        li.classList.toggle("concluida");
        atualizarLocalStorage();
    };

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.className = "remove-btn";
    botaoRemover.onclick = (event) => {
        event.stopPropagation();
        removerTarefa(tarefa.texto);
        li.remove();
    };

    li.appendChild(botaoRemover);
    listaTarefas.appendChild(li);
}

// Adiciona nova tarefa
function adicionarTarefa() {
    const textoTarefa = entradaTarefa.value.trim();
    if (textoTarefa === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    const tarefa = { texto: textoTarefa, concluida: false };
    criarElementoTarefa(tarefa);
    entradaTarefa.value = "";
    salvarTarefa(tarefa);
}

// Salva tarefa no localStorage
function salvarTarefa(tarefa) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Remove tarefa
function removerTarefa(textoTarefa) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas = tarefas.filter(tarefa => tarefa.texto !== textoTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function atualizarLocalStorage() {
    const tarefas = [];
    document.querySelectorAll("li").forEach(li => {
        const tarefa = {
            texto: li.firstChild.textContent,
            concluida: li.classList.contains("concluida"),
        };
        tarefas.push(tarefa);
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function limparTudo() {
    localStorage.removeItem("tarefas");
    listaTarefas.innerHTML = "";
}

botaoAdicionarTarefa.addEventListener("click", adicionarTarefa);
botaoLimparTudo.addEventListener("click", limparTudo);

entradaTarefa.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

carregarTarefas();
