import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from '../CSS/Perfil.module.css';
import pessoinha from '../../img/pessoinha.png';
import bolinha from '../../img/perfil.png';
import imagem from '../../img/perfil.png';
import { IoMdSettings } from "react-icons/io";
import { HiArrowLeft } from "react-icons/hi";

function Perfil() {
    const BASE_URL = 'http://localhost:8080/';
    const navigate = useNavigate();
    const { setDados } = useContext(AppContext);
    const { dados } = useContext(AppContext);
    console.log(dados);
    

    // Estados para dados do perfil
    const [nome, setNome] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [atividades, setAtividades] = useState([]);
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [erroNull, setErroNull] = useState(true);
    const [textoErro, setTextoErro] = useState('');

    // Carregar os dados do perfil ao montar o componente

    useEffect(() => {
        // Simulação de uma função que busca os dados do aluno após login/cadastro
        async function buscarAlunoLogado() {
            try {
                // Supondo que a resposta da API retorne um objeto com { nome: 'Nome do Aluno' }
            const response = await fetch(`${BASE_URL}v1/sinalibras/aluno/${dados.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }); // Endpoint adequado
                const data = await response.json();
console.log(data);

               if (data.status_code==200) {
                setNome(data.aluno.nome);
                setTipoUsuario(dados.tipoUsuario);


                }else {
                    console.log(data.status_code);
                    
                    setNome('Aluno não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar o aluno:', error);
                setNome('Erro ao carregar o nome');
            }
        }



       /* async function fetchAtividades() {
            try {
                const response = await fetch(`${BASE_URL}v1/sinalibras/atividades`);
                const data = await response.json();

                if (data.status) {
                    setAtividades(data.atividades);
                } else {
                    setErro(true);
                    setMensagemErro('Erro ao carregar atividades.');
                }
            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
                setErro(true);
                setMensagemErro('Erro ao buscar atividades do servidor.');
            }
        } */

        buscarAlunoLogado();
       // fetchAtividades();
    }, []); // O array de dependências vazio garante que o useEffect seja executado apenas uma vez.

    // Função para testar o nível do usuário
   /* async function testarNivel() {
        try {
            const response = await fetch(`${BASE_URL}v1/sinalibras/teste-nivel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.status) {
                navigate('/TesteNivel'); // Redireciona para a tela do teste de nível
            } else {
                setErro(true);
                setMensagemErro('Erro ao iniciar teste de nível.');
            }
        } catch (error) {
            console.error('Erro ao iniciar teste de nível:', error);
            setErro(true);
            setMensagemErro('Erro ao iniciar o teste de nível.');
        }
    }*/


    function iconNavegacaoHome() {
        navigate('/Home');
    }

    function iconNavegacaoConfig() {
        navigate('/Configuracoes');
    }

    function iconNavegacaoEditar() {
        navigate('/EditarPerfil');
    }

    return (
        <div className='App'>
            <div className={styles.header1}>
                <header className={styles.header}>
                    <div className={styles.voltar} onClick={iconNavegacaoHome}>
                        <HiArrowLeft className={styles.iconBack} />
                    </div>
                    <h1 className={styles.h1}>Perfil</h1>
                    <div className={styles.configurar} onClick={iconNavegacaoConfig}>
                        <IoMdSettings className={styles.iconSettings} />
                    </div>
                </header>

                <main className={styles.main}>
            <div className={styles.perfil}>
                <img src={imagem} alt="perfil" />
                <div className={styles.info_perfil}>
                    <span>{nome || 'Carregando...'}</span> {/* Exibe o nome */}
                    <div className={styles.identificacao}>
                        <span>{tipoUsuario || 'Carregando...'}</span> {/* Exibe o tipo de usuário */}
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <input className={styles.texto} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." />
                        <input className={styles.input} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit ..." />
                    </div>
                </main>

                <div className={styles.quadradinho} onClick={iconNavegacaoEditar}>
                    <button className={styles.span1}>Editar Perfil</button>
                </div>

                <div className={styles.p}>Postagens</div>

               {/*<div className={styles.quadradinho2}>
                    <span className={styles.span2} onClick={testarNivel}>Testar Nível</span>
                </div>*/}

                <div className={styles.p1}>Aulas</div>

                <div>
                    <div className={styles.pessoinha} alt="pessoinha">
                        <img src={pessoinha} alt="pessoinha" />
                        <div className={styles.nome}>José Silva</div>
                    </div>

                    <div className={styles.pessoinha2} alt="pessoinha2">
                        <img src={pessoinha} alt="pessoinha2" />
                        <div className={styles.nome2}>José Silva</div>
                    </div>
                    <div className={styles.info} alt="info"></div>
                </div>
                <div className={styles.quadrado_pequeno}></div>
            </div>
        </div>
    );
}
export default Perfil;