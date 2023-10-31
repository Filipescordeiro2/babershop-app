    import React from "react";
    import 'primeicons/primeicons.css'
    import { withRouter } from "react-router-dom";


    export default props=>{



        const rows= props.clientes.map(cliente=>{
            return(
                <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.sobrenome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.id}</td>
                    <td>
                        <button className="btn btn-success" onClick={event => props.redirectToAgendamentosCliente(cliente)}>Agendamentos</button>
                        <button className="btn btn-danger"  onClick={e=>props.alterarStatus(cliente,'INATIVO')}>Inativar Cliente</button>

                    </td>
                </tr>
            )
        })

        return(
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Sobrenome</th>
                    <th scope="col">Email</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Codigo Cliente</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }
