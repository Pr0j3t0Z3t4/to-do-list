import Project from './Project.js';
import Task from './Task.js';
import Storage from './Storage.js';

export default class AppController {
  constructor() {
    this.projects = [];
    this.loadData();
  }

  loadData() {
    const rawData = Storage.load();
    
    if (rawData) {
      // Reidratação: reconstrói as instâncias de Project e Task
      this.projects = rawData.map(projData => {
        const project = new Project(projData.name);
        project.id = projData.id; // Mantém o ID original
        
        project.tasks = projData.tasks.map(taskData => {
          const task = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, taskData.notes);
          task.id = taskData.id;
          task.checklist = taskData.checklist;
          return task;
        });
        
        return project;
      });
    } else {
      // Projeto padrão caso seja o primeiro acesso
      this.projects.push(new Project('Inbox'));
    }
  }

  saveData() {
    Storage.save(this.projects);
  }
}