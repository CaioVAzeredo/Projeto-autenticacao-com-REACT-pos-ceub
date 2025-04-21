import React, { useEffect, useState } from 'react';
import './ModalFormTarefa.css';

const ModalFormTarefa = ({ onClose, onCreate, onEdit, tarefaEdit }) => {
    const [tarefa, setTarefa] = useState({
        id: '',
        title: '',
        status: '',
        priority: '',
        description: '',
    });

    useEffect(() => {
        setTarefa({
            id: tarefaEdit ? tarefaEdit.id : '',
            title: tarefaEdit ? tarefaEdit.title : '',
            status: tarefaEdit ? tarefaEdit.status : '',
            priority: tarefaEdit ? tarefaEdit.priority : '',
            description: tarefaEdit ? tarefaEdit.description : '',
        });
    }, [tarefaEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarefa(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        onCreate(tarefa);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        onEdit(tarefa);
    };

    const closeModal = () => {
        setTarefa({
            id: '',
            title: '',
            status: '',
            priority: '',
            description: '',
        });
        onClose();
    }

    return (
        <div className="modal-overlay">
        <div className="tarefa-modal">
            <div className="modal-header">
            <h2>{tarefaEdit ? "Editar tarefa" : "Criar nova tarefa"}</h2>
            <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <form onSubmit={tarefaEdit ? handleEdit : handleCreate}>
                <input type="hidden" name="id" value={tarefa.id} />
                <div className="form-group">
                    <label htmlFor="name">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Título da tarefa"
                        value={tarefa.title}
                        onChange={handleChange}
                        maxLength={191}
                        required
                        />
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={tarefa.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o status</option>
                            <option value="PENDENTE">Pendente</option>
                            <option value="EM_ANDAMENTO">Em andamento</option>
                            <option value="CONCLUIDO">Concluída</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Prioridade</label>
                        <select
                            id="priority"
                            name="priority"
                            value={tarefa.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione a prioridade</option>
                            <option value="ALTA">Alta</option>
                            <option value="MEDIA">Média</option>
                            <option value="BAIXA">Baixa</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Descrição da tarefa</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Escreva a descrição da tarefa aqui"
                        value={tarefa.description}
                        onChange={handleChange}
                        rows="4"
                        maxLength={191}
                    />
                </div>
                
                <button type="submit" className="submit-btn">
                    {tarefaEdit ? "Editar tarefa" : "+ Adicionar nova tarefa"}
                </button>
            </form>
        </div>
        </div>
    );
};

export default ModalFormTarefa;