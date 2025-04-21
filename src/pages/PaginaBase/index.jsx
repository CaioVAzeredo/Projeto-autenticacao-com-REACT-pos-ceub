import { useState } from 'react';
import './PaginaBase.css'
import Tarefas from '../Tarefas';
import Perfil from '../Perfil';
import DashBoard from '../Dashboard';

import dashboard from '../../assets/img/casa.png';
import tarefas from '../../assets/img/lista.png';
import perfil from '../../assets/img/perfil-de-usuario.png';
import Header from '../../components/Header';

function PaginaBase() {
    const [filtro, setFiltro] = useState("dashboard");
    const [pagina, setPagina] = useState("dashboard");
    const [icone, setIcone] = useState("dashboard");
    const [titulo, setTitulo] = useState("Dashboard");

    const paginas = {
        dashboard: <DashBoard />,
        tarefas: <Tarefas />,
        perfil: <Perfil />
    }

    const icones = {
        dashboard,
        tarefas,
        perfil
    }

    return (
        <section className='pagBase'>
            <section className="menu-lateral">
                <h2>
                    <img src={icones[icone]} alt={`icone ${icones[icone]}`} />
                    {titulo}
                </h2>
                <ul>

                    <li onClick={() => {
                        setTitulo("Dashboard");
                        setFiltro("dashboard");
                        setPagina("dashboard");
                        setIcone("dashboard");
                    }} className={`filtro-menu-lateral ${filtro === "dashboard" ? "ativo" : ""}`}><img src={dashboard} alt="" />Dashboard</li>
                    <li onClick={() => {
                        setTitulo("Tarefas");
                        setFiltro("tarefas");
                        setPagina("tarefas");
                        setIcone("tarefas");
                    }} className={`filtro-menu-lateral ${filtro === "tarefas" ? "ativo" : ""}`}><img src={tarefas} alt="" />Tarefas</li>
                    <li onClick={() => {
                        setTitulo("Perfil");
                        setFiltro("perfil");
                        setPagina("perfil");
                        setIcone("perfil");
                    }} className={`filtro-menu-lateral ${filtro === "perfil" ? "ativo" : ""}`}><img src={perfil} alt="" />Perfil</li>
                </ul>
            </section>
            <div className='minhas-tarefas'>
                <main>
                    <Header
                        titulo={titulo}
                        setPagina={setPagina}
                        setTitulo={setTitulo}
                        setFiltro={setFiltro}
                        setIcone={setIcone} />
                    {paginas[pagina]}
                </main>
            </div>
        </section>
    );
}

export default PaginaBase;