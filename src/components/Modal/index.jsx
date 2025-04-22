import { useEffect, useState } from 'react';
import Campo from '../Campo';
import Formulario from '../Formulario';
import './Modal.css'
import Button from '../Button';

function Modal({ setUsuario, estadoModal, Nome, Email }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {
        setNome(Nome);
        setEmail(Email);
    }, [Nome, Email]);

    const atualizarUsuario = async (credenciais) => {
        const { nome, email } = credenciais;
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch('http://localhost:3000/api/users/profile', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: nome,
                    email: email
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Usuário atualizado!!");
                setUsuario(data);
                estadoModal();
            } else {
                alert("Erro ao atualizar: " + data.message);
            }
        } catch (erro) {
            console.error("Erro ao atualizar usuário:", erro);
            alert("Erro na conexão.");
        }
    };


    return (
        <section className='modal'>
            <Formulario
                onSubmit={() => atualizarUsuario({ nome, email })}
                titulo="Atualizar usuário"
                estadoModal={estadoModal}
                botaoFecharModal={true}
            >

                <Campo
                    placeholder="Nome"
                    type="text"
                    valor={nome}
                    onChange={(valor) => setNome(valor)}
                />
                <Campo
                    placeholder="E-mail"
                    type="email"
                    valor={email}
                    onChange={(valor) => setEmail(valor)}
                />
                <Button info="Atualizar" />
            </Formulario>
        </section>
    );
}

export default Modal;
