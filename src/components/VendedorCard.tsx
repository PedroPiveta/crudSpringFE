import { Pencil1Icon } from "@radix-ui/react-icons";
import { DeleteEntityDialog } from "./DeleteEntityDialog";

type vendedorProps = {
  id: number;
  nome: string;
  email: string;
  meta: number;
  handleGet: () => void;
};

export function VendedorCard(props: vendedorProps) {
  return (
    <div className="flex justify-between w-[30%] p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-4 ">
        <p className="text-lg font-bold text-slate-900">{props.nome}</p>
        <p className="text-sm text-slate-900">{props.email}</p>
        <p className="text-sm text-slate-900">Meta de ligações: {props.meta}</p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <Pencil1Icon className="w-full h-7 cursor-pointer hover:text-purple-600" />
        <DeleteEntityDialog
          handleGet={props.handleGet}
          id={props.id}
          entity="vendedor"
        />
      </div>
    </div>
  );
}
