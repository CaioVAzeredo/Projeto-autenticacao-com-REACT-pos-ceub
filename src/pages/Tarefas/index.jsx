import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import TarefaItem from '../../components/TarefaItem/TarefaItem';
import './Tarefas.css'
import ModalFormTarefa from '../../components/ModalFormTarefa/ModalFormTarefa';

function Tarefas() {

    const [tarefas, setTarefas] = useState([]);
    const [listaModificada, setListaModificada] = useState(false);
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);

    const handleSubmit = async (tarefa) => {
        console.log('Nova tarefa:', tarefa);
        const token = localStorage.getItem("authToken");

        const criarTarefa = async () => {
            if (!token) {
                console.error("Token não disponível");
                return;
            }
        
            try {
                const response = await fetch("http://localhost:3000/api/tasks", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: tarefa.title,
                        description: tarefa.description,
                        priority: tarefa.priority,
                        status: tarefa.status
                    })
                });
        
                const data = await response.json();
        
                if (!response.ok) {
                    throw new Error(data.message || "Erro ao criar tarefa");
                }
        
                setListaModificada(true);
            } catch (error) {
                console.error("Erro ao criar tarefa:", error.message);
            }
        };

        await criarTarefa();
        setIsModalFormOpen(false);
    };

    useEffect(() => {
            const token = localStorage.getItem("authToken");
    
            const buscarTarefas = async () => {
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
                        setTarefas(data);
                    } else {
                        console.error("Erro ao buscar tarefas" + data.message);
                    }
                } catch (error) {
                    console.error("Erro " + error);
                }
            }
    
            buscarTarefas();
            setListaModificada(false);
        }, [listaModificada]);
    
    const handleCreate = () => {
        if (novaTarefa.title.trim() === '') return;
        
        const newTarefa = {
            id: tarefas.length + 1,
            title: novaTarefa.title,
            description: novaTarefa.description
        };
        
        setTarefas([...tarefas, newTarefa]);
        setNovaTarefa({ title: '', description: '' });
    };
    
    const handleDelete = (id) => {
        setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    };
    
    const handleEdit = (id, updatedTask) => {
        setTarefas(tarefas.map(tarefa => 
        tarefa.id === id ? { ...tarefa, ...updatedTask } : tarefa
        ));
    };

    const handleStatusChange = (id, newStatus) => {
        setTarefas(tarefas.map(tarefa => 
            tarefa.id === id ? { ...tarefa, status: newStatus } : tarefa
        ));
    };


    return (<>
        <Header titulo="Tarefas" />
        <div className='header-lista'>
            <h1>Tarefas</h1>
            <button onClick={() => setIsModalFormOpen(true)}>Criar Tarefa</button>
        </div>
        <div className="tarefa-list-container">
            <ul className="tarefa-items-list">
                {tarefas.map(tarefa => {

                    let dataCriacao = new Date(tarefa.createdAt).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'});

                    return (<TarefaItem
                            key={tarefa.id}
                            title={tarefa.title}
                            description={tarefa.description}
                            status={tarefa.status}
                            priority={tarefa.priority.toLowerCase()}
                            createdAt={`Criada em ${dataCriacao}`} />)
                })}
            </ul>
        </div>

        {isModalFormOpen && (
            <ModalFormTarefa 
            onClose={() => setIsModalFormOpen(false)}
            onSubmit={handleSubmit}
            />
        )}

    </>)
}

export default Tarefas;