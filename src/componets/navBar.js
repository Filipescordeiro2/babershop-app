import React, {Component} from "react";
import NavBarItem from '../componets/NavBarItem';
import authServiceProfissional from '../App/service/Profissional/authServiceProfissional'
import authServiceUsuario from '../App/service/Usuario/authServiceUsuario'

function Navbar(){

    const usuarioLogado=authServiceUsuario.obterUsuarioAutenticado()
    const ProfissionalLogado= authServiceProfissional.obterProfissionalAutenticado()

    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/
                " className="navbar-brand">BaberShops</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={ProfissionalLogado} href="#/home-profissional" label="Home"/>
                        <NavBarItem render={usuarioLogado} href="#/home-usuario" label="Home "/>
                        <NavBarItem render={ProfissionalLogado}  href="#/Consulta-agenda" label="Agenda"/>
                        <NavBarItem render={ProfissionalLogado}  href="#/Consulta-cliente" label="Consulta de Cliente"/>
                        <NavBarItem render={ProfissionalLogado} href="#/Cadastro-Jornada" label="Cadastro Agenda"/>
                        <NavBarItem render={ProfissionalLogado}  href="#/Perfil-Profissional" label="Perfil Profissional"/>
                        <NavBarItem render={usuarioLogado}  href="#/Perfil-Usuario" label="Perfil Cliente"/>
                        <NavBarItem render={true}  href="#/login-profissional" label="Profissional"/>
                        <NavBarItem render={true}  href="#/login-usuario" label=" Usuario"/>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Navbar
