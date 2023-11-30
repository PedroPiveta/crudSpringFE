import { useState } from "react";
import { item } from "../lib/framerMotion";
import { cliente } from "../types/EntityTypes";
import { DeleteEntityDialog } from "./DeleteEntityDialog";
import { EditEntityForm } from "./EditEntityForm";
import { motion } from "framer-motion";
import { api } from "../lib/axios";

type clienteCardProps = {
  cliente: cliente;
  handleGet: () => void;
};

export function ClienteCard(props: clienteCardProps) {
  const [cliente, setCliente] = useState(props.cliente);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCliente((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function editCliente(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await api.put("/cliente/" + cliente.id, cliente);
    await props.handleGet();
  }

  return (
    <motion.div
      className="flex justify-between w-[30%] p-6 bg-white rounded-lg shadow-md"
      layout
      variants={item}
    >
      <div className="flex flex-col gap-4 ">
        <p className="text-lg font-bold text-slate-900">{props.cliente.nome}</p>
        <p className="text-sm text-slate-900">Email: {props.cliente.email}</p>
        <p className="text-sm text-slate-900">
          Telefone: {props.cliente.telefone}
        </p>
        <p className="text-sm text-slate-900">CPF: {props.cliente.cpf}</p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <EditEntityForm editEntity={editCliente} entityName="Cliente">
          <label className="mb-1" htmlFor="nome">
            Nome
          </label>
          <input
            className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
            name="nome"
            id="nome"
            type="text"
            value={cliente.nome}
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
            value={cliente.email}
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
            value={cliente.telefone}
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
            value={cliente.cpf}
            onChange={handleChange}
          />
        </EditEntityForm>
        <DeleteEntityDialog
          handleGet={props.handleGet}
          id={props.cliente.id}
          entity="cliente"
        />
      </div>
    </motion.div>
  );
}
