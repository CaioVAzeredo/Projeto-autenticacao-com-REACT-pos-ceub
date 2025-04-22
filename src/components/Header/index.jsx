import './Header.css';
import iconeClaro from '../../assets/img/icone-claro.png';
import iconeEscuro from '../../assets/img/icone-escuro.png';
import perfil from '../../assets/img/perfil-de-usuario-selecionado.png';
import perfilTemaEscuro from '../../assets/img/perfil-de-usuario-selecionado-tema-escuro.png';
import { useTema } from '../ThemeContext';

function Header({ titulo, setPagina, setTitulo, setFiltro, setIcone }) {
  const { tema, alternarTema } = useTema();

  function paginaPerfil() {
    setPagina("perfil");
    setTitulo("Perfil");
    setFiltro("perfil");
    setIcone("perfil");
  }

  return (
    <div className='header'>
      <h2>Gerenciador de {titulo}</h2>
      <div>
        <img
          src={tema === "claro" ? iconeEscuro : iconeClaro}
          alt={`Tema ${tema === "claro" ? "escuro" : "claro"}`}
          className='icon-tema'
          onClick={alternarTema}
        />
        <img className='foto' src={tema === "claro" ? perfil : perfilTemaEscuro} onClick={paginaPerfil} />
      </div>
    </div>
  );
}

export default Header;
