import React from "react";
import NavBarItem from '../componets/NavBarItem';
function Navbar(){

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
                        <NavBarItem render={true} href="#/home-profissional" label="Home Profissional"/>
                        <NavBarItem render={true}  href="#/Consulta-agenda" label="Agenda"/>
                        <NavBarItem render={true} href="#/Cadastro-Jornada" label="Cadastro Jornada"/>
                        <NavBarItem render={true}  href="#/login-profissional" label="Sair"/>
                    </ul>
                </div>
            </div>
        </div>

    )
}
export default Navbar
