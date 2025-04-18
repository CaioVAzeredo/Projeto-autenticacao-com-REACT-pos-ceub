import { useEffect, useState } from "react";

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
    function btnVoltar() {
        window.location.href = "/home"
    }
    return (
        <>
            <div onClick={btnVoltar} className='botaoVoltar'> ← voltar</div>
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
