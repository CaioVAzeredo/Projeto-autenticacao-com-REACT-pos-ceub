import { useEffect, useState } from 'react';
import TarefaItem from '../../components/TarefaItem/TarefaItem';
import './Tarefas.css';
import ModalFormTarefa from '../../components/ModalFormTarefa/ModalFormTarefa';
import ModalConfirmacao from '../../components/ModalConfirmacao/ModalConfirmacao';
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

  const [abaSelecionada, setAbaSelecionada] = useState("Todas");
  const [filtroStatus, setFiltroStatus] = useState("Todos os status");
  const [filtroPrioridade, setFiltroPrioridade] = useState("Todas as prioridades");

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
        // Log para depurar valores de status retornados
        console.log('Tarefas carregadas:', tarefas.map(t => ({ id: t.id, status: t.status })));
        // Log específico para tarefas com status relacionado a "Concluída"
        console.log(
          'Tarefas com status "Concluída" (antes do mapeamento):',
          tarefas.filter(t => t.status && t.status.toLowerCase().includes('conclu') || t.status.toLowerCase().includes('complete') || t.status.toLowerCase().includes('done') || t.status.toLowerCase().includes('finished'))
        );
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
      case "editar":
        abrirModalEdicao(idTarefa);
        break;
      case "excluir":
        abrirModalExcluir(idTarefa, title);
        break;
    }
  };

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
    const tarefa = { id: idTarefa, status: status };
    try {
      await atualizarTarefa(tarefa);
      setListaModificada(true);
    } catch (error) {
      console.error("Erro ao mudar status:", error.message);
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

  // Função para mudar de aba e (opcionalmente) resetar dropdowns
  const mudarAba = (aba) => {
    setAbaSelecionada(aba);
    // Descomente as linhas abaixo se quiser resetar os dropdowns ao mudar de aba
    // setFiltroStatus('Todos os status');
    // setFiltroPrioridade('Todas as prioridades');
  };

  // Lógica de filtragem
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    // Normalizar valores para evitar problemas com maiúsculas/minúsculas
    const statusNormalizado = tarefa.status ? tarefa.status.trim().toLowerCase() : '';
    const prioridadeNormalizada = tarefa.priority ? tarefa.priority.trim().toLowerCase() : '';

    // Mapear valores normalizados para os esperados pelas abas e dropdowns
    const statusMapeado = {
      pendente: 'Pendente',
      'em andamento': 'Em Andamento',
      em_andamento: 'Em Andamento',
      concluída: 'Concluída',
      concluida: 'Concluída',
      concluido: 'Concluída', // Adicionado para cobrir "CONCLUIDO" do backend
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

    // Log para depurar o mapeamento de status
    console.log(`Tarefa ID ${tarefa.id}: status original=${tarefa.status}, normalizado=${statusNormalizado}, mapeado=${statusMapeado}`);

    // Filtrar por aba
    if (abaSelecionada !== 'Todas' && statusMapeado !== abaSelecionada) return false;

    // Filtrar por status (dropdown)
    if (filtroStatus !== 'Todos os status' && statusMapeado !== filtroStatus) return false;

    // Filtrar por prioridade (dropdown)
    if (filtroPrioridade !== 'Todas as prioridades' && prioridadeMapeada !== filtroPrioridade) return false;

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
          onClick={() => mudarAba('Todas')}
        >
          Todas
        </button>
        <button
          className={`aba ${abaSelecionada === 'Pendentes' ? 'ativa' : ''}`}
          onClick={() => mudarAba('Pendentes')}
        >
          Pendentes
        </button>
        <button
          className={`aba ${abaSelecionada === 'Em Andamento' ? 'ativa' : ''}`}
          onClick={() => mudarAba('Em Andamento')}
        >
          Em Andamento
        </button>
        <button
          className={`aba ${abaSelecionada === 'Concluídas' ? 'ativa' : ''}`}
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