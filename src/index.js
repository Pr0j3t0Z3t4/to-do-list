import AppController from './AppController.js';
import DOM from './DOM.js';
import Task from './Task.js';
import Project from './Project.js'; // Importante para criar novos projetos

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

// 1. Alternar entre Projetos
document.getElementById('project-list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const clickedId = e.target.dataset.projectId;
    currentProjectIndex = app.projects.findIndex(proj => proj.id === clickedId);
    render();
  }
});

// --- Controles dos Modais ---
const modalProject = document.getElementById('modal-project');
const modalTask = document.getElementById('modal-task');

// 2. Abrir Modais
document.getElementById('btn-new-project').addEventListener('click', () => modalProject.showModal());
document.getElementById('btn-new-task').addEventListener('click', () => modalTask.showModal());

// 3. Criar Novo Projeto (Submit do Form)
document.getElementById('form-project').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que a página recarregue
    const name = document.getElementById('project-name').value;
    
    const newProject = new Project(name);
    app.projects.push(newProject);
    
    // Muda o foco para o projeto recém-criado
    currentProjectIndex = app.projects.length - 1; 
    
    app.saveData();
    render();
    modalProject.close();
    e.target.reset(); // Limpa os campos do modal
});

// 4. Criar Nova Tarefa (Submit do Form)
document.getElementById('form-task').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;
    const priority = document.getElementById('task-priority').value;
    
    const newTask = new Task(title, desc, date, priority);
    app.projects[currentProjectIndex].addTask(newTask);
    
    app.saveData();
    render();
    modalTask.close();
    e.target.reset();
});
// 5. Concluir ou Excluir Tarefa
document.getElementById('task-list').addEventListener('click', (e) => {
    // Verifica se clicou em um botão com data-action
    const action = e.target.dataset.action;
    if (!action) return;

    // Encontra o ID da tarefa subindo no DOM até o card
    const taskCard = e.target.closest('.task-card');
    const taskId = taskCard.dataset.taskId;
    
    const project = app.projects[currentProjectIndex];
    const task = project.tasks.find(t => t.id === taskId);

    if (action === 'delete') {
        project.removeTask(taskId);
    } else if (action === 'complete') {
        task.completed = !task.completed;
    }

    app.saveData();
    render();
});

// Inicializa a tela pela primeira vez
render();