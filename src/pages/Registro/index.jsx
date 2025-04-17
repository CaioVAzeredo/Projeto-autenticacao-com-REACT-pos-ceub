import React, { useState } from 'react';
import Formulario from '../../components/Formulario';
import Campo from '../../components/Campo';
import Button from '../../components/Button';
import { Navigate } from 'react-router-dom';

function Registro() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    const criarUsuario = async (credenciais) => {
        const { login, senha } = credenciais;

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
                alert("Usuário criado com sucesso" + data)
                Navigate("/");
            } else {
                alert("Erro ao criar usuário" + data.message)
            }
        } catch (erro) {
            alert("erro ao criar um novo usuário");
        }
    }
    return (
        <div>
            <Formulario onSubmit={() => criarUsuario({ login, senha })} titulo="Página de Registro" botaoVoltar={true} url={"/"}>
                <p>Entre com seu email e senha para acessar sua conta</p>
                <div>
                    <Campo
                        placeholder="E-mail"
                        type="text"
                        valor={login}
                        onChange={(valor) => setLogin(valor)}
                    />
                </div>
                <div>
                    <Campo
                        placeholder="Nome"
                        type="text"
                        valor={nome}
                        onChange={(valor) => setNome(valor)}
                    />
                </div>

                <div>
                    <Campo
                        placeholder="Senha"
                        type="password"
                        valor={senha}
                        onChange={(valor) => setSenha(valor)}
                    />
                </div>
                <Button info="Registrar" />
            </Formulario>
        </div>
    );
}

export default Registro;