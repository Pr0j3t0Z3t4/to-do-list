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
    
    if (rawData && rawData.length > 0) {
      this.projects = rawData.map(projData => {
        const project = new Project(projData.name);
        project.id = projData.id;
        
        project.tasks = projData.tasks.map(taskData => {
          const task = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, taskData.notes);
          task.id = taskData.id;
          task.checklist = taskData.checklist;
          task.completed = taskData.completed || false;
          return task;
        });
        
        return project;
      });
    } else {
      this.projects.push(new Project('Inbox'));
    }
  }

  saveData() {
    Storage.save(this.projects);
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    
    // Se excluir todos, cria um novo "Inbox" limpo
    if (this.projects.length === 0) {
      this.projects.push(new Project('Inbox'));
    }
  }
}