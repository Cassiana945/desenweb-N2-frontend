import React, {useState} from 'react';
import axios from 'axios';
import './PedidosInicial.css';

function PedidosInicial() {
    const [pedidos, setPedidos] = useState([]);
    const [busca, setBusca] = useState(0);
    const [id, setId] = useState(0);
    const [idCliente, setIdCliente] = useState(0);
    const [idsProdutos, setIdsProdutos] = useState([]);
    const [status, setStatus] = useState('');
    const [tabela, setTabela] = useState(false);


    const handlePesquisarIdCliente = async () => {
        if (!String(busca).trim()) {
            alert('Por favor, insira um ID para pesquisar');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/pedidos/cliente/${busca}`);
            const data = Array.isArray(response.data) ? response.data : [response.data];
            setPedidos(data);
            console.log(data);
            setTabela(true);
        } catch (error) {
            console.error('Erro ao pesquisar o cliente: ', error);
            alert('Erro ao pesquisar o cliente');
        }
    };


    const handlePesquisarIdPedido = async () => {
        if (!String(busca).trim()) {
            alert('Por favor, insira um ID para pesquisar');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/pedidos/${busca}`);
            setPedidos([response.data]);
            console.log(response.data);
            setTabela(true);
        } catch (error) {
            console.error('Erro ao pesquisar o pedido: ', error);
            alert('Erro ao pesquisar o pedido');
        }
    };


    const handlePesquisarIdProduto = async () => {
        if (!String(busca).trim()) {
            alert('Por favor, insira um ID para pesquisar');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/pedidos/produto/${busca}`);
            const data = Array.isArray(response.data) ? response.data : [response.data];
            setPedidos(data);
            console.log(response.data);
            setTabela(true);
        } catch (error) {
            console.error('Erro ao pesquisar o produto: ', error);
            alert('Erro ao pesquisar o produto');
        }

    };


    const handleCadastrar = async () => {
        if (idsProdutos.length === 0) {
            setStatus('O pedido não pode estar vazio');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/pedidos', {
                idCliente,
                idsProdutos,
            });
            setStatus('Pedido cadastrado com sucesso');
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao cadastrar pedido:', error);
            setStatus('Erro ao cadastrar pedido');
        }
    };


    const handleListar = async () => {
        try {
            const response = await axios.get('http://localhost:8080/pedidos');
            setPedidos(response.data);
            setTabela(true);
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            setStatus('Erro ao listar pedidos');
        }
    };


    const handleIdsProdutosChange = (e) => {
        const ids = e.target.value.split(',').map((id) => parseInt(id.trim())).filter((id) => !isNaN(id));
        setIdsProdutos(ids);
    };

    return (
        <div className="container">

            <div className="container-pesquisa-cadastro">
                <div className="dropdown">
                    <input
                        type="number"
                        placeholder="Pesquise o ID"
                        value={busca}
                        onChange={(e) => setBusca(parseInt(e.target.value))}
                    />
                    <button className="button-pesquisar" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Pesquisar por:
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={handlePesquisarIdPedido} type="button">ID do
                                Pedido
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={handlePesquisarIdCliente} type="button">ID do
                                Cliente
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={handlePesquisarIdProduto} type="button">ID do
                                Produto
                            </button>
                        </li>
                    </ul>
                </div>


                <div className="container-cadastro-lista">
                    <div className="cadastro-pedidos">
                        <h2 className="titulo">Cadastro de Pedidos</h2>
                        <label>ID do Cliente:</label>
                        <input
                            type="number"
                            placeholder="Digite o ID"
                            value={idCliente}
                            onChange={(e) => setIdCliente(parseInt(e.target.value))}
                        />
                        <label>ID do Produto:</label>
                        <input
                            type="number"
                            placeholder="Digite o ID"
                            value={idsProdutos.join(',')}
                            onChange={handleIdsProdutosChange}
                        />
                        {status && <p className="status">{status}</p>}
                        <div className="container-botoes">
                            <button onClick={handleCadastrar}>Cadastrar</button>
                            <button onClick={handleListar}>Listar</button>
                        </div>
                    </div>


                    {tabela && (
                        <div className="tabela-pedidos">
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ID Cliente</th>
                                    <th>IDs Produtos</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pedidos.length > 0 ? (
                                    pedidos.map((pedido) => (
                                        <tr key={pedido.id}>
                                            <td>{pedido.id}</td>
                                            <td>{pedido.idCliente}</td>
                                            <td>{pedido.produtos && pedido.produtos.length > 0
                                                ? pedido.produtos.map((produto) => produto.id).join(', ')
                                                : 'Nenhum produto'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Nenhum pedido encontrado</td>
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

export default PedidosInicial;