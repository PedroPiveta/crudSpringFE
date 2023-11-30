import { DeleteEntityDialog } from "./DeleteEntityDialog";
import { EditEntityForm } from "./EditEntityForm";
import { cliente, ligacao, vendedor } from "../types/EntityTypes";
import { motion } from "framer-motion";
import { item } from "../lib/framerMotion";
import { useState } from "react";
import { api } from "../lib/axios";

type LigacaoCardProps = {
  ligacao: ligacao;
  vendedores: vendedor[];
  clientes: cliente[];
  handleGet: () => void;
};

export function LigacaoCard(props: LigacaoCardProps) {
  const [ligacao, setLigacao] = useState(props.ligacao);

  async function editLigacao(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await api.put("/ligacao/" + ligacao.id, ligacao);
    await props.handleGet();
  }

  function handleVendedor(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedVendedorId = e.target.value; // Obtém o ID do vendedor selecionado
    const selectedVendedor = props.vendedores.find(
      (vendedor) => vendedor.id === Number(selectedVendedorId)
    );

    if (selectedVendedor) {
      setLigacao((prevState) => ({
        ...prevState,
        vendedor: selectedVendedor, // Atualiza o objeto vendedor em newLigacao state
      }));
    }
  }

  function handleCliente(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedClienteId = Number(e.target.value);
    const selectedCliente = props.clientes.find(
      (cliente) => cliente.id === selectedClienteId
    );

    if (selectedCliente) {
      setLigacao((prevState) => ({
        ...prevState,
        cliente: selectedCliente,
      }));
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setLigacao((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  return (
    <motion.div
      className="flex justify-between w-[30%] p-6 bg-white rounded-lg shadow-md"
      layout
      variants={item}
    >
      <div className="flex flex-col gap-4 ">
        <p className="text-lg font-bold text-slate-900">
          {props.ligacao.horario}
        </p>
        <p className="text-md font-semibold text-slate-900">
          Vendedor: {props.ligacao.vendedor?.nome}
        </p>
        <p className="text-md font-semibold text-slate-900">
          Cliente: {props.ligacao.cliente?.nome}
        </p>
        <p className="text-sm text-slate-900">{props.ligacao.duracao}</p>
        <p className="text-sm text-slate-900">{props.ligacao.descricao}</p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <EditEntityForm entityName="Ligação" editEntity={editLigacao}>
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
            {props.vendedores.map((vendedor) => (
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
            {props.clientes.map((cliente) => (
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
            value={ligacao.horario}
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
            value={ligacao.duracao}
            onChange={handleChange}
          />
          <label className="mb-1" htmlFor="descricao">
            Descricao
          </label>
          <textarea
            className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
            name="descricao"
            id="descricao"
            value={ligacao.descricao}
            onChange={handleChange}
          />
        </EditEntityForm>
        <DeleteEntityDialog
          handleGet={props.handleGet}
          id={props.ligacao.id}
          entity="ligacao"
        />
      </div>
    </motion.div>
  );
}
