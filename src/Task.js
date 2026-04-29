import Entity from './Entity.js';

export default class Task extends Entity {
  constructor(title, description, dueDate, priority, notes = '') {
    super();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = [];
    this.completed = false;
  }
}