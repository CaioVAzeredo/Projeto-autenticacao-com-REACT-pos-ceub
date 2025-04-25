import React, { useEffect, useState } from 'react';
import "./Dashboard.css"
import Button from "../../components/Button";

function DashBoard({ setPagina }) {
    const [usuario, setUsuario] = useState(null);
    const [tasks, setTasks] = useState();



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

        const buscarTasks = async () => {
            if (!token) {
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/tasks", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log(data)
                    setTasks(data);
                } else {
                    console.error("Erro ao buscar perfil" + data.message);
                }
            } catch (error) {
                console.error("Erro " + error);
            }
        }
        buscarTasks();
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

            <div className="resumo-dashboard">
                <p><strong>Total de tarefas:</strong> {tasks ? tasks.length : 0}</p>
                <p><strong>Concluídas:</strong> {tasks ? tasks.filter(task => task.status === "CONCLUIDO").length : 0}</p>
                <p><strong>Pendentes:</strong> {tasks ? tasks.filter(task => task.status === "PENDENTE").length : 0}</p>
            </div>

            <div className='divBtn'>
                <Button info={"Nova tarefa"} onclick={criarTarefa} />
                <Button info={"Perfil"} onclick={irParaPerfil} />
            </div>

        </div>
    );
}

export default DashBoard