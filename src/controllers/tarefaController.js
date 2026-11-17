const TarefaModel = require('../models/tarefaModel');

class TarefaController {
  // Listar e Filtrar tarefas
  static index(req, res) {
    const filtro = req.query.status || 'todas';
    const tarefas = TarefaModel.listar(filtro);
    res.render('index', { tarefas, filtro });
  }

  // Exibir formulário de cadastro
  static formCriar(req, res) {
    res.render('form', {
      acao: '/tarefas/nova',
      tituloPagina: 'Cadastrar Nova Tarefa',
      tarefa: { titulo: '', descricao: '', disciplina: '' },
      erros: []
    });
  }

  // Processar cadastro
  static criar(req, res) {
    const { titulo, descricao, disciplina } = req.body;
    const erros = TarefaModel.validar({ titulo, descricao, disciplina });

    if (erros.length > 0) {
      return res.status(400).render('form', {
        acao: '/tarefas/nova',
        tituloPagina: 'Cadastrar Nova Tarefa',
        tarefa: { titulo, descricao, disciplina },
        erros
      });
    }

    TarefaModel.criar({ titulo, descricao, disciplina });
    res.redirect('/tarefas');
  }

  // Consultar detalhes de uma tarefa
  static detalhes(req, res) {
    const tarefa = TarefaModel.buscarPorId(req.params.id);
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.render('detalhes', { tarefa });
  }

  // Exibir formulário de edição
  static formEditar(req, res) {
    const tarefa = TarefaModel.buscarPorId(req.params.id);
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.render('form', {
      acao: `/tarefas/${tarefa.id}/editar`,
      tituloPagina: 'Editar Tarefa',
      tarefa,
      erros: []
    });
  }

  // Processar edição
  static editar(req, res) {
    const { id } = req.params;
    const tarefaExistente = TarefaModel.buscarPorId(id);
    if (!tarefaExistente) {
      return res.status(404).send('Tarefa não encontrada.');
    }

    const { titulo, descricao, disciplina } = req.body;
    const erros = TarefaModel.validar({ titulo, descricao, disciplina });

    if (erros.length > 0) {
      return res.status(400).render('form', {
        acao: `/tarefas/${id}/editar`,
        tituloPagina: 'Editar Tarefa',
        tarefa: { id, titulo, descricao, disciplina },
        erros
      });
    }

    TarefaModel.editar(id, { titulo, descricao, disciplina });
    res.redirect('/tarefas');
  }

  // Concluir tarefa
  static concluir(req, res) {
    const tarefa = TarefaModel.concluir(req.params.id);
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.redirect('/tarefas');
  }

  // Excluir tarefa
  static excluir(req, res) {
    const removido = TarefaModel.excluir(req.params.id);
    if (!removido) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.redirect('/tarefas');
  }
}

module.exports = TarefaController;
