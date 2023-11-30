import { DeleteEntityDialog } from "./DeleteEntityDialog";
import { EditEntityForm } from "./EditEntityForm";
import { vendedor } from "../types/EntityTypes";
import { motion } from "framer-motion";
import { item } from "../lib/framerMotion";
import { useState } from "react";
import { api } from "../lib/axios";

type vendedorCardProps = {
  vendedor: vendedor;
  handleGet: () => void;
};

export function VendedorCard(props: vendedorCardProps) {
  const [vendedor, setVendedor] = useState(props.vendedor);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "meta") {
      setVendedor((prevState) => ({
        ...prevState,
        [e.target.id]: Number(e.target.value),
      }));
      return;
    }
    setVendedor((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function editVendedor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await api.put(`/vendedor/${vendedor.id}`, vendedor);
    await props.handleGet();
  }

  return (
    <motion.div
      className="flex justify-between w-[30%] p-6 bg-white rounded-lg shadow-md"
      layout
      variants={item}
    >
      <div className="flex flex-col gap-4 ">
        <p className="text-lg font-bold text-slate-900">
          {props.vendedor.nome}
        </p>
        <p className="text-sm text-slate-900">Email: {props.vendedor.email}</p>
        <p className="text-sm text-slate-900">
          Meta de ligações: {props.vendedor.meta}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <EditEntityForm editEntity={editVendedor} entityName="Vendedor">
          <label className="mb-1" htmlFor="nome">
            Nome
          </label>
          <input
            className="shadow-md rounded-sm mb-2 p-1 outline-purple-400 transition"
            name="nome"
            id="nome"
            type="text"
            value={vendedor.nome}
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
            value={vendedor.email}
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
            value={vendedor.meta}
            onChange={handleChange}
          />
        </EditEntityForm>
        <DeleteEntityDialog
          handleGet={props.handleGet}
          id={props.vendedor.id}
          entity="vendedor"
        />
      </div>
    </motion.div>
  );
}
