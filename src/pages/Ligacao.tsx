import { useEffect, useState } from "react";
import { LigacaoCard } from "../components/LigacaoCard";
import { api } from "../lib/axios";
import { CreateEntityDialog } from "../components/CreateEntityDialog";
import { ligacao } from "../types/EntityTypes";
import { AnimatePresence, motion } from "framer-motion";
import { container } from "../lib/framerMotion";

export function Ligacao() {
  const [ligacoes, setLigacoes] = useState([]);
  const [newLigacao, setNewLigacao] = useState({
    horario: "",
    duracao: 0,
    descricao: "",
  });

  async function getLigacoes() {
    try {
      const response = await api.get("/ligacao");
      setLigacoes(response.data);
    } catch (e) {
      console.log(e);
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
  }, []);

  return (
    <main className="mx-[2.5%] mb-6">
      <CreateEntityDialog addEntity={addLigacao} entity="Ligacao">
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
