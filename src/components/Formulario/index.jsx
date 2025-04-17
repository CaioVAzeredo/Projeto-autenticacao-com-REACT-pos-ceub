import './Formulario.css'

function Formulario({ titulo, onSubmit, children, botaoVoltar = false, url = null }) {
    function submeter(e) {
        e.preventDefault();
        onSubmit();
    }
    function btnVoltar() {
        window.location.href = url
    }
    return (<>

        <form onSubmit={submeter} className="formulario">
            {botaoVoltar && <div onClick={btnVoltar} className='botaoVoltar'> ← voltar</div>}

            <h1>{titulo}</h1>
            {children}
        </form>
    </>)
}

export default Formulario