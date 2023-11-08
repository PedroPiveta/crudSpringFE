import { Header } from "./components/Header";
import { Cliente } from "./pages/Cliente";
import { Ligacao } from "./pages/Ligacao";
import { Vendedor } from "./pages/Vendedor";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/vendedores" />} />
          <Route path="/vendedores" element={<Vendedor />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/ligacoes" element={<Ligacao />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
