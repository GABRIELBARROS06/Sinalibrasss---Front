
import { FaArrowLeft, FaRegCalendarAlt, FaChevronRight } from "react-icons/fa";
// Arquivo de estilos.
import styles from "../CSS/EditarPerfil.module.css";
import { useState } from 'react'
import { useEffect } from 'react';

import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const EditarPerfil = () => {
 
  const BASE_URL = 'http://localhost:8080/';
  const { setDados } = useContext(AppContext);
    const { dados } = useContext(AppContext);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [data_nasc, setDataNascimento] = useState()
 console.log(dados);
setNome(dados.nome)
setEmail(dados.email)
setDataNascimento(dados.data_nascimento)

  const [fotoPerfil, setFotoPerfil] = useState("https://via.placeholder.com/100"); // Estado para armazenar a imagem de perfil

  
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com o upload da imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result); // Atualiza a imagem de perfil
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma URL
    }
  };

  function iconNavegaçãoPerfil() {
    navigate('/Perfil');
  }

 
    const salvarAlteracoes = async () => {
      console.log("szhhtded");
      try {
        const professorDados={
          nome:nome,
          email:email,
          data_nascimento:data_nasc,
          foto_perfil:fotoPerfil

        }
        const response = await fetch(`${BASE_URL}v1/sinalibras/aluno/${dados.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(professorDados),
          });
        const data = await response.json();
    
        if (data.status_code === 200) {
          // Verifique se os campos existem na resposta antes de atribuir
          if (data.aluno && data.aluno.foto_perfil) {
            setFotoPerfil(data.aluno.foto_perfil);
          }
           else if (data.aluno && data.aluno.data_nascimento) {
            setDataNascimento(data.aluno.data_nascimento);
          }
          setNome(data.aluno.nome);
          setEmail(data.aluno.email);
        } else {
          console.error('Erro na requisição:', data);
          // Exibir uma mensagem de erro para o usuário
          alert('Ocorreu um erro ao atualizar seus dados. Por favor, tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Erro ao buscar o aluno:', error);
        // Exibir uma mensagem de erro para o usuário
        alert('Ocorreu um erro ao buscar seus dados. Por favor, tente novamente mais tarde.');
      }
    };
    // Simulação de uma função que busca os dados do aluno após login/cadastro

  return (
    <div className={styles.editarPerfilContainer}>
      <header className={styles.editarPerfilHeader}>
        <button className={styles.voltarButton}>
          <FaArrowLeft size={20} onClick={iconNavegaçãoPerfil} />
        </button>
        <h1>Editar Perfil</h1>
      </header>

      <div className={styles.fotoPerfil}>
        <img
          src={fotoPerfil} // Usa a URL da imagem armazenada no estado
          alt="Foto do Perfil"
          className={styles.foto}
          onChange={setFotoPerfil}
        />
        <input
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          onChange={handleImageChange} // Função chamada quando a imagem é alterada
        />
      </div>

      <form className={styles.formulario}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e)=>setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="dataNasc">Data de Nascimento</label>
          <div className={styles.inputWrapper}>
            <input
              type="date"
              id="dataNasc"
              name="dataNasc"
              value={data_nasc}
              onChange={(e)=>setDataNascimento(e.target.value)}
            />
            <FaRegCalendarAlt className={styles.inputIcon} size={20} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <button type="button" className={styles.alterarSenhaButton}>
          Alterar Senha <FaChevronRight size={16} />
        </button>
      </form>

      <button className={styles.salvarButton} onClick={salvarAlteracoes}>
        Salvar Alterações
      </button>
    </div>
  );
};

export default EditarPerfil;