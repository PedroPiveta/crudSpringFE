import { useEffect, useState } from "react";
import { CreateEntityDialog } from "../components/CreateEntityDialog";
import { api } from "../lib/axios";
import { ClienteCard } from "../components/ClienteCard";

export function Cliente() {
  const [clientes, setClientes] = useState<clientes | null>(null);
  //   const [newCliente, setNewCliente] = useState({
  //     nome: "",
  //     email: "",
  //     telefone: "",
  //     cpf: "",
  //   });

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

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <main className="mx-[2.5%] mb-6">
      <CreateEntityDialog entity="Cliente" addEntity={() => {}}>
        <h1>olá</h1>
      </CreateEntityDialog>
      <div className="flex flex-wrap gap-6 items-center">
        {clientes?.map((cliente) => (
          <ClienteCard
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
