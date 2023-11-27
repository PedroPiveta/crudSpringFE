import { DeleteEntityDialog } from "./DeleteEntityDialog";
import { EditEntityForm } from "./EditEntityForm";
import { vendedor } from "../types/EntityTypes";

type vendedorCardProps = {
  vendedor: vendedor;
  handleGet: () => void;
};

export function VendedorCard(props: vendedorCardProps) {
  return (
    <div className="flex justify-between w-[30%] p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-4 ">
        <p className="text-lg font-bold text-slate-900">
          {props.vendedor.nome}
        </p>
        <p className="text-sm text-slate-900">{props.vendedor.email}</p>
        <p className="text-sm text-slate-900">
          Meta de ligações: {props.vendedor.meta}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <EditEntityForm />
        <DeleteEntityDialog
          handleGet={props.handleGet}
          id={props.vendedor.id}
          entity="vendedor"
        />
      </div>
    </div>
  );
}
