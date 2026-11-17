# Gerenciador de Tarefas Acadêmicas (Node.js + MVC)

Aplicação web desenvolvida em **Node.js** com **Express** e **EJS**, estruturada no padrão arquitetural **MVC (Model-View-Controller)**, com armazenamento em memória (array de objetos).

## Estrutura do Projeto

```text
gerenciador-tarefas-mvc/
├── public/
│   └── css/
│       └── style.css          # Estilização da interface
├── src/
│   ├── controllers/
│   │   └── tarefaController.js # Recebe requisições, aciona o Model e renderiza as Views
│   ├── models/
│   │   └── tarefaModel.js      # Array em memória, regras de validação e operações CRUD
│   ├── routes/
│   │   └── tarefaRoutes.js     # Mapeamento das URLs para os métodos do Controller
│   ├── views/
│   │   ├── index.ejs           # Listagem, filtros e ações rápidas
│   │   ├── form.ejs            # Formulário de cadastro e edição
│   │   └── detalhes.ejs        # Visualização completa de uma tarefa
│   └── app.js                  # Configuração do servidor Express
└── package.json
```

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse no navegador: `http://localhost:3000`
