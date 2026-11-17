const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/tarefaController');

router.get('/', TarefaController.index);
router.get('/nova', TarefaController.formCriar);
router.post('/nova', TarefaController.criar);
router.get('/:id', TarefaController.detalhes);
router.get('/:id/editar', TarefaController.formEditar);
router.post('/:id/editar', TarefaController.editar);
router.post('/:id/concluir', TarefaController.concluir);
router.post('/:id/excluir', TarefaController.excluir);

module.exports = router;
