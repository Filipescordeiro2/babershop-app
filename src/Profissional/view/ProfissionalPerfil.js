import React from "react";
import ProfissionalService from "../../App/service/Profissional/Agenda/profissionalService";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import  authServiceProfissional from '../../App/service/Profissional/authServiceProfissional'
import {withRouter} from "react-router-dom";
import {mensagemErro} from "../../componets/toastr";

class ProfissionalPerfil extends React.Component{

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
        this.service = new ProfissionalService();
    }

    componentDidMount() {
        // Verifique se há registros de profissionais no Local Storage
        const profissionaisNoLocalStorage =authServiceProfissional.obterProfissionalAutenticado()
        if (!profissionaisNoLocalStorage || profissionaisNoLocalStorage.length === 0) {
            mensagemErro('Apenas Profissional possui acesso a essa pagina');
            this.props.history.push('/login-profissional');
        }else{
            this.buscarDadosDoProfissional();

        }
    }
    buscarDadosDoProfissional() {
        const ProfissionalLogado = authServiceProfissional.obterProfissionalAutenticado();

        if (ProfissionalLogado) {
            const idDoProfissional = ProfissionalLogado.data.id;

            this.service
                .buscarProfissional(idDoProfissional) // Passando o ID diretamente na URL
                .then((response) => {
                    const profissional = response.data; // Supondo que a resposta da API seja um objeto com os dados do profissional.

                    this.setState({
                        nome: ProfissionalLogado.data.nome,
                        sobrenome: ProfissionalLogado.data.sobrenome,
                        cpf: ProfissionalLogado.data.cpf,
                        dataDeNascimento: ProfissionalLogado.data.dataDeNascimento,
                        telefone: ProfissionalLogado.data.telefone,
                        email: ProfissionalLogado.data.email,
                        senha: ProfissionalLogado.data.senha,
                    });
                })
                .catch((error) => {
                    // Lide com erros de busca de dados da API, como exibir uma mensagem de erro.
                    console.error("Erro ao buscar dados do profissional: ", error);
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
export default withRouter(ProfissionalPerfil)