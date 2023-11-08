import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { api } from "../lib/axios";

type DeleteEntityDialogProps = {
  id: number;
  entity: string;
  handleGet: () => void;
};

export function DeleteEntityDialog({
  id,
  entity,
  handleGet,
}: DeleteEntityDialogProps) {
  async function handleDelete() {
    await api.delete(`/${entity}/${id}`);
    await handleGet();
  }
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <TrashIcon className="w-full h-7 cursor-pointer hover:text-red-700" />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-slate-900 opacity-50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col shadow-md bg-slate-100 rounded-sm p-8 h-52 justify-between ">
          <AlertDialog.Title className="text-lg font-semibold">
            Você tem certeza que deseja excluir este {entity}?
          </AlertDialog.Title>
          <AlertDialog.Description>
            Esta ação não pode ser desfeita.
          </AlertDialog.Description>
          <div className="flex gap-4 self-end">
            <AlertDialog.Cancel asChild>
              <button className="bg-purple-950 px-4 py-2 text-white font-semibold rounded shadow-md mt-4 transition duration-200 ease-in-out hover:text-purple-700 hover:bg-white hover:outline hover:outline-2 outline-purple-700">
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => handleDelete()}
                className="bg-red-700 px-4 py-2 text-white font-semibold rounded shadow-md mt-4 transition duration-200 ease-in-out hover:text-red-700 hover:bg-white hover:outline hover:outline-2 outline-red-700"
              >
                Excluir
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
