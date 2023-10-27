import React, { Component } from "react";
import Rotas from './rota'
import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min'
import NavBar from './componets/navBar'
import './custom.css'
import LocalStorageService from "./App/service/LocalStorage/LocalStorageService";
import {mensagemAlerta} from "./componets/toastr";

class App extends Component {
    constructor() {
        super();

        this.timeoutId = null;
    }

    componentDidMount() {
        // Adicione os eventos de detecção de atividade no nível do documento
        document.addEventListener("mousemove", this.resetTimeout);
        document.addEventListener("keydown", this.resetTimeout);

        // Inicie o timeout
        this.startTimeout();
    }

    componentWillUnmount() {
        // Certifique-se de remover os eventos ao desmontar o componente
        document.removeEventListener("mousemove", this.resetTimeout);
        document.removeEventListener("keydown", this.resetTimeout);

        // Limpe o timeout ao desmontar o componente
        clearTimeout(this.timeoutId);
    }

    startTimeout = () => {
        this.timeoutId = setTimeout(() => {
            // Remova o usuário do localStorage após 10 minutos de inatividade
            LocalStorageService.removerItem('_Usuario_Logado');
            LocalStorageService.removerItem('_profissional_logado');
            LocalStorageService.removerItem('HorarioSelecionado');
            mensagemAlerta("Sessão encerrada devido à inatividade");
        }, 10* 60 * 1000); // 10 minutos em milissegundos
    };

    resetTimeout = () => {
        // Reinicie o timeout sempre que houver atividade do usuário
        clearTimeout(this.timeoutId);
        this.startTimeout();
    };

    render() {
        return (
            <>
                <NavBar />
                <div className="container">
                    <Rotas />
                </div>
            </>
        );
    }
}

export default App;
