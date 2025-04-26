import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import Button from "../../components/Button";
import ModalFormTarefa from '../../components/ModalFormTarefa/ModalFormTarefa';


function DashBoard({ setPagina, setIcone, setTitulo, setFiltro }) {
    const [usuario, setUsuario] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);

    const API_URL = "http://localhost:3000/api/tasks";

    const isModal = () => {
        setModalAberto(!modalAberto);
    }

    const getAuthHeader = () => {
        const token = localStorage.getItem("authToken");
        return {
            Authorization: `Bearer ${token}`,
        };
    };


    useEffect(() => {
        const token = localStorage.getItem("authToken");

        const buscarPerfil = async () => {
            if (!token) return;

            try {
                const response = await fetch("http://localhost:3000/api/users/profile", {
                    method: "GET",
                    headers: getAuthHeader(),
                });

                const data = await response.json();

                if (response.ok) {
                    setUsuario(data);
                } else {
                    console.error("Erro ao buscar perfil: " + data.message);
                }
            } catch (error) {
                console.error("Erro: " + error);
            }
        };

        const buscarTasks = async () => {
            if (!token) return;

            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: getAuthHeader(),
                });

                const data = await response.json();

                if (response.ok) {
                    setTasks(data);
                } else {
                    console.error("Erro ao buscar tarefas: " + data.message);
                }
            } catch (error) {
                console.error("Erro: " + error);
            }
        };

        buscarPerfil();
        buscarTasks();
    }, []);


    const criarTarefa = async (tarefa) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    ...getAuthHeader(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tarefa),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erro ao criar tarefa");
            }

            setTasks(prev => [...prev, data]);
            isModal();
        } catch (error) {
            console.error("Erro ao criar tarefa:", error.message);
        }
    };

    const irParaPerfil = () => {
        setTitulo("Perfil");
        setFiltro("perfil");
        setPagina("perfil");
        setIcone("perfil");
    };

    return (
        <div className='dashboard'>
            <h2>Bem-vindo, {usuario?.name}!</h2>
            <p>Tenha um ótimo dia de produtividade 🚀</p>

            <div className="resumo-dashboard">
                <p><strong>Total de tarefas:</strong> {tasks.length}</p>
                <p><strong>Concluídas:</strong> {tasks.filter(task => task.status === "CONCLUIDO").length}</p>
                <p><strong>Pendentes:</strong> {tasks.filter(task => task.status === "PENDENTE").length}</p>
            </div>

            <div className='divBtn'>
                <Button info={"Nova tarefa"} onclick={isModal} />
                <Button info={"Perfil"} onclick={irParaPerfil} />
            </div>

            {modalAberto && (
                <ModalFormTarefa
                    onClose={isModal}
                    onCreate={criarTarefa}
                    tarefaEdit={null}
                />
            )}
        </div>
    );
}

export default DashBoard;
