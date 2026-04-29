import Task from './Task.js';
import Project from './Project.js';

// Testando instanciação
const meuProjeto = new Project("Projeto de Teste");
const minhaTarefa = new Task("Estudar Webpack", "Ler a documentação", "2026-04-30", "Alta");

// Testando composição
meuProjeto.addTask(minhaTarefa);

console.log("Projeto com Tarefa:", meuProjeto);