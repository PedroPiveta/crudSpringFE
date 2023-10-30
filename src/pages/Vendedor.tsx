import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "../lib/axios";
import { VendedorCard } from "../components/VendedorCard";
import { PlusIcon } from "@radix-ui/react-icons";

export function Vendedor() {
  const [vendedores, setVendedores] = useState([]);

  type vendedor = {
    id: number;
    nome: string;
    email: string;
    meta: number;
  };

  async function getVendedores() {
    try {
      const response = await api.get("/vendedor");
      setVendedores(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getVendedores();
  }, []);

  return (
    <main>
      <Dialog.Root>
        <Dialog.Trigger className="ml-[2.5%] mb-4">
          <button className="flex items-center gap-2 px-4 py-2 ml text-white bg-purple-950 rounded-lg shadow-md">
            Adicionar Vendedor
            <PlusIcon />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900 opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <form className="bg-white flex flex-col p-6 rounded-sm">
              <label htmlFor="nome">Nome</label>
              <input name="nome" id="nome" type="text" />
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="flex flex-col gap-6 items-center">
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
