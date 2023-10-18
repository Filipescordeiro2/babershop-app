import React from "react";

class HomeProfissional extends React.Component{

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
