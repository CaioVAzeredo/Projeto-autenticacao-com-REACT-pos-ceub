import './Header.css'
import iconeClaro from '../../assets/img/icone-claro.png';
import iconeEscuro from '../../assets/img/icone-escuro.png';
import { useEffect, useState } from 'react';
import perfil from '../../assets/img/perfil-de-usuario-selecionado.png'


function Header({ titulo }) {
    const [tema, setTema] = useState(() => {
        return localStorage.getItem("tema") || "claro";
    });

    function mudarTema() {
        setTema(tema === "claro" ? "escuro" : "claro");
    }

    function paginaPerfil() {
        window.location.href = "/"
    }

    useEffect(() => {
        localStorage.setItem("tema", tema);
    }, [tema])

    return (
        <div className='header'>
            <h2>Gerenciador de {titulo}</h2>
            <div>
                <img src={tema === "claro" ? iconeEscuro : iconeClaro}
                    alt={`Tema ${tema === "claro" ? "escuro" : "claro"}`}
                    className='icon-tema'
                    onClick={mudarTema}
                />
                <img className='foto' src={perfil} onClick={paginaPerfil}></img></div>
        </div>
    )
}

export default Header