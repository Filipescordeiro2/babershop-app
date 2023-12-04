import React, { useState } from "react";
import Card from '../../componets/card'
import FormGroup from "../../componets/form-group";
import profissionalService from "../../App/service/Profissional/Agenda/profissionalService";
import {withRouter} from "react-router-dom";
import {mensagemErro, mensagemSucesso} from "../../componets/toastr";
import { Button } from 'primereact/button';
import UsuarioService from "../../App/service/Usuario/usuarioService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class CadastroUsuario extends React.Component {
    state = {
        nome: '',
        cpf: '',
        dataDeNascimento: '',
        telefone: '',
        email: '',
        senha: '',
        aceiteLGPD: '',
        passwordChecks: {
            comprimento: false,
            maiuscula: false,
            numero: false,
            caractereEspecial: false,
            semSequenciaNumerica: false,
        },
        mostrarSenha: false,
        exibirTermosLGPD: false,
    };

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    updatePasswordChecks = (senha) => {
        const passwordChecks = {
            comprimento: senha.length >= 6 && senha.length <= 10,
            maiuscula: /[A-Z]/.test(senha),
            numero: /\d/.test(senha),
            caractereEspecial: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
            semSequenciaNumerica: !/\d{3,}/.test(senha),
        };

        this.setState({ passwordChecks });
    };

    toggleMostrarSenha = () => {
        this.setState((prevState) => ({
            mostrarSenha: !prevState.mostrarSenha,
        }));
    };

    handleAceiteChange = (e) => {
        this.setState({ aceiteLGPD: e.target.value });
    };

    handlePasswordChange = (e) => {
        const senha = e.target.value;
        this.setState({ senha }, () => this.updatePasswordChecks(senha));
    };

    exibirTermosLGPD = () => {
        this.setState({ exibirTermosLGPD: true });
    };

    fecharTermosLGPD = () => {
        this.setState({ exibirTermosLGPD: false });
    };

    cadastrar = () => {
        const { nome, cpf, dataDeNascimento, telefone, email, senha, aceiteLGPD } = this.state;
        const usuario = { nome, cpf, dataDeNascimento, telefone, email, senha, aceiteLGPD };

        const erros = this.service.validar(usuario);

        if (aceiteLGPD !== 'Aceito os termos') {
            mensagemErro('É necessário aceitar os termos da LGPD para cadastrar.');
            return false;
        }

        // Adiciona a validação da senha
        const errosSenha = this.service.validarSenha(senha);
        erros.push(...errosSenha);

        if (erros.length > 0) {
            erros.forEach((msg) => mensagemErro(msg));
            return false;
        }

        this.service
            .salvarcliente(usuario)
            .then((response) => {
                mensagemSucesso('Usuario cadastrado com sucesso! Faça o login para acessar');
                this.props.history.push('/login-usuario');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    mensagemErro(error.response.data);
                } else {
                    mensagemErro('Ocorreu um erro ao cadastrar o usuário');
                }
            });
    };

    cancelar = () => {
        this.props.history.push('/');
    };

    render() {
        const { passwordChecks, mostrarSenha, senha, aceiteLGPD, exibirTermosLGPD } = this.state;

        return (
            <Card title="Cadastro Usuario">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input
                                    type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={(e) => this.setState({ nome: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="CPF: *" htmlFor="inputCPF">
                                <input
                                    type="text"
                                    id="inputCPF"
                                    className="form-control"
                                    name="cpf"
                                    onChange={(e) => this.setState({ cpf: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Data de Nascimento: *" htmlFor="inputDataDeNascimento">
                                <input
                                    type="date"
                                    id="inputDataDeNascimento"
                                    className="form-control"
                                    name="dataDeNascimento"
                                    onChange={(e) => this.setState({ dataDeNascimento: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                                <input
                                    type="text"
                                    id="inputTelefone"
                                    className="form-control"
                                    name="telefone"
                                    onChange={(e) => this.setState({ telefone: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input
                                    type="text"
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <div className="input-group">
                                    <input
                                        type={mostrarSenha ? 'text' : 'password'}
                                        id="inputSenha"
                                        className="form-control"
                                        name="senha"
                                        value={senha}
                                        onChange={this.handlePasswordChange}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={this.toggleMostrarSenha}
                                        >
                                            {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                    </div>
                                </div>
                            </FormGroup>
                            <div>
                                <label>Checklist da Senha:</label>
                                <ul>
                                    {Object.entries(passwordChecks).map(([key, value]) => (
                                        <li key={key}>
                                            <input type="checkbox" checked={value} readOnly />
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <br />
                            <Button onClick={this.exibirTermosLGPD} type="button" className="btn btn-primary">
                                Visualizar Termos LGPD
                            </Button>

                            {exibirTermosLGPD && (
                                <div className="modal fade show" style={{ display: 'block' }}>
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Termos LGPD</h5>
                                                <button type="button" className="close" onClick={this.fecharTermosLGPD}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div>

                                                <p>
                                                Ao aceitar os termos da LGPD, você concorda com a coleta e processamento dos seus dados pessoais conforme descrito abaixo:
                                                </p>

                                                    <p>
                                                Seus dados serão utilizados para proporcionar uma experiência personalizada em nossos serviços,
                                                incluindo o cadastro e acesso à plataforma. Garantimos a confidencialidade e segurança dos seus
                                                dados, adotando medidas técnicas e organizacionais para protegê-los contra acesso não autorizado
                                                e uso indevido.
                                                    </p>

                                                <p>
                                                    Para mais detalhes sobre como processamos seus dados e seus direitos em relação à LGPD, consulte
                                                nossa Política de Privacidade.

                                                </p>

                                                <p>
                                                Você pode a qualquer momento revogar seu consentimento ou solicitar a exclusão dos seus dados,
                                                entrando em contato conosco.
                                            </p>

                                        </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={this.fecharTermosLGPD}>
                                                    Fechar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <FormGroup  htmlFor="checkAceiteLGPD">
                                <div className="p-field-checkbox">
                                    <input
                                        type="checkbox"
                                        id="checkAceiteLGPD"
                                        onChange={() => this.handleAceiteChange({
                                            target: { value: aceiteLGPD === 'Aceito os termos' ? '' : 'Aceito os termos' }
                                        })}
                                        checked={aceiteLGPD === 'Aceito os termos'}
                                    />
                                    <label htmlFor="checkAceiteLGPD">Eu aceito os termos da LGPD</label>
                                </div>
                            </FormGroup>
                            <FormGroup  htmlFor="checkAceiteLGPD">
                                <div className="p-field-checkbox">
                                    <input
                                        type="checkbox"
                                        id="checkAceiteLGPD"
                                        onChange={() => this.handleAceiteChange({
                                            target: { value: aceiteLGPD === 'Não Aceito os termos' ? '' : 'Não Aceito os termos' }
                                        })}
                                        checked={aceiteLGPD === 'Não Aceito os termos'}
                                    />
                                    <label htmlFor="checkAceiteLGPD">Eu não aceito os termos da LGPD</label>
                                </div>
                            </FormGroup>

                            <br />
                            <Button onClick={this.cadastrar} type="button" className="btn btn-success">
                                Cadastrar
                            </Button>
                            <Button onClick={this.cancelar} type="button" className="btn btn-danger">
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(CadastroUsuario);