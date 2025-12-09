import React, {useState} from 'react';
import axios from 'axios';
import './ProdutosInicial.css';

function ProdutosInicial() {
    const [produtos, setProdutos] = useState([]);
    const [busca, setBusca] = useState('');
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0.0);
    const [status, setStatus] = useState('');
    const [tabela, setTabela] = useState(false);


    const handlePesquisar = async () => {
        if (!busca.trim()) {
            alert('Por favor, insira um nome para pesquisar');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/produtos/nome/${busca}`);
            setProdutos([response.data]);
            console.log(response.data);
            setTabela(true);
        } catch (error) {
            console.error('Erro ao pesquisar o produto: ', error);
            alert('Erro ao pesquisar o produto');
        }
    };


    const handleCadastrar = async () => {
        if (!nome.trim()) {
            setStatus('O campo nome é obrigatório');
            return;
        }
        if (preco <= 0) {
            setStatus('Preço tem quer ser maior que 0');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/produtos', {
                nome,
                preco,
            });
            setStatus('Produto cadastrado com sucesso');
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            setStatus('Erro ao cadastrar produto');
        }
    };


    const handleListar = async () => {
        try {
            const response = await axios.get('http://localhost:8080/produtos');
            setProdutos(response.data);
            setTabela(true);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            setStatus('Erro ao listar produtos');
        }
    };


    return (
        <div className="container">

            <div className="container-pesquisa-cadastro">
                <div className="barra-pesquisa">
                    <input
                        type="text"
                        placeholder="Pesquise o nome do produto"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <button className="button-pesquisar" onClick={handlePesquisar}>Pesquisar</button>
                </div>


                <div className="container-cadastro-lista">
                    <div className="cadastro-produtos">
                        <h2 className="titulo">Cadastro de Produtos</h2>
                        <label>Nome:</label>
                        <input
                            type="text"
                            placeholder="Digite o nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <label>Preço:</label>
                        <input
                            type="number"
                            placeholder="Digite o preço"
                            value={preco}
                            onChange={(e) => setPreco(parseFloat(e.target.value))}
                        />
                        {status && <p className="status">{status}</p>}
                        <div className="container-botoes">
                            <button onClick={handleCadastrar}>Cadastrar</button>
                            <button onClick={handleListar}>Listar</button>
                        </div>
                    </div>


                    {tabela && (
                        <div className="tabela-produtos">
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                </tr>
                                </thead>
                                <tbody>
                                {produtos.length > 0 ? (
                                    produtos.map((produto) => (
                                        <tr key={produto.id}>
                                            <td>{produto.id}</td>
                                            <td>{produto.nome}</td>
                                            <td>{produto.preco}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Nenhum produto encontrado</td>
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

export default ProdutosInicial;