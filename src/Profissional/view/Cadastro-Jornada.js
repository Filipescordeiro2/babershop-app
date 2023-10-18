import React, { Component } from 'react';
import Card from '../../componets/card'
import JornadaDeTrabalhoService from '../../App/service/Profissional/Agenda/JornadaDeTrabalhoService';
import FormGroup from "../../componets/form-group";
import ApiService from "../../App/apiService";
import authServiceProfissional from '../../App/service/Profissional/authServiceProfissional'
import {mensagemErro, mensagemSucesso} from "../../componets/toastr";
function generateHorarios(data, periodo, intervalo) {
    const horarios = [];
    const dataObj = new Date(data);

    let horaInicio, horaFim;

    switch (periodo) {
        case 'manha':
            horaInicio = 9; // Manhã começa às 09:00
            horaFim = 12;  // Manhã termina às 12:00
            break;
        case 'tarde':
            horaInicio = 12; // Tarde começa às 12:00
            horaFim = 18;   // Tarde termina às 18:00
            break;
        case 'noite':
            horaInicio = 19; // Noite começa às 19:00
            horaFim = 22;   // Noite termina às 22:00
            break;
        default:
            return horarios;
    }

    const intervaloMinutos = intervalo === '30min' ? 30 : 60;
    const intervaloMilissegundos = intervaloMinutos * 60 * 1000;

    let horaAtual = new Date(dataObj);
    horaAtual.setHours(horaInicio, 0, 0, 0);

    while (horaAtual.getHours() < horaFim) {
        const horaFormatada = horaAtual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        horarios.push(horaFormatada);
        horaAtual.setTime(horaAtual.getTime() + intervaloMilissegundos);
    }

    return horarios;
}
class CadastroJornada extends Component {

    state = {
        data: '',
        periodo: '',
        intervalo: '',
        jornadas: [],
    };

    constructor() {
        super();
        this.jornadaService = new JornadaDeTrabalhoService(); // Crie uma instância do serviço
    }

    componentDidMount() {
        // Obtenha a lista de jornadas do serviço
        this.setState({ jornadas: this.jornadaService.obterListaDeJornada() });
    }

    handleSubmit = (event) => {

        // Obtenha o ID do profissional do localStorage
        const profissional = authServiceProfissional.obterProfissionalAutenticado()

        if (!profissional) {
            console.error("ID do profissional não encontrado no localStorage");
            return;
        }
        // Formate a data no formato "YYYY-MM-DD"
        const dataFormatada = new Date(this.state.data).toISOString().split('T')[0];
        // Crie um objeto com os dados do formulário
        const jornadaData = {
            data: dataFormatada,
            periodo: this.state.periodo,
            intervalo: this.state.intervalo,
            profissional:profissional.data.id
        };

        // Chame o método de post do serviço para enviar os dados para a API
        this.jornadaService
            .postJornada(jornadaData)
            .then((response) => {
                // Lide com a resposta da API aqui, se necessário
                console.log('Jornada cadastrada com sucesso:', response.data);
                mensagemSucesso("Jornada criada e horarios adicionados a sua agenda")
            })
            .catch((error) => {
                // Lide com erros aqui, se houver algum problema com a solicitação
                console.error('Erro ao cadastrar jornada:', error);
                mensagemErro("Erro ao cadastrar jornada")
            });
    };

    render() {
        return (
            <div className="container">
                <Card title="Cadastro de nova Jornada">
                    <form>
                        <div className="row">
                            <FormGroup htmlFor="data" label="Data:" className="col-md-6">
                                <input type="date" id="data" className="form-control" value={this.state.data}
                                       onChange={e=>this.setState({data:e.target.value})} />
                            </FormGroup>
                        </div>
                        <div className="row">
                            <FormGroup htmlFor="periodo" label="Período:" className="col-md-6">
                                <select id="periodo" className="form-control" value={this.state.periodo}
                                        onChange={e=>this.setState({periodo:e.target.value})}>
                                    {this.state.jornadas.map((jornada) => (
                                        <option key={jornada.value} value={jornada.value}>
                                            {jornada.label}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </div>
                        <FormGroup htmlFor="intervalo" label="Intervalo:">
                            <select id="intervalo" className="form-control" value={this.state.intervalo}
                                    onChange={e=>this.setState({intervalo:e.target.value})}>
                                <option >Selecione</option>
                                <option value="30min">30 minutos</option>
                                <option value="1h">1 hora</option>
                            </select>
                        </FormGroup>
                        <br/>
                        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Cadastrar Jornada</button>
                    </form>
                </Card>
            </div>
        );
    }
}

export default CadastroJornada;
