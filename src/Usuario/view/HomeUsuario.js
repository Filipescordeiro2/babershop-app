import React from "react";
import authServiceUsuario from "../../App/service/Usuario/authServiceUsuario";
import {mensagemErro} from "../../componets/toastr";
import Navbar from "../../componets/navBar";

class HomeUsuario extends React.Component{

    componentDidMount() {
        // Verifique se há registros de profissionais no Local Storage
        const ClienteNoLocalStorage = authServiceUsuario.obterUsuarioAutenticado()
        if (!ClienteNoLocalStorage || ClienteNoLocalStorage.length === 0) {
            mensagemErro('Apenas Cliente possui acesso a essa pagina');
            this.props.history.push('/login-usuario');
        }
    }
    render() {
        return(
            <div className="jumbotron">
                <h1 class="display-3">Baber Shop!</h1>
                <hr className="my-4"/>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/consulta-agendamentos" role="button"><i className="fa fa-users"></i>  Consultar Agendamentos </a>
                    <a className="btn btn-danger btn-lg" href="#/cadastro-agendamento" role="button"><i className="fa fa-users"></i>  Novo Agendamento</a>
                </p>
            </div>

        )
    }
}export default HomeUsuario;