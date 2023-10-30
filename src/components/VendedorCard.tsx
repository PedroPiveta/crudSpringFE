type vendedorProps = {
  id: number;
  nome: string;
  email: string;
  meta: number;
};

export function VendedorCard(props: vendedorProps) {
  return (
    <>
      <div className="flex flex-col justify-center w-[95%] h-16 p-12 bg-white rounded-lg shadow-md">
        <p className="text-lg font-bold text-slate-900">{props.nome}</p>
        <p className="text-sm text-slate-900">{props.email}</p>
        <p className="text-sm text-slate-900">Meta: {props.meta}</p>
      </div>
    </>
  );
}
