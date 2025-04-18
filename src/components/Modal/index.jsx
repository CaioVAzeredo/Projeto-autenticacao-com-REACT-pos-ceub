import { useState } from 'react';
import Campo from '../Campo';
import Formulario from '../Formulario';
import './Modal.css'
import Button from '../Button';

function Modal({ nomeAntigo, emailAntigo }) {
    const [nome, setNome] = useState(nomeAntigo)
    const [email, setEmail] = useState(emailAntigo)
    
    const atualizarUsuario = async (credenciais) => {
        console.log(credenciais)
        alert("atualizar");
    }
    return (
        <section className='modal'>
            <Formulario onSubmit={() => atualizarUsuario({ nome, email })} titulo="Atualizar usuário">
                <Campo
                    placeholder="Nome"
                    type="text"
                    valor={nomeAntigo}
                    onChange={(valor) => setNome(valor)}
                />
                <Campo
                    placeholder="E-mail"
                    type="email"
                    valor={emailAntigo}
                    onChange={(valor) => setEmail(valor)}
                />
                <Button info="Atualizar" />
            </Formulario>

        </section>
    )
}

export default Modal;