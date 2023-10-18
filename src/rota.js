import React from 'react';
import {Route, Switch, HashRouter} from 'react-router-dom'

import LoginUsuario from './Usuario/view/LoginUsuario';
import HomeUsuario from './Usuario/view/HomeUsuario';
import ConsultaAgendamento from './Usuario/view/Consulta-agendamento';
import CadastroUsuario from './Usuario/view/Cadastro-usuario';
import CadastroAgendamento from './Usuario/view/Cadastro-agendamento';
import CadastroJornada from './Profissional/view/Cadastro-Jornada';
import CadastroProfissional from './Profissional/view/Cadastro-Profissional';
import ConsultaAgenda from './Profissional/view/Consulta-agenda';
import ConsultaCliente from './Profissional/view/Consulta-clientes';
import HomeProfissional from './Profissional/view/HomeProfissional';
import LoginProfissional from './Profissional/view/LoginProfissional';

function App() {
    return (
        <HashRouter>
                <Switch>
                    <Route path="/login-usuario" component={LoginUsuario} />
                    <Route path="/home-usuario" component={HomeUsuario} />
                    <Route path="/consulta-agendamento" component={ConsultaAgendamento} />
                    <Route path="/cadastro-usuario" component={CadastroUsuario} />
                    <Route path="/cadastro-agendamento" component={CadastroAgendamento} />
                    <Route path="/cadastro-jornada" component={CadastroJornada} />
                    <Route path="/cadastro-profissional" component={CadastroProfissional} />
                    <Route path="/consulta-agenda" component={ConsultaAgenda} />
                    <Route path="/consulta-cliente" component={ConsultaCliente} />
                    <Route path="/home-profissional" component={HomeProfissional} />
                    <Route path="/login-profissional" component={LoginProfissional} />
                </Switch>
        </HashRouter>
    );
}

export default App;
