import React from "react";
import {withRouter} from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import LocalStorageService from "../../App/service/LocalStorage/LocalStorageService";
import {mensagemAlerta, mensagemErro, mensagemSucesso} from "../../componets/toastr";
import authServiceProfissional from '../../App/service/Profissional/authServiceProfissional'
import ClienteService from "../../App/service/Profissional/Agenda/ClienteService";
import ClienteTable from "./ClienteTable";
import usuarioService from "../../App/service/Usuario/usuarioService";

class ConsultaAgenda extends React.Component{

    state={
        nome:'',
        cpf:'',
        sobrenome:'',
        email:'',
        clientes:[]
    }

    constructor() {
        super();
        this.service= new ClienteService();
        this.serviceUsuario = new usuarioService();
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
        if (!this.state.nome){
            mensagemAlerta("Voce precisa inserir o nome do cliente")
            return false
        }
        // Obtenha o ID do profissional do localStorage
        const profissional = authServiceProfissional.obterProfissionalAutenticado()

        if (!profissional) {
            mensagemErro("Permitido apenas para Profissional")
            return;
        }

        const clienteFiltro ={
            nome:this.state.nome,
            sobrenome:this.state.sobrenome,
            email:this.state.email,
            cpf:this.state.cpf
        }

        this.service.buscarCliente(clienteFiltro)
            .then(response=>{
                const lista = response.data;
                if (lista.length<1){
                    mensagemAlerta("Nenhum cliente encontrado")
                }
                this.setState({clientes:response.data})
                console.log(response.data)
            }).catch(error=>{
            mensagemErro(error)
        })
    }
     redirectToAgendamentosCliente = (cliente) => {
        // Converte o objeto cliente para uma string JSON
        const clienteJSON = JSON.stringify(cliente);

        // Salva os dados do cliente no localStorage
        localStorage.setItem('clienteAgendado', clienteJSON);

        // Redireciona para a página "Agendamentos-cliente"
        this.props.history.push('/Agendamentos-cliente');
    };

    prepareConultaAgenda=()=>{
        this.props.history.push('/consulta-agenda')
    }
    alterarStatus=(cliente,status)=>{
        this.serviceUsuario.alterarStatus(cliente.id,status)
            .then(response=>{
                const clientes = this.state.clientes;
                const index = clientes.indexOf(cliente)

                if (index!==-1){
                    cliente['status'] = status;
                    clientes[index] = cliente;
                    this.setState({clientes})
                }
                mensagemSucesso("USUARIO INATIVADO COM SUCESSO")
            })
    }
    render() {
        return(
            <Card title="Consulta de Cliente">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputNome" label ="Nome">
                                <input type="text" className="form-control" id="inputNome" value={this.state.nome} onChange={e=>this.setState({nome:e.target.value})} placeholder="Digite o Nome"/>
                            </FormGroup>
                        </div>
                        <br/>
                        <button onClick={this.buscar} className="btn btn-success">Buscar</button>
                        <button onClick={this.prepareConultaAgenda} className="btn btn-danger">Consultar Agenda</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ClienteTable
                                clientes={this.state.clientes}
                                redirectToAgendamentosCliente={this.redirectToAgendamentosCliente}
                                alterarStatus={this.alterarStatus}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }


}
export default withRouter(ConsultaAgenda)