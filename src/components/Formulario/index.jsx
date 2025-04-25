import './Formulario.css'

function Formulario({ titulo, onSubmit, children, botaoVoltar, botaoFecharModal = false, url = null, estadoModal }) {

    function submeter(e) {
        e.preventDefault();
        onSubmit();
    }
    function btnVoltar() {
        window.location.href = url
    }
    console.log(botaoFecharModal);
    return (<>

        <form onSubmit={submeter} className="formulario">
            <div className='divBotao'>
                <div></div>
                {botaoFecharModal && <div onClick={estadoModal} className='btnX'>x</div>}
            </div>
            {botaoVoltar && <div onClick={btnVoltar} className='botaoVoltar'> ← voltar</div>}

            <h1>{titulo}</h1>
            {children}
        </form>
    </>)
}

export default Formulario