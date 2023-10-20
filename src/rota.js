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
import PaginaInicial from './Main/PaginaInicial'
import ProfissionalPerfil from '../src/Profissional/view/ProfissionalPerfil';
import AgendamentosCliente from './Profissional/view/AgendamentosCliente';
import UsuarioPerfil from "./Usuario/view/UsuarioPerfil";

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
                    <Route path="/login-profissional" component={LoginProfissional}/>
                    <Route path="/perfil-profissional" component={ProfissionalPerfil}/>
                    <Route path="/agendamentos-cliente" component={AgendamentosCliente}/>
                    <Route path="/perfil-usuario" component={UsuarioPerfil}/>
                    <Route path="/" component={PaginaInicial}></Route>
                </Switch>
        </HashRouter>
    );
}

export default App;
