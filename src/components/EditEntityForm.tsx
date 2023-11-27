import * as Dialog from "@radix-ui/react-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

type EditEntityFormProps = {
  children: React.ReactNode;
  entityName: string;
  editEntity: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function EditEntityForm({
  children,
  entityName,
  editEntity,
}: EditEntityFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={() => setOpen(!open)}>
        <Pencil1Icon className="w-full h-7 cursor-pointer hover:text-purple-600" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => setOpen(!open)}
          className="DialogOverlay fixed inset-0 bg-slate-900 opacity-50"
        />
        <Dialog.Content className="DialogContent fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <form
            onSubmit={(e) => {
              editEntity(e);
              setOpen(!open);
            }}
            className="bg-slate-100 flex flex-col p-6 rounded-sm shadow-md"
          >
            {children}
            <button
              type="submit"
              className="bg-purple-950 p-2 text-white font-semibold rounded-sm shadow-md mt-4 transition duration-200 ease-in-out hover:text-purple-700 hover:bg-white hover:outline hover:outline-2 outline-purple-700"
            >
              Salvar {entityName}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
