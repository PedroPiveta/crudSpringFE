import { Header } from "./components/Header";
import { Vendedor } from "./pages/Vendedor";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/vendedores" element={<Vendedor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
