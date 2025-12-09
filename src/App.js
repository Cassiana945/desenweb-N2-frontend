import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ClientesInicial from './componentes/Clientes/ClientesInicial';
import ProdutosInicial from './componentes/Produtos/ProdutosInicial';
import PedidosInicial from './componentes/Pedidos/PedidosInicial';
import './App.css';


function App() {
  return (
    <div>
    <div className="home-container">
      <div className="home-item">
        <Link to="/clientes">Clientes</Link>
      </div>
      <div className="home-item">
        <Link to="/produtos">Produtos</Link>
      </div>
      <div className="home-item">
        <Link to="/pedidos">Pedidos</Link>
      </div>
    </div>

    
    <Routes>
    <Route path="/clientes" element={<ClientesInicial />} />
    <Route path="/produtos" element={<ProdutosInicial />} />
    <Route path="/pedidos" element={<PedidosInicial />} />
    </Routes>
  </div>
  );
}

export default App;
