import React from "react";
import AgendamentoService from "../../App/service/Profissional/Agenda/AgendamentoService";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import AgendamentosTable from "../../Profissional/view/Table/AgendamentosTable";
import {withRouter} from "react-router-dom";
import {mensagemAlerta, mensagemErro, mensagemSucesso} from "../../componets/toastr";
import authUsuarioService from '../../App/service/Usuario/authServiceUsuario'
import authServiceUsuario from "../../App/service/Usuario/authServiceUsuario";
import ConsultaAgendaTable from './table/ConsultaAgendaTable';
import emailjs from "emailjs-com";

class ConsultaAgendamento extends React.Component{

    state={
        data:'',
        status:'',
        agendamentos:[]
    }

    constructor() {
        super();
        this.service = new AgendamentoService();
    }
    componentDidMount() {
        const ClienteNoLocalStorage = authServiceUsuario.obterUsuarioAutenticado();
        if (!ClienteNoLocalStorage || ClienteNoLocalStorage.length === 0) {
            mensagemErro('Apenas Cliente possui acesso a essa pagina');
            this.props.history.push('/login-usuario');
        }
    }

    buscar =()=>{
        if(!this.state.status){
            mensagemErro('O preenchimento do campo status é obrigatorio')
            return false;
        }

        const UsuarioLogado = authUsuarioService.obterUsuarioAutenticado()

        const agendamentoFiltro ={
            data:this.state.data,
            status:this.state.status,
            idCliente:UsuarioLogado.data.id
        }
        this.service.buscarAgendamento(agendamentoFiltro)
            .then((response)=>{
                const lista = response.data;
                if (lista.length<1){
                    mensagemAlerta("Nenhum agendamento encontrado")
                }
                this.setState({agendamentos:response.data})
            }).catch(erro=>{
            mensagemErro("Erro ao buscar")
        })
    }

    alterarStatus=(agendamento,status)=>{
        this.service.alterarStatus(agendamento.id,status)
            .then(response=>{
                const agendamentos = this.state.agendamentos;
                const index = agendamentos.indexOf(agendamento)

                if (index!==-1){
                    agendamento['status'] = status;
                    agendamentos[index] = agendamento;
                    this.setState({agendamentos})
                }
                this.enviarEmailConfirmacaoCancelamento(agendamento);
                mensagemSucesso("STATUS ATUALIZADO COM SUCESSO")
            })
    }

    enviarEmailConfirmacaoCancelamento = (agendamento) => {

        const UsuarioLogado = authServiceUsuario.obterUsuarioAutenticado();

        const templateParams = {
            client_name: agendamento.cliente.nome,
            appointment_date: agendamento.horario.data,
            appointment_time: agendamento.horario.hora,
            user_email: UsuarioLogado.data.email,
            nomeProfissional: agendamento.profissional.nome

        };

        templateParams.message = `Olá ${templateParams.client_name}, realizado cancelamento do agendamento. Abaixo seguem os dados do cancelamento:\nData: ${templateParams.appointment_date}\nHora: ${templateParams.appointment_time}\nProfissional: ${templateParams.nomeProfissional}`;

        emailjs.send('gmailMessage', 'template_twyzvr2', templateParams, 'OKM0SJIN2jhnhSTSJ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    Agendar=()=>{
        this.props.history.push("/cadastro-agendamento")

}

    render() {
        return(

            <Card title="Consulta de Agendamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputData" label ="Data">
                                <input type="date" className="form-control" id="inputData" value={this.state.data} onChange={e=>this.setState({data:e.target.value})} placeholder="Escolha a data"/>
                            </FormGroup>
                            <FormGroup htmlFor="Status" label="Status:">
                                <select id="Status" className="form-control" value={this.state.status}
                                        onChange={e=>this.setState({status:e.target.value})}>
                                    <option >Selecione</option>
                                    <option value="CANCELADO">Cancelado</option>
                                    <option value="AGENDADO">Agendado</option>
                                    <option value="REALIZADO">Realizado</option>
                                </select>
                            </FormGroup>
                        </div>
                        <br/>
                        <button onClick={this.buscar} className="btn btn-success">Buscar</button>
                        <button onClick={this.Agendar   } className="btn btn-warning">Agendar Horario</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ConsultaAgendaTable
                                agendamentos={this.state.agendamentos}
                                alterarStatus={this.alterarStatus}
                            />
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}
export default withRouter(ConsultaAgendamento)