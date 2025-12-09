
import React, { useState } from 'react';
import axios from 'axios';
import './ClientesInicial.css';

function ClientesInicial() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [tabela, setTabela] = useState(false);



  const handlePesquisar = async () => {
    if (!busca.trim()) {
      alert('Por favor, insira um nome para pesquisar');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/clientes/nome/${busca}`);
      setClientes([response.data]);
      console.log(response.data);
      setTabela(true);
    } catch (error) {
      console.error('Erro ao pesquisar o cliente: ', error);
      alert('Erro ao pesquisar o cliente');
    }
  };



  const handleCadastrar = async () => {
    if (!nome.trim()) {
      setStatus('O campo nome é obrigatório');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/clientes', {
        nome,
        contato,
        email,
      });
      setStatus('Cliente cadastrado com sucesso');
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      setStatus('Erro ao cadastrar cliente');
    }
  };




  const handleListar = async () => {
    try {
      const response = await axios.get('http://localhost:8080/clientes');
      setClientes(response.data);
      setTabela(true);
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      setStatus('Erro ao listar clientes');
    }
  };


  return (
    <div className="container">

    <div className="container-pesquisa-cadastro">
      <div className="barra-pesquisa">
        <input
          type="text"
          placeholder="Pesquise o nome do cliente"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className="button-pesquisar" onClick={handlePesquisar}>Pesquisar</button>
      </div>
  
      <div className="container-cadastro-lista">
        <div className="cadastro-clientes">
          <h2 className="titulo">Cadastro de Clientes</h2>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label>Telefone:</label>
          <input
            type="text"
            placeholder="Digite o telefone"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
          <label>E-mail:</label>
          <input
            type="email"
            placeholder="Digite o e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {status && <p className="status">{status}</p>}
          <div className="container-botoes">
            <button onClick={handleCadastrar}>Cadastrar</button>
            <button onClick={handleListar}>Listar</button>
          </div>
        </div>
  
        {tabela && (
          <div className="tabela-clientes">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {clientes.length > 0 ? (
                  clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nome}</td>
                      <td>{cliente.contato}</td>
                      <td>{cliente.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Nenhum cliente encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default ClientesInicial;
