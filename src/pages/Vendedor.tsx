import React, { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { VendedorCard } from "../components/VendedorCard";
import { CreateEntityDialog } from "../components/CreateEntityDialog";

export function Vendedor() {
  const [vendedores, setVendedores] = useState([]);
  const [newVendedor, setNewVendedor] = useState({
    nome: "",
    email: "",
    senha: "",
    meta: 0,
  });

  type vendedor = {
    id: number;
    nome: string;
    email: string;
    meta: number;
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "meta") {
      setNewVendedor((prevState) => ({
        ...prevState,
        [e.target.id]: Number(e.target.value),
      }));
      return;
    }
    setNewVendedor((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function getVendedores() {
    try {
      const response = await api.get("/vendedor");
      setVendedores(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function addVendedor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      console.log(newVendedor);
      await api.post("/vendedor", newVendedor);
      getVendedores();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getVendedores();
  }, []);

  return (
    <main className="mx-[2.5%] mb-6">
      <CreateEntityDialog addEntity={addVendedor} entity="vendedor">
        <label className="mb-1" htmlFor="nome">
          Nome
        </label>
        <input
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="nome"
          id="nome"
          type="text"
          onChange={handleChange}
        />
        <label className="mb-1" htmlFor="email">
          Email
        </label>
        <input
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="email"
          id="email"
          type="email"
          onChange={handleChange}
        />
        <label className="mb-1" htmlFor="senha">
          Senha
        </label>
        <input
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="senha"
          id="senha"
          type="password"
          onChange={handleChange}
        />
        <label className="mb-1" htmlFor="meta">
          Meta de ligações
        </label>
        <input
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="meta"
          id="meta"
          type="number"
          onChange={handleChange}
        />
        <button
          className="bg-purple-950 p-2 text-white font-semibold rounded-sm shadow-md mt-4 transition duration-200 ease-in-out hover:text-purple-700 hover:bg-white hover:outline hover:outline-2 outline-purple-700"
          type="submit"
        >
          Salvar Vendedor
        </button>
      </CreateEntityDialog>
      <div className="flex flex-wrap gap-6 items-center">
        {vendedores.length > 0 ? (
          vendedores.map((vendedor: vendedor) => (
            <VendedorCard
              key={vendedor.id}
              id={vendedor.id}
              nome={vendedor.nome}
              email={vendedor.email}
              meta={vendedor.meta}
            />
          ))
        ) : (
          <p>Nenhum vendedor encontrado</p>
        )}
      </div>
    </main>
  );
}
