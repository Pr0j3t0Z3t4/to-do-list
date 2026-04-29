import AppController from './AppController.js';
import DOM from './DOM.js';
import Task from './Task.js';
import Project from './Project.js';

const app = new AppController();
let currentProjectIndex = 0;

const render = () => {
  DOM.renderProjects(app.projects, currentProjectIndex);
  DOM.renderTasks(app.projects[currentProjectIndex]);
};

// 1. Alternar ou Deletar Projetos
document.getElementById('project-list').addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const clickedId = li.dataset.projectId;

  if (e.target.classList.contains('btn-delete-proj')) {
      app.deleteProject(clickedId);
      currentProjectIndex = 0; 
      app.saveData();
      render();
      return; 
  }

  currentProjectIndex = app.projects.findIndex(proj => proj.id === clickedId);
  render();
});

// 2. Abrir Modais
const modalProject = document.getElementById('modal-project');
const modalTask = document.getElementById('modal-task');

document.getElementById('btn-new-project').addEventListener('click', () => modalProject.showModal());
document.getElementById('btn-new-task').addEventListener('click', () => modalTask.showModal());

// 3. Criar Novo Projeto
document.getElementById('form-project').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('project-name').value;
    const newProject = new Project(name);
    app.projects.push(newProject);
    currentProjectIndex = app.projects.length - 1; 
    app.saveData();
    render();
    modalProject.close();
    e.target.reset();
});

// 4. Criar Nova Tarefa
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

// 5. Interações no Card da Tarefa
document.getElementById('task-list').addEventListener('click', (e) => {
    const taskCard = e.target.closest('.task-card');
    if (!taskCard) return;

    const action = e.target.dataset.action;
    const taskId = taskCard.dataset.taskId;
    const project = app.projects[currentProjectIndex];
    const task = project.tasks.find(t => t.id === taskId);

    // Expande os detalhes se clicar fora dos botões
    if (!action) {
        const detailsDiv = taskCard.querySelector('.task-details');
        if (detailsDiv) {
            detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
        }
        return;
    }

    // Ações dos botões (Deletar ou Concluir)
    if (action === 'delete') {
        project.removeTask(taskId);
    } else if (action === 'complete') {
        task.completed = !task.completed;
    }

    app.saveData();
    render();
});

render();