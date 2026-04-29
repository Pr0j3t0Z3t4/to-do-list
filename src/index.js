import AppController from './AppController.js';
import DOM from './DOM.js';
import Task from './Task.js';

// Inicializa o controle da aplicação
const app = new AppController();
let currentProjectIndex = 0; // Estado: qual projeto está selecionado

// Função de re-renderização para atualizar tudo na tela
const render = () => {
  DOM.renderProjects(app.projects, currentProjectIndex);
  DOM.renderTasks(app.projects[currentProjectIndex]);
};

// --- Teste: Adiciona uma tarefa de exemplo se o Inbox estiver vazio ---
if (app.projects[0].tasks.length === 0) {
    app.projects[0].addTask(new Task("Aprender Webpack", "Seguir o tutorial da Etapa 1", "2026-05-15", "Alta"));
    app.projects[0].addTask(new Task("Criar DOM Module", "Usar o date-fns para formatar data", "2026-06-01", "Media"));
    app.saveData(); // Salva no LocalStorage
}
// ---------------------------------------------------------------------

// --- Event Listeners (Interatividade) ---

// 1. Clicar em um projeto na barra lateral
document.getElementById('project-list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    // Encontra o índice do projeto clicado usando o ID armazenado no dataset
    const clickedId = e.target.dataset.projectId;
    currentProjectIndex = app.projects.findIndex(proj => proj.id === clickedId);
    render();
  }
});

// 2. Clicar no botão "+ Nova Tarefa" (simples prompt para teste agora)
document.getElementById('btn-new-task').addEventListener('click', () => {
    const title = prompt("Nome da Tarefa:");
    if (title) {
        const description = prompt("Descrição (opcional):");
        const dueDate = prompt("Data de Vencimento (YYYY-MM-DD):", "2026-06-10");
        const priority = prompt("Prioridade (Alta, Media, Baixa):", "Media");
        
        const novaTarefa = new Task(title, description, dueDate, priority);
        app.projects[currentProjectIndex].addTask(novaTarefa);
        app.saveData(); // Salva as mudanças
        render(); // Atualiza a tela
    }
});

// Inicializa a tela pela primeira vez
render();