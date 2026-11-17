// Armazenamento em memória (array de objetos)
let tarefas = [
  {
    id: 1,
    titulo: "Estudar Padrão MVC",
    descricao: "Revisar a separação entre Model, View e Controller em aplicações Node.js.",
    disciplina: "Desenvolvimento Web",
    status: "pendente"
  },
  {
    id: 2,
    titulo: "Entregar trabalho de Node.js",
    descricao: "Finalizar código-fonte, subir no GitHub e gravar vídeo explicativo.",
    disciplina: "Engenharia de Software",
    status: "concluida"
  }
];

let proximoId = 3;

class TarefaModel {
  // Listar todas ou filtrar por status ('todas', 'pendente', 'concluida')
  static listar(filtroStatus = 'todas') {
    if (filtroStatus === 'pendente' || filtroStatus === 'concluida') {
      return tarefas.filter(t => t.status === filtroStatus);
    }
    return tarefas;
  }

  // Buscar uma tarefa pelo ID
  static buscarPorId(id) {
    return tarefas.find(t => t.id === Number(id));
  }

  // Validar os campos conforme regras do enunciado
  static validar({ titulo, descricao, disciplina }) {
    const erros = [];

    if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3 || titulo.trim().length > 100) {
      erros.push("O título é obrigatório e deve ter entre 3 e 100 caracteres.");
    }

    if (descricao && typeof descricao === 'string' && descricao.trim().length > 500) {
      erros.push("A descrição é opcional, mas deve ter no máximo 500 caracteres.");
    }

    if (!disciplina || typeof disciplina !== 'string' || disciplina.trim().length < 2 || disciplina.trim().length > 80) {
      erros.push("A disciplina é obrigatória e deve ter entre 2 e 80 caracteres.");
    }

    return erros;
  }

  // Criar nova tarefa
  static criar({ titulo, descricao, disciplina }) {
    const novaTarefa = {
      id: proximoId++,
      titulo: titulo.trim(),
      descricao: descricao ? descricao.trim() : "",
      disciplina: disciplina.trim(),
      status: "pendente" // inicialmente pendente
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
  }

  // Editar título, descrição e disciplina
  static editar(id, { titulo, descricao, disciplina }) {
    const tarefa = this.buscarPorId(id);
    if (!tarefa) return null;

    tarefa.titulo = titulo.trim();
    tarefa.descricao = descricao ? descricao.trim() : "";
    tarefa.disciplina = disciplina.trim();
    return tarefa;
  }

  // Alterar status de pendente para concluída
  static concluir(id) {
    const tarefa = this.buscarPorId(id);
    if (!tarefa) return null;

    tarefa.status = "concluida";
    return tarefa;
  }

  // Excluir tarefa
  static excluir(id) {
    const index = tarefas.findIndex(t => t.id === Number(id));
    if (index === -1) return false;

    tarefas.splice(index, 1);
    return true;
  }
}

module.exports = TarefaModel;
