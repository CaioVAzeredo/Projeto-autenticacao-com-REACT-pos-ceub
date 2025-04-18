import { useEffect, useState } from "react";
import Header from "../../components/Header";

function Perfil() {
    const [usuario, setUsuario] = useState(null);


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

    return (
        <>
            <Header titulo="Perfil" />
            <h1>Olá,{/*  {usuario.name} */}</h1>
            {usuario ? (
                <div>
                    {/*  <p>Nome: {usuario.name}</p> */}
                    <p>Email: {usuario.email}</p>
                </div>
            ) : (
                <p>Carregando informações do usuário...</p>
            )}
            <p onClick={logout}>Logout</p>
        </>
    );
}

export default Perfil;
