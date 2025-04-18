{/* 
        const [filtro, setFiltro] = useState("todas");
    <section className="gerenciador-de-tarefas">

<h2>Gerenciador de Tarefas</h2>

<div className='minhas-tarefas'>
    <div className='div-minhas-tarefas'>
        <h1>Minhas Tarefas</h1>
        <button>Nova Tarefa</button>
    </div>
    <select name="" id="">
        <option value="">Todos os estatus</option>
        <option value="">1</option>
        <option value="">1</option>
        <option value="">1</option>
    </select>
    <select name="" id="">
        <option value="">Todos os estatus</option>
        <option value="">1</option>
        <option value="">1</option>
        <option value="">1</option>
    </select>
</div>
<section className="lista-de-tarefas">
    <div>
        <button
            className={`filtro ${filtro === "todas" ? "ativo" : ""}`}
            onClick={() => setFiltro("todas")}
        >
            Todas
        </button>
        <button
            className={`filtro ${filtro === "pendente" ? "ativo" : ""}`}
            onClick={() => setFiltro("pendente")}
        >
            Pendente
        </button>
        <button
            className={`filtro ${filtro === "concluida" ? "ativo" : ""}`}
            onClick={() => setFiltro("concluida")}
        >
            Concluidas
        </button>
    </div>
</section>
</section> */}
import './Tarefas.css'

function Tarefas() {
    return (<>
        <h1>
            Tarefas
        </h1>
    </>)
}

export default Tarefas;