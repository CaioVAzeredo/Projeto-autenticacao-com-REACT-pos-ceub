import './Perfil.css'
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Modal from '../../components/Modal';

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        const buscarPerfil = async () => {
            if (!token) {
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/users/profile", {
                    method: "GET",
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

    function estadoModal() {
        setModal(!modal);
    }


    return (
        <>
            <div className='profile'>
                <h1>Olá, {usuario?.name}</h1>
                {usuario ? (
                    <div className='info'>
                        <p><strong>Nome:</strong> {usuario?.name}</p>
                        <p><strong>E-mail:</strong> {usuario.email}</p>
                    </div>
                ) : (
                    <p>Carregando informações do usuário...</p>
                )}
                <div className="botoes">
                    <button onClick={logout}>Logout</button>
                    <button onClick={estadoModal}>Atualizar informações</button>
                </div>
            </div>
            {modal && <Modal
                setModal={setModal}
                modal={modal}
                setUsuario={setUsuario}
                estadoModal={estadoModal}
            />}
        </>

    );
}

export default Perfil;