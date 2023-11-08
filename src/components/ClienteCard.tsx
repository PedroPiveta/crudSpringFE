import { Pencil1Icon } from "@radix-ui/react-icons";
import { DeleteEntityDialog } from "./DeleteEntityDialog";

type clienteCardProps = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  handleGet: () => void;
};

export function ClienteCard(props: clienteCardProps) {
  return (
    <div className="flex justify-between w-[30%] p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-4 ">
        <p className="text-lg font-bold text-slate-900">{props.nome}</p>
        <p className="text-sm text-slate-900">{props.email}</p>
        <p className="text-sm text-slate-900">{props.telefone}</p>
        <p className="text-sm text-slate-900">{props.cpf}</p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <Pencil1Icon className="w-full h-7 cursor-pointer hover:text-purple-600" />
        <DeleteEntityDialog
          handleGet={props.handleGet}
          id={props.id}
          entity="cliente"
        />
      </div>
    </div>
  );
}
