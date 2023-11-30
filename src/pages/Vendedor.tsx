import React, { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { VendedorCard } from "../components/VendedorCard";
import { CreateEntityDialog } from "../components/CreateEntityDialog";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { vendedor } from "../types/EntityTypes";
import { container } from "../lib/framerMotion";

export function Vendedor() {
  const [vendedores, setVendedores] = useState<vendedor[]>([]);
  const [newVendedor, setNewVendedor] = useState<vendedor | object>({});

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
      </CreateEntityDialog>
      <AnimatePresence mode="popLayout">
        {vendedores.length > 0 ? (
          <motion.div
            className="flex flex-wrap gap-6 items-center"
            variants={container}
            initial="hidden"
            animate="show"
            exit="vanish"
          >
            {vendedores.map((vendedor: vendedor) => (
              <VendedorCard
                key={vendedor.id}
                vendedor={vendedor}
                handleGet={getVendedores}
              />
            ))}
          </motion.div>
        ) : (
          <p>Nenhum vendedor cadastrado</p>
        )}
      </AnimatePresence>
    </main>
  );
}
