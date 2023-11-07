import { useEffect, useState } from "react";
import { CreateEntityDialog } from "../components/CreateEntityDialog";
import { api } from "../lib/axios";
import { ClienteCard } from "../components/ClienteCard";

export function Cliente() {
  const [clientes, setClientes] = useState<clientes | null>(null);
  const [newCliente, setNewCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });

  type clientes = [
    {
      id: number;
      nome: string;
      email: string;
      telefone: string;
      cpf: string;
    }
  ];

  async function getClientes() {
    try {
      const response = await api.get("/cliente");
      setClientes(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCliente((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function addCliente(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/cliente", newCliente);
      getClientes();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <main className="mx-[2.5%] mb-6">
      <CreateEntityDialog entity="Cliente" addEntity={addCliente}>
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
          type="text"
          onChange={handleChange}
        />
        <label className="mb-1" htmlFor="telefone">
          Telefone
        </label>
        <input
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="telefone"
          id="telefone"
          type="text"
          onChange={handleChange}
        />
        <label className="mb-1" htmlFor="cpf">
          CPF
        </label>
        <input
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="cpf"
          id="cpf"
          type="text"
          onChange={handleChange}
        />
      </CreateEntityDialog>
      <div className="flex flex-wrap gap-6 items-center">
        {clientes?.map((cliente) => (
          <ClienteCard
            key={cliente.id}
            id={cliente.id}
            nome={cliente.nome}
            email={cliente.email}
            telefone={cliente.telefone}
            cpf={cliente.cpf}
          />
        ))}
      </div>
    </main>
  );
}
