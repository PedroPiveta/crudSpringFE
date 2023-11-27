import { cliente } from "../types/EntityTypes";
import { DeleteEntityDialog } from "./DeleteEntityDialog";
import { EditEntityForm } from "./EditEntityForm";
import { motion } from "framer-motion";

type clienteCardProps = {
  cliente: cliente;
  handleGet: () => void;
};

export function ClienteCard(props: clienteCardProps) {
  return (
    <motion.div
      className="flex justify-between w-[30%] p-6 bg-white rounded-lg shadow-md"
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-col gap-4 ">
        <p className="text-lg font-bold text-slate-900">{props.cliente.nome}</p>
        <p className="text-sm text-slate-900">{props.cliente.email}</p>
        <p className="text-sm text-slate-900">{props.cliente.telefone}</p>
        <p className="text-sm text-slate-900">{props.cliente.cpf}</p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <EditEntityForm></EditEntityForm>
        <DeleteEntityDialog
          handleGet={props.handleGet}
          id={props.cliente.id}
          entity="cliente"
        />
      </div>
    </motion.div>
  );
}
