import Entity from './Entity.js';

export default class Project extends Entity {
  constructor(name) {
    super();
    this.name = name;
    this.tasks = []; // Composição: Um projeto contém várias tarefas
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}