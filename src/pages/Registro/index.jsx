import React, { useState } from 'react';
import Formulario from '../../components/Formulario';
import Campo from '../../components/Campo';
import Button from '../../components/Button';
import { Navigate } from 'react-router-dom';
import './Registro.css'

function Registro() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    const criarUsuario = async (credenciais) => {
        const { nome, login, senha } = credenciais;

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nome,
                    email: login,
                    password: senha
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Usuário criado com sucesso!!");
                Navigate("/");
            } else {
                console.error("Erro ao criar usuário:", data);
                alert("Erro ao criar usuário: " + data.error);
            }
        } catch (error) {
            console.log("Erro de conexão com o servidor:", error);
            alert("Erro ao criar um novo usuário");
        }
    }

    return (
        <div className='registro'>
            <Formulario onSubmit={() => criarUsuario({ nome, login, senha })} titulo="Página de Registro" botaoVoltar={true} url={"/"}>
                <p>Entre com seu email e senha para acessar sua conta</p>
                <div>
                    <Campo
                        placeholder="E-mail"
                        type="text"
                        valor={login}
                        required={true}
                        onChange={(valor) => setLogin(valor)}
                    />
                </div>
                <div>
                    <Campo
                        placeholder="Nome"
                        type="text"
                        valor={nome}
                        required={true}
                        onChange={(valor) => setNome(valor)}
                    />
                </div>
                <div>
                    <Campo
                        placeholder="Senha"
                        type="password"
                        valor={senha}
                        required={true}
                        onChange={(valor) => setSenha(valor)}
                    />
                </div>
                <Button info="Registrar" />
            </Formulario>
        </div>
    );
}

export default Registro;
