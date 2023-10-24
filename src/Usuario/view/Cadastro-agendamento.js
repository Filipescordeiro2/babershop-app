import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import HorarioService from "../../App/service/Profissional/Agenda/HorarioService";
import { mensagemAlerta, mensagemErro, mensagemSucesso } from "../../componets/toastr";
import authServiceUsuario from "../../App/service/Usuario/authServiceUsuario";
import AgendamentoTable from '../../Usuario/view/AgendamentoTable'
import AgendamentoService from "../../App/service/Usuario/Agendamento/agendamentoService"

class CadastroAgendamento extends React.Component {
    state = {
        data: '',
        hora: '',
        horarios: [],
        nomeProfissionalSelecionado: ""
    }

    constructor() {
        super();
        this.service = new HorarioService();
        this.AgendamentoService = new AgendamentoService();
    }


    componentDidMount() {
        const ClienteNoLocalStorage = authServiceUsuario.obterUsuarioAutenticado();
        if (!ClienteNoLocalStorage || ClienteNoLocalStorage.length === 0) {
            mensagemErro('Apenas Cliente possui acesso a essa pagina');
            this.props.history.push('/login-usuario');
        } else {
            this.AgendamentoService.obterListaDeProfissionais()
                .then(profissionais => {
                    this.setState({ nomeProfissionalSelecionado: "" }); // Inicialize o valor selecionado
                    this.setState({ nomeProfissional: profissionais });
                })
                .catch(error => {
                    mensagemErro(error);
                });
        }
    }

    buscar = () => {
        const params = {
            nomeProfissional: this.state.nomeProfissionalSelecionado, // Use o valor selecionado
            data: this.state.data,
            hora: this.state.hora
        };

        this.service.buscarHorariosPorNome(params)
            .then(response => {
                const lista = response.data;
                if (lista.length < 1) {
                    mensagemAlerta("Nenhum horário encontrado");
                }
                this.setState({ horarios: response.data });
            })
            .catch(error => {
                mensagemErro(error.response.data);
            });
    }

    redirectToAgendar = (horario) => {
        // Converte o objeto cliente para uma string JSON
        const horarioJSON = JSON.stringify(horario);

        // Salva os dados do cliente no localStorage
        localStorage.setItem('HorarioSelecionado', horarioJSON);


        this.props.history.push("/Confirmar-Agendamento")

    };


    render() {
        return (
            <Card title="Consulta de Horarios">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputnomeProfissional" label="Nome do Profissional:" className="col-md-6">
                                <select id="inputnomeProfissional" className="form-control" value={this.state.nomeProfissionalSelecionado}
                                        onChange={e => this.setState({ nomeProfissionalSelecionado: e.target.value })}>
                                    <option value="">Selecione</option>
                                    {this.state.nomeProfissional && this.state.nomeProfissional.map((nome, index) => (
                                        <option key={index} value={nome}>
                                            {nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup htmlFor="inputData" label="Data">
                                <input type="date" className="form-control" id="inputData" value={this.state.data} onChange={e => this.setState({ data: e.target.value })} placeholder="Escolha a data" />
                            </FormGroup>
                            <FormGroup htmlFor="inputHora" label="Hora">
                                <input type="time" className="form-control" id="inputHora" value={this.state.hora} onChange={e => this.setState({ hora: e.target.value })} placeholder="Digite a hora" />
                            </FormGroup>
                        </div>
                        <br />
                        <button onClick={this.buscar} className="btn btn-success">Buscar</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <AgendamentoTable
                                horarios={this.state.horarios}
                                redirectToAgendar={this.redirectToAgendar}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroAgendamento)
