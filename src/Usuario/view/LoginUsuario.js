import React from "react";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import {withRouter} from "react-router-dom";
import LocalStorageService from "../../App/service/LocalStorage/LocalStorageService";
import {mensagemSucesso,mensagemAlerta,mensagemErro} from "../../componets/toastr";
import UsuarioService from "../../App/service/Usuario/usuarioService";
import  authServiceProfissional from '../../App/service/Profissional/authServiceProfissional'
import Navbar from "../../componets/navBar";

class LoginProfissional extends React.Component{

    state={
        email:'',
        senha:''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }
    prepareCadastrar =() =>{
        this.props.history.push('/cadastro-usuario')
    }

    entrar =()=>{

        const {email,senha} = this.state;

        // Validar campos de entrada (pode ser feita dentro do service também)
        if (!email || !senha) {
            // Trate os erros de validação aqui, exibindo mensagens ao usuário, se necessário.
            mensagemAlerta("Preencha todos os campos")
            return;
        }
        this.service.autenticar({ email, senha })
            .then((response) => {
                if (response) {
                    // A autenticação foi bem-sucedida, você pode redirecionar o usuário para a página desejada.
                    LocalStorageService.adicioanarItem('_Usuario_Logado',response)
                    const ProfissionalLogado=authServiceProfissional.removerUsuarioAutenticado()
                    mensagemAlerta("Sessão Encerrada como Profissional")
                    this.props.history.push('/home-usuario')
                } else {
                    console.log("Credenciais inválidas");
                }
            }).catch(error=>{
            mensagemErro(error.response.data)
        })
    };

    render() {
        return(
            <div className="row">
                <div className="col-md-6" style={{position:'relative',left:'300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login Cliente">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email:  *" htmlFor="exampleInputEmail1">
                                                <input type="email" value={this.state.email}
                                                       onChange={e=>this.setState({email:e.target.value})}
                                                       className="form-control"
                                                       id="exampleInputEmail1"
                                                       placeholder="Digite o seu Email"/>
                                            </FormGroup>
                                            <FormGroup label="Senha:  *" htmlFor="exampleInputPassworld1">
                                                <input type="password" value={this.state.senha}
                                                       onChange={e=>this.setState({senha:e.target.value})}
                                                       className="form-control"
                                                       id="exampleInputPassworld1"
                                                       placeholder="Digite o sua senha"/>
                                            </FormGroup>
                                        </fieldset>
                                        <button  onClick={this.entrar} className="btn btn-success">Entrar</button>
                                        <button onClick={this.prepareCadastrar} className="btn btn-danger">Cadastrar</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}
export default withRouter (LoginProfissional)