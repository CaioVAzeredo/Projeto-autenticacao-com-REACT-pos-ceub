import { useState } from 'react';
import './PaginaBase.css'
import Tarefas from '../Tarefas';
import Perfil from '../Perfil';
import DashBoard from '../Dashboard';

function PaginaBase() {
    const [filtro, setFiltro] = useState("dashboard");
    const [pagina, setPagina] = useState("dashboard");


    const paginas = {
        dashboard: <DashBoard />,
        tarefas: <Tarefas />,
        perfil: <Perfil />
    }



    return (
        <section className='sectionHome'>
            <section className="tarefas">
                <h2>Tarefas</h2>
                <ul>
                    <li onClick={() => {
                        setFiltro("dashboard");
                        setPagina("dashboard");
                    }} className={`filtro ${filtro === "dashboard" ? "ativo" : ""}`}>Dashboard</li>
                    <li onClick={() => {
                        setFiltro("tarefas");
                        setPagina("tarefas");
                    }} className={`filtro ${filtro === "tarefas" ? "ativo" : ""}`}>Tarefas</li>
                    <li onClick={() => {
                        setFiltro("perfil");
                        setPagina("perfil")
                    }} className={`filtro ${filtro === "perfil" ? "ativo" : ""}`}>Perfil</li>
                </ul>
            </section>
            <div className='minhas-tarefas'>
                <div>
                    <h2>Gerenciador de Tarefas</h2>
                    <div><i>icone</i> <div className='foto'></div></div>
                </div>
                <main>
                    {paginas[pagina]}
                </main>
            </div>
        </section>
    );
}

export default PaginaBase;