const API_URL = "http://localhost:3000/api/tasks";

const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const buscarTarefas = async () => {
    try {
        const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeader(),
        });

        const data = await response.json();
        if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar tarefas");
        }
        return data;
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error.message);
        throw error;
    }
};

export const buscarTarefaPorId = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: getAuthHeader(),
        });

        const data = await response.json();
        if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar tarefa");
        }
        return data;
    } catch (error) {
        console.error("Erro ao buscar tarefa:", error.message);
        throw error;
    }
};

export const criarTarefa = async (tarefa) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                ...getAuthHeader(),
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
        return data;
    } catch (error) {
        console.error("Erro ao criar tarefa:", error.message);
        throw error;
    }
};

export const atualizarTarefa = async (tarefa) => {
    try {
        const response = await fetch(`${API_URL}/${tarefa.id}`, {
            method: "PATCH",
            headers: {
                ...getAuthHeader(),
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
            throw new Error(data.message || "Erro ao atualizar tarefa");
        }
        return data;
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error.message);
        throw error;
    }
};

export const excluirTarefa = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: getAuthHeader(),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Erro ao excluir tarefa");
        }
        return data;
    } catch (error) {
        console.error("Erro ao excluir tarefa:", error.message);
        throw error;
    }
};