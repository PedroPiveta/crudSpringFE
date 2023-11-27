import { DeleteEntityDialog } from "./DeleteEntityDialog";
import { EditEntityForm } from "./EditEntityForm";
import { ligacao } from "../types/EntityTypes";

type LigacaoCardProps = {
  ligacao: ligacao;
  handleGet: () => void;
};

export function LigacaoCard(props: LigacaoCardProps) {
  return (
    <div className="flex justify-between w-[30%] p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-4 ">
        <p className="text-lg font-bold text-slate-900">
          {props.ligacao.horario.toString()}
        </p>
        <p className="text-sm text-slate-900">{props.ligacao.duracao}</p>
        <p className="text-sm text-slate-900">{props.ligacao.descricao}</p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <EditEntityForm />
        <DeleteEntityDialog
          handleGet={props.handleGet}
          id={props.ligacao.id}
          entity="ligacao"
        />
      </div>
    </div>
  );
}
