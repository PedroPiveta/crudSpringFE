import { useEffect, useState } from "react";
import { CreateEntityDialog } from "../components/CreateEntityDialog";
import { api } from "../lib/axios";
import { ClienteCard } from "../components/ClienteCard";
import { cliente } from "../types/EntityTypes";
import { motion, AnimatePresence } from "framer-motion";

export function Cliente() {
  const [clientes, setClientes] = useState<cliente[] | []>([]);
  const [newCliente, setNewCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });

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
      <motion.div className="flex flex-wrap gap-6 items-center transition-all">
        <AnimatePresence mode="popLayout">
          {clientes.length > 0 ? (
            clientes?.map((cliente: cliente) => (
              <ClienteCard
                key={cliente.id}
                cliente={cliente}
                handleGet={getClientes}
              />
            ))
          ) : (
            <p>Nenhum cliente cadastrado</p>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
