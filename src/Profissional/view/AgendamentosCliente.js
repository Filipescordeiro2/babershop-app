import React from "react";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import {withRouter} from "react-router-dom";
import AgendamentosTable from "./AgendamentosTable";
import AgendamentoService from "../../App/service/Profissional/Agenda/AgendamentoService";
import {mensagemAlerta, mensagemErro} from "../../componets/toastr";
import authServiceClienteAgendado from '../../App/service/Profissional/Agenda/authServiceClienteAgendado'
import LocalStorageService from "../../App/service/LocalStorage/LocalStorageService";

class AgendamentosCliente extends React.Component{

    state={
        data:'',
        hora:'',
        status:'',
        agendamentos:[]

    }

    constructor() {
        super();
      this.service = new AgendamentoService();
    }

    buscar=()=>{
        if(!this.state.data|| !this.state.status){
            mensagemErro('O preenchimento do campo data e status é obrigatorio')
            return false;
        }

        const usuarioSelecioando = authServiceClienteAgendado.obterClienteAgendado()

        const agendamentoFiltro={
            data:this.state.data,
            hora:this.state.hora,
            status:this.state.status,
            idCliente:usuarioSelecioando.id
       }

        this.service.buscarAgendamento(agendamentoFiltro)
            .then(response=>{
                const lista = response.data;
                if (lista.length<1){
                    mensagemAlerta("Nenhum agendamento encontrado")
                }
                this.setState({agendamentos:response.data})
            }).catch(erro=>{
                mensagemErro("Erro ao buscar")
        })

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
                            <FormGroup htmlFor="inputHora" label ="Hora">
                                <input type="time" className="form-control" id="inputHora" value={this.state.hora} onChange={e=>this.setState({hora:e.target.value})} placeholder="Digite a hora"/>
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
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                           <AgendamentosTable
                           agendamentos={this.state.agendamentos}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(AgendamentosCliente)