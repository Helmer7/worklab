import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserPlus, FaVial, FaClipboard, FaChartLine, FaUserMd } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [pacientes, setPacientes] = useState([]);
  const [novoPaciente, setNovoPaciente] = useState({ nomeCompleto: '', sexo: '', email: '', celular: '' });
  const [novoExame, setNovoExame] = useState({ codigo: '', descricao: '', valor: '' });
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [codigoExame, setCodigoExame] = useState('');
  const [editingPaciente, setEditingPaciente] = useState(null);

  const apiUrl = 'http://localhost:3000';

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/pacientes`);
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  const handleAddPaciente = async () => {
    try {
      if (editingPaciente) {
        await axios.put(`${apiUrl}/pacientes/${editingPaciente.id}`, novoPaciente);
        setEditingPaciente(null);
      } else {
        await axios.post(`${apiUrl}/pacientes`, novoPaciente);
      }
      fetchPacientes();
      setNovoPaciente({ nomeCompleto: '', sexo: '', email: '', celular: '' });
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
    }
  };

  const handleAddExame = async () => {
    try {
      await axios.post(`${apiUrl}/exames`, novoExame);
      setNovoExame({ codigo: '', descricao: '', valor: '' });
    } catch (error) {
      console.error('Erro ao adicionar exame:', error);
    }
  };

  const handleVincularExame = async () => {
    if (!pacienteSelecionado || !codigoExame) return;
    try {
      const response = await axios.post(`${apiUrl}/pacientes/${pacienteSelecionado}/exames`, { codigo: codigoExame });
      alert(response.data.message); 
      setCodigoExame('');
    } catch (error) {
      console.error('Erro ao vincular exame:', error);
      alert('Erro ao vincular exame. Verifique os dados e tente novamente.');
    }
  };

  const handleEditPaciente = (paciente) => {
    setNovoPaciente(paciente);
    setEditingPaciente(paciente);
  };

  const handleDeletePaciente = async (id) => {
    try {
      await axios.delete(`${apiUrl}/pacientes/${id}`);
      fetchPacientes();
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
    }
  };

  const handleViewReport = async (pacienteId) => {
    try {
      const response = await axios.get(`${apiUrl}/relatorios/${pacienteId}`);
      const { nomeCompleto, sexo, email, Exames } = response.data;
      alert(
        `Paciente: ${nomeCompleto}\n` +
        `Sexo: ${sexo}\n` +
        `Email: ${email}\n` +
        `Exames:\n` +
        Exames.map(
          (exame) => ` - ${exame.descricao} (Código: ${exame.codigo}, Valor: R$${exame.valor})`
        ).join('\n')
      );
    } catch (error) {
      console.error('Erro ao buscar relatório:', error);
      alert('Erro ao buscar relatório. Tente novamente.');
    }
  };

  return (
    <div className="App">
      <h1>Worklab</h1>

      {/* Formulário de Pacientes */}
      <section>
        <h2><FaUserPlus /> {editingPaciente ? 'Editar Paciente' : 'Cadastrar Paciente'}</h2>
        <input
          className="input"
          type="text"
          placeholder="Nome Completo"
          value={novoPaciente.nomeCompleto}
          onChange={(e) => setNovoPaciente({ ...novoPaciente, nomeCompleto: e.target.value })}
        />
        <input
          className="input"
          type="text"
          placeholder="Sexo"
          value={novoPaciente.sexo}
          onChange={(e) => setNovoPaciente({ ...novoPaciente, sexo: e.target.value })}
        />
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={novoPaciente.email}
          onChange={(e) => setNovoPaciente({ ...novoPaciente, email: e.target.value })}
        />
        <input
          className="input"
          type="text"
          placeholder="Celular"
          value={novoPaciente.celular}
          onChange={(e) => setNovoPaciente({ ...novoPaciente, celular: e.target.value })}
        />
        <button className="button" onClick={handleAddPaciente}>
          {editingPaciente ? 'Salvar Alterações' : 'Adicionar Paciente'}
        </button>
      </section>

      {/* Cadastro de Exames */}
      <section>
        <h2><FaVial /> Cadastrar Exame</h2>
        <input
          className="input"
          type="text"
          placeholder="Código"
          value={novoExame.codigo}
          onChange={(e) => setNovoExame({ ...novoExame, codigo: e.target.value })}
        />
        <input
          className="input"
          type="text"
          placeholder="Descrição"
          value={novoExame.descricao}
          onChange={(e) => setNovoExame({ ...novoExame, descricao: e.target.value })}
        />
        <input
          className="input"
          type="number"
          placeholder="Valor"
          value={novoExame.valor}
          onChange={(e) => setNovoExame({ ...novoExame, valor: e.target.value })}
        />
        <button className="button" onClick={handleAddExame}>Adicionar Exame</button>
      </section>

      {/* Vincular Exames */}
      <section>
        <h2><FaClipboard /> Vincular Exame a Paciente</h2>
        <select className="input" onChange={(e) => setPacienteSelecionado(e.target.value)}>
          <option value="">Selecione um Paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nomeCompleto}
            </option>
          ))}
        </select>
        <input
          className="input"
          type="text"
          placeholder="Código do Exame"
          value={codigoExame}
          onChange={(e) => setCodigoExame(e.target.value)}
        />
        <button className="button" onClick={handleVincularExame}>Vincular Exame</button>
      </section>

      {/* Relatórios */}
      <section>
        <h2><FaChartLine /> Relatórios</h2>
        {pacientes.map((paciente) => (
          <div className="relatorio" key={paciente.id}>
            <h3><FaUserMd /> {paciente.nomeCompleto}</h3>
            <button className="button" onClick={() => handleEditPaciente(paciente)}>Editar</button>
            <button className="button" onClick={() => handleDeletePaciente(paciente.id)}>Excluir</button>
            <button className="button" onClick={() => handleViewReport(paciente.id)}>Ver Relatório</button>
          </div>
        ))}
      </section>
    </div>
  );
};
//testando alguma diferença para entrar todo o front
export default App;
