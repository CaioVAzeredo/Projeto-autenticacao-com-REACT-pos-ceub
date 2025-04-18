import './Perfil.css'
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Modal from '../../components/Modal';

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [modal, setModal] = useState();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        const buscarPerfil = async () => {
            if (!token) {
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUsuario(data);
                } else {
                    console.error("Erro ao buscar perfil" + data.message);
                }
            } catch (error) {
                console.error("Erro " + error);
            }
        }

        buscarPerfil();
    }, []);

    function logout() {
        localStorage.removeItem("authToken");
        window.location.href = "/";
        alert("Você saiu");
    }

    function abrirModal() {
        setModal(!modal);
    }

    return (
        <>
            <Header titulo="Perfil" />
            <div className='profile'>
                <h1>Olá, {usuario?.name}</h1>
                {usuario ? (
                    <div>
                        <p>Nome: {usuario?.name}</p>
                        <p>Email: {usuario.email}</p>
                    </div>
                ) : (
                    <p>Carregando informações do usuário...</p>
                )}
                <div className="botoes">
                    <button onClick={logout}>Logout</button>
                    <button onClick={abrirModal}>Atualizar informações</button>
                </div>
            </div>
            {modal && <Modal nome={usuario.name} email={usuario.email} />}
        </>
    );
}

export default Perfil;