import { parseISO, format } from 'date-fns';

export default class DOM {
  // Renderiza a lista de projetos na barra lateral
  static renderProjects(projects, activeProjectIndex) {
    const list = document.getElementById('project-list');
    list.innerHTML = '';

    projects.forEach((project, index) => {
      const li = document.createElement('li');
      li.textContent = project.name;
      
      // Adiciona a classe 'active' se for o projeto selecionado
      if (index === activeProjectIndex) {
        li.classList.add('active');
      }
      
      // Armazena o ID do projeto para sabermos qual foi clicado
      li.dataset.projectId = project.id;
      list.appendChild(li);
    });
  }

  // Renderiza as tarefas do projeto atual na área principal
  static renderTasks(project) {
    document.getElementById('current-project-title').textContent = project.name;
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    project.tasks.forEach(task => {
      const div = document.createElement('div');
      
      // Adiciona as classes para o estilo básico e de prioridade
      div.className = 'task-card';
      const priorityClass = task.priority ? task.priority.toLowerCase() : 'low';
      div.classList.add(`priority-${priorityClass}`);
      
      // Armazena o ID da tarefa para interações futuras
      div.dataset.taskId = task.id;

      // Formatando a data com date-fns (ex: 01 de Mai)
      // Usamos parseISO para converter a string de data que vem do JSON
      const formattedDate = task.dueDate ? format(parseISO(task.dueDate), 'dd \'de\' MMM') : 'Sem data';

      // Criação dinâmica do conteúdo do card
      div.innerHTML = `
        <strong>${task.title}</strong>
        <p>${task.description || 'Nenhuma descrição'}</p>
        <small>Até: ${formattedDate}</small>
      `;
      list.appendChild(div);
    });
  }
}