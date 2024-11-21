
import styles from '../CSS/Login.module.css'
import logo from '../../img/Logo.png';
// import logoGrande from '../img/LogoGrande.png';

import { useState } from 'react'
import { useEffect } from 'react';

import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';


import React from 'react';

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


function Login() {
    const { setDados } = useContext(AppContext);

    const BASE_URL = 'http://localhost:8080/'

    const [senha, setSenha] = useState()
    const [email, setEmail] = useState()
    const [erroNull, setErroNull] = useState(true)
    const [textoErro, setTextoErro] = useState('')


    const navigate = useNavigate();
    async function ValidarEntrada(e) {
        e.preventDefault();
    
        // Verifica se os campos estão preenchidos
        if (!email || !senha) {
            setErroNull(false);
            setTextoErro('Todos os campos devem ser preenchidos, favor verificar');
        } 
        // Verifica se o e-mail é válido
        else if (!validarEmail(email)) {
            setErroNull(false);
            setTextoErro('Digite um e-mail válido.');
        } 
        // Verifica se a senha atende a critérios mínimos
        else if (senha.length < 6 || senha.length > 8) {
            setErroNull(false);
            setTextoErro('A senha deve conter entre 6 e 8 caracteres.');
        } 
        else {
            try {
                // Dados do aluno para envio
                const alunoDados = {
                    email: email,
                    senha: senha
                };
    
                // Envio para o backend
                const response = await fetch(`${BASE_URL}v1/sinalibras/aluno/validacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(alunoDados),
                });
    
                const data = await response.json();
                console.log(data);
    
                // Verifica o status da resposta
                if (data.status) {
                   
                    const dadosParaEnviar = {
                        nome: data.aluno.nome,
                        id: data.aluno.id_aluno,
                        email: data.aluno.email,
                        tipoUsuario: 'Aluno',
                        data_nascimento: data.aluno.data_nascimento,
                        foto_perfil: data.aluno.foto_perfil

                    };
                    console.log(dadosParaEnviar);
                    
                    setDados(dadosParaEnviar);
                    navigate('/Home');
                } else {
                    setErroNull(false);
                    setTextoErro('Seus dados não conferem.');
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                setErroNull(false);
                setTextoErro('Ocorreu um erro no servidor, tente novamente mais tarde.');
            }
        }
    }



    return (
        <div className={styles.body}>
            <div className={styles.esquerda}>
                <img src={logo}></img>
                <h3 className={styles.slogan}>Conectando Pessoas</h3>
                <h3 className={styles.slogan}>Transformando Sinais</h3>
                <h1 className={styles.nome_aplicacao}>SinaLibras</h1>
            </div>
            <div className={styles.direita}>
                <h1 className={styles.texto_acesse}>Acesse a sua conta</h1>
                <form className={styles.formulario} >
                    <div>
                        <h4 className={styles.texto_input} >Email</h4>
                        <input type='email' className={styles.input} id="input_email" name="input_email" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <h4 className={styles.texto_input} >Senha</h4>
                        <input type='password' className={styles.input} id="input_senha" name="input_senha" onChange={(e) => setSenha(e.target.value)}></input>
                    </div>
                </form>
                <h3 className={styles.esqueciASenha}>Esqueci a senha</h3>
                <h4 className={styles.erro_null} hidden={erroNull}>{textoErro}</h4>
                <button className={styles.botao} onClick={ValidarEntrada}>Entrar</button>
                <h3 className={styles.texto}>Não tem uma conta? </h3>
                <h2 className={styles.texto} onClick={() => navigate('/Cadastro')}>Criar Conta</h2>

            </div>
        </div>
    )
}

export default Login;