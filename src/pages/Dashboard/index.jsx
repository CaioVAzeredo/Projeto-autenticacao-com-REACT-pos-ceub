import React, { useEffect, useState } from 'react';
import "./Dashboard.css"
import Button from "../../components/Button";

function DashBoard({ setPagina }) {
    const [usuario, setUsuario] = useState(null);

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
    const criarTarefa = () => {
        alert('Função para criar nova tarefa ainda não implementada.');
    };

    const irParaPerfil = () => {
        setPagina("perfil");
    };

    return (
        <div className='dashboard'>
            <h2>Bem-vindo, {usuario?.name}!</h2>
            <p>Tenha um ótimo dia de produtividade 🚀</p>

            <div className="resumo-dashboard" style={{
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                padding: '20px',
                marginTop: '20px',
                marginBottom: '20px'
            }}>
                <p><strong>Total de tarefas:</strong> 12</p>
                <p><strong>Concluídas hoje:</strong> 3</p>
                <p><strong>Pendentes:</strong> 9</p>
            </div>
            <div className='divBtn'>
                <Button info={"Nova tarefa"} onclick={criarTarefa} />
                <Button info={"Perfil"} onclick={irParaPerfil} />
            </div>

        </div>
    );
}

export default DashBoard