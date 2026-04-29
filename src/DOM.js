import { parseISO, format, isValid } from 'date-fns';

export default class DOM {
  static renderProjects(projects, activeProjectIndex) {
    const list = document.getElementById('project-list');
    list.innerHTML = '';

    projects.forEach((project, index) => {
      const li = document.createElement('li');
      li.textContent = project.name;
      
      if (index === activeProjectIndex) {
        li.classList.add('active');
      }
      
      li.dataset.projectId = project.id;
      list.appendChild(li);
    });
  }

  static renderTasks(project) {
    document.getElementById('current-project-title').textContent = project.name;
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    project.tasks.forEach(task => {
      const div = document.createElement('div');
      
      div.className = 'task-card';
      const priorityClass = task.priority ? task.priority.toLowerCase() : 'low';
      div.classList.add(`priority-${priorityClass}`);
      
      div.dataset.taskId = task.id;

      let formattedDate = 'Sem data';
      if (task.dueDate) {
          const parsedDate = parseISO(task.dueDate);
          if (isValid(parsedDate)) {
              formattedDate = format(parsedDate, 'dd \'de\' MMM');
          }
      }
      // Uso obrigatório de crases (`) abaixo
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start;">
            <strong style="text-decoration: ${task.completed ? 'line-through' : 'none'}; color: ${task.completed ? '#8b949e' : 'var(--text-title)'}">
                ${task.title}
            </strong>
            <div style="display: flex; gap: 5px;">
                <button data-action="complete" style="padding: 2px 8px; border-color: #d29922; color: #d29922;">✔</button>
                <button data-action="delete" style="padding: 2px 8px; border-color: #ff7b72; color: #ff7b72;">✖</button>
            </div>
        </div>
        <p>${task.description || 'Nenhuma descrição'}</p>
        <small>Até: ${formattedDate}</small>
        
        <div class="task-details" style="display: none; margin-top: 15px; border-top: 1px dashed var(--border-color); padding-top: 10px;">
            <small style="color: var(--text-main)"><b>Notas:</b> ${task.notes || 'Nenhuma nota adicional.'}</small><br>
            <small style="color: var(--text-main)"><b>Criada em:</b> ${task.id}</small>
        </div>
      `;
      list.appendChild(div);
    });
  }
}