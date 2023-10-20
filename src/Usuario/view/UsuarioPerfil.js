import React from "react";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import {withRouter} from "react-router-dom";
import authServiceUsuario from '../../App/service/Usuario/authServiceUsuario'
import UsuarioService from "../../App/service/Usuario/usuarioService";
import authServiceProfissional from "../../App/service/Profissional/authServiceProfissional";
import {mensagemErro} from "../../componets/toastr";
class UsuarioPerfil extends React.Component{

    state ={
        nome: "",
        sobrenome: "",
        cpf: "",
        dataDeNascimento: "",
        telefone: "",
        email: "",
        senha: "",
    }
    constructor() {
        super();
        this.service = new UsuarioService();
    }

    componentDidMount() {
        // Verifique se há registros de profissionais no Local Storage
        const ClienteNoLocalStorage = authServiceUsuario.obterUsuarioAutenticado()
        if (!ClienteNoLocalStorage || ClienteNoLocalStorage.length === 0) {
            mensagemErro('Apenas Cliente possui acesso a essa pagina');
            this.props.history.push('/login-usuario');
        }else{
            this.buscarDadosDoCliente();

        }
    }
    buscarDadosDoCliente() {
        const UsuarioLogado = authServiceUsuario.obterUsuarioAutenticado()

        if (UsuarioLogado) {
            const idCliente = UsuarioLogado.data.id;

            this.service
                .buscarCliente(idCliente) // Passando o ID diretamente na URL
                .then((response) => {
                    const Usuario = response.data;

                    this.setState({
                        nome: UsuarioLogado.data.nome,
                        sobrenome: UsuarioLogado.data.sobrenome,
                        cpf: UsuarioLogado.data.cpf,
                        dataDeNascimento: UsuarioLogado.data.dataDeNascimento,
                        telefone: UsuarioLogado.data.telefone,
                        email: UsuarioLogado.data.email,
                        senha: UsuarioLogado.data.senha,
                    });
                })
                .catch((error) => {
                    // Lide com erros de busca de dados da API, como exibir uma mensagem de erro.
                    console.error("Erro ao buscar dados do Cliente: ", error);
                });
        }
    }
    habilitarEdicao = () => {
        this.setState({ editando: true });
    }

    salvarDados = () => {
        // Aqui você deve implementar a lógica para salvar os dados editados na API
        // Após a conclusão, defina editando para false para bloquear a edição dos campos.
        this.setState({ editando: false });
    }


    render() {
        return(
            <Card title="Seus dados">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input
                                    type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    value={this.state.nome}
                                    readOnly={!this.state.editando}
                                />
                            </FormGroup>
                            <FormGroup label="Sobrenome: *" htmlFor="inputSobrenome">
                                <input
                                    type="text"
                                    id="inputSobrenome"
                                    className="form-control"
                                    name="sobrenome"
                                    onChange={e => this.setState({ sobrenome: e.target.value })}

                                    value={this.state.sobrenome}
                                    readOnly={!this.state.editando} // Campo editável quando editando for verdadeiro
                                />
                            </FormGroup>
                            <FormGroup label="CPF: *" htmlFor="inputCPF">
                                <input
                                    type="text"
                                    id="inputCPF"
                                    className="form-control"
                                    name="cpf"
                                    onChange={e => this.setState({ cpf: e.target.value })}

                                    value={this.state.cpf}
                                    readOnly={!this.state.editando} // Campo editável quando editando for verdadeiro

                                />
                            </FormGroup>
                            <FormGroup label="Data de Nascimento: *" htmlFor="inputDataDeNascimento">
                                <input
                                    type="date"
                                    id="inputDataDeNascimento"
                                    className="form-control"
                                    name="dataDeNascimento"
                                    onChange={e => this.setState({ dataDeNascimentoa: e.target.value })}
                                    value={this.state.dataDeNascimento}
                                    readOnly={!this.state.editando} // Campo editável quando editando for verdadeiro
                                />
                            </FormGroup>
                            <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                                <input
                                    type="text"
                                    id="inputTelefone"
                                    className="form-control"
                                    name="telefone"
                                    onChange={e => this.setState({telefone: e.target.value })}
                                    value={this.state.telefone}
                                    readOnly={!this.state.editando} // Campo editável quando editando for verdadeiro
                                />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input
                                    type="text"
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    readOnly={!this.state.editando} // Campo editável quando editando for verdadeiro
                                    onChange={e => this.setState({email: e.target.value })}

                                />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input
                                    type="password"
                                    id="inputSenha"
                                    className="form-control"
                                    name="senha"
                                    value={this.state.senha}
                                    readOnly={!this.state.editando} // Campo editável quando editando for verdadeiro
                                    onChange={e => this.setState({senha: e.target.value })}

                                />
                            </FormGroup>
                            <br />
                            {this.state.editando ? (
                                <button className="btn btn-success" onClick={this.salvarDados}>
                                    Salvar Dados
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={this.habilitarEdicao}>
                                    Editar Dados
                                </button>
                            )}                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(UsuarioPerfil)