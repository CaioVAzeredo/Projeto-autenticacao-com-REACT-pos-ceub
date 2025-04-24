const API_URL = "http://localhost:3000/api/users/profile";

const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const getUser = async () => {
    try {

        const response = await fetch(API_URL, {
            method: "GET",
            headers: getAuthHeader(),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error("Erro ao buscar perfil" + data.messege);
        }
    } catch (error) {
        console.error("Erro" + error);
    }
}