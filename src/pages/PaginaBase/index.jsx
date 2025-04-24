import { useState } from 'react';
import './PaginaBase.css'
import Tarefas from '../Tarefas';
import Perfil from '../Perfil';
import DashBoard from '../Dashboard';

import dashboard from '../../assets/img/casa.png';
import dashboardEscuro from '../../assets/img/casa-tema-escuro.png';
import tarefas from '../../assets/img/lista.png';
import tarefasEscuro from '../../assets/img/lista-tema-escuro.png';
import perfil from '../../assets/img/perfil-de-usuario-selecionado.png';
import perfilEscuro from '../../assets/img/perfil-de-usuario-selecionado-tema-escuro.png';
import Header from '../../components/Header';
import { useTema } from '../../components/ThemeContext';

function PaginaBase() {
    const [filtro, setFiltro] = useState("dashboard");
    const [pagina, setPagina] = useState("dashboard");
    const [icone, setIcone] = useState("dashboard");
    const [titulo, setTitulo] = useState("Dashboard");

    const { tema } = useTema();

    const paginas = {
        dashboard: <DashBoard setPagina={setPagina} />,
        tarefas: <Tarefas />,
        perfil: <Perfil />
    }

    const icones = {
        dashboard: tema === "claro" ? dashboard : dashboardEscuro,
        tarefas: tema === "claro" ? tarefas : tarefasEscuro,
        perfil: tema === "claro" ? perfil : perfilEscuro
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
                    }} className={`filtro-menu-lateral ${filtro === "dashboard" ? "ativo" : ""}`}><img src={tema === "claro" ? dashboard : dashboardEscuro} alt="" />Dashboard</li>
                    <li onClick={() => {
                        setTitulo("Tarefas");
                        setFiltro("tarefas");
                        setPagina("tarefas");
                        setIcone("tarefas");
                    }} className={`filtro-menu-lateral ${filtro === "tarefas" ? "ativo" : ""}`}><img src={tema === "claro" ? tarefas : tarefasEscuro} alt="" />Tarefas</li>
                    <li onClick={() => {
                        setTitulo("Perfil");
                        setFiltro("perfil");
                        setPagina("perfil");
                        setIcone("perfil");
                    }} className={`filtro-menu-lateral ${filtro === "perfil" ? "ativo" : ""}`}><img src={tema === "claro" ? perfil : perfilEscuro} alt="" />Perfil</li>
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