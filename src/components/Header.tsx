import { Link } from "react-router-dom";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";

export function Header() {
  return (
    <header className="w-full h-16 sm:h-24 mb-6 bg-purple-950">
      <nav className="flex items-center gap-12 h-full mx-[2.5%]">
        <Link
          className="text-slate-100 flex items-center gap-2 hover:text-purple-600 transition duration-200 ease-in-out"
          to="/vendedores"
        >
          <PiCurrencyCircleDollarFill />
          Vendedores
        </Link>
        <Link
          className="text-slate-100 flex items-center gap-2 hover:text-purple-600 transition duration-200 ease-in-out"
          to="/clientes"
        >
          <BsFillPeopleFill />
          Clientes
        </Link>
      </nav>
    </header>
  );
}
