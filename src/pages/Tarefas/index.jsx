import { useEffect, useState } from 'react';
import TarefaItem from '../../components/TarefaItem/TarefaItem';
import './Tarefas.css';
import ModalFormTarefa from '../../components/ModalFormTarefa/ModalFormTarefa';
import ModalConfirmacao from '../../components/ModalConfirmacao/ModalConfirmacao';
import ModalVisualizar from '../../components/ModalVisualizar';
import {
  buscarTarefas,
  buscarTarefaPorId,
  criarTarefa,
  atualizarTarefa,
  excluirTarefa,
} from "./../../service/tarefaService";

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [listaModificada, setListaModificada] = useState(false);
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [tarefaEdit, setTarefaEdit] = useState(null);
  const [tarefaDelete, setTarefaDelete] = useState(null);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [tarefaInfo, setTarefaInfo] = useState(null);

  const [filtroAba, setFiltroAba] = useState({ filtroStatus: "Todos os status", abaSelecionada: "Todas" });
  const [filtroPrioridade, setFiltroPrioridade] = useState("Todas as prioridades");



  function estadoModal() {
    setIsModal(!isModal);
  }

  useEffect(() => {
    console.log("Estado inicial - filtroAba:", filtroAba);
  }, []);

  useEffect(() => {
    console.log(`Estado atual - filtroStatus: ${filtroAba.filtroStatus}, abaSelecionada: ${filtroAba.abaSelecionada}`);
  }, [filtroAba]);

  const handleConfirm = async () => {
    try {
      await excluirTarefa(tarefaDelete.id);
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
    try {
      await criarTarefa(tarefa);
      setListaModificada(true);
      setIsModalFormOpen(false);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error.message);
    }
  };

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const tarefas = await buscarTarefas();
        console.log("Tarefas recebidas do backend:", tarefas);
        tarefas.forEach((tarefa, index) => {
          console.log(`TAREFA ${index + 1} - Status: ${tarefa.status}, Prioridade: ${tarefa.priority}`);
        });
        setTarefas(tarefas);
        setListaModificada(false);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error.message);
      }
    };

    carregarTarefas();
  }, [listaModificada]);

  const onMenuAction = (action, idTarefa, title) => {
    switch (action) {
      case 'editar':
        abrirModalEdicao(idTarefa);
        break;
      case 'excluir':
        abrirModalExcluir(idTarefa, title);
        break;
      case 'visualizar':
        abrirModalVisualizar(idTarefa);
        break;
    }
  };

  const abrirModalVisualizar = async (idTarefa) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${idTarefa}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao editar tarefa");
      }

      setTarefaInfo(data);
      setIsModal(!isModal);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error.message);
    }
  }

  const abrirModalEdicao = async (idTarefa) => {
    try {
      const tarefa = await buscarTarefaPorId(idTarefa);
      setTarefaEdit(tarefa);
      setIsModalFormOpen(true);
    } catch (error) {
      console.error("Erro ao buscar tarefa para edição:", error.message);
    }
  };

  const handleEdit = async (tarefa) => {
    try {
      await atualizarTarefa(tarefa);
      setListaModificada(true);
      closeModalForm();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error.message);
    }
  };

  const handleStatusChange = async (idTarefa, status) => {
    console.log(`handleStatusChange chamado - idTarefa: ${idTarefa}, Novo Status: ${status}`);
    const tarefa = { id: idTarefa, status: status };
    try {
      await atualizarTarefa(tarefa);
      setListaModificada(true);
    } catch (error) {
      console.error("Erro ao mudar status:", error.message);
      setListaModificada(true);
    }
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

  const mudarAba = (aba) => {
    console.log(`Mudando aba para ${aba}`);
    const novoFiltroStatus = aba === 'Todas' ? 'Todos os status' :
      aba === 'Pendentes' ? 'Pendente' :
        aba === 'Em Andamento' ? 'Em Andamento' :
          aba === 'Concluídas' ? 'Concluída' : 'Todos os status';
    setFiltroAba({ filtroStatus: novoFiltroStatus, abaSelecionada: aba });
  };

  const mudarFiltroStatus = (status) => {
    console.log(`Mudando filtroStatus para ${status}`);
    const novaAba = status === 'Todos os status' ? 'Todas' :
      status === 'Pendente' ? 'Pendentes' :
        status === 'Em Andamento' ? 'Em Andamento' :
          status === 'Concluída' ? 'Concluídas' : 'Todas';
    setFiltroAba({ filtroStatus: status, abaSelecionada: novaAba });
  };

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const statusNormalizado = tarefa.status ? tarefa.status.trim().toLowerCase() : '';
    const prioridadeNormalizada = tarefa.priority ? tarefa.priority.trim().toLowerCase() : '';

    const statusMapeado = {
      pendente: 'Pendente',
      'em andamento': 'Em Andamento',
      em_andamento: 'Em Andamento',
      concluída: 'Concluída',
      concluida: 'Concluída',
      concluido: 'Concluída',
      completed: 'Concluída',
      complete: 'Concluída',
      done: 'Concluída',
      finished: 'Concluída',
      in_progress: 'Em Andamento',
    }[statusNormalizado] || tarefa.status;

    const prioridadeMapeada = {
      alta: 'Alta',
      média: 'Média',
      media: 'Média',
      baixa: 'Baixa',
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
    }[prioridadeNormalizada] || tarefa.priority;

    console.log(`Filtrando tarefa: ${tarefa.title}, Status Mapeado: ${statusMapeado}, Filtro Status: ${filtroAba.filtroStatus}, Filtro Prioridade: ${filtroPrioridade}`);

    // Filtro por status
    if (filtroAba.filtroStatus !== 'Todos os status') {
      const statusParaComparar = filtroAba.filtroStatus === 'Concluídas' ? 'Concluída' :
        filtroAba.filtroStatus === 'Pendentes' ? 'Pendente' :
          filtroAba.filtroStatus;

      if (statusMapeado !== statusParaComparar) {
        console.log(`Tarefa ${tarefa.title} filtrada por status`);
        return false;
      }
    }

    // Filtro por prioridade
    if (filtroPrioridade !== 'Todas as prioridades' && prioridadeMapeada !== filtroPrioridade) {
      console.log(`Tarefa ${tarefa.title} filtrada por prioridade`);
      return false;
    }

    console.log(`Tarefa ${tarefa.title} incluída na lista filtrada`);
    return true;
  });

  return (
    <>
      <div className="header-lista">
        <h1>Minhas Tarefas</h1>
        <button onClick={() => setIsModalFormOpen(true)}>Nova Tarefa</button>
      </div>

      <div className="filtros-container">
        <div className="dropdown-container">
          <select
            className="dropdown"
            value={filtroAba.filtroStatus}
            onChange={(e) => {
              console.log(`Dropdown de status alterado - Novo valor: ${e.target.value}`);
              mudarFiltroStatus(e.target.value);
            }}
          >
            <option value="Todos os status">Todos os status</option>
            <option value="Pendente">Pendentes</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluídas</option>
          </select>
          <select
            className="dropdown"
            value={filtroPrioridade}
            onChange={(e) => {
              console.log(`Dropdown de prioridade alterado - Novo valor: ${e.target.value}`);
              setFiltroPrioridade(e.target.value);
            }}
          >
            <option value="Todas as prioridades">Todas as prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>
      </div>

      <div className="abas-container">
        {console.log(`Renderizando aba Todas - Ativa: ${filtroAba.abaSelecionada === 'Todas'}`)}
        <button
          className={`aba ${filtroAba.abaSelecionada === 'Todas' ? 'ativa' : ''}`}
          onClick={() => mudarAba('Todas')}
        >
          Todas
        </button>
        {console.log(`Renderizando aba Pendentes - Ativa: ${filtroAba.abaSelecionada === 'Pendentes'}`)}
        <button
          className={`aba ${filtroAba.abaSelecionada === 'Pendentes' ? 'ativa' : ''}`}
          onClick={() => mudarAba('Pendentes')}
        >
          Pendentes
        </button>
        {console.log(`Renderizando aba Em Andamento - Ativa: ${filtroAba.abaSelecionada === 'Em Andamento'}`)}
        <button
          className={`aba ${filtroAba.abaSelecionada === 'Em Andamento' ? 'ativa' : ''}`}
          onClick={() => mudarAba('Em Andamento')}
        >
          Em Andamento
        </button>
        {console.log(`Renderizando aba Concluídas - Ativa: ${filtroAba.abaSelecionada === 'Concluídas'}`)}
        <button
          className={`aba ${filtroAba.abaSelecionada === 'Concluídas' ? 'ativa' : ''}`}
          onClick={() => mudarAba('Concluídas')}
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
                  handleStatusChange={handleStatusChange}
                />
              );
            })
          )}
        </ul>
      </div>
      {isModal && (
        <ModalVisualizar
          onClose={() => estadoModal()}
          titulo={tarefaInfo.title}
          descricao={tarefaInfo.description}
          prioridade={tarefaInfo.priority}
        />


      )}

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