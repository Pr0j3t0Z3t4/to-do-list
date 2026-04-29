import AppController from './AppController.js';
import Task from './Task.js';

const app = new AppController();

// Só adiciona a tarefa de teste se o Inbox estiver vazio
if (app.projects[0].tasks.length === 0) {
  const novaTarefa = new Task("Testar Storage", "Verificar F12", "2026-05-01", "Alta");
  app.projects[0].addTask(novaTarefa);
  app.saveData();
  console.log("Tarefa criada e salva no localStorage!");
} else {
  console.log("Dados carregados do localStorage:", app.projects);
}