import styles from '../CSS/EditarPerfil.module.css'
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";


import { useNavigate } from 'react-router-dom';

function App() {
  //const { dados } = useContext(AppContext);
    const navigate = useNavigate();

  function iconNavegacaoAlterarSenha() {
    navigate('/AlterarSenha');
}
  
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
      <IoMdArrowBack />
        <FaUserCircle className='user' />

        <h1>Editar Perfil </h1>
        <div className={styles.quadrado}>
          <p>Salvar Alterações</p>
        </div>

        <div className={styles.quadrado2}>
          <e> Abracadabra Souza</e>
        </div>

        <div className={styles.quadrado3}>
          <d>08/11/2023</d>
        </div>

        <div className={styles.quadrado4}>
          <a> abracadabraSouza@gmail.com</a>
        </div>

        <button className={styles.quadrado5} onClick={iconNavegacaoAlterarSenha}>Alterar Senha</button>
      

      <div className={styles.quadrado6}>Nome</div>
      <div className={styles.quadrado7}>Data nascimento </div>
      <div className={styles.quadrado8}>E-mail</div>

     <div>
         <IoMdArrowBack />
         <FaCalendarAlt />
         <IoSendSharp />
         </div>
      
      </header>
    </div>

  );
}

export default App;