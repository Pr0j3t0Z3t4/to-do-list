export default class Storage {
  static save(data) {
    localStorage.setItem('todo-list-data', JSON.stringify(data));
  }

  static load() {
    const data = localStorage.getItem('todo-list-data');
    return data ? JSON.parse(data) : null;
  }
}