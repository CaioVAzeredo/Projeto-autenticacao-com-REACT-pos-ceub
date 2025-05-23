import { Navigate, useNavigate } from "react-router-dom";
import Formulario from "../../components/Formulario";
import Campo from "../../components/Campo";
import Button from "../../components/Button";
import './Login.css'

import { useState } from "react";

function Login({ setToken }) {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const verificarUsuario = async (credenciais) => {
        const { login, senha } = credenciais;

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: login,
                    password: senha
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                localStorage.setItem("authToken", data.token);
                Navigate("/")
            } else {
                alert("Login ou senhas incorretas!!")
            }

        } catch (erro) {
            console.error("Erro ao fazer login" + erro)
        }
    }

    function registrar() {
        window.location.href = "/registro"
    }

    return (
        <div className="login">
            <Formulario onSubmit={() => verificarUsuario({ login, senha })} titulo="LOGIN" botaoVoltar={false}>

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
                        placeholder="Senha"
                        type="password"
                        valor={senha}
                        required={true}
                        onChange={(valor) => setSenha(valor)}
                    />
                </div>
                <Button
                    info="Entrar" />
                <p>Nao tem conta ainda? <a onClick={registrar}>Registre-se</a></p>

            </Formulario>
        </div>
    )
}

export default Login