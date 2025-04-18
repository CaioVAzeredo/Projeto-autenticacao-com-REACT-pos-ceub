import './Dashboard.css'
function Dashboard() {

    function pagPerfil() {
        window.location.href = "/perfil"
    }

    return (
        <section className='sectionHome'>
            <section className="tarefas">
                <h2>Tarefas</h2>
                <ul>
                    <li>Dashboard</li>
                    <li>Tarefas</li>
                    <li onClick={pagPerfil}>Perfil</li>
                </ul>
            </section>
            <section className="gerenciador-de-tarefas">

                <h2>Gerenciador de Tarefas</h2>

                <div className='minhas-tarefas'>
                    <h1>Minhas Tarefas</h1>
                    <select name="" id="">
                        <option value="">Todos os estatus</option>
                        <option value="">1</option>
                        <option value="">1</option>
                    </select>
                    <select name="" id="">
                        <option value="">Todos os estatus</option>
                        <option value="">1</option>
                        <option value="">1</option>
                    </select>
                </div>
            </section>
        </section>
    );
}

export default Dashboard;