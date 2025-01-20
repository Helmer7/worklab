const express = require('express'); // Framework web para criar rotas e gerenciar requisições
const { Sequelize, DataTypes } = require('sequelize'); // ORM Sequelize para modelagem de dados
const cors = require('cors'); // Middleware para permitir requisições de origens diferentes (Cross-Origin Resource Sharing)

const app = express(); // Instância do servidor Express
const PORT = 5000; // Porta onde o servidor será executado

// Middleware CORS
app.use(cors());

// Middleware para interpretar JSON
app.use(express.json());

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite', // Banco de dados SQLite
  storage: 'database.sqlite' // Arquivo onde o banco de dados será salvo
});

// Definição do modelo Paciente
const Paciente = sequelize.define('Paciente', {
  numeroAtendimento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nomeCompleto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  celular: {
    type: DataTypes.STRING
  }
});

// Definição do modelo Exame
const Exame = sequelize.define('Exame', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// Modelo intermediário para criar a relação N:N entre Pacientes e Exames
const PacienteExame = sequelize.define('PacienteExame', {});

// Configuração dos relacionamentos entre os modelos
Paciente.belongsToMany(Exame, { through: PacienteExame });
Exame.belongsToMany(Paciente, { through: PacienteExame });

// Rota para criar um novo paciente
app.post('/pacientes', async (req, res) => {
  try {
    const numeroAtendimento = Math.floor(Math.random() * 1000000).toString();
    const paciente = await Paciente.create({ ...req.body, numeroAtendimento });
    res.status(201).json(paciente);
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todos os pacientes
app.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    res.status(400).json({ error: error.message });
  }
});

// Rota para editar um paciente
app.put('/pacientes/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    await paciente.update(req.body);
    res.status(200).json(paciente);
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(400).json({ error: error.message });
  }
});

// Rota para excluir um paciente
app.delete('/pacientes/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    await paciente.destroy();
    res.status(200).json({ message: 'Paciente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir paciente:', error);
    res.status(400).json({ error: error.message });
  }
});

// Rota para criar um novo exame
app.post('/exames', async (req, res) => {
  try {
    const exame = await Exame.create(req.body);
    res.status(201).json(exame);
  } catch (error) {
    console.error('Erro ao criar exame:', error);
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todos os exames
app.get('/exames', async (req, res) => {
  try {
    const exames = await Exame.findAll();
    res.status(200).json(exames);
  } catch (error) {
    console.error('Erro ao buscar exames:', error);
    res.status(400).json({ error: error.message });
  }
});

// Rota para vincular um exame a um paciente
app.post('/pacientes/:id/exames', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado.' });
    }

    const exame = await Exame.findOne({ where: { codigo: req.body.codigo } });
    if (!exame) {
      return res.status(404).json({ error: 'Exame não encontrado.' });
    }

    await paciente.addExame(exame);
    res.status(200).json({ message: 'Exame vinculado ao paciente com sucesso.' });
  } catch (error) {
    console.error('Erro ao vincular exame ao paciente:', error);
    res.status(400).json({ error: 'Erro ao vincular exame. Verifique os dados fornecidos.' });
  }
});

// Rota para gerar relatório de um paciente com seus exames
app.get('/relatorios/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id, {
      include: Exame
    });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.status(200).json(paciente);
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(400).json({ error: error.message });
  }
});

// Inicialização do banco de dados e do servidor
sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
