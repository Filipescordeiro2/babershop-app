import React from "react";
import authServiceProfissional from "../../App/service/Profissional/authServiceProfissional";
import {mensagemErro} from "../../componets/toastr";

class HomeProfissional extends React.Component{

    componentDidMount() {

        // Verifique se há registros de profissionais no Local Storage
        const profissionaisNoLocalStorage =authServiceProfissional.obterProfissionalAutenticado()
        if (!profissionaisNoLocalStorage || profissionaisNoLocalStorage.length === 0) {
            mensagemErro('Apenas Profissional possui acesso a essa pagina');
            this.props.history.push('/login-profissional');
        }
    }
    render() {
        return(
          <div className="jumbotron">
              <h1 class="display-3">Baber Shop!</h1>
              <hr className="my-4"/>
                  <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                  <p className="lead">
                      <a className="btn btn-primary btn-lg" href="#/Consulta-agenda" role="button"><i className="fa fa-users"></i>  Consultar Agenda </a>
                      <a className="btn btn-danger btn-lg" href="#/Cadastro-Jornada" role="button"><i className="fa fa-users"></i>  Cadastrar Nova Jornada</a>
                  </p>
          </div>

    )
    }
}export default HomeProfissional;
