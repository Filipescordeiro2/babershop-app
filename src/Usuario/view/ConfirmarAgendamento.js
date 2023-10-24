import React from "react";
import {mensagemErro, mensagemSucesso} from "../../componets/toastr";
import AgendamentoService from "../../App/service/Usuario/Agendamento/agendamentoService";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import authServiceHorario, {HorarioSelecionado} from '../../App/service/Usuario/Agendamento/authServiceHorario'
import authServiceUsuario, {USUARIO_LOGADO} from '../../App/service/Usuario/authServiceUsuario'
import HorarioService from "../../App/service/Profissional/Agenda/HorarioService";
import {withRouter} from "react-router-dom";

class ConfirmarAgendamento extends React.Component {
    state = {
        nomeCliente: '',
        nomeProfissional: '',
        data: '',
        hora: '',
        tipoServico:'',
        tiposServico: []
    }

    constructor() {
        super();
        this.service = new AgendamentoService();
        this.serviceHorario = new HorarioService()
    }

    componentDidMount() {
        const ClienteNoLocalStorage = authServiceUsuario.obterUsuarioAutenticado();
        if (!ClienteNoLocalStorage || ClienteNoLocalStorage.length === 0) {
            mensagemErro('Apenas Cliente possui acesso a essa página');
            this.props.history.push('/login-usuario');
        } else {
            const tiposServico = this.service.obterListaDeServico();
            this.setState({ tiposServico });
            this.BuscarDadosHorarioSelecionado();
        }
    }

    BuscarDadosHorarioSelecionado() {
        const HorarioSelecionado = authServiceHorario.obterHorarioSelecionado();
        const UsuarioLogado = authServiceUsuario.obterUsuarioAutenticado();

        const Profissional = HorarioSelecionado.profissional.id;

        this.serviceHorario
            .buscarHorarioPorProfissional(Profissional)
            .then((response) => {
                this.setState({
                    nomeCliente: UsuarioLogado.data.nome,
                    nomeProfissional: HorarioSelecionado.profissional.nome,
                    data: HorarioSelecionado.data,
                    hora: HorarioSelecionado.hora,
                });
            })
    }

    handleTipoServicoChange = (e) => {
        this.setState({ tipoServico: e.target.value });
    }

    cancelar=()=>{
        this.props.history.push("/Cadastro-Agendamento")
    }
    agendar=()=>{

        const HorarioSelecionado = authServiceHorario.obterHorarioSelecionado();
        const UsuarioLogado = authServiceUsuario.obterUsuarioAutenticado();

        const {id_cliente=UsuarioLogado.data.id,id_profissional=HorarioSelecionado.profissional.id,id_horario=HorarioSelecionado.id,tiposDeAgendamentos=this.state.tipoServico} = this.state

         const agendamento ={id_cliente,id_profissional,id_horario,tiposDeAgendamentos}

        this.service
            .salvarAgendamento(agendamento)
            .then((response)=>{
                mensagemSucesso("Agendamento Realizado")
                this.props.history.push("/Cadastro-agendamento")
            })
            .catch((error)=>{
                mensagemErro(error.response.data)
            })

    }
    render() {
        return (
            <Card title="Seus dados">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Seu nome: *" htmlFor="inputNome">
                                <input
                                    type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nomeCliente"
                                    onChange={e => this.setState({ nomeCliente: e.target.value })}
                                    value={this.state.nomeCliente}
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup label="Nome Profissional: *" htmlFor="inputNomeProfissional">
                                <input
                                    type="text"
                                    id="inputNomeProfissional"
                                    className="form-control"
                                    name="nomeProfissional"
                                    onChange={e => this.setState({ nomeProfissional: e.target.value })}
                                    value={this.state.nomeProfissional}
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup label="Data: *" htmlFor="inputData">
                                <input
                                    type="text"
                                    id="inputData"
                                    className="form-control"
                                    name="data"
                                    value={this.state.data}
                                    readOnly
                                    onChange={e => this.setState({ data: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Hora: *" htmlFor="inputHora">
                                <input
                                    type="text"
                                    id="inputHora"
                                    className="form-control"
                                    name="hora"
                                    value={this.state.hora}
                                    readOnly
                                    onChange={e => this.setState({ hora: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup htmlFor="tipoDeServico" label="Escolha o Servico:" className="col-md-6">
                                <select
                                    id="tipoDeServico"
                                    className="form-control"
                                    value={this.state.tipoServico}
                                    onChange={this.handleTipoServicoChange}
                                >
                                    <option value="">Selecione o tipo de serviço</option>
                                    {this.state.tiposServico.map((servico) => (
                                        <option key={servico.value} value={servico.value}>
                                            {servico.label}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <br />
                            <button onClick={this.agendar} className="btn btn-success">Agendar</button>
                            <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConfirmarAgendamento)