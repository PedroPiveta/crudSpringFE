import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full h-16 sm:h-24 mb-6 bg-purple-950">
      <nav>
        <Link className="text-slate-100" to="/vendedores">
          Vendedores
        </Link>
      </nav>
    </header>
  );
}
