import React, { useState } from "react";
import Card from '../../componets/card'
import FormGroup from "../../componets/form-group";
import profissionalService from "../../App/service/Profissional/Agenda/profissionalService";
import {withRouter} from "react-router-dom";
import {mensagemErro, mensagemSucesso} from "../../componets/toastr";
import { Button } from 'primereact/button';



class CadastroProfissional extends React.Component{


    state={
        nome:'',
        cpf:'',
        dataDeNascimento:'',
        telefone:'',
        email:'',
        senha:''
    }

    constructor() {
        super();
        this.service = new profissionalService();

    }


    cadastrar = () => {
        const { nome,  cpf, dataDeNascimento, telefone, email, senha } = this.state;
        const profissional = { nome, cpf, dataDeNascimento, telefone, email, senha };

        const erros = this.service.validar(profissional);

        if (erros.length > 0) {
            erros.forEach((msg) => mensagemErro(msg));
            return false;
        }

        this.service
            .salvarprofissional(profissional)
            .then((response) => {
                mensagemSucesso('Profissional cadastrado com sucesso! Faça o login para acessar');
                this.props.history.push('/login-profissional');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    mensagemErro(error.response.data);
                } else {
                    mensagemErro('Ocorreu um erro ao cadastrar o usuário');
                }
            });
    }


    cancelar = ()=>{
        this.props.history.push('/')
    }


    render() {
        return(
            <Card title="Cadastro Profissional">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" id="inputNome"
                                       className="form-control" name="nome"
                                       onChange={e=>this.setState({nome:e.target.value
                                })}/>
                            </FormGroup>
                            <FormGroup label="CPF: *" htmlFor="inputCPF">
                                <input type="text" id="inputCPF"
                                       className="form-control" name="cpf"
                                       onChange={e=>this.setState({cpf:e.target.value
                                       })}/>
                            </FormGroup>
                            <FormGroup label="Data de Nascimento: *" htmlFor="inputDataDeNascimento">
                                <input type="date" id="inputDataDeNascimento"
                                       className="form-control" name="dataDeNascimento"
                                       onChange={e=>this.setState({dataDeNascimento:e.target.value
                                       })}/>
                            </FormGroup>
                            <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                                <input type="text" id="inputTelefone"
                                       className="form-control" name="telefone"
                                       onChange={e=>this.setState({telefone:e.target.value
                                       })}/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text" id="inputEmail"
                                       className="form-control" name="email"
                                       onChange={e=>this.setState({email:e.target.value
                                       })}/>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" id="inputSenha"
                                       className="form-control" name="senha"
                                       onChange={e=>this.setState({senha:e.target.value
                                       })}/>
                            </FormGroup>
                            <br/>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Cadastrar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}
export default withRouter(CadastroProfissional)