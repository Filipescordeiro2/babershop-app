import React from "react";
import {withRouter} from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import SelectMenu from "../../componets/selectMenu";
import AgendaTable from '../../Profissional/view/agendaTable';
import LocalStorageService from "../../App/service/LocalStorage/LocalStorageService";
import HorarioService from "../../App/service/Profissional/Agenda/HorarioService";
import {mensagemAlerta, mensagemErro, mensagemSucesso} from "../../componets/toastr";
import authServiceProfissional from '../../App/service/Profissional/authServiceProfissional'
import JornadaDeTrabalhoService from "../../App/service/Profissional/Agenda/JornadaDeTrabalhoService";

class ConsultaAgenda extends React.Component{

    state={
        periodo:'',
        intervalo:'',
        data:'',
        hora:'',
        status:'',
        horarios:[],
    }

    constructor() {
        super();
        this.service= new HorarioService();
        this.jornadaService = new JornadaDeTrabalhoService(); // Crie uma instância do serviço

    }
    componentDidMount() {
        // Verifique se há registros de profissionais no Local Storage
        const profissionaisNoLocalStorage =authServiceProfissional.obterProfissionalAutenticado()
        if (!profissionaisNoLocalStorage || profissionaisNoLocalStorage.length === 0) {
            mensagemErro('Apenas Profissional possui acesso a essa pagina');
            this.props.history.push('/login-profissional');
        } else {
            // Há registros de profissionais, continue com a renderização da página
            const params = this.props.match.params;
            console.log('params: ', params);
        }
    }

     buscar =() =>{

        if(!this.state.data){
            mensagemErro('O preenchimento do campo data é obrigatorio')
            return false;
        }
        const profissionalLogado=authServiceProfissional.obterProfissionalAutenticado()

         if (!profissionalLogado) {
             mensagemErro("Permitido apenas para Profissional")
             return false
         }
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

    deletar = (id) => {
        if (window.confirm("Tem certeza de que deseja excluir este horário?")) {
            this.service.deletar(id)
                .then(() => {
                    mensagemSucesso("Horário excluído com sucesso!");
                    // Após excluir o horário, atualize a lista de horários chamando a função de busca novamente.
                    this.buscar();
                })
                .catch(error => {
                    mensagemErro("Erro ao excluir o horário: " + error);
                });
        }
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
                                <input type="time" className="form-control" id="inputHora" value={this.state.hora} onChange={e=>this.setState({hora:e.target.value})} placeholder="Digite a hora"/>
                            </FormGroup>

                            <FormGroup htmlFor="Status" label="Status:">
                                <select id="Status" className="form-control" value={this.state.status}
                                        onChange={e=>this.setState({status:e.target.value})}>
                                    <option >Selecione</option>
                                    <option value="LIVRE">Livre</option>
                                    <option value="AGENDADO">Agendado</option>
                                </select>
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
                            <AgendaTable
                                horarios={this.state.horarios}
                                deleteAction={(id) => this.deletar(id)}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }


}
export default withRouter(ConsultaAgenda)