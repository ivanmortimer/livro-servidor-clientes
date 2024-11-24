import Link from "next/link";
import React from "react";


export const Menu: React.FC = () => {
    return (
        <div className="App">
            <nav className="navbar bg-dark border-bottom border-body navbar-dark">
                <div className="container-fluid">
                <ul className="navbar-nav d-flex flex-row nav-underline">
                    <li className="nav-item me-3">
                        <Link className="nav-link text-white" href="/">Home</Link>
                    </li>
                    <li className="nav-item me-3">
                        <Link className="nav-link text-white" href="/LivroLista">Catálogo</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" href="/LivroDados">Novo</Link>
                    </li>
                </ul>
                </div>
            </nav>   
        </div>
      );    
}
