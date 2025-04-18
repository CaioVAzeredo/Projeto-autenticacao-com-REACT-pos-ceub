import './Header.css'
function Header({ titulo }) {
    return (
        <div className='header'>
            <h2>Gerenciador de {titulo}</h2>
            <div><i>icone</i> <img className='foto'></img></div>
        </div>
    )
}

export default Header