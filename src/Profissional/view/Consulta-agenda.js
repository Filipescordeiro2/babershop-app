import React from "react";
import {withRouter} from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import SelectMenu from "../../componets/selectMenu";
import AgendaTable from '../../Profissional/view/agendaTable';
import LocalStorageService from "../../App/service/LocalStorage/LocalStorageService";
import HorarioService from "../../App/service/Profissional/Agenda/HorarioService";
import {mensagemAlerta, mensagemErro} from "../../componets/toastr";
import authServiceProfissional from '../../App/service/Profissional/authServiceProfissional'


class ConsultaAgenda extends React.Component{

    state={
        periodo:'',
        intervalo:'',
        data:'',
        hora:'',
        status:'',
        horarios:[]

    }

    constructor() {
        super();
        this.service= new HorarioService();
    }
     componentDidMount() {
        const params = this.props.match.params
         console.log('params: ',params)
     }

     buscar =() =>{
        if(!this.state.data){
            mensagemErro('O preenchimento do campo data é obrigatorio')
        }
        const profissionalLogado=authServiceProfissional.obterProfissionalAutenticado()

         const horarioFiltro ={
             data:this.state.data,
             hora:this.state.hora,
             status:this.state.status,
             intervalo: this.state.intervalo,
             periodo:this.state.periodo,
             Profissional: profissionalLogado.data.id
     }

        this.service.buscarHorarios(horarioFiltro)
            .then(response=>{
                const lista = response.data;
                if (lista.length<1){
                    mensagemAlerta("Nenhum horario encontrado")
                }
                this.setState({horarios:response.data})
            }).catch(error=>{
                mensagemErro(error)
        })
    }
    prepararCadastro=()=>{
        this.props.history.push(`/Cadastro-Jornada`)
    }

    render() {
        return(
            <Card title="Consulta de Horarios">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputData" label ="Data">
                                <input type="date" className="form-control" id="inputData" value={this.state.data} onChange={e=>this.setState({data:e.target.value})} placeholder="Escolha a data"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputHora" label ="Hora">
                                <input type="text" className="form-control" id="inputHora" value={this.state.hora} onChange={e=>this.setState({hora:e.target.value})} placeholder="Digite a hora"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputPeriodo" label ="Periodo">
                                <input type="text" className="form-control" id="inputPeriodo" value={this.state.periodo} onChange={e=>this.setState({periodo:e.target.value})} placeholder="Escolha o Periodo"/>
                            </FormGroup>
                        </div>
                        <br/>
                        <button onClick={this.buscar} className="btn btn-success">Buscar</button>
                        <button onClick={this.prepararCadastro} className="btn btn-danger">Cadastrar Jornada</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <AgendaTable horarios={this.state.horarios}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }


}
export default withRouter(ConsultaAgenda)