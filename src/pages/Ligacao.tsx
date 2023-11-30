import { useEffect, useState } from "react";
import { LigacaoCard } from "../components/LigacaoCard";
import { api } from "../lib/axios";
import { CreateEntityDialog } from "../components/CreateEntityDialog";
import { cliente, ligacao, vendedor } from "../types/EntityTypes";
import { AnimatePresence, motion } from "framer-motion";
import { container } from "../lib/framerMotion";

export function Ligacao() {
  const [vendedores, setVendedores] = useState<vendedor[]>([]);
  const [clientes, setClientes] = useState<cliente[]>([]);
  const [ligacoes, setLigacoes] = useState<ligacao[]>([]);
  const [newLigacao, setNewLigacao] = useState<ligacao | object>({});

  async function getLigacoes() {
    try {
      const response = await api.get("/ligacao");
      setLigacoes(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getVendedores() {
    try {
      const response = await api.get("/vendedor");
      setVendedores(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getClientes() {
    try {
      const response = await api.get("/cliente");
      setClientes(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleVendedor(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedVendedorId = e.target.value; // Obtém o ID do vendedor selecionado
    const selectedVendedor = vendedores.find(
      (vendedor) => vendedor.id === Number(selectedVendedorId)
    );

    if (selectedVendedor) {
      setNewLigacao((prevState) => ({
        ...prevState,
        vendedor: selectedVendedor, // Atualiza o objeto vendedor em newLigacao state
      }));
    }
  }

  function handleCliente(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedClienteId = Number(e.target.value); // Obtém o ID do cliente selecionado
    const selectedCliente = clientes.find(
      (cliente) => cliente.id === selectedClienteId
    );

    if (selectedCliente) {
      setNewLigacao((prevState) => ({
        ...prevState,
        cliente: selectedCliente, // Atualiza o objeto cliente em newLigacao state
      }));
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNewLigacao((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function addLigacao(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/ligacao", newLigacao);
      getLigacoes();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getLigacoes();
    getVendedores();
    getClientes();
  }, []);

  return (
    <main className="mx-[2.5%] mb-6">
      <CreateEntityDialog addEntity={addLigacao} entity="Ligacao">
        <label className="mb-1" htmlFor="vendedor">
          Vendedor
        </label>
        <select
          className="shadow-md bg-slate-100 rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="vendedor"
          id="vendedor"
          onChange={handleVendedor}
        >
          <option value="">Selecione um vendedor</option>
          {vendedores.map((vendedor) => (
            <option key={vendedor.id} value={vendedor.id}>
              {vendedor.nome}
            </option>
          ))}
        </select>
        <label className="mb-1" htmlFor="cliente">
          Cliente
        </label>
        <select
          className="shadow-md bg-slate-100 rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="cliente"
          id="cliente"
          onChange={handleCliente}
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome} - {cliente.email}
            </option>
          ))}
        </select>
        <label className="mb-1" htmlFor="horario">
          Horário da ligação
        </label>
        <input
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="horario"
          id="horario"
          type="datetime-local"
          onChange={handleChange}
        />
        <label className="mb-1" htmlFor="duracao">
          Duração da ligação em minutos
        </label>
        <input
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="duracao"
          id="duracao"
          type="number"
          onChange={handleChange}
        />
        <label className="mb-1" htmlFor="descricao">
          Descricao
        </label>
        <textarea
          className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
          name="descricao"
          id="descricao"
          onChange={handleChange}
        />
      </CreateEntityDialog>
      <AnimatePresence mode="popLayout">
        {ligacoes.length && (
          <motion.div
            className="flex flex-wrap gap-6 items-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {ligacoes.length > 0 ? (
              ligacoes.map((ligacao: ligacao) => (
                <LigacaoCard
                  vendedores={vendedores}
                  clientes={clientes}
                  key={ligacao.id}
                  ligacao={ligacao}
                  handleGet={getLigacoes}
                />
              ))
            ) : (
              <p>Nenhuma ligação cadastrada</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
