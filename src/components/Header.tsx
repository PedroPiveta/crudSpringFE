import { Link, useLocation } from "react-router-dom";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { BsFillPeopleFill, BsFillTelephoneInboundFill } from "react-icons/bs";

export function Header() {
  const location = useLocation();
  function pathMatchRoute(route: string) {
    if (location.pathname === route) {
      return true;
    }
  }
  return (
    <header className="w-full h-16 sm:h-24 mb-6 bg-purple-950">
      <nav className="flex items-center gap-12 h-full mx-[2.5%]">
        <Link
          className={`text-slate-100 border-b-[2px] border-b-transparent flex items-center gap-2 hover:text-purple-600 transition-all duration-300 ease-in-out ${
            pathMatchRoute("/vendedores") &&
            "!text-purple-600 !border-b-purple-600 pb-1"
          }`}
          to="/vendedores"
        >
          <PiCurrencyCircleDollarFill />
          Vendedores
        </Link>
        <Link
          className={`text-slate-100 border-b-[2px] border-b-transparent flex items-center gap-2 hover:text-purple-600 transition-all duration-300 ease-in-out ${
            pathMatchRoute("/clientes") &&
            "!text-purple-600 !border-b-purple-600 pb-1"
          }`}
          to="/clientes"
        >
          <BsFillPeopleFill />
          Clientes
        </Link>
        <Link
          className={`text-slate-100 border-b-[2px] border-b-transparent flex items-center gap-2 hover:text-purple-600 transition-all duration-300 ease-in-out ${
            pathMatchRoute("/ligacoes") &&
            "!text-purple-600 !border-b-purple-600 pb-1"
          }`}
          to="/ligacoes"
        >
          <BsFillTelephoneInboundFill />
          Ligações
        </Link>
      </nav>
    </header>
  );
}
