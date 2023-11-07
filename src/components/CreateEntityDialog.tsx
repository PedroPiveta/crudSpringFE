import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type CreateEntityDialogProps = {
  children: React.ReactNode;
  entity: string;
  addEntity: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function CreateEntityDialog({
  children,
  entity,
  addEntity,
}: CreateEntityDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild className="mb-4" onClick={() => setOpen(!open)}>
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-purple-950 rounded-lg shadow-md transition duration-200 ease-in-out hover:text-purple-700 hover:bg-white hover:outline hover:outline-2 outline-purple-700">
          Adicionar {entity}
          <PlusIcon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => setOpen(!open)}
          className="fixed inset-0 bg-slate-900 opacity-50"
        />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <form
            onSubmit={(e) => {
              addEntity(e);
              setOpen(!open);
            }}
            className="bg-slate-100 flex flex-col p-6 rounded-sm"
          >
            {children}
            <button
              type="submit"
              className="bg-purple-950 p-2 text-white font-semibold rounded-sm shadow-md mt-4 transition duration-200 ease-in-out hover:text-purple-700 hover:bg-white hover:outline hover:outline-2 outline-purple-700"
            >
              Salvar {entity}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
