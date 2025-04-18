import { useState } from 'react';
import './PaginaBase.css'
import Tarefas from '../Tarefas';
import Perfil from '../Perfil';
import DashBoard from '../Dashboard';

function PaginaBase() {
    const [filtro, setFiltro] = useState("dashboard");
    const [pagina, setPagina] = useState("dashboard");
    const [titulo, setTitulo] = useState("Dashboard");

    const paginas = {
        dashboard: <DashBoard />,
        tarefas: <Tarefas />,
        perfil: <Perfil />
    }



    return (
        <section className='pagBase'>
            <section className="menu-lateral">
                <h2>{titulo}</h2>
                <ul>
                    <li onClick={() => {
                        setTitulo("Dashboard");
                        setFiltro("dashboard");
                        setPagina("dashboard");
                    }} className={`filtro-menu-lateral ${filtro === "dashboard" ? "ativo" : ""}`}>Dashboard</li>
                    <li onClick={() => {
                        setTitulo("Tarefas");
                        setFiltro("tarefas");
                        setPagina("tarefas");
                    }} className={`filtro-menu-lateral ${filtro === "tarefas" ? "ativo" : ""}`}>Tarefas</li>
                    <li onClick={() => {
                        setTitulo("Perfil");
                        setFiltro("perfil");
                        setPagina("perfil");
                    }} className={`filtro-menu-lateral ${filtro === "perfil" ? "ativo" : ""}`}>Perfil</li>
                </ul>
            </section>
            <div className='minhas-tarefas'>
                <main>
                    {paginas[pagina]}
                </main>
            </div>
        </section>
    );
}

export default PaginaBase;