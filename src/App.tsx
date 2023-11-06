import { Header } from "./components/Header";
import { Cliente } from "./pages/Cliente";
import { Vendedor } from "./pages/Vendedor";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/vendedores" element={<Vendedor />} />
          <Route path="/clientes" element={<Cliente />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
