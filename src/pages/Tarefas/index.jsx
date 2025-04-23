import { useEffect, useState } from 'react';
import TarefaItem from '../../components/TarefaItem/TarefaItem';
import './Tarefas.css';
import ModalFormTarefa from '../../components/ModalFormTarefa/ModalFormTarefa';
import ModalConfirmacao from '../../components/ModalConfirmacao/ModalConfirmacao';

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [listaModificada, setListaModificada] = useState(false);
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [tarefaEdit, setTarefaEdit] = useState(null);
  const [tarefaDelete, setTarefaDelete] = useState(null);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  
  const [abaSelecionada, setAbaSelecionada] = useState('Todas');
  const [filtroStatus, setFiltroStatus] = useState('Todos os status');
  const [filtroPrioridade, setFiltroPrioridade] = useState('Todas as prioridades');

  const handleConfirm = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${tarefaDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao excluir tarefa");
      }
      setIsModalConfirmOpen(false);
      setTarefaDelete(null);
      setListaModificada(true);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error.message);
    }
  };

  const handleCancel = () => {
    setTarefaDelete(null);
    setIsModalConfirmOpen(false);
  };

  const handleCreate = async (tarefa) => {
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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: tarefa.title,
            description: tarefa.description,
            priority: tarefa.priority,
            status: tarefa.status,
          }),
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
          },
        });

        const data = await response.json();

        if (response.ok) {
          setTarefas(data);
        } else {
          console.error("Erro ao buscar tarefas: " + data.message);
        }
      } catch (error) {
        console.error("Erro: " + error);
      }
    };

    buscarTarefas();
    setListaModificada(false);
  }, [listaModificada]);

  const onMenuAction = (action, idTarefa, title) => {
    switch (action) {
      case 'editar':
        abrirModalEdicao(idTarefa);
        break;
      case 'excluir':
        abrirModalExcluir(idTarefa, title);
        break;
    }
  };

  const abrirModalEdicao = async (idTarefa) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${idTarefa}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao editar tarefa");
      }

      setTarefaEdit(data);
      setIsModalFormOpen(true);
    } catch (error) {
      console.error("Erro ao editar tarefa:", error.message);
    }
  };

  const handleEdit = async (tarefa) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${tarefa.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: tarefa.title,
          description: tarefa.description,
          priority: tarefa.priority,
          status: tarefa.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao editar tarefa");
      }
    } catch (error) {
      console.error("Erro: " + error);
    }

    setListaModificada(true);
    closeModalForm();
  };

  const abrirModalExcluir = (idTarefa, title) => {
    setTarefaDelete({ id: idTarefa, title: title });
    setIsModalConfirmOpen(true);
  };

  const closeModalForm = () => {
    setIsModalFormOpen(false);
    setTarefaEdit(null);
  };

  const getMessage = () => {
    return (
      <span>
        Tem certeza que deseja excluir a tarefa <strong>{tarefaDelete.title}</strong>?
      </span>
    );
  };

  // Lógica de filtragem
  /* const tarefasFiltradas = tarefas.filter((tarefa) => {
    // Filtrar por aba
    if (abaSelecionada === 'Pendentes' && tarefa.status !== 'Pendente') return false;
    if (abaSelecionada === 'Concluídas' && tarefa.status !== 'Concluída') return false;
    if (abaSelecionada === 'Em Andamento' && tarefa.status !== 'Em Andamento') return false;

    // Filtrar por status (dropdown)
    if (filtroStatus !== 'Todos os status' && tarefa.status !== filtroStatus) return false;

    // Filtrar por prioridade (dropdown)
    if (filtroPrioridade !== 'Todas as prioridades' && tarefa.priority !== filtroPrioridade) return false;

    return true;
  }); */

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    // Filtrar por aba
    if (abaSelecionada !== 'Todas') {
      if (abaSelecionada === 'Pendentes' && tarefa.status !== 'Pendente') return false;
      if (abaSelecionada === 'Concluídas' && tarefa.status !== 'Concluída') return false;
      if (abaSelecionada === 'Em Andamento' && tarefa.status !== 'Em Andamento') return false;
    }
  
    // Filtrar por status (dropdown)
    if (filtroStatus !== 'Todos os status' && tarefa.status !== filtroStatus) return false;
  
    // Filtrar por prioridade (dropdown)
    if (filtroPrioridade !== 'Todas as prioridades' && tarefa.priority !== filtroPrioridade) return false;
  
    return true;
  });
  

  return (
    <>
      <div className="header-lista">
        <h1>Minhas Tarefas</h1>
        <button onClick={() => setIsModalFormOpen(true)}>Nova Tarefa</button>
      </div>

      {/* Dropdowns */}
      <div className="filtros-container">
        <div className="dropdown-container">
          <select
            className="dropdown"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="Todos os status">Todos os status</option>
            <option value="Pendente">Pendentes</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluídas</option>
          </select>
          <select
            className="dropdown"
            value={filtroPrioridade}
            onChange={(e) => setFiltroPrioridade(e.target.value)}
          >
            <option value="Todas as prioridades">Todas as prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>
      </div>

      {/* Abas */}
      <div className="abas-container">
        <button
          className={`aba ${abaSelecionada === 'Todas' ? 'ativa' : ''}`}
          onClick={() => setAbaSelecionada('Todas')}
        >
          Todas
        </button>
        <button
          className={`aba ${abaSelecionada === 'Pendentes' ? 'ativa' : ''}`}
          onClick={() => setAbaSelecionada('Pendentes')}
        >
          Pendentes
        </button>
        <button
          className={`aba ${abaSelecionada === 'Em Andamento' ? 'ativa' : ''}`}
          onClick={() => setAbaSelecionada('Em Andamento')}
        >
          Em Andamento
        </button>
        <button
          className={`aba ${abaSelecionada === 'Concluídas' ? 'ativa' : ''}`}
          onClick={() => setAbaSelecionada('Concluídas')}
        >
          Concluídas
        </button>
      </div>

      <div className="tarefa-list-container">
        <ul className="tarefa-items-list">
          {tarefasFiltradas.length === 0 ? (
            <p>Nenhuma tarefa encontrada.</p>
          ) : (
            tarefasFiltradas.map((tarefa) => {
              let dataCriacao = new Date(tarefa.createdAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <TarefaItem
                  key={tarefa.id}
                  idTarefa={tarefa.id}
                  title={tarefa.title}
                  description={tarefa.description}
                  status={tarefa.status}
                  priority={tarefa.priority.toLowerCase()}
                  createdAt={`Criada em ${dataCriacao}`}
                  onMenuAction={onMenuAction}
                />
              );
            })
          )}
        </ul>
      </div>

      {isModalFormOpen && (
        <ModalFormTarefa
          onClose={() => closeModalForm()}
          onCreate={handleCreate}
          onEdit={handleEdit}
          tarefaEdit={tarefaEdit}
        />
      )}

      {isModalConfirmOpen && (
        <ModalConfirmacao
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          getMessage={getMessage}
        />
      )}
    </>
  );
}

export default Tarefas;